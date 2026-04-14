// client/src/components/DefenseInventoryTab.tsx
import React, { useState, useEffect } from "react";
import {
  simpleWeapons,
  heavyWeapons,
  ammunition,
  protections,
  operationalItems,
  paranormalItems,
  explosives,
  accessories,
  Weapon,
  Ammunition,
  Protection,
  OperationalItem,
  ParanormalItem,
  Explosive,
  Accessory
} from "@/data/weapons";
import { amulets, ingredients, potions, Amulet, Ingredient, Potion } from "@/data/magic";
import { Plus, Trash2, X } from "lucide-react";

// Tipos para itens selecionados
interface SelectedWeapon extends Weapon {
  instanceId: string;
}

interface SelectedAmmunition extends Ammunition {
  instanceId: string;
  quantity: number;
}

interface SelectedProtection extends Protection {
  instanceId: string;
}

interface SelectedOperationalItem extends OperationalItem {
  instanceId: string;
}

interface SelectedParanormalItem extends ParanormalItem {
  instanceId: string;
}

interface SelectedExplosive extends Explosive {
  instanceId: string;
  quantity: number;
}

interface SelectedAccessory extends Accessory {
  instanceId: string;
}

interface SelectedMagicItem {
  instanceId: string;
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
  // Estados para cada categoria
  const [weapons, setWeapons] = useState<SelectedWeapon[]>(initialData?.weapons || []);
  const [ammunitions, setAmmunitions] = useState<SelectedAmmunition[]>(initialData?.ammunitions || []);
  const [protectionsList, setProtectionsList] = useState<SelectedProtection[]>(initialData?.protections || []);
  const [operationals, setOperationals] = useState<SelectedOperationalItem[]>(initialData?.operationals || []);
  const [paranormals, setParanormals] = useState<SelectedParanormalItem[]>(initialData?.paranormals || []);
  const [explosivesList, setExplosivesList] = useState<SelectedExplosive[]>(initialData?.explosives || []);
  const [accessoriesList, setAccessoriesList] = useState<SelectedAccessory[]>(initialData?.accessories || []);
  const [magicItems, setMagicItems] = useState<SelectedMagicItem[]>(initialData?.magicItems || []);

  // Estados de UI
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [magicTab, setMagicTab] = useState<"amulet" | "ingredient" | "potion">("amulet");

  // Defesas calculadas
  const [passiveDefense, setPassiveDefense] = useState(initialData?.passiveDefense || 10);
  const [dodgeDefense, setDodgeDefense] = useState(initialData?.dodgeDefense || 10);
  const [editableDodge, setEditableDodge] = useState(false);
  const [reflexBonus, setReflexBonus] = useState(initialData?.reflexBonus || 0);
  const [resistances, setResistances] = useState<Record<string, number>>(initialData?.resistances || {});
  const [proficiencies, setProficiencies] = useState<string[]>(initialData?.proficiencies || []);

  // Efeito para sincronizar com o componente pai
  useEffect(() => {
    onUpdate({
      weapons,
      ammunitions,
      protections: protectionsList,
      operationals,
      paranormals,
      explosives: explosivesList,
      accessories: accessoriesList,
      magicItems,
      passiveDefense,
      dodgeDefense,
      reflexBonus,
      resistances,
      proficiencies
    });
  }, [weapons, ammunitions, protectionsList, operationals, paranormals, explosivesList, accessoriesList, magicItems, passiveDefense, dodgeDefense, reflexBonus, resistances, proficiencies]);

  // Cálculo automático de defesas
  useEffect(() => {
    // Passiva: 10 + Destreza (se não foi carregada do initialData)
    if (!initialData?.passiveDefense) {
      const dex = characterData.attributes.destreza || 0;
      setPassiveDefense(10 + dex);
    }
  }, [characterData.attributes.destreza, initialData]);

  useEffect(() => {
    // Se o usuário não está editando manualmente, recalcula Esquiva com bônus de proteção
    if (!editableDodge) {
      const dex = characterData.attributes.destreza || 0;
      const basePassive = 10 + dex;
      
      // Soma os bônus de defesa de todas as proteções equipadas
      const protectionBonus = protectionsList.reduce((sum, prot) => sum + (prot.defense || 0), 0);
      
      // Escudo concede +2 (se não estiver incluso no defense do item)
      const hasShield = protectionsList.some(p => p.id === "escudo");
      const shieldBonus = hasShield ? 2 : 0;
      
      const calculatedDodge = basePassive + reflexBonus + protectionBonus + shieldBonus;
      setDodgeDefense(calculatedDodge);
    }
  }, [characterData.attributes.destreza, reflexBonus, protectionsList, editableDodge]);

  // Funções para adicionar itens (geram instanceId único)
  const addWeapon = (weapon: Weapon) => {
    setWeapons([...weapons, { ...weapon, instanceId: `w-${Date.now()}-${Math.random()}` }]);
  };

  const addAmmunition = (ammo: Ammunition) => {
    setAmmunitions([...ammunitions, { ...ammo, instanceId: `a-${Date.now()}-${Math.random()}`, quantity: 1 }]);
  };

  const addProtection = (prot: Protection) => {
    // Por simplicidade, permitimos apenas uma proteção por vez (substitui)
    // Se quiser acumular várias, basta mudar para push.
    setProtectionsList([{ ...prot, instanceId: `p-${Date.now()}-${Math.random()}` }]);
  };

  const addOperational = (item: OperationalItem) => {
    setOperationals([...operationals, { ...item, instanceId: `o-${Date.now()}-${Math.random()}` }]);
  };

  const addParanormal = (item: ParanormalItem) => {
    setParanormals([...paranormals, { ...item, instanceId: `pn-${Date.now()}-${Math.random()}` }]);
  };

  const addExplosive = (exp: Explosive) => {
    setExplosivesList([...explosivesList, { ...exp, instanceId: `e-${Date.now()}-${Math.random()}`, quantity: 1 }]);
  };

  const addAccessory = (acc: Accessory) => {
    setAccessoriesList([...accessoriesList, { ...acc, instanceId: `ac-${Date.now()}-${Math.random()}` }]);
  };

  const addMagicItem = (item: Amulet | Ingredient | Potion, type: "amulet" | "ingredient" | "potion") => {
    const newItem: SelectedMagicItem = {
      instanceId: `m-${Date.now()}-${Math.random()}`,
      id: item.id,
      name: item.name,
      type,
      description: item.description,
      effect: item.effect,
      quantity: (item as any).quantity || 1
    };
    setMagicItems([...magicItems, newItem]);
  };

  // Funções de remoção
  const removeWeapon = (instanceId: string) => setWeapons(weapons.filter(w => w.instanceId !== instanceId));
  const removeAmmunition = (instanceId: string) => setAmmunitions(ammunitions.filter(a => a.instanceId !== instanceId));
  const removeProtection = (instanceId: string) => {
    setProtectionsList(protectionsList.filter(p => p.instanceId !== instanceId));
    // Ao remover proteção, se o usuário não estiver editando manualmente, o cálculo automático já atualizará
  };
  const removeOperational = (instanceId: string) => setOperationals(operationals.filter(o => o.instanceId !== instanceId));
  const removeParanormal = (instanceId: string) => setParanormals(paranormals.filter(p => p.instanceId !== instanceId));
  const removeExplosive = (instanceId: string) => setExplosivesList(explosivesList.filter(e => e.instanceId !== instanceId));
  const removeAccessory = (instanceId: string) => setAccessoriesList(accessoriesList.filter(a => a.instanceId !== instanceId));
  const removeMagicItem = (instanceId: string) => setMagicItems(magicItems.filter(m => m.instanceId !== instanceId));

  // Resistências e Proficiências
  const resistanceTypes = ["Balístico", "Corte", "Impacto", "Perfuração", "Fogo", "Frio", "Elétrico"];
  const proficiencyOptions = ["Armas Simples", "Armas Táticas", "Proteções Leves", "Proteções Pesadas"];

  const toggleResistance = (type: string) => {
    setResistances(prev => {
      const newRes = { ...prev };
      if (newRes[type]) delete newRes[type];
      else newRes[type] = 5;
      return newRes;
    });
  };

  const toggleProficiency = (prof: string) => {
    setProficiencies(prev => prev.includes(prof) ? prev.filter(p => p !== prof) : [...prev, prof]);
  };

  // Renderização de cada seção
  const renderSection = (title: string, items: any[], onAdd: () => void, renderItem: (item: any) => React.ReactNode, color: string = themeColor) => (
    <div style={{ marginBottom: "20px", border: `1px solid ${color}`, borderRadius: "8px", padding: "15px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h3 style={{ color, fontSize: "1rem", margin: 0 }}>{title} ({items.length})</h3>
        <button onClick={onAdd} style={{ backgroundColor: color, color: "#000", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>+ Adicionar</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.length === 0 && <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>Nenhum item</p>}
        {items.map(item => renderItem(item))}
      </div>
    </div>
  );

  // Modal genérico
  const renderModal = (title: string, items: any[], onSelect: (item: any) => void, onClose: () => void, renderItem?: (item: any) => React.ReactNode) => (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
      <div style={{ backgroundColor: "#111", border: `2px solid ${themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "500px", maxHeight: "70vh", overflowY: "auto", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          <h3 style={{ color: themeColor, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", cursor: "pointer" }}><X size={20} /></button>
        </div>
        <div style={{ display: "grid", gap: "8px" }}>
          {items.map(item => (
            <div key={item.id} onClick={() => { onSelect(item); onClose(); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", cursor: "pointer" }}>
              {renderItem ? renderItem(item) : (
                <>
                  <div style={{ color: themeColor, fontWeight: "bold", fontSize: "0.9rem" }}>{item.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#666" }}>{item.effect || item.description}</div>
                </>
              )}
            </div>
          ))}
          {/* Opção para remover proteção (apenas no modal de proteções) */}
          {title === "Proteções" && protectionsList.length > 0 && (
            <div 
              onClick={() => { setProtectionsList([]); onClose(); }} 
              style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #EF4444", borderRadius: "4px", cursor: "pointer", textAlign: "center", color: "#EF4444", marginTop: "8px" }}
            >
              Nenhuma (remover proteção)
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "10px", color: "#E0E0E0", fontFamily: "'Rajdhani', sans-serif" }}>
      <h2 style={{ color: themeColor, fontSize: "1.3rem", marginBottom: "15px" }}>DEFESA & INVENTÁRIO</h2>

      {/* Especificações */}
      <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "8px", padding: "15px", marginBottom: "20px" }}>
        <h3 style={{ color: themeColor, fontSize: "0.9rem", marginBottom: "10px" }}>ESPECIFICAÇÕES</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "15px" }}>
          <div>
            <div style={{ color: "#666", fontSize: "0.7rem" }}>Passiva (10 + Destreza)</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: themeColor }}>{passiveDefense}</div>
          </div>
          <div>
            <div style={{ color: "#666", fontSize: "0.7rem" }}>Esquiva (Passiva + Reflexo + Proteção)</div>
            {editableDodge ? (
              <input
                type="number"
                value={dodgeDefense}
                onChange={(e) => setDodgeDefense(parseInt(e.target.value) || 0)}
                onBlur={() => setEditableDodge(false)}
                autoFocus
                style={{ width: "80px", background: "#050505", border: "1px solid #333", color: "#fff", padding: "5px", borderRadius: "4px", fontSize: "1.5rem", fontWeight: "bold" }}
              />
            ) : (
              <div onClick={() => setEditableDodge(true)} style={{ fontSize: "1.5rem", fontWeight: "bold", color: themeColor, cursor: "pointer" }}>
                {dodgeDefense}
              </div>
            )}
          </div>
          <div>
            <div style={{ color: "#666", fontSize: "0.7rem" }}>Bônus de Reflexo</div>
            <input type="number" value={reflexBonus} onChange={e => setReflexBonus(parseInt(e.target.value) || 0)} style={{ width: "60px", background: "#050505", border: "1px solid #333", color: "#fff", padding: "5px", borderRadius: "4px" }} />
          </div>
        </div>
      </div>

      {/* Resistências */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: themeColor, fontSize: "0.9rem", marginBottom: "10px" }}>RESISTÊNCIAS</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {resistanceTypes.map(type => (
            <button key={type} onClick={() => toggleResistance(type)} style={{ padding: "6px 12px", backgroundColor: resistances[type] ? themeColor : "#1A1A1A", color: resistances[type] ? "#000" : "#666", border: `1px solid ${resistances[type] ? themeColor : "#333"}`, borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>{type}</button>
          ))}
        </div>
      </div>

      {/* Proficiências */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: themeColor, fontSize: "0.9rem", marginBottom: "10px" }}>PROFICIÊNCIAS</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {proficiencyOptions.map(prof => (
            <button key={prof} onClick={() => toggleProficiency(prof)} style={{ padding: "6px 12px", backgroundColor: proficiencies.includes(prof) ? themeColor : "#1A1A1A", color: proficiencies.includes(prof) ? "#000" : "#666", border: `1px solid ${proficiencies.includes(prof) ? themeColor : "#333"}`, borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>{prof}</button>
          ))}
        </div>
      </div>

      {/* Seções de itens */}
      {renderSection("ARMAS SIMPLES", weapons.filter(w => simpleWeapons.some(sw => sw.id === w.id)), () => setActiveModal("simpleWeapons"), (w: SelectedWeapon) => (
        <div key={w.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: themeColor, fontWeight: "bold" }}>{w.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>{w.damage} | {w.critical}</span></div>
          <button onClick={() => removeWeapon(w.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ))}

      {renderSection("ARMAS PESADAS / TÁTICAS", weapons.filter(w => heavyWeapons.some(hw => hw.id === w.id)), () => setActiveModal("heavyWeapons"), (w: SelectedWeapon) => (
        <div key={w.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: themeColor, fontWeight: "bold" }}>{w.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>{w.damage} | {w.critical}</span></div>
          <button onClick={() => removeWeapon(w.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ))}

      {renderSection("MUNIÇÕES", ammunitions, () => setActiveModal("ammunition"), (a: SelectedAmmunition) => (
        <div key={a.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: "#FBBF24", fontWeight: "bold" }}>{a.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>{a.description}</span></div>
          <button onClick={() => removeAmmunition(a.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ), "#FBBF24")}

      {renderSection("PROTEÇÕES", protectionsList, () => setActiveModal("protections"), (p: SelectedProtection) => (
        <div key={p.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: "#3B82F6", fontWeight: "bold" }}>{p.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>Defesa +{p.defense}</span></div>
          <button onClick={() => removeProtection(p.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ), "#3B82F6")}

      {renderSection("ITENS OPERACIONAIS", operationals, () => setActiveModal("operational"), (o: SelectedOperationalItem) => (
        <div key={o.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: "#10B981", fontWeight: "bold" }}>{o.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>{o.effect || o.description}</span></div>
          <button onClick={() => removeOperational(o.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ), "#10B981")}

      {renderSection("ITENS PARANORMAIS", paranormals, () => setActiveModal("paranormal"), (p: SelectedParanormalItem) => (
        <div key={p.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: "#A855F7", fontWeight: "bold" }}>{p.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>{p.effect || p.description}</span></div>
          <button onClick={() => removeParanormal(p.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ), "#A855F7")}

      {renderSection("EXPLOSIVOS", explosivesList, () => setActiveModal("explosives"), (e: SelectedExplosive) => (
        <div key={e.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: "#EF4444", fontWeight: "bold" }}>{e.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>{e.damage || e.effect}</span></div>
          <button onClick={() => removeExplosive(e.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ), "#EF4444")}

      {renderSection("ACESSÓRIOS", accessoriesList, () => setActiveModal("accessories"), (a: SelectedAccessory) => (
        <div key={a.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: "#EC4899", fontWeight: "bold" }}>{a.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>{a.effect}</span></div>
          <button onClick={() => removeAccessory(a.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ), "#EC4899")}

      {renderSection("ITENS MÁGICOS", magicItems, () => setActiveModal("magic"), (m: SelectedMagicItem) => (
        <div key={m.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px" }}>
          <div><span style={{ color: "#C084FC", fontWeight: "bold" }}>{m.name}</span> <span style={{ fontSize: "0.75rem", color: "#888" }}>{m.effect}</span></div>
          <button onClick={() => removeMagicItem(m.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
        </div>
      ), "#C084FC")}

      {/* Modais */}
      {activeModal === "simpleWeapons" && renderModal("Armas Simples", simpleWeapons, addWeapon, () => setActiveModal(null))}
      {activeModal === "heavyWeapons" && renderModal("Armas Pesadas", heavyWeapons, addWeapon, () => setActiveModal(null))}
      {activeModal === "ammunition" && renderModal("Munições", ammunition, addAmmunition, () => setActiveModal(null))}
      {activeModal === "protections" && renderModal("Proteções", protections, addProtection, () => setActiveModal(null))}
      {activeModal === "operational" && renderModal("Itens Operacionais", operationalItems, addOperational, () => setActiveModal(null))}
      {activeModal === "paranormal" && renderModal("Itens Paranormais", paranormalItems, addParanormal, () => setActiveModal(null))}
      {activeModal === "explosives" && renderModal("Explosivos", explosives, addExplosive, () => setActiveModal(null))}
      {activeModal === "accessories" && renderModal("Acessórios", accessories, addAccessory, () => setActiveModal(null))}
      {activeModal === "magic" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#111", border: "2px solid #C084FC", borderRadius: "12px", width: "100%", maxWidth: "500px", maxHeight: "70vh", overflowY: "auto", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <h3 style={{ color: "#C084FC", margin: 0 }}>Itens Mágicos</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", gap: "5px", marginBottom: "15px" }}>
              {(["amulet", "ingredient", "potion"] as const).map(tab => (
                <button key={tab} onClick={() => setMagicTab(tab)} style={{ flex: 1, padding: "8px", backgroundColor: magicTab === tab ? "#C084FC" : "#1A1A1A", color: magicTab === tab ? "#fff" : "#C084FC", border: "1px solid #C084FC", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem" }}>
                  {tab === "amulet" ? "Amuletos" : tab === "ingredient" ? "Ingredientes" : "Poções"}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gap: "8px" }}>
              {magicTab === "amulet" && amulets.map(item => (
                <div key={item.id} onClick={() => { addMagicItem(item, "amulet"); setActiveModal(null); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", cursor: "pointer" }}>
                  <div style={{ color: "#C084FC", fontWeight: "bold", fontSize: "0.9rem" }}>{item.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#666" }}>{item.effect}</div>
                </div>
              ))}
              {magicTab === "ingredient" && ingredients.map(item => (
                <div key={item.id} onClick={() => { addMagicItem(item, "ingredient"); setActiveModal(null); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", cursor: "pointer" }}>
                  <div style={{ color: "#C084FC", fontWeight: "bold", fontSize: "0.9rem" }}>{item.name} ({item.quality})</div>
                  <div style={{ fontSize: "0.75rem", color: "#666" }}>{item.effect}</div>
                </div>
              ))}
              {magicTab === "potion" && potions.map(item => (
                <div key={item.id} onClick={() => { addMagicItem(item, "potion"); setActiveModal(null); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", cursor: "pointer" }}>
                  <div style={{ color: "#C084FC", fontWeight: "bold", fontSize: "0.9rem" }}>{item.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#666" }}>{item.effect}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}