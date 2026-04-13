// src/services/fichas.ts
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const fichasCol = collection(db, 'fichas');

export async function createFicha(userId: string, data: any) {
  const docRef = await addDoc(fichasCol, {
    userId,
    data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return { id: docRef.id };
}

export async function listFichas(userId: string) {
  const q = query(fichasCol, where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateFicha(id: string, userId: string, data: any) {
  const d = doc(db, 'fichas', id);
  await setDoc(d, { userId, data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function deleteFicha(id: string) {
  await deleteDoc(doc(db, 'fichas', id));
}
