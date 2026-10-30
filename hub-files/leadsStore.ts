/**
 * leadsStore.ts — Conexión Real a Firebase Firestore
 * Se encarga del CRUD de Leads y Cotizaciones en la nube.
 */
import {
    collection, doc, setDoc, updateDoc, deleteDoc, getDocs,
    onSnapshot, query, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Lead, LeadStatus, Cotizacion } from './types';

// Colecciones en Firestore
const LEADS_COL = collection(db, 'leads');
const COTS_COL = collection(db, 'cotizaciones');

// ─── LEADS ───────────────────────────────────────────────────────────────────

export function subscribeToLeads(callback: (leads: Lead[]) => void) {
    const q = query(LEADS_COL, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const leads: Lead[] = [];
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            leads.push({
                id: docSnap.id,
                ...data,
            } as Lead);
        });
        callback(leads);
    });
}

// Para cargas sin tiempo real (ej. Analítica pura, aunque podemos usar getDocs si preferimos no suscribir)
export async function getLeads(): Promise<Lead[]> {
    const snapshot = await getDocs(query(LEADS_COL, orderBy('createdAt', 'desc')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
}

export async function createLead(data: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<string> {
    const newRef = doc(LEADS_COL); // Auto-ID
    await setDoc(newRef, {
        ...data,
        status: 'nuevo',
        score: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return newRef.id;
}

export async function updateLead(id: string, patch: Partial<Lead>): Promise<void> {
    const ref = doc(db, 'leads', id);
    await updateDoc(ref, {
        ...patch,
        updatedAt: serverTimestamp()
    });
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
    return updateLead(id, { status });
}

export async function deleteLead(id: string): Promise<void> {
    const ref = doc(db, 'leads', id);
    await deleteDoc(ref);
}

// ─── COTIZACIONES ─────────────────────────────────────────────────────────────

export function subscribeToCotizaciones(callback: (cots: Cotizacion[]) => void) {
    const q = query(COTS_COL, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const cots: Cotizacion[] = [];
        snapshot.forEach((docSnap) => {
            cots.push({ id: docSnap.id, ...docSnap.data() } as Cotizacion);
        });
        callback(cots);
    });
}

export async function getCotizaciones(): Promise<Cotizacion[]> {
    const snapshot = await getDocs(query(COTS_COL, orderBy('createdAt', 'desc')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cotizacion));
}

export async function createCotizacion(data: Omit<Cotizacion, 'id' | 'createdAt' | 'status'>): Promise<string> {
    const newRef = doc(COTS_COL);
    await setDoc(newRef, {
        ...data,
        status: 'borrador',
        createdAt: new Date().toISOString(), // Usamos string iso para cotizaciones para compatibilidad rápida con ui
    });
    return newRef.id;
}

export async function updateCotizacion(id: string, patch: Partial<Cotizacion>): Promise<void> {
    const ref = doc(db, 'cotizaciones', id);
    await updateDoc(ref, patch);
}

// ─── SEED data ───────────────────────────────────────────────────────────────
export async function seedIfEmpty() {
    const snap = await getDocs(query(LEADS_COL));
    if (!snap.empty) return; // ya hay datos

    const seeds: Omit<Lead, 'id' | 'createdAt'>[] = [
        { nombre: 'Carlos Mendoza', email: 'carlos@tallermx.com', empresa: 'Taller MX', tipoEmpresa: 'Taller de manufactura', intereses: ['cnc', 'software'], mensaje: 'Necesito optimizar mi proceso de corte.', status: 'calificado', score: 82, scoreSummary: 'Alta intención de compra. Empresa mediana con presupuesto confirmado.', source: 'web_contacto' },
        { nombre: 'Ana Ruiz', email: 'ana@industriasruiz.com', empresa: 'Industrias Ruiz', tipoEmpresa: 'Empresa industrial', intereses: ['ia', 'consultoria'], mensaje: 'Quiero automatizar mi línea de producción con IA.', status: 'propuesta', score: 91, scoreSummary: 'Muy alta prioridad. Director con poder de decisión.', source: 'web_contacto' },
    ];
    for (const s of seeds) {
        await createLead(s as Omit<Lead, 'id' | 'createdAt' | 'status'>);
    }
}
