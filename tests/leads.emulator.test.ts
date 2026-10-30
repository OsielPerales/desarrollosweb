import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { initializeTestEnvironment, assertFails, assertSucceeds, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { collection, addDoc, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, serverTimestamp, Timestamp, type Firestore } from 'firebase/firestore';
import { createLead } from '../src/lib/leadsService';
import type { ContactValues } from '../src/lib/contactValidation';

let env: RulesTestEnvironment;
const values: ContactValues = {
  nombre: 'Prueba de emulador', email: 'test@example.com', telefono: '8661160704',
  empresa: 'Prueba', tipoEmpresa: '', intereses: ['software'], objetivo: '',
  etapa: '', urgencia: '', mensaje: 'Solicitud de prueba sin envíos externos.', website: '',
};
const payload = () => ({ ...values, estado: 'nuevo', source: 'web_contacto', createdAt: serverTimestamp() });

beforeAll(async () => {
  if (!process.env.FIRESTORE_EMULATOR_HOST) throw new Error('Se requiere el emulador; no se permite usar producción.');
  env = await initializeTestEnvironment({
    projectId: 'demo-desarrollosweb',
    firestore: { rules: readFileSync('tests/generated/firestore.rules', 'utf8') },
  });
});
afterAll(async () => { await env?.cleanup(); });

describe('política aislada de leads', () => {
  it('el servicio real guarda el lead anónimo y devuelve un ID verificable', async () => {
    const db = env.unauthenticatedContext().firestore();
    const id = await createLead(values, db as unknown as Firestore);
    await env.withSecurityRulesDisabled(async (context) => {
      const saved = (await getDoc(doc(context.firestore(), 'leads', id))).data()!;
      expect(saved.nombre).toBe(values.nombre);
      expect(saved.estado).toBe('nuevo');
      expect(saved.createdAt).toBeInstanceOf(Timestamp);
    });
    await assertFails(getDoc(doc(db, 'leads', id)));
    await assertFails(getDocs(collection(db, 'leads')));
    await assertFails(updateDoc(doc(db, 'leads', id), { estado: 'contactado' }));
    await assertFails(deleteDoc(doc(db, 'leads', id)));
  });

  it('rechaza campos extra y metadatos reservados para el servidor', async () => {
    const db = env.unauthenticatedContext().firestore();
    for (const extra of [{ admin: true }, { notificado: true }, { score: 100 }]) {
      await assertFails(addDoc(collection(db, 'leads'), { ...payload(), ...extra }));
    }
  });

  it('rechaza tipos, estado, timestamp, honeypot, intereses y tamaños inválidos', async () => {
    const db = env.unauthenticatedContext().firestore();
    const cases = [
      { nombre: 123 }, { nombre: 'x' }, { nombre: 'x'.repeat(121) },
      { email: 'invalido' }, { email: 'a b@example.com' }, { email: 'a'.repeat(255) },
      { telefono: 'llamar' }, { empresa: 'x'.repeat(161) },
      { tipoEmpresa: 'x'.repeat(81) }, { objetivo: 'x'.repeat(101) },
      { etapa: 'x'.repeat(81) }, { urgencia: 'x'.repeat(61) },
      { mensaje: 'x'.repeat(3001) }, { intereses: ['inventado'] },
      { intereses: ['software', 'software'] }, { intereses: 'software' },
      { estado: 'aprobado' }, { source: 'manual' },
      { createdAt: Timestamp.fromMillis(0) }, { website: 'bot' },
    ];
    for (const patch of cases) await assertFails(addDoc(collection(db, 'leads'), { ...payload(), ...patch }));
    const missing = payload() as Record<string, unknown>;
    delete missing.email;
    await assertFails(addDoc(collection(db, 'leads'), missing));
    await assertSucceeds(addDoc(collection(db, 'leads'), payload()));
  });

  it('una cuenta autenticada tampoco puede leer ni modificar leads', async () => {
    const db = env.authenticatedContext('cuenta-sin-rol').firestore();
    const ref = doc(db, 'leads', 'prueba-auth');
    await assertSucceeds(setDoc(ref, payload()));
    await assertFails(getDoc(ref));
    await assertFails(updateDoc(ref, { notificado: true }));
    await assertFails(deleteDoc(ref));
  });

  it('el handler de creación registra la notificación en Firestore con proveedor emulado', async () => {
    const id = await createLead(values, env.unauthenticatedContext().firestore() as unknown as Firestore);
    if (process.env.CONTACT_TEST_AUTO_TRIGGER !== 'true') {
      // Exercise the exported handler against the real Firestore emulator.
      // This host cannot open the Functions worker's Unix socket.
      process.env.GCLOUD_PROJECT = 'demo-desarrollosweb';
      process.env.FUNCTIONS_EMULATOR = 'true';
      process.env.CONTACT_EMAIL_PROVIDER = 'emulator';
      const require = createRequire(import.meta.url);
      const { notificarSolicitud } = require('../functions/lib/functions/src/index.js');
      const adminRequire = createRequire(new URL('../functions/package.json', import.meta.url));
      const adminDb = adminRequire('firebase-admin/firestore').getFirestore();
      const snapshot = await adminDb.doc(`leads/${id}`).get();
      await notificarSolicitud.run({ data: snapshot, params: { id } });
      await notificarSolicitud.run({ data: snapshot, params: { id } });
    }
    let data: Record<string, unknown> = {};
    for (let attempt = 0; attempt < 60; attempt++) {
      await env.withSecurityRulesDisabled(async (context) => {
        data = (await getDoc(doc(context.firestore(), 'leads', id))).data()!;
      });
      if (data.notificado === true) break;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    expect(data.notificado).toBe(true);
    expect(data.notificacionProveedor).toBe('emulator');
    expect(data.notificacionId).toBe(`emulator-${id}`);
    expect(data.notificacionIntentos).toBe(1);
  });
});
