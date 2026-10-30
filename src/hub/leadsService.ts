import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Lead, LeadStatus } from './types';

const LEADS_COLLECTION = 'leads';

/**
 * Guarda un nuevo lead en Firestore.
 * Llamado desde el formulario de Contacto.
 */
export async function createLead(data: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<string> {
    const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
        ...data,
        status: 'nuevo' as LeadStatus,
        score: null,
        source: 'web_contacto',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

/**
 * Escucha en tiempo real todos los leads del pipeline.
 * Devuelve la función de unsubscribe.
 */
export function subscribeToLeads(callback: (leads: Lead[]) => void): () => void {
    const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const leads = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Lead));
        callback(leads);
    });
}

/**
 * Mueve un lead a una nueva columna del Kanban.
 */
export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<void> {
    await updateDoc(doc(db, LEADS_COLLECTION, leadId), {
        status,
        updatedAt: serverTimestamp(),
    });
}
