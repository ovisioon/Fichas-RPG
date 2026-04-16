// src/components/Header.tsx
import { LogOut } from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

interface HeaderProps {
  displayName?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export function Header({ displayName, onBack, showBack = false }: HeaderProps) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch {
      toast.error("Erro ao sair");
    }
  };

  return (
    <header className="relative z-10 mx-auto mb-3 flex w-full max-w-[1200px] flex-col items-center gap-3 border-b border-green-400/70 pb-3 sm:flex-row sm:justify-between">
      {/* Botão Voltar (opcional) */}
      {showBack && onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 self-start rounded-md border border-green-400 px-3 py-2 text-xs font-bold text-green-400 transition-transform active:scale-[0.98] sm:text-sm"
        >
          ← Voltar
        </button>
      )}
      {!showBack && <div className="hidden w-[84px] sm:block" />}

      {/* Logo "Oitavo B" com efeito glitch */}
      <h1 className="glitch-text text-center" data-text="OITAVO B">
        OITAVO B
      </h1>

      {/* Área do usuário/logout */}
      <div className="flex items-center gap-4">
        {displayName && (
          <span className="text-sm text-white/70">{displayName}</span>
        )}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1 rounded-md border border-red-400/70 px-3 py-1.5 text-xs text-red-400 hover:bg-red-400/10"
        >
          <LogOut size={14} /> Sair
        </button>
      </div>
    </header>
  );
}
