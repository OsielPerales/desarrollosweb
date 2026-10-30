import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

interface ContactLead {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  tipoEmpresa: string;
  intereses: string[];
  mensaje: string;
  source: string;
}

export async function createLead(data: ContactLead): Promise<string> {
  const result = await addDoc(collection(db, 'leads'), {
    ...data,
    status: 'nuevo',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return result.id;
}
