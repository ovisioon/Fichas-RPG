// src/components/Login.tsx
import { useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Preencha usuário e senha");
      return;
    }

    if (username.length < 3) {
      toast.error("Nome de usuário deve ter pelo menos 3 caracteres");
      return;
    }

    if (password.length < 6) {
      toast.error("Senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    try {
      // Usa email fictício baseado no username
      const email = `${username.toLowerCase()}@fichas.local`;

      if (isRegistering) {
        // Verificar se username já existe (opcional, via Firestore)
        const userDoc = await getDoc(doc(db, "usernames", username.toLowerCase()));
        if (userDoc.exists()) {
          toast.error("Nome de usuário já está em uso");
          setIsLoading(false);
          return;
        }

        // Criar conta
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Salvar nome de usuário no Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
          createdAt: new Date().toISOString(),
        });
        
        // Reservar o username para evitar duplicatas
        await setDoc(doc(db, "usernames", username.toLowerCase()), {
          uid: userCredential.user.uid,
        });
        
        toast.success("Conta criada com sucesso!");
      } else {
        // Fazer login
        await signInWithEmailAndPassword(auth, email, password);
        toast.success(`Bem-vindo, ${username}!`);
      }
      onLogin();
    } catch (error: any) {
      console.error(error);
      let message = "Erro ao autenticar";
      
      if (error.code === "auth/user-not-found") {
        message = "Usuário não encontrado";
      } else if (error.code === "auth/wrong-password") {
        message = "Senha incorreta";
      } else if (error.code === "auth/email-already-in-use") {
        message = "Nome de usuário já está em uso";
      } else if (error.code === "auth/weak-password") {
        message = "Senha muito fraca (mínimo 6 caracteres)";
      } else if (error.code === "auth/invalid-email") {
        message = "Nome de usuário inválido (use apenas letras e números)";
      }
      
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md rounded-xl border border-green-400/30 bg-[#111] p-8 shadow-[0_0_30px_rgba(74,222,128,0.1)]">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-wider text-green-400">
          {isRegistering ? "Criar Conta" : "Entrar"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Nome de usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              className="w-full rounded-md border border-white/10 bg-black/60 px-4 py-3 text-white outline-none focus:border-green-400"
              placeholder="seu_username"
              disabled={isLoading}
              autoCapitalize="none"
              autoCorrect="off"
            />
            <p className="mt-1 text-xs text-white/40">
              Apenas letras, números e underline
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black/60 px-4 py-3 text-white outline-none focus:border-green-400"
              placeholder="••••••••"
              disabled={isLoading}
            />
            <p className="mt-1 text-xs text-white/40">
              Mínimo 6 caracteres
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-green-400 py-3 font-bold text-black transition-colors hover:bg-green-500 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Carregando...
              </span>
            ) : isRegistering ? (
              "Criar conta"
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/60">
          {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setUsername("");
              setPassword("");
            }}
            className="text-green-400 hover:underline"
            disabled={isLoading}
          >
            {isRegistering ? "Entrar" : "Criar conta"}
          </button>
        </p>

        <p className="mt-4 text-center text-xs text-white/30">
          {isRegistering 
            ? "Crie sua conta para salvar suas fichas" 
            : "Entre para acessar suas fichas"}
        </p>
      </div>
    </div>
  );
}