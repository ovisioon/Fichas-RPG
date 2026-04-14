// client/src/components/InvestigacaoTab.tsx
import { useState } from "react";
import { arquetiposInvestigativos, ArquetipoInvestigativo, HabilidadeInvestigativa } from "@/data/investigacao";
import { Plus, Trash2, X, ChevronDown } from "lucide-react";

interface SelectedArquetipo {
  id: string;
  name: string;
  description: string;
  habilidades: HabilidadeInvestigativa[];
}

interface InvestigacaoTabProps {
  selectedArquetipo: SelectedArquetipo | null;
  onArquetipoChange: (arquetipo: SelectedArquetipo | null) => void;
  piAtual: number;
  piMax: number;
  onPiChange: (atual: number, max: number) => void;
  themeColor?: string;
}

export function InvestigacaoTab({
  selectedArquetipo,
  onArquetipoChange,
  piAtual,
  piMax,
  onPiChange,
  themeColor = "#F59E0B"
}: InvestigacaoTabProps) {
  const [showModal, setShowModal] = useState(false);
  const [expandedArquetipo, setExpandedArquetipo] = useState<string | null>(null);
  const [expandedHabilidades, setExpandedHabilidades] = useState<Record<string, boolean>>({});

  const handleSelectArquetipo = (arquetipo: ArquetipoInvestigativo) => {
    onArquetipoChange({
      id: arquetipo.id,
      name: arquetipo.name,
      description: arquetipo.description,
      habilidades: arquetipo.habilidades
    });
    setShowModal(false);
  };

  const handleRemoveArquetipo = () => {
    onArquetipoChange(null);
  };

  const toggleHabilidade = (habId: string) => {
    setExpandedHabilidades(prev => ({ ...prev, [habId]: !prev[habId] }));
  };

  // Barra de PI
  const pct = piMax > 0 ? Math.min((piAtual / piMax) * 100, 100) : 0;

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: themeColor, fontSize: "1.2rem", fontWeight: "bold" }}>ARQUÉTIPO INVESTIGATIVO</h2>
        <button
          onClick={() => setShowModal(true)}
          disabled={selectedArquetipo !== null}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "8px 15px",
            backgroundColor: selectedArquetipo ? "#444" : themeColor,
            color: selectedArquetipo ? "#888" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: selectedArquetipo ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "0.8rem",
            opacity: selectedArquetipo ? 0.6 : 1
          }}
        >
          <Plus size={16} /> {selectedArquetipo ? "Arquétipo já escolhido" : "ESCOLHER ARQUÉTIPO"}
        </button>
      </div>

      {/* Barra de Pontos de Investigação */}
      <div style={{ backgroundColor: "#1A1A1A", border: `1px solid ${themeColor}40`, borderRadius: "8px", padding: "15px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ color: themeColor, fontWeight: "bold", fontSize: "0.9rem" }}>PONTOS DE INVESTIGAÇÃO (PI)</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="number"
              value={piAtual}
              onChange={(e) => onPiChange(parseInt(e.target.value) || 0, piMax)}
              style={{ width: "60px", background: "#050505", border: "1px solid #333", color: themeColor, padding: "4px", borderRadius: "4px", textAlign: "center", fontWeight: "bold" }}
              min={0}
              max={piMax}
            />
            <span style={{ color: "#666" }}>/</span>
            <input
              type="number"
              value={piMax}
              onChange={(e) => onPiChange(piAtual, parseInt(e.target.value) || 1)}
              style={{ width: "60px", background: "#050505", border: "1px solid #333", color: "#fff", padding: "4px", borderRadius: "4px", textAlign: "center" }}
              min={1}
            />
          </div>
        </div>
        <div style={{ height: "10px", background: "#0A0A0A", borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", backgroundColor: themeColor, transition: "width 0.2s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
          <span style={{ fontSize: "0.7rem", color: "#888" }}>{piAtual} / {piMax} PI disponíveis</span>
        </div>
      </div>

      {selectedArquetipo ? (
        <div style={{ backgroundColor: "#1A1A1A", border: `1px solid ${themeColor}`, borderRadius: "8px", padding: "15px", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
            <div>
              <h3 style={{ color: themeColor, fontSize: "1.2rem", margin: "0 0 5px 0" }}>{selectedArquetipo.name}</h3>
              <p style={{ color: "#B0B0B0", fontSize: "0.85rem", margin: "0 0 15px 0" }}>{selectedArquetipo.description}</p>
            </div>
            <button onClick={handleRemoveArquetipo} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}>
              <Trash2 size={18} />
            </button>
          </div>
          <h4 style={{ color: themeColor, fontSize: "1rem", marginBottom: "10px", borderBottom: `1px solid ${themeColor}30`, paddingBottom: "5px" }}>
            HABILIDADES ({selectedArquetipo.habilidades.length})
          </h4>
          <div style={{ display: "grid", gap: "8px" }}>
            {selectedArquetipo.habilidades.map(habilidade => (
              <div key={habilidade.id} style={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "6px", padding: "10px" }}>
                <div onClick={() => toggleHabilidade(habilidade.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                  <span style={{ color: themeColor, fontWeight: "bold", fontSize: "0.9rem" }}>{habilidade.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: "#FFD700", fontSize: "0.75rem" }}>{habilidade.cost}</span>
                    <ChevronDown size={16} style={{ color: themeColor, transform: expandedHabilidades[habilidade.id] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                  </div>
                </div>
                {expandedHabilidades[habilidade.id] && (
                  <p style={{ color: "#AAA", fontSize: "0.8rem", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #333" }}>
                    {habilidade.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>Nenhum arquétipo selecionado. Escolha um arquétipo investigativo.</p>
      )}

      {/* Modal de Seleção (mantido igual) */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: `2px solid ${themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", padding: "25px", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#666", cursor: "pointer" }}>
              <X size={24} />
            </button>
            <h2 style={{ color: themeColor, marginBottom: "10px", fontSize: "1.2rem" }}>ESCOLHER ARQUÉTIPO</h2>
            <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "20px" }}>Você só pode ter um arquétipo investigativo ativo.</p>
            <div style={{ display: "grid", gap: "15px" }}>
              {arquetiposInvestigativos.map(arquetipo => (
                <div key={arquetipo.id} style={{ backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "8px", overflow: "hidden" }}>
                  <div onClick={() => setExpandedArquetipo(expandedArquetipo === arquetipo.id ? null : arquetipo.id)} style={{ padding: "15px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ color: themeColor, fontWeight: "bold", fontSize: "1rem", margin: "0 0 5px 0" }}>{arquetipo.name}</h3>
                      <p style={{ color: "#B0B0B0", fontSize: "0.8rem", margin: 0 }}>{arquetipo.description}</p>
                    </div>
                    <ChevronDown size={20} style={{ color: themeColor, transform: expandedArquetipo === arquetipo.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                  </div>
                  {expandedArquetipo === arquetipo.id && (
                    <div style={{ padding: "0 15px 15px 15px", borderTop: "1px solid #333" }}>
                      <h4 style={{ color: themeColor, fontSize: "0.9rem", margin: "15px 0 10px 0" }}>Habilidades:</h4>
                      <div style={{ display: "grid", gap: "8px", marginBottom: "15px" }}>
                        {arquetipo.habilidades.map(h => (
                          <div key={h.id} style={{ fontSize: "0.8rem" }}>
                            <span style={{ color: themeColor, fontWeight: "bold" }}>{h.name}</span>
                            <span style={{ color: "#FFD700", marginLeft: "8px", fontSize: "0.7rem" }}>({h.cost})</span>
                            <p style={{ color: "#999", margin: "3px 0 0 0", fontSize: "0.75rem" }}>{h.description}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => handleSelectArquetipo(arquetipo)} style={{ width: "100%", padding: "10px", backgroundColor: themeColor, color: "#000", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "0.9rem" }}>
                        Selecionar este Arquétipo
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}