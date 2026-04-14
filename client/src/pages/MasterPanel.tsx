// src/pages/MasterPanel.tsx
import { useEffect, useState } from "react";
import { ArrowLeft, Edit, Users } from "lucide-react";
import { listAllFichas } from "../../services/fichasClient";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface MasterPanelProps {
  onBack: () => void;
}

export default function MasterPanel({ onBack }: MasterPanelProps) {
  const [fichas, setFichas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    loadAllFichas();
  }, []);

  async function loadAllFichas() {
    try {
      setLoading(true);
      const todas = await listAllFichas();
      setFichas(todas);
    } catch (error) {
      console.error("Erro ao carregar fichas:", error);
      toast.error("Erro ao carregar fichas");
    } finally {
      setLoading(false);
    }
  }

  const handleEditFicha = (fichaId: string) => {
    // Navega para a ficha; o CharacterSheet deve ser adaptado para aceitar modo mestre
    setLocation(`/sheet/${fichaId}?master=true`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-white">
        <p className="text-purple-400 animate-pulse">Carregando todas as fichas...</p>
      </div>
    );
  }

  const fichasPorUsuario = fichas.reduce((acc: Record<string, any[]>, ficha) => {
    const uid = ficha.userId;
    if (!acc[uid]) acc[uid] = [];
    acc[uid].push(ficha);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-6 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-md border border-purple-500 px-4 py-2 text-sm font-bold text-purple-400 transition-colors hover:bg-purple-500/10"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          <h1 className="font-['Bebas_Neue'] text-3xl tracking-wider text-purple-400 neon-text">
            PAINEL DO MESTRE
          </h1>
          <div className="w-[80px]" />
        </div>

        {/* Estatísticas rápidas */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-purple-500/30 bg-[#111] p-4">
            <p className="text-sm text-white/60">Total de Jogadores</p>
            <p className="font-['Oswald'] text-3xl text-purple-400">{Object.keys(fichasPorUsuario).length}</p>
          </div>
          <div className="rounded-lg border border-purple-500/30 bg-[#111] p-4">
            <p className="text-sm text-white/60">Total de Fichas</p>
            <p className="font-['Oswald'] text-3xl text-purple-400">{fichas.length}</p>
          </div>
          <div className="rounded-lg border border-purple-500/30 bg-[#111] p-4">
            <p className="text-sm text-white/60">Média de Atributos</p>
            <p className="font-['Oswald'] text-3xl text-purple-400">
              {fichas.length > 0
                ? Math.round(
                    fichas.reduce((sum, f) => {
                      const attrs = f.data?.attrs;
                      if (!attrs) return sum;
                      const values = Object.values(attrs) as number[];
                      const total = values.reduce((a: number, b: number) => a + b, 0);
                      return sum + total;
                    }, 0) / fichas.length
                  )
                : 0}
            </p>
          </div>
        </div>

        {/* Lista de fichas por usuário */}
        {Object.entries(fichasPorUsuario).map(([userId, fichasDoUsuario]) => (
          <div key={userId} className="mb-8">
            <div className="mb-3 flex items-center gap-2 border-b border-purple-500/30 pb-2">
              <Users size={18} className="text-purple-400" />
              <h2 className="text-lg font-semibold text-white/80">
                Usuário: <span className="font-mono text-sm text-purple-300">{userId}</span>
              </h2>
              <span className="ml-auto text-sm text-white/40">{fichasDoUsuario.length} ficha(s)</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fichasDoUsuario.map((ficha) => (
                <div
                  key={ficha.id}
                  className="rounded-lg border border-purple-500/20 bg-[#111] p-4 transition-all hover:border-purple-500/50"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-['Bebas_Neue'] text-lg text-purple-300">
                      {ficha.data?.characterName || "Sem nome"}
                    </h3>
                    <button
                      onClick={() => handleEditFicha(ficha.id)}
                      className="rounded p-1 text-purple-400 hover:bg-purple-500/10"
                      title="Editar ficha"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                  <div className="space-y-1 text-xs text-white/50">
                    <p>PV: {ficha.data?.status?.pvAtual || 0}/{ficha.data?.status?.pvMax || 0}</p>
                    <p>PE: {ficha.data?.status?.peAtual || 0}/{ficha.data?.status?.peMax || 0}</p>
                    <p>Elemento: {ficha.data?.elemento || "Nenhum"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {fichas.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/20 bg-[#111] p-12 text-center">
            <p className="text-white/50">Nenhuma ficha encontrada no sistema.</p>
          </div>
        )}
      </div>
    </div>
  );
}