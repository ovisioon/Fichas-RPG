import { useState } from "react";
import { ABILITIES, Ability } from "@/data/abilities";
import { trails, Trail, TrailLevel } from "@/data/trails";
import { Plus, Trash2, X, ChevronDown } from "lucide-react";

interface SelectedAbility extends Ability {
  customId: string;
}

interface SelectedTrailAbility {
  id: string;
  trailName: string;
  trailLevel: number;
  levelName: string;
  description: string;
}

interface AbilitiesTabProps {
  selectedAbilities: SelectedAbility[];
  onAbilitiesChange: (abilities: SelectedAbility[]) => void;
  selectedTrailAbilities?: SelectedTrailAbility[];
  onTrailAbilitiesChange?: (abilities: SelectedTrailAbility[]) => void;
  themeColor?: string;
}

export function AbilitiesTab({ 
  selectedAbilities = [], 
  onAbilitiesChange, 
  selectedTrailAbilities = [], 
  onTrailAbilitiesChange,
  themeColor = "#4ADE80" 
}: AbilitiesTabProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [expandedTrails, setExpandedTrails] = useState<Record<string, boolean>>({});

  // Garante que as variáveis sejam arrays antes de usar métodos como filter ou map
  const safeAbilities = Array.isArray(selectedAbilities) ? selectedAbilities : [];
  const safeTrailAbilities = Array.isArray(selectedTrailAbilities) ? selectedTrailAbilities : [];

  const handleAddAbility = (ability: Ability) => {
    const newAbility: SelectedAbility = {
      ...ability,
      customId: `ability-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    onAbilitiesChange([...safeAbilities, newAbility]);
    setShowModal(false);
  };

  const handleRemoveAbility = (customId: string) => {
    onAbilitiesChange(safeAbilities.filter(a => a.customId !== customId));
  };

  const handleAddTrailAbility = (trail: Trail, level: TrailLevel) => {
    if (!onTrailAbilitiesChange) return;
    
    const newTrailAbility: SelectedTrailAbility = {
      id: `trail-${trail.id}-${level.level}-${Date.now()}`,
      trailName: trail.name,
      trailLevel: level.level,
      levelName: level.name,
      description: level.description
    };
    
    onTrailAbilitiesChange([...safeTrailAbilities, newTrailAbility]);
    setShowModal(false);
  };

  const handleRemoveTrailAbility = (id: string) => {
    if (onTrailAbilitiesChange) {
      onTrailAbilitiesChange(safeTrailAbilities.filter(a => a.id !== id));
    }
  };

  const toggleTrailExpand = (trailId: string) => {
    setExpandedTrails(prev => ({ ...prev, [trailId]: !prev[trailId] }));
  };

  const classTrails = selectedClass ? trails.filter(t => t.classId === selectedClass) : [];

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: themeColor, fontSize: "1.2rem", fontWeight: "bold" }}>HABILIDADES</h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "8px 15px",
            backgroundColor: themeColor,
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.8rem"
          }}
        >
          <Plus size={16} /> ADICIONAR HABILIDADE
        </button>
      </div>

      {/* Lista de Habilidades Selecionadas */}
      <div style={{ display: "grid", gap: "15px" }}>
        {safeAbilities.length === 0 && safeTrailAbilities.length === 0 && (
          <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>Nenhuma habilidade selecionada</p>
        )}

        {/* Habilidades Normais */}
        {safeAbilities.map(ability => (
          <div key={ability.customId} style={{ backgroundColor: "#1A1A1A", border: `1px solid ${themeColor}`, borderRadius: "8px", padding: "15px", position: "relative" }}>
            <button
              onClick={() => handleRemoveAbility(ability.customId)}
              style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}
            >
              <Trash2 size={18} />
            </button>
            <h3 style={{ color: themeColor, fontSize: "1rem", marginBottom: "5px" }}>{ability.name}</h3>
            <p style={{ color: "#B0B0B0", fontSize: "0.85rem", lineHeight: "1.4" }}>{ability.description}</p>
          </div>
        ))}

        {/* Habilidades de Trilha (Roxas) */}
        {safeTrailAbilities.map(ability => (
          <div key={ability.id} style={{ backgroundColor: "#1A1A1A", border: "1px solid #A855F7", borderRadius: "8px", padding: "15px", position: "relative" }}>
            <button
              onClick={() => handleRemoveTrailAbility(ability.id)}
              style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}
            >
              <Trash2 size={18} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
              <span style={{ backgroundColor: "#A855F7", color: "#fff", fontSize: "0.65rem", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>TRILHA</span>
              <h3 style={{ color: "#A855F7", fontSize: "1rem" }}>{ability.levelName} ({ability.trailName})</h3>
            </div>
            <p style={{ color: "#B0B0B0", fontSize: "0.85rem", lineHeight: "1.4" }}>{ability.description}</p>
          </div>
        ))}
      </div>

      {/* Modal de Seleção */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: `2px solid ${themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", padding: "25px", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#666", cursor: "pointer" }}>
              <X size={24} />
            </button>
            
            <h2 style={{ color: themeColor, marginBottom: "20px", fontSize: "1.2rem" }}>ADICIONAR HABILIDADE</h2>
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", overflowX: "auto", paddingBottom: "10px" }}>
              {["Combatente", "Especialista", "Ocultista"].map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  style={{
                    padding: "8px 20px",
                    backgroundColor: selectedClass === cls ? themeColor : "#222",
                    color: selectedClass === cls ? "#000" : themeColor,
                    border: `1px solid ${themeColor}`,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {cls}
                </button>
              ))}
            </div>

            {selectedClass && (
              <div>
                <h3 style={{ color: themeColor, fontSize: "0.9rem", marginBottom: "10px" }}>HABILIDADES DE CLASSE</h3>
                <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
                  {ABILITIES.filter(a => a.classId === selectedClass).map(ability => (
                    <div key={ability.id} onClick={() => handleAddAbility(ability)} style={{ padding: "12px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "6px", cursor: "pointer" }}>
                      <div style={{ color: themeColor, fontWeight: "bold", fontSize: "0.9rem" }}>{ability.name}</div>
                      <div style={{ color: "#666", fontSize: "0.75rem", marginTop: "4px" }}>{ability.description.substring(0, 100)}...</div>
                    </div>
                  ))}
                </div>

                <h3 style={{ color: "#A855F7", fontSize: "0.9rem", marginTop: "20px", marginBottom: "10px" }}>TRILHAS</h3>
                {classTrails.map(trail => (
                  <div key={trail.id} style={{ marginBottom: "12px" }}>
                    <div onClick={() => toggleTrailExpand(trail.id)} style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "rgba(168,85,247,0.1)", cursor: "pointer", color: "#A855F7", fontWeight: "bold", borderRadius: "4px" }}>
                      {trail.name} <ChevronDown size={16} />
                    </div>
                    {expandedTrails[trail.id] && (
                      <div style={{ padding: "10px", border: "1px solid rgba(168,85,247,0.2)", borderTop: "none", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}>
                        {trail.levels.map(level => (
                          <div key={level.level} onClick={() => handleAddTrailAbility(trail, level)} style={{ padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}>
                            <div style={{ fontSize: "0.85rem", color: "#D8B4FE", fontWeight: "bold" }}>Nível {level.level}: {level.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "4px" }}>{level.description.substring(0, 80)}...</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
