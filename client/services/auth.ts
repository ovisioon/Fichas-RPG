// src/services/auth.ts
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';

function usernameToEmail(username: string) {
  // transforma username em email interno
  return `${username}@fichas.local`;
}

export async function register(username: string, password: string) {
  const email = usernameToEmail(username);
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: username });
  return cred.user;
}

export async function login(username: string, password: string) {
  const email = usernameToEmail(username);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logout() {
  await signOut(auth);
}

export function currentUser(): User | null {
  return auth.currentUser;
}
