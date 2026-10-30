import { FieldValue, Timestamp, type DocumentReference } from 'firebase-admin/firestore';
import { CONTACT_EMAIL } from '../../src/lib/contact';

export interface MailConfig { provider: string; from: string; apiKey: string; emulator: boolean }
export type MailSender = (input: { id: string; text: string; config: MailConfig }) => Promise<string>;

export const sendMail: MailSender = async ({ id, text, config }) => {
  // Emulator integration tests never contact an external mail provider.
  if (config.emulator && config.provider === 'emulator') return `emulator-${id}`;
  if (config.provider !== 'resend' || !config.from || !config.apiKey) {
    throw new Error('MAIL_CONFIGURATION_MISSING');
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `public-contact-${id}`,
    },
    body: JSON.stringify({ from: config.from, to: [CONTACT_EMAIL], subject: `Solicitud web · ${id}`, text }),
    signal: AbortSignal.timeout(15000),
    redirect: 'error',
  });
  if (!response.ok) throw new Error(`MAIL_HTTP_${response.status}`);
  const result = await response.json() as { id?: string };
  if (!result.id) throw new Error('MAIL_RESPONSE_INVALID');
  return result.id;
};

function notificationText(id: string, data: Record<string, unknown>): string {
  const fields = ['nombre', 'email', 'telefono', 'empresa', 'tipoEmpresa', 'objetivo', 'etapa', 'urgencia', 'intereses', 'mensaje'];
  return [`Solicitud web registrada. Folio: ${id}`, ...fields.map((key) => {
    const value = Array.isArray(data[key]) ? data[key].join(', ') : String(data[key] ?? '');
    return `${key}: ${value}`;
  })].join('\n');
}

export async function notifyLead(ref: DocumentReference, config: MailConfig, sender: MailSender = sendMail): Promise<void> {
  const configured = config.emulator && config.provider === 'emulator'
    || config.provider === 'resend' && Boolean(config.from && config.apiKey);
  const claimed = await ref.firestore.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    const data = snapshot.data();
    if (!data || data.notificado === true || data.source !== 'web_contacto') return false;
    if (!configured) {
      tx.update(ref, {
        notificado: false, notificacionEstado: 'pendiente_configuracion',
        notificacionError: 'MAIL_CONFIGURATION_MISSING', notificacionActualizada: FieldValue.serverTimestamp(),
      });
      return false;
    }
    const lease = data.notificacionLeaseHasta as Timestamp | undefined;
    if (lease && lease.toMillis() > Date.now()) throw new Error('NOTIFICATION_IN_PROGRESS');
    tx.update(ref, {
      notificado: false, notificacionEstado: 'procesando',
      notificacionLeaseHasta: Timestamp.fromMillis(Date.now() + 60000),
      notificacionIntentos: FieldValue.increment(1), notificacionActualizada: FieldValue.serverTimestamp(),
    });
    return data;
  });
  if (!claimed) return;
  try {
    const messageId = await sender({ id: ref.id, text: notificationText(ref.id, claimed), config });
    await ref.update({
      notificado: true, notificacionEstado: 'aceptada_proveedor',
      notificacionProveedor: config.provider, notificacionId: messageId,
      notificacionError: FieldValue.delete(), notificacionLeaseHasta: FieldValue.delete(),
      notificacionActualizada: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    const code = error instanceof Error && /^MAIL_[A-Z_0-9]+$/.test(error.message)
      ? error.message : 'MAIL_SEND_FAILED';
    await ref.update({
      notificado: false, notificacionEstado: 'error', notificacionError: code,
      notificacionLeaseHasta: FieldValue.delete(), notificacionActualizada: FieldValue.serverTimestamp(),
    });
    // Eventarc retries. The fixed provider endpoint receives an idempotency key.
    throw new Error(code);
  }
}
