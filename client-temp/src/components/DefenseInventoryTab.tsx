import React, { useState, useEffect } from "react";
import { simpleWeapons, heavyWeapons, ammunition, protections, operationalItems } from "@/data/weapons";
import { amulets, ingredients, potions } from "@/data/magic";

interface SelectedWeapon {
  id: string;
  name: string;
  category: string;
  spaces: number;
  damage: string;
  critical: string;
  range?: string;
  damageType: string;
  modification?: string;
}

interface SelectedMagicItem {
  id: string;
  name: string;
  type: "amulet" | "ingredient" | "potion";
  description: string;
  effect: string;
  quantity?: number;
}

interface DefenseInventoryTabProps {
  characterData: {
    attributes: Record<string, number>;
  };
  initialData?: any;
  onUpdate: (data: any) => void;
  themeColor?: string;
}

export default function DefenseInventoryTab({ 
  characterData, 
  initialData, 
  onUpdate, 
  themeColor = "#4ADE80" 
}: DefenseInventoryTabProps) {
  const [selectedWeapons, setSelectedWeapons] = useState<SelectedWeapon[]>(initialData?.weapons || []);
  const [weaponModifications, setWeaponModifications] = useState<Record<string, string>>(initialData?.weaponModifications || {});
  const [selectedProtection, setSelectedProtection] = useState<string | null>(initialData?.protection || null);
  const [passiveDefense, setPassiveDefense] = useState(initialData?.passiveDefense || 10);
  const [dodgeDefense, setDodgeDefense] = useState(initialData?.dodgeDefense || 10);
  const [editablePassive, setEditablePassive] = useState(false);
  const [editableDodge, setEditableDodge] = useState(false);
  const [reflexBonus, setReflexBonus] = useState(initialData?.reflexBonus || 0);
  const [resistances, setResistances] = useState<Record<string, number>>(initialData?.resistances || {});
  const [proficiencies, setProficiencies] = useState<string[]>(initialData?.proficiencies || []);
  const [totalSpaces, setTotalSpaces] = useState(0);
  const [showWeaponModal, setShowWeaponModal] = useState(false);
  const [showProtectionModal, setShowProtectionModal] = useState(false);
  const [selectedMagicItems, setSelectedMagicItems] = useState<SelectedMagicItem[]>(initialData?.magicItems || []);
  const [showMagicModal, setShowMagicModal] = useState(false);
  const [magicTab, setMagicTab] = useState<"amulet" | "ingredient" | "potion">("amulet");
  const [customMagicName, setCustomMagicName] = useState("");
  const [customMagicEffect, setCustomMagicEffect] = useState("");

  // Sincronizar com o pai sempre que algo mudar
  useEffect(() => {
    onUpdate({
      weapons: selectedWeapons,
      protection: selectedProtection,
      passiveDefense,
      dodgeDefense,
      resistances,
      proficiencies,
      magicItems: selectedMagicItems,
      reflexBonus,
      weaponModifications
    });
  }, [selectedWeapons, selectedProtection, passiveDefense, dodgeDefense, resistances, proficiencies, selectedMagicItems, reflexBonus, weaponModifications]);

  // Cálculo automático de Passiva: 10 + Destreza (apenas na primeira renderização ou quando destreza muda)
  React.useEffect(() => {
    if (!editablePassive && !initialData?.passiveDefense) {
      const dexterity = characterData.attributes.destreza || 0;
      setPassiveDefense(10 + dexterity);
    }
  }, [characterData.attributes.destreza])

  // Cálculo automático de Esquiva: 10 + Destreza + Reflexo + proteção (apenas quando dependências reais mudam)
  React.useEffect(() => {
    if (!editableDodge) {
      const dexterity = characterData.attributes.destreza || 0;
      const protectionBonus = selectedProtection
        ? protections.find((p) => p.id === selectedProtection)?.defense || 0
        : 0;
      setDodgeDefense(10 + dexterity + reflexBonus + protectionBonus);
    }
  }, [characterData.attributes.destreza, reflexBonus, selectedProtection])

  // Cálculo de espaços totais
  React.useEffect(() => {
    const weaponsSpaces = selectedWeapons.reduce((sum, w) => sum + w.spaces, 0);
    const protectionSpaces = selectedProtection
      ? protections.find((p) => p.id === selectedProtection)?.spaces || 0
      : 0;
    setTotalSpaces(weaponsSpaces + protectionSpaces);
  }, [selectedWeapons, selectedProtection]);

  const handleAddWeapon = (weapon: any) => {
    const newWeapon: SelectedWeapon = {
      id: weapon.id,
      name: weapon.name,
      category: weapon.category,
      spaces: weapon.spaces,
      damage: weapon.damage,
      critical: weapon.critical,
      range: weapon.range,
      damageType: weapon.damageType,
    };
    setSelectedWeapons([...selectedWeapons, newWeapon]);
  };

  const handleRemoveWeapon = (id: string) => {
    setSelectedWeapons(selectedWeapons.filter((w) => w.id !== id));
  };

  const handleAddProtection = (protectionId: string) => {
    setSelectedProtection(protectionId);
    setShowProtectionModal(false);
  };

  const handleRemoveProtection = () => {
    setSelectedProtection(null);
  };

  const handleToggleProficiency = (proficiency: string) => {
    if (proficiencies.includes(proficiency)) {
      setProficiencies(proficiencies.filter((p) => p !== proficiency));
    } else {
      setProficiencies([...proficiencies, proficiency]);
    }
  };

  const handleRemoveProficiency = (proficiency: string) => {
    setProficiencies(proficiencies.filter((p) => p !== proficiency));
  };

  const handleAddResistance = (type: string) => {
    setResistances({
      ...resistances,
      [type]: (resistances[type] || 0) + 1,
    });
  };

  const handleRemoveResistance = (type: string) => {
    const newResistances = { ...resistances };
    delete newResistances[type];
    setResistances(newResistances);
  };

  const handleAddMagicItem = (item: any) => {
    const newItem: SelectedMagicItem = {
      id: item.id,
      name: item.name,
      type: item.type,
      description: item.description,
      effect: item.effect,
      quantity: item.quantity || 1,
    };
    setSelectedMagicItems([...selectedMagicItems, newItem]);
  };

  const handleRemoveMagicItem = (id: string) => {
    setSelectedMagicItems(selectedMagicItems.filter((item) => item.id !== id));
  };

  const handleAddCustomMagic = () => {
    if (customMagicName.trim() && customMagicEffect.trim()) {
      const newItem: SelectedMagicItem = {
        id: `custom-${Date.now()}`,
        name: customMagicName,
        type: magicTab,
        description: "Item customizado",
        effect: customMagicEffect,
      };
      setSelectedMagicItems([...selectedMagicItems, newItem]);
      setCustomMagicName("");
      setCustomMagicEffect("");
    }
  };

  const resistanceTypes = ["Balístico", "Corte", "Impacto", "Perfuração", "Fogo", "Frio", "Elétrico"];
  const proficiencyOptions = ["Armas Simples", "Armas Táticas", "Proteções Leves", "Proteções Pesadas"];

  const getMagicItemsByType = (type: "amulet" | "ingredient" | "potion") => {
    if (type === "amulet") return amulets;
    if (type === "ingredient") return ingredients;
    return potions;
  };

  return (
    <div style={{ padding: "20px", color: "#E0E0E0", fontFamily: "'Rajdhani', sans-serif" }}>
      <h2 style={{ color: themeColor, fontFamily: "'Bebas Neue', cursive", fontSize: "1.5rem", marginBottom: "20px" }}>
        DEFESA E INVENTÁRIO
      </h2>

      {/* Especificações */}
      <div style={{ marginBottom: "30px", padding: "15px", border: "2px solid #4ADE80", borderRadius: "8px" }}>
        <h3 style={{ color: themeColor, marginBottom: "15px" }}>ESPECIFICAÇÕES</h3>
        <div style={{ display: "grid", gridTemplateColumns: "clamp(1fr, 100%, 1fr 1fr)", gap: "clamp(10px, 5vw, 20px)", marginBottom: "15px" }}>
          <div>
            <div style={{ color: "#B0B0B0", fontSize: "0.9rem", marginBottom: "5px" }}>Passiva (10 + Destreza)</div>
            {editablePassive ? (
              <input
                type="number"
                value={passiveDefense}
                onChange={(e) => setPassiveDefense(Number(e.target.value))}
                onBlur={() => setEditablePassive(false)}
                style={{
                  padding: "8px",
                  backgroundColor: "#2A2A2A",
                  border: "2px solid #4ADE80",
                  color: themeColor,
                  borderRadius: "4px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  width: "100%",
                }}
                autoFocus
              />
            ) : (
              <div
                onClick={() => setEditablePassive(true)}
                style={{ color: themeColor, fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }}
              >
                {passiveDefense}
              </div>
            )}
          </div>
          <div>
            <div style={{ color: "#B0B0B0", fontSize: "0.9rem", marginBottom: "5px" }}>Esquiva (10 + Destreza + Reflexo + Proteção)</div>
            {editableDodge ? (
              <input
                type="number"
                value={dodgeDefense}
                onChange={(e) => setDodgeDefense(Number(e.target.value))}
                onBlur={() => setEditableDodge(false)}
                style={{
                  padding: "8px",
                  backgroundColor: "#2A2A2A",
                  border: "2px solid #4ADE80",
                  color: themeColor,
                  borderRadius: "4px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  width: "100%",
                }}
                autoFocus
              />
            ) : (
              <div
                onClick={() => setEditableDodge(true)}
                style={{ color: themeColor, fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }}
              >
                {dodgeDefense}
              </div>
            )}
          </div>
        </div>
        <div>
          <label style={{ color: "#B0B0B0", fontSize: "0.9rem", marginRight: "10px" }}>Bônus de Reflexo:</label>
          <input
            type="number"
            value={reflexBonus}
            onChange={(e) => setReflexBonus(Number(e.target.value))}
            style={{
              padding: "5px",
              backgroundColor: "#2A2A2A",
              border: "1px solid #4ADE80",
              color: themeColor,
              borderRadius: "4px",
              width: "80px",
            }}
          />
        </div>
      </div>

      {/* Resistências */}
      <div style={{ marginBottom: "30px", padding: "15px", border: "2px solid #4ADE80", borderRadius: "8px" }}>
        <h3 style={{ color: themeColor, marginBottom: "15px" }}>RESISTÊNCIAS</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(120px, 100%, 150px), 1fr))", gap: "clamp(8px, 3vw, 10px)" }}>
          {resistanceTypes.map((type) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <button
                onClick={() => handleAddResistance(type)}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: resistances[type] ? themeColor : "#2A2A2A",
                  border: "1px solid #4ADE80",
                  color: resistances[type] ? "#000" : themeColor,
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                {type}
              </button>
              {resistances[type] && (
                <button
                  onClick={() => handleRemoveResistance(type)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "transparent",
                    border: "1px solid #EF4444",
                    color: "#EF4444",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Proficiências */}
      <div style={{ marginBottom: "30px", padding: "15px", border: "2px solid #4ADE80", borderRadius: "8px" }}>
        <h3 style={{ color: themeColor, marginBottom: "15px" }}>PROFICIÊNCIAS</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {proficiencyOptions.map((prof) => (
            <button
              key={prof}
              onClick={() => handleToggleProficiency(prof)}
              style={{
                padding: "8px 15px",
                backgroundColor: proficiencies.includes(prof) ? themeColor : "#2A2A2A",
                color: proficiencies.includes(prof) ? "#000" : themeColor,
                border: `1px solid ${themeColor}`,
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              {prof}
            </button>
          ))}
        </div>
      </div>

      {/* Armas */}
      <div style={{ marginBottom: "30px", padding: "15px", border: "2px solid #4ADE80", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ color: themeColor, fontSize: "1rem" }}>ARMAS SELECIONADAS ({selectedWeapons.length})</h3>
          <button 
            onClick={() => setShowWeaponModal(true)} 
            style={{ 
              backgroundColor: themeColor, 
              color: "#000", 
              border: "none", 
              padding: "8px 15px", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontSize: "0.8rem", 
              fontWeight: "bold" 
            }}
          >
            + ADICIONAR ARMA
          </button>
        </div>
        <div style={{ display: "grid", gap: "10px" }}>
          {selectedWeapons.length === 0 && <p style={{ color: "#666", fontSize: "0.8rem" }}>Nenhuma arma selecionada</p>}
          {selectedWeapons.map(weapon => (
            <div key={weapon.id} style={{ backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "6px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: themeColor, fontWeight: "bold", fontSize: "0.9rem" }}>{weapon.name}</div>
                <div style={{ color: "#666", fontSize: "0.75rem" }}>Dano: {weapon.damage} | Crítico: {weapon.critical}</div>
              </div>
              <button 
                onClick={() => handleRemoveWeapon(weapon.id)} 
                style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: "1.2rem" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Proteção */}
      <div style={{ marginBottom: "30px", padding: "15px", border: "2px solid #4ADE80", borderRadius: "8px" }}>
        <h3 style={{ color: themeColor, fontSize: "1rem", marginBottom: "15px" }}>PROTEÇÃO</h3>
        <div 
          onClick={() => setShowProtectionModal(true)}
          style={{ 
            backgroundColor: "#1A1A1A", 
            border: "1px solid #333", 
            borderRadius: "6px", 
            padding: "15px", 
            cursor: "pointer", 
            textAlign: "center", 
            color: selectedProtection ? themeColor : "#666" 
          }}
        >
          {selectedProtection ? protections.find(p => p.id === selectedProtection)?.name : "+ Selecionar Proteção"}
        </div>
      </div>

      {/* Itens Mágicos */}
      <div style={{ marginBottom: "30px", padding: "15px", border: "2px solid #A855F7", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ color: "#A855F7", fontSize: "1rem" }}>INVENTÁRIO MÁGICO ({selectedMagicItems.length})</h3>
          <button 
            onClick={() => setShowMagicModal(true)} 
            style={{ 
              backgroundColor: "#A855F7", 
              color: "#fff", 
              border: "none", 
              padding: "8px 15px", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontSize: "0.8rem", 
              fontWeight: "bold" 
            }}
          >
            + Adicionar Item
          </button>
        </div>
        <div style={{ display: "grid", gap: "10px" }}>
          {selectedMagicItems.length === 0 && <p style={{ color: "#666", fontSize: "0.8rem" }}>Nenhum item mágico selecionado</p>}
          {selectedMagicItems.map(item => (
            <div key={item.id} style={{ backgroundColor: "#1A1A1A", border: "1px solid #A855F7", borderRadius: "6px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#A855F7", fontWeight: "bold", fontSize: "0.9rem" }}>{item.name}</div>
                <div style={{ color: "#666", fontSize: "0.75rem" }}>{item.effect}</div>
              </div>
              <button 
                onClick={() => handleRemoveMagicItem(item.id)} 
                style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: "1.2rem" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Armas */}
      {showWeaponModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: `2px solid ${themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", padding: "25px", position: "relative" }}>
            <button 
              onClick={() => setShowWeaponModal(false)} 
              style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1.5rem" }}
            >
              ✕
            </button>
            <h2 style={{ color: themeColor, marginBottom: "20px" }}>SELECIONAR ARMA</h2>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: themeColor, marginBottom: "10px" }}>Armas Simples</h3>
              <div style={{ display: "grid", gap: "10px" }}>
                {simpleWeapons.map(weapon => (
                  <div 
                    key={weapon.id}
                    onClick={() => { handleAddWeapon(weapon); setShowWeaponModal(false); }}
                    style={{ padding: "12px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "6px", cursor: "pointer" }}
                  >
                    <div style={{ color: themeColor, fontWeight: "bold" }}>{weapon.name}</div>
                    <div style={{ color: "#666", fontSize: "0.8rem" }}>Dano: {weapon.damage}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: themeColor, marginBottom: "10px" }}>Armas Pesadas</h3>
              <div style={{ display: "grid", gap: "10px" }}>
                {heavyWeapons.map(weapon => (
                  <div 
                    key={weapon.id}
                    onClick={() => { handleAddWeapon(weapon); setShowWeaponModal(false); }}
                    style={{ padding: "12px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "6px", cursor: "pointer" }}
                  >
                    <div style={{ color: themeColor, fontWeight: "bold" }}>{weapon.name}</div>
                    <div style={{ color: "#666", fontSize: "0.8rem" }}>Dano: {weapon.damage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Proteção */}
      {showProtectionModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: `2px solid ${themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", padding: "25px", position: "relative" }}>
            <button 
              onClick={() => setShowProtectionModal(false)} 
              style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1.5rem" }}
            >
              ✕
            </button>
            <h2 style={{ color: themeColor, marginBottom: "20px" }}>SELECIONAR PROTEÇÃO</h2>
            <div style={{ display: "grid", gap: "10px" }}>
              {protections.map(protection => (
                <div 
                  key={protection.id}
                  onClick={() => { handleAddProtection(protection.id); }}
                  style={{ padding: "12px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "6px", cursor: "pointer" }}
                >
                  <div style={{ color: themeColor, fontWeight: "bold" }}>{protection.name}</div>
                  <div style={{ color: "#666", fontSize: "0.8rem" }}>Defesa: +{protection.defense}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Itens Mágicos */}
      {showMagicModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: "2px solid #A855F7", borderRadius: "12px", width: "100%", maxWidth: "600px", maxHeight: "80vh", overflowY: "auto", padding: "25px", position: "relative" }}>
            <button 
              onClick={() => setShowMagicModal(false)} 
              style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1.5rem" }}
            >
              ✕
            </button>
            <h2 style={{ color: "#A855F7", marginBottom: "20px" }}>ADICIONAR ITEM MÁGICO</h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              {(["amulet", "ingredient", "potion"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setMagicTab(tab)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: magicTab === tab ? "#A855F7" : "#1A1A1A",
                    color: magicTab === tab ? "#fff" : "#A855F7",
                    border: "1px solid #A855F7",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {tab === "amulet" ? "Amuletos" : tab === "ingredient" ? "Ingredientes" : "Poções"}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
              {getMagicItemsByType(magicTab).map(item => (
                <div 
                  key={item.id}
                  onClick={() => { handleAddMagicItem(item); setShowMagicModal(false); }}
                  style={{ padding: "12px", backgroundColor: "#1A1A1A", border: "1px solid #A855F7", borderRadius: "6px", cursor: "pointer" }}
                >
                  <div style={{ color: "#A855F7", fontWeight: "bold" }}>{item.name}</div>
                  <div style={{ color: "#666", fontSize: "0.8rem" }}>{item.effect}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #333", paddingTop: "20px" }}>
              <h3 style={{ color: "#A855F7", marginBottom: "10px" }}>Ou Adicione um Item Customizado</h3>
              <input
                type="text"
                placeholder="Nome do item..."
                value={customMagicName}
                onChange={(e) => setCustomMagicName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #9D4EDD",
                  color: "#9D4EDD",
                  borderRadius: "4px",
                }}
              />
              <textarea
                placeholder="Efeito do item..."
                value={customMagicEffect}
                onChange={(e) => setCustomMagicEffect(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #9D4EDD",
                  color: "#9D4EDD",
                  borderRadius: "4px",
                  minHeight: "60px",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              />
              <button
                onClick={handleAddCustomMagic}
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#A855F7",
                  border: "none",
                  color: "#fff",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Adicionar Item Customizado
              </button>
            </div>

            <button
              onClick={() => setShowMagicModal(false)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "15px",
                backgroundColor: "#9D4EDD",
                border: "none",
                color: "#1A1A1A",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
