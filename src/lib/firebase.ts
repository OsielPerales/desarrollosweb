import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore';

let contactDb: Firestore | undefined;

// The site and alternatives stay visible if public Firebase config is missing.
export function getContactDb(): Firestore {
  if (contactDb) return contactDb;
  const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || '{}') as FirebaseOptions;
  if (!config.projectId || !config.appId || !config.apiKey) {
    throw new Error('CONTACT_CONFIGURATION_MISSING');
  }
  const app = getApps().find((item) => item.name === 'public-contact')
    ?? initializeApp(config, 'public-contact');
  contactDb = getFirestore(app);
  if (import.meta.env.DEV && import.meta.env.VITE_USE_FIRESTORE_EMULATOR === 'true') {
    connectFirestoreEmulator(contactDb, '127.0.0.1', 8080);
  }
  return contactDb;
}
