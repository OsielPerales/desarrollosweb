import { getApps, initializeApp } from 'firebase-admin/app';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { defineSecret, defineString } from 'firebase-functions/params';
import { notifyLead } from './notification';

if (!getApps().length) initializeApp();

const provider = defineString('CONTACT_EMAIL_PROVIDER', { default: 'pendiente' });
const from = defineString('CONTACT_EMAIL_FROM', { default: '' });
const key = defineSecret('CONTACT_EMAIL_API_KEY');

export const notificarSolicitud = onDocumentCreated({
  document: 'leads/{id}', region: 'us-central1', retry: true,
  secrets: process.env.FUNCTIONS_EMULATOR === 'true' ? [] : [key], maxInstances: 3,
}, async (event) => {
  if (!event.data) return;
  const selectedProvider = provider.value();
  const emulator = process.env.FUNCTIONS_EMULATOR === 'true'
    && Boolean(process.env.FIRESTORE_EMULATOR_HOST);
  await notifyLead(event.data.ref, {
    provider: selectedProvider, from: from.value(), emulator,
    // Never read a credential when the provider is still undefined.
    apiKey: selectedProvider === 'resend' ? key.value() : '',
  });
});
