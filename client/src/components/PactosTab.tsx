// client/src/components/PactosTab.tsx
import { useState } from "react";
import { pactos, Pacto } from "@/data/pactos";
import { Plus, Trash2, X } from "lucide-react";

interface SelectedPacto {
  id: string;
  name: string;
  cost: string;
  description: string;
}

interface PactosTabProps {
  selectedPacto: SelectedPacto | null;
  onPactoChange: (pacto: SelectedPacto | null) => void;
  themeColor?: string;
}

export function PactosTab({ selectedPacto, onPactoChange, themeColor = "#C084FC" }: PactosTabProps) {
  const [showModal, setShowModal] = useState(false);

  const handleAddPacto = (pacto: Pacto) => {
    onPactoChange({
      id: pacto.id,
      name: pacto.name,
      cost: pacto.cost,
      description: pacto.description
    });
    setShowModal(false);
  };

  const handleRemovePacto = () => {
    onPactoChange(null);
  };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: themeColor, fontSize: "1.2rem", fontWeight: "bold" }}>PACTOS</h2>
        <button
          onClick={() => setShowModal(true)}
          disabled={selectedPacto !== null}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "8px 15px",
            backgroundColor: selectedPacto ? "#444" : themeColor,
            color: selectedPacto ? "#888" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: selectedPacto ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "0.8rem",
            opacity: selectedPacto ? 0.6 : 1
          }}
        >
          <Plus size={16} /> {selectedPacto ? "Pacto já escolhido" : "ESCOLHER PACTO"}
        </button>
      </div>

      {selectedPacto ? (
        <div style={{ backgroundColor: "#1A1A1A", border: `1px solid ${themeColor}`, borderRadius: "8px", padding: "15px", position: "relative" }}>
          <button
            onClick={handleRemovePacto}
            style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}
          >
            <Trash2 size={18} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ backgroundColor: themeColor, color: "#000", fontSize: "0.65rem", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>PACTO ATIVO</span>
            <h3 style={{ color: themeColor, fontSize: "1.1rem", margin: 0 }}>{selectedPacto.name}</h3>
          </div>
          <p style={{ color: "#FFD700", fontSize: "0.8rem", marginBottom: "10px" }}>Custo: {selectedPacto.cost}</p>
          <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: "1.5" }}>{selectedPacto.description}</p>
        </div>
      ) : (
        <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>Nenhum pacto selecionado. Escolha um pacto para vincular-se a uma entidade.</p>
      )}

      {/* Modal de Seleção */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: `2px solid ${themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", padding: "25px", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#666", cursor: "pointer" }}>
              <X size={24} />
            </button>
            
            <h2 style={{ color: themeColor, marginBottom: "20px", fontSize: "1.2rem" }}>ESCOLHER PACTO</h2>
            <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "15px" }}>Você só pode ter um pacto ativo. Escolha sabiamente.</p>
            
            <div style={{ display: "grid", gap: "12px" }}>
              {pactos.map(pacto => (
                <div key={pacto.id} onClick={() => handleAddPacto(pacto)} style={{ padding: "15px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "8px", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ color: themeColor, fontWeight: "bold", fontSize: "1rem", margin: 0 }}>{pacto.name}</h3>
                    <span style={{ color: "#FFD700", fontSize: "0.75rem", fontWeight: "bold" }}>{pacto.cost}</span>
                  </div>
                  <p style={{ color: "#B0B0B0", fontSize: "0.85rem", lineHeight: "1.4" }}>{pacto.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}