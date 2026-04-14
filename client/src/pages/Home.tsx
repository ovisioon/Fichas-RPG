// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { Plus, Shield } from "lucide-react";
import { listFichas, createFicha } from "../../services/fichasClient";
import { toast } from "sonner";
import { Header } from "../components/Header";

interface HomeProps {
  user: User;
  onSelectCharacter: (id: string) => void;
  isMaster?: boolean;             // Nova prop
  onGoToMasterPanel?: () => void; // Nova prop
}

export default function Home({ user, onSelectCharacter, isMaster, onGoToMasterPanel }: HomeProps) {
  const [fichas, setFichas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadFichas();
  }, [user]);

  async function loadFichas() {
    try {
      setLoading(true);
      const lista = await listFichas(user.uid);
      setFichas(lista);
    } catch (error) {
      console.error("Erro ao listar fichas:", error);
      toast.error("Erro ao carregar fichas");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateFicha() {
    try {
      setCreating(true);
      const newFicha = await createFicha(user.uid, {
        characterName: "Novo Personagem",
        attrs: { forca: 0, destreza: 0, intelecto: 0, constituicao: 0, sabedoria: 0, carisma: 0 },
        status: { pvAtual: 20, pvMax: 20, peAtual: 20, peMax: 20, evAtual: 0 },
        skills: [],
        selectedAbilities: [],
        selectedTrailAbilities: [],
        defenseInventory: null,
        conditions: [],
      });
      toast.success("Nova ficha criada!");
      onSelectCharacter(newFicha.id);
    } catch (error) {
      console.error("Erro ao criar ficha:", error);
      toast.error("Erro ao criar ficha");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
        <p className="text-green-400 animate-pulse">Carregando fichas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-6 text-white sm:px-6 relative z-0">
      <Header displayName={user.displayName || user.email || undefined} />

      <div className="mx-auto max-w-4xl mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handleCreateFicha}
          disabled={creating}
          className="inline-flex items-center gap-2 rounded-md bg-green-400 px-5 py-3 text-sm font-bold text-black shadow-[0_0_12px_rgba(74,222,128,0.3)] transition-all hover:bg-green-500 hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] disabled:opacity-50"
        >
          <Plus size={18} />
          {creating ? "Criando..." : "Nova Ficha"}
        </button>

        {isMaster && onGoToMasterPanel && (
          <button
            onClick={onGoToMasterPanel}
            className="inline-flex items-center gap-2 rounded-md border border-purple-500 bg-purple-500/10 px-5 py-3 text-sm font-bold text-purple-400 transition-all hover:bg-purple-500 hover:text-white"
          >
            <Shield size={18} />
            Painel do Mestre
          </button>
        )}
      </div>

      {/* Lista de Fichas */}
      <div className="mx-auto max-w-4xl mt-8">
        {fichas.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/20 bg-[#111] p-12 text-center">
            <p className="text-white/50">Nenhuma ficha encontrada.</p>
            <p className="mt-2 text-sm text-white/30">
              Clique em "Nova Ficha" para começar sua aventura!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fichas.map((ficha) => (
              <div
                key={ficha.id}
                onClick={() => onSelectCharacter(ficha.id)}
                className="group cursor-pointer rounded-lg border border-green-400/20 bg-[#111] p-5 transition-all hover:border-green-400/60 hover:bg-[#1a1a1a] hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-['Bebas_Neue'] text-xl tracking-wide text-green-400">
                    {ficha.data?.characterName || "Ficha sem nome"}
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-white/60">
                  <p>
                    Atributos:{" "}
                    <span className="text-white/80">
                      {ficha.data?.attrs
                        ? (Object.values(ficha.data.attrs) as number[]).reduce((a: number, b: number) => a + b, 0)
                        : 0}{" "}
                      pts
                    </span>
                  </p>
                  <p>
                    PV: {ficha.data?.status?.pvAtual || 0} / {ficha.data?.status?.pvMax || 0}
                  </p>
                  <p>
                    PE: {ficha.data?.status?.peAtual || 0} / {ficha.data?.status?.peMax || 0}
                  </p>
                </div>
                <div className="mt-4 text-xs text-green-400/70 opacity-0 transition-opacity group-hover:opacity-100">
                  Clique para abrir →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}