import { addDoc, collection, serverTimestamp, type Firestore } from 'firebase/firestore';
import { getContactDb } from './firebase';
import { validateContact, type ContactValues } from './contactValidation';

// Resolves only after Firestore acknowledges the write.
export async function createLead(values: ContactValues, database?: Firestore): Promise<string> {
  const { data, errors } = validateContact(values);
  if (Object.keys(errors).length) throw new Error('INVALID_CONTACT');
  const result = await addDoc(collection(database ?? getContactDb(), 'leads'), {
    ...data,
    estado: 'nuevo',
    source: 'web_contacto',
    createdAt: serverTimestamp(),
  });
  return result.id;
}
