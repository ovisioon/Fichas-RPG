// client/services/fichasClient.ts
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase"; // alias configurado -> client/src/firebase.ts

const FICHAS_COLLECTION = "fichas";

// Cria uma nova ficha (ID automático)
export async function createFicha(userId: string, data: any) {
  const col = collection(db, FICHAS_COLLECTION);
  const docRef = await addDoc(col, {
    userId,
    data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id };
}

// Lista todas as fichas de um usuário
export async function listFichas(userId: string) {
  const col = collection(db, FICHAS_COLLECTION);
  const q = query(col, where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// Atualiza ou cria uma ficha específica (userId, fichaId, data)
export async function updateFicha(userId: string, fichaId: string, data: any) {
  const docRef = doc(db, FICHAS_COLLECTION, fichaId);
  await setDoc(
    docRef,
    {
      userId,
      data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// Exclui uma ficha
export async function deleteFicha(fichaId: string) {
  const docRef = doc(db, FICHAS_COLLECTION, fichaId);
  await deleteDoc(docRef);
}