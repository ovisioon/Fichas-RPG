import { useState } from "react";
import { ABILITIES, Ability } from "@/data/abilities";
import { trails, Trail, TrailLevel } from "@/data/trails";
import { Plus, Trash2, X, ChevronDown, Edit } from "lucide-react";

interface SelectedAbility extends Ability {
  customId: string;
  isCustom?: boolean; // indica se foi criada pelo usuário
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
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [editingAbility, setEditingAbility] = useState<SelectedAbility | null>(null);
  const [selectedClass, setSelectedClass] = useState<"Combatente" | "Especialista" | "Ocultista" | null>(null);
  const [expandedTrails, setExpandedTrails] = useState<Record<string, boolean>>({});

  // Campos do formulário customizado
  const [customName, setCustomName] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [customCost, setCustomCost] = useState("");
  const [customPrerequisite, setCustomPrerequisite] = useState("");
  const [customType, setCustomType] = useState<"ativa" | "passiva">("ativa");
  const [customClass, setCustomClass] = useState<"Combatente" | "Especialista" | "Ocultista">("Combatente");

  const safeAbilities = Array.isArray(selectedAbilities) ? selectedAbilities : [];
  const safeTrailAbilities = Array.isArray(selectedTrailAbilities) ? selectedTrailAbilities : [];

  const handleAddAbility = (ability: Ability) => {
    const newAbility: SelectedAbility = {
      ...ability,
      customId: `ability-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isCustom: false
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

  // Abrir modal de criação
  const openCreateModal = () => {
    setEditingAbility(null);
    setCustomName("");
    setCustomDescription("");
    setCustomCost("");
    setCustomPrerequisite("");
    setCustomType("ativa");
    setCustomClass("Combatente");
    setShowCustomModal(true);
  };

  // Abrir modal de edição
  const openEditModal = (ability: SelectedAbility) => {
    setEditingAbility(ability);
    setCustomName(ability.name);
    setCustomDescription(ability.description);
    setCustomCost(ability.cost || "");
    setCustomPrerequisite(ability.prerequisite || "");
    setCustomType(ability.type || "ativa");
    setCustomClass((ability.classId as any) || "Combatente");
    setShowCustomModal(true);
  };

  // Salvar habilidade customizada (criar ou editar)
  const handleSaveCustomAbility = () => {
    if (!customName.trim() || !customDescription.trim()) {
      alert("Nome e descrição são obrigatórios.");
      return;
    }

    if (editingAbility) {
      // Editar existente
      const updatedAbilities = safeAbilities.map(a => 
        a.customId === editingAbility.customId 
          ? {
              ...a,
              name: customName,
              description: customDescription,
              cost: customCost || undefined,
              prerequisite: customPrerequisite || undefined,
              type: customType,
              classId: customClass
            }
          : a
      );
      onAbilitiesChange(updatedAbilities);
    } else {
      // Criar nova
      const newAbility: SelectedAbility = {
        id: `custom-${Date.now()}`,
        customId: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: customName,
        description: customDescription,
        cost: customCost || undefined,
        prerequisite: customPrerequisite || undefined,
        type: customType,
        classId: customClass,
        isCustom: true
      };
      onAbilitiesChange([...safeAbilities, newAbility]);
    }
    setShowCustomModal(false);
    setEditingAbility(null);
  };

  const classTrails = selectedClass ? trails.filter(t => t.classId === selectedClass) : [];
  const classAbilities = selectedClass ? ABILITIES.filter(a => a.classId === selectedClass) : [];

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "10px", flexWrap: "wrap" }}>
        <h2 style={{ color: themeColor, fontSize: "1.2rem", fontWeight: "bold" }}>HABILIDADES</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={openCreateModal}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "8px 15px",
              backgroundColor: "#F59E0B",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.8rem"
            }}
          >
            <Plus size={16} /> CUSTOMIZADA
          </button>
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
            <Plus size={16} /> OFICIAL / TRILHA
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: "15px" }}>
        {safeAbilities.length === 0 && safeTrailAbilities.length === 0 && (
          <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>Nenhuma habilidade selecionada</p>
        )}

        {safeAbilities.map(ability => (
          <div key={ability.customId} style={{ backgroundColor: "#1A1A1A", border: `1px solid ${ability.isCustom ? "#F59E0B" : themeColor}`, borderRadius: "8px", padding: "15px", position: "relative" }}>
            <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "5px" }}>
              <button
                onClick={() => openEditModal(ability)}
                style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}
                title="Editar habilidade"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleRemoveAbility(ability.customId)}
                style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}
                title="Remover habilidade"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <h3 style={{ color: ability.isCustom ? "#F59E0B" : themeColor, fontSize: "1rem", marginBottom: "5px", paddingRight: "60px" }}>
              {ability.name}
              {ability.isCustom && <span style={{ marginLeft: "8px", fontSize: "0.65rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 6px", borderRadius: "4px" }}>CUSTOM</span>}
            </h3>
            {ability.prerequisite && <p style={{ color: "#FFD700", fontSize: "0.75rem", marginBottom: "5px" }}>Pré-requisito: {ability.prerequisite}</p>}
            {ability.cost && <p style={{ color: "#A0A0A0", fontSize: "0.75rem", marginBottom: "5px" }}>Custo: {ability.cost}</p>}
            <p style={{ color: "#B0B0B0", fontSize: "0.85rem", lineHeight: "1.4" }}>{ability.description}</p>
          </div>
        ))}

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

      {/* Modal de Habilidades Oficiais e Trilhas */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: `2px solid ${themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", padding: "25px", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#666", cursor: "pointer" }}>
              <X size={24} />
            </button>
            
            <h2 style={{ color: themeColor, marginBottom: "20px", fontSize: "1.2rem" }}>ADICIONAR HABILIDADE OFICIAL</h2>
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", overflowX: "auto", paddingBottom: "10px" }}>
              {(["Combatente", "Especialista", "Ocultista"] as const).map(cls => (
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
                <div style={{ display: "grid", gap: "10px", marginBottom: "20px", maxHeight: "300px", overflowY: "auto" }}>
                  {classAbilities.map(ability => (
                    <div key={ability.id} onClick={() => handleAddAbility(ability)} style={{ padding: "12px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "6px", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ color: themeColor, fontWeight: "bold", fontSize: "0.9rem" }}>{ability.name}</span>
                        {ability.type === "passiva" && <span style={{ backgroundColor: "#333", color: "#AAA", fontSize: "0.6rem", padding: "2px 5px", borderRadius: "3px" }}>PASSIVA</span>}
                      </div>
                      <div style={{ color: "#666", fontSize: "0.75rem", marginTop: "4px" }}>{ability.description.substring(0, 100)}...</div>
                    </div>
                  ))}
                </div>

                <h3 style={{ color: "#A855F7", fontSize: "0.9rem", marginTop: "20px", marginBottom: "10px" }}>TRILHAS</h3>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {classTrails.map(trail => (
                    <div key={trail.id} style={{ marginBottom: "12px" }}>
                      <div onClick={() => toggleTrailExpand(trail.id)} style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "rgba(168,85,247,0.1)", cursor: "pointer", color: "#A855F7", fontWeight: "bold", borderRadius: "4px" }}>
                        {trail.name} <ChevronDown size={16} style={{ transform: expandedTrails[trail.id] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                      </div>
                      {expandedTrails[trail.id] && (
                        <div style={{ padding: "10px", border: "1px solid rgba(168,85,247,0.2)", borderTop: "none", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}>
                          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "10px", fontStyle: "italic" }}>{trail.description}</p>
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
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Criação/Edição de Habilidade Customizada */}
      {showCustomModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: "2px solid #F59E0B", borderRadius: "12px", width: "100%", maxWidth: "500px", maxHeight: "80vh", overflowY: "auto", padding: "25px", position: "relative" }}>
            <button onClick={() => setShowCustomModal(false)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#666", cursor: "pointer" }}>
              <X size={24} />
            </button>
            
            <h2 style={{ color: "#F59E0B", marginBottom: "20px", fontSize: "1.2rem" }}>
              {editingAbility ? "EDITAR HABILIDADE" : "CRIAR HABILIDADE CUSTOMIZADA"}
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ color: "#F59E0B", fontSize: "0.8rem", marginBottom: "5px", display: "block" }}>Nome *</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  style={{ width: "100%", padding: "8px", backgroundColor: "#1A1A1A", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  placeholder="Ex: Ataque Poderoso"
                />
              </div>
              
              <div>
                <label style={{ color: "#F59E0B", fontSize: "0.8rem", marginBottom: "5px", display: "block" }}>Descrição *</label>
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  style={{ width: "100%", padding: "8px", backgroundColor: "#1A1A1A", border: "1px solid #333", color: "#fff", borderRadius: "4px", minHeight: "80px", fontFamily: "inherit" }}
                  placeholder="Descreva o efeito da habilidade..."
                />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ color: "#F59E0B", fontSize: "0.8rem", marginBottom: "5px", display: "block" }}>Custo (PE/outro)</label>
                  <input
                    type="text"
                    value={customCost}
                    onChange={(e) => setCustomCost(e.target.value)}
                    style={{ width: "100%", padding: "8px", backgroundColor: "#1A1A1A", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                    placeholder="Ex: 2 PE"
                  />
                </div>
                <div>
                  <label style={{ color: "#F59E0B", fontSize: "0.8rem", marginBottom: "5px", display: "block" }}>Pré-requisito</label>
                  <input
                    type="text"
                    value={customPrerequisite}
                    onChange={(e) => setCustomPrerequisite(e.target.value)}
                    style={{ width: "100%", padding: "8px", backgroundColor: "#1A1A1A", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                    placeholder="Ex: For 3"
                  />
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ color: "#F59E0B", fontSize: "0.8rem", marginBottom: "5px", display: "block" }}>Tipo</label>
                  <select
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as "ativa" | "passiva")}
                    style={{ width: "100%", padding: "8px", backgroundColor: "#1A1A1A", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  >
                    <option value="ativa">Ativa</option>
                    <option value="passiva">Passiva</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: "#F59E0B", fontSize: "0.8rem", marginBottom: "5px", display: "block" }}>Classe</label>
                  <select
                    value={customClass}
                    onChange={(e) => setCustomClass(e.target.value as any)}
                    style={{ width: "100%", padding: "8px", backgroundColor: "#1A1A1A", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  >
                    <option value="Combatente">Combatente</option>
                    <option value="Especialista">Especialista</option>
                    <option value="Ocultista">Ocultista</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={handleSaveCustomAbility}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#F59E0B",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {editingAbility ? "Salvar Alterações" : "Criar Habilidade"}
                </button>
                <button
                  onClick={() => setShowCustomModal(false)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "transparent",
                    border: "1px solid #F59E0B",
                    color: "#F59E0B",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}