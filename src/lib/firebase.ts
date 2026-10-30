// Public Firebase app and contact persistence.
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 🔑 Configuration — Replace with your actual Firebase project credentials
// from https://console.firebase.google.com → Project Settings → Web App
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || '{}');

// Initialize once (Vite hot-reload guard)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export default app;
