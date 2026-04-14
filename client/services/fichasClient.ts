// client/services/fichasClient.ts
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
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

// lista todas as fichas (para o painel do mestre)
export async function listAllFichas() {
  const col = collection(db, "fichas");
  const snap = await getDocs(col);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtém uma ficha específica por ID (para o painel do mestre ou para edição) - retorna null se não existir
export async function getFicha(fichaId: string) {
  const docRef = doc(db, FICHAS_COLLECTION, fichaId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}