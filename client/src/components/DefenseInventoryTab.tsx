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
import { Plus, Trash2, X, Edit } from "lucide-react";

// Tipos para itens selecionados (com quantity e isCustom opcionais)
interface SelectedWeapon extends Weapon {
  instanceId: string;
  quantity?: number;
  isCustom?: boolean;
}

interface SelectedAmmunition extends Ammunition {
  instanceId: string;
  quantity: number;
  isCustom?: boolean;
}

interface SelectedProtection extends Protection {
  instanceId: string;
  quantity?: number;
  isCustom?: boolean;
}

interface SelectedOperationalItem extends OperationalItem {
  instanceId: string;
  quantity: number;
  isCustom?: boolean;
}

interface SelectedParanormalItem extends ParanormalItem {
  instanceId: string;
  quantity: number;
  isCustom?: boolean;
}

interface SelectedExplosive extends Explosive {
  instanceId: string;
  quantity: number;
  isCustom?: boolean;
}

interface SelectedAccessory extends Accessory {
  instanceId: string;
  quantity: number;
  isCustom?: boolean;
}

interface SelectedMagicItem {
  instanceId: string;
  id: string;
  name: string;
  type: "amulet" | "ingredient" | "potion";
  description: string;
  effect: string;
  quantity: number;
  isCustom?: boolean;
}

interface DefenseInventoryTabProps {
  characterData: {
    attributes: Record<string, number>;
  };
  initialData?: any;
  onUpdate: (data: any) => void;
  passiveDefense?: number;
  dodgeDefense?: number;
  blockDefense?: number;
  themeColor?: string;
}

export default function DefenseInventoryTab({
  characterData,
  initialData,
  onUpdate,
  passiveDefense = 10,
  dodgeDefense = 10,
  blockDefense = 10,
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
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editType, setEditType] = useState<string>("");

  const [reflexBonus, setReflexBonus] = useState<number>(initialData?.reflexBonus || 0);
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
      reflexBonus,
      resistances,
      proficiencies
    });
  }, [weapons, ammunitions, protectionsList, operationals, paranormals, explosivesList, accessoriesList, magicItems, reflexBonus, resistances, proficiencies]);

  // Função genérica para abrir modal de edição
  const openEditModal = (item: any, type: string) => {
    setEditingItem({ ...item }); // cópia para edição
    setEditType(type);
  };

  // Salvar edição ou criar novo item customizado
  const handleSaveItem = (updatedItem: any) => {
    if (editingItem) {
      // Edição de item existente
      const updateState = (setter: React.Dispatch<React.SetStateAction<any[]>>) => {
        setter(prev => prev.map(i => i.instanceId === editingItem.instanceId ? updatedItem : i));
      };
      switch (editType) {
        case "weapon": updateState(setWeapons); break;
        case "ammunition": updateState(setAmmunitions); break;
        case "protection": updateState(setProtectionsList); break;
        case "operational": updateState(setOperationals); break;
        case "paranormal": updateState(setParanormals); break;
        case "explosive": updateState(setExplosivesList); break;
        case "accessory": updateState(setAccessoriesList); break;
        case "magic": updateState(setMagicItems); break;
      }
    } else {
      // Criação de novo item customizado (aberto pelo botão "CRIAR")
      const newItem = {
        ...updatedItem,
        instanceId: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        isCustom: true,
        quantity: updatedItem.quantity || 1,
      };
      switch (editType) {
        case "weapon": setWeapons([...weapons, newItem]); break;
        case "ammunition": setAmmunitions([...ammunitions, newItem]); break;
        case "protection": setProtectionsList([...protectionsList, newItem]); break;
        case "operational": setOperationals([...operationals, newItem]); break;
        case "paranormal": setParanormals([...paranormals, newItem]); break;
        case "explosive": setExplosivesList([...explosivesList, newItem]); break;
        case "accessory": setAccessoriesList([...accessoriesList, newItem]); break;
        case "magic": setMagicItems([...magicItems, newItem]); break;
      }
    }
    setEditingItem(null);
    setEditType("");
  };

  // Funções para adicionar itens oficiais (mantidas)
  const addWeapon = (weapon: Weapon) => setWeapons([...weapons, { ...weapon, instanceId: `w-${Date.now()}-${Math.random()}`, quantity: 1, isCustom: false }]);
  const addAmmunition = (ammo: Ammunition) => setAmmunitions([...ammunitions, { ...ammo, instanceId: `a-${Date.now()}-${Math.random()}`, quantity: 1, isCustom: false }]);
  const addProtection = (prot: Protection) => setProtectionsList([{ ...prot, instanceId: `p-${Date.now()}-${Math.random()}`, quantity: 1, isCustom: false }]);
  const addOperational = (item: OperationalItem) => setOperationals([...operationals, { ...item, instanceId: `o-${Date.now()}-${Math.random()}`, quantity: 1, isCustom: false }]);
  const addParanormal = (item: ParanormalItem) => setParanormals([...paranormals, { ...item, instanceId: `pn-${Date.now()}-${Math.random()}`, quantity: 1, isCustom: false }]);
  const addExplosive = (exp: Explosive) => setExplosivesList([...explosivesList, { ...exp, instanceId: `e-${Date.now()}-${Math.random()}`, quantity: 1, isCustom: false }]);
  const addAccessory = (acc: Accessory) => setAccessoriesList([...accessoriesList, { ...acc, instanceId: `ac-${Date.now()}-${Math.random()}`, quantity: 1, isCustom: false }]);
  const addMagicItem = (item: Amulet | Ingredient | Potion, type: "amulet" | "ingredient" | "potion") => {
    const newItem: SelectedMagicItem = {
      instanceId: `m-${Date.now()}-${Math.random()}`,
      id: item.id,
      name: item.name,
      type,
      description: item.description,
      effect: item.effect,
      quantity: 1,
      isCustom: false,
    };
    setMagicItems([...magicItems, newItem]);
  };

  // Remoção
  const removeWeapon = (instanceId: string) => setWeapons(weapons.filter(w => w.instanceId !== instanceId));
  const removeAmmunition = (instanceId: string) => setAmmunitions(ammunitions.filter(a => a.instanceId !== instanceId));
  const removeProtection = (instanceId: string) => setProtectionsList(protectionsList.filter(p => p.instanceId !== instanceId));
  const removeOperational = (instanceId: string) => setOperationals(operationals.filter(o => o.instanceId !== instanceId));
  const removeParanormal = (instanceId: string) => setParanormals(paranormals.filter(p => p.instanceId !== instanceId));
  const removeExplosive = (instanceId: string) => setExplosivesList(explosivesList.filter(e => e.instanceId !== instanceId));
  const removeAccessory = (instanceId: string) => setAccessoriesList(accessoriesList.filter(a => a.instanceId !== instanceId));
  const removeMagicItem = (instanceId: string) => setMagicItems(magicItems.filter(m => m.instanceId !== instanceId));

  // Atualizar quantidade
  const updateItemQuantity = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    instanceId: string,
    newQuantity: number
  ) => {
    setter(prev => prev.map(item => 
      item.instanceId === instanceId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  // Resistências e Proficiências
  const resistanceTypes = ["Balístico", "Corte", "Impacto", "Perfuração", "Fogo", "Frio", "Elétrico", "Químico", "Mental", "Paranormal"];
  const proficiencyOptions = ["Armas Simples", "Armas Táticas", "Proteções Leves", "Proteções Pesadas"];

  const updateResistance = (type: string, value: number) => {
    setResistances(prev => {
      const newRes = { ...prev };
      if (value <= 0) delete newRes[type];
      else newRes[type] = value;
      return newRes;
    });
  };

  const toggleProficiency = (prof: string) => {
    setProficiencies(prev => prev.includes(prof) ? prev.filter(p => p !== prof) : [...prev, prof]);
  };

  // Renderização de seção com suporte a edição e criação customizada
  const renderSection = (
    title: string, 
    items: any[], 
    onAddOfficial: () => void,
    onCreateCustom: () => void,
    renderItem: (item: any) => React.ReactNode, 
    color: string = themeColor
  ) => (
    <div style={{ marginBottom: "20px", border: `1px solid ${color}`, borderRadius: "8px", padding: "15px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "5px" }}>
        <h3 style={{ color, fontSize: "1rem", margin: 0 }}>{title} ({items.length})</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={onAddOfficial} style={{ backgroundColor: color, color: "#000", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>+ OFICIAL</button>
          <button onClick={onCreateCustom} style={{ backgroundColor: "#F59E0B", color: "#000", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>+ CUSTOM</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.length === 0 && <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>Nenhum item</p>}
        {items.map(item => renderItem(item))}
      </div>
    </div>
  );

  // Modal de Edição/Criação Customizada
  const renderEditModal = () => {
    if (!editType) return null;
    const isCustom = editingItem?.isCustom || false;
    const title = editingItem ? `EDITAR ${editType.toUpperCase()}` : `CRIAR ${editType.toUpperCase()} CUSTOMIZADO`;
    const item = editingItem || {};
    
    const [form, setForm] = useState<any>(item);

    const handleChange = (field: string, value: any) => setForm({ ...form, [field]: value });

    const renderFields = () => {
      switch (editType) {
        case "weapon":
          return (
            <>
              <input type="text" value={form.name || ""} onChange={e => handleChange("name", e.target.value)} placeholder="Nome" style={inputStyle} />
              <input type="text" value={form.type || ""} onChange={e => handleChange("type", e.target.value)} placeholder="Tipo" style={inputStyle} />
              <input type="text" value={form.damage || ""} onChange={e => handleChange("damage", e.target.value)} placeholder="Dano" style={inputStyle} />
              <input type="text" value={form.critical || ""} onChange={e => handleChange("critical", e.target.value)} placeholder="Crítico" style={inputStyle} />
              <input type="text" value={form.range || ""} onChange={e => handleChange("range", e.target.value)} placeholder="Alcance" style={inputStyle} />
              <input type="text" value={form.damageType || ""} onChange={e => handleChange("damageType", e.target.value)} placeholder="Tipo de Dano" style={inputStyle} />
              <input type="number" value={form.spaces || 0} onChange={e => handleChange("spaces", parseInt(e.target.value))} placeholder="Espaços" style={inputStyle} />
              <textarea value={form.description || ""} onChange={e => handleChange("description", e.target.value)} placeholder="Descrição" rows={2} style={inputStyle} />
            </>
          );
        case "ammunition":
          return (
            <>
              <input type="text" value={form.name || ""} onChange={e => handleChange("name", e.target.value)} placeholder="Nome" style={inputStyle} />
              <input type="text" value={form.description || ""} onChange={e => handleChange("description", e.target.value)} placeholder="Descrição" style={inputStyle} />
              <input type="number" value={form.spaces || 0} onChange={e => handleChange("spaces", parseInt(e.target.value))} placeholder="Espaços" style={inputStyle} />
            </>
          );
        case "protection":
          return (
            <>
              <input type="text" value={form.name || ""} onChange={e => handleChange("name", e.target.value)} placeholder="Nome" style={inputStyle} />
              <input type="number" value={form.defense || 0} onChange={e => handleChange("defense", parseInt(e.target.value))} placeholder="Defesa" style={inputStyle} />
              <input type="number" value={form.spaces || 0} onChange={e => handleChange("spaces", parseInt(e.target.value))} placeholder="Espaços" style={inputStyle} />
              <textarea value={form.description || ""} onChange={e => handleChange("description", e.target.value)} placeholder="Descrição" rows={2} style={inputStyle} />
            </>
          );
        case "operational":
        case "paranormal":
        case "accessory":
          return (
            <>
              <input type="text" value={form.name || ""} onChange={e => handleChange("name", e.target.value)} placeholder="Nome" style={inputStyle} />
              <input type="text" value={form.effect || form.description || ""} onChange={e => handleChange("effect", e.target.value)} placeholder="Efeito" style={inputStyle} />
              <input type="number" value={form.spaces || 0} onChange={e => handleChange("spaces", parseInt(e.target.value))} placeholder="Espaços" style={inputStyle} />
              <textarea value={form.description || ""} onChange={e => handleChange("description", e.target.value)} placeholder="Descrição" rows={2} style={inputStyle} />
            </>
          );
        case "explosive":
          return (
            <>
              <input type="text" value={form.name || ""} onChange={e => handleChange("name", e.target.value)} placeholder="Nome" style={inputStyle} />
              <input type="text" value={form.damage || ""} onChange={e => handleChange("damage", e.target.value)} placeholder="Dano" style={inputStyle} />
              <input type="text" value={form.effect || ""} onChange={e => handleChange("effect", e.target.value)} placeholder="Efeito" style={inputStyle} />
              <input type="number" value={form.spaces || 0} onChange={e => handleChange("spaces", parseInt(e.target.value))} placeholder="Espaços" style={inputStyle} />
            </>
          );
        case "magic":
          return (
            <>
              <input type="text" value={form.name || ""} onChange={e => handleChange("name", e.target.value)} placeholder="Nome" style={inputStyle} />
              <select value={form.type || "amulet"} onChange={e => handleChange("type", e.target.value)} style={inputStyle}>
                <option value="amulet">Amuleto</option>
                <option value="ingredient">Ingrediente</option>
                <option value="potion">Poção</option>
              </select>
              <input type="text" value={form.effect || ""} onChange={e => handleChange("effect", e.target.value)} placeholder="Efeito" style={inputStyle} />
              <textarea value={form.description || ""} onChange={e => handleChange("description", e.target.value)} placeholder="Descrição" rows={2} style={inputStyle} />
            </>
          );
        default: return null;
      }
    };

    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
        <div style={{ backgroundColor: "#111", border: `2px solid ${isCustom ? "#F59E0B" : themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "500px", maxHeight: "80vh", overflowY: "auto", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <h3 style={{ color: isCustom ? "#F59E0B" : themeColor, margin: 0 }}>{title}</h3>
            <button onClick={() => { setEditingItem(null); setEditType(""); }} style={{ background: "none", border: "none", color: "#666", cursor: "pointer" }}><X size={20} /></button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {renderFields()}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => handleSaveItem(form)} style={{ flex: 1, padding: "10px", backgroundColor: isCustom ? "#F59E0B" : themeColor, color: "#000", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Salvar</button>
              <button onClick={() => { setEditingItem(null); setEditType(""); }} style={{ flex: 1, padding: "10px", backgroundColor: "transparent", border: `1px solid ${isCustom ? "#F59E0B" : themeColor}`, color: isCustom ? "#F59E0B" : themeColor, borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const inputStyle = { width: "100%", padding: "8px", backgroundColor: "#1A1A1A", border: "1px solid #333", color: "#fff", borderRadius: "4px", fontFamily: "'Rajdhani', sans-serif" };

  // Modal genérico para itens oficiais (inalterado, apenas ajustado para não conflitar)
  const renderModal = (title: string, items: any[], onSelect: (item: any) => void, onClose: () => void) => (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
      <div style={{ backgroundColor: "#111", border: `2px solid ${themeColor}`, borderRadius: "12px", width: "100%", maxWidth: "500px", maxHeight: "70vh", overflowY: "auto", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          <h3 style={{ color: themeColor, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", cursor: "pointer" }}><X size={20} /></button>
        </div>
        <div style={{ display: "grid", gap: "8px" }}>
          {items.map(item => (
            <div key={item.id} onClick={() => { onSelect(item); onClose(); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", cursor: "pointer" }}>
              <div style={{ color: themeColor, fontWeight: "bold", fontSize: "0.9rem" }}>{item.name}</div>
              <div style={{ fontSize: "0.75rem", color: "#666" }}>{item.effect || item.description}</div>
            </div>
          ))}
          {title === "Proteções" && protectionsList.length > 0 && (
            <div onClick={() => { setProtectionsList([]); onClose(); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #EF4444", borderRadius: "4px", cursor: "pointer", textAlign: "center", color: "#EF4444", marginTop: "8px" }}>
              Nenhuma (remover proteção)
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Renderização de cada tipo de item com botões de editar
  const renderWeaponItem = (w: SelectedWeapon) => (
    <div key={w.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px", border: w.isCustom ? "1px solid #F59E0B" : "none" }}>
      <div style={{ flex: 1 }}>
        <span style={{ color: w.isCustom ? "#F59E0B" : themeColor, fontWeight: "bold" }}>{w.name}</span>
        {w.isCustom && <span style={{ marginLeft: "6px", fontSize: "0.6rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 5px", borderRadius: "3px" }}>CUSTOM</span>}
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>{w.damage} | {w.critical}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" min={1} value={w.quantity || 1} onChange={(e) => updateItemQuantity(setWeapons, w.instanceId, parseInt(e.target.value) || 1)} style={{ width: "50px", background: "#050505", border: "1px solid #333", color: "#fff", padding: "4px", borderRadius: "4px", textAlign: "center" }} />
        <button onClick={() => openEditModal(w, "weapon")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}><Edit size={14} /></button>
        <button onClick={() => removeWeapon(w.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  const renderAmmunitionItem = (a: SelectedAmmunition) => (
    <div key={a.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px", border: a.isCustom ? "1px solid #F59E0B" : "none" }}>
      <div style={{ flex: 1 }}>
        <span style={{ color: a.isCustom ? "#F59E0B" : "#FBBF24", fontWeight: "bold" }}>{a.name}</span>
        {a.isCustom && <span style={{ marginLeft: "6px", fontSize: "0.6rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 5px", borderRadius: "3px" }}>CUSTOM</span>}
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>{a.description}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" min={1} value={a.quantity} onChange={(e) => updateItemQuantity(setAmmunitions, a.instanceId, parseInt(e.target.value) || 1)} style={{ width: "50px", background: "#050505", border: "1px solid #333", color: "#FBBF24", padding: "4px", borderRadius: "4px", textAlign: "center" }} />
        <button onClick={() => openEditModal(a, "ammunition")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}><Edit size={14} /></button>
        <button onClick={() => removeAmmunition(a.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  const renderProtectionItem = (p: SelectedProtection) => (
    <div key={p.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px", border: p.isCustom ? "1px solid #F59E0B" : "none" }}>
      <div>
        <span style={{ color: p.isCustom ? "#F59E0B" : "#3B82F6", fontWeight: "bold" }}>{p.name}</span>
        {p.isCustom && <span style={{ marginLeft: "6px", fontSize: "0.6rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 5px", borderRadius: "3px" }}>CUSTOM</span>}
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>Defesa +{p.defense}</span>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => openEditModal(p, "protection")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}><Edit size={14} /></button>
        <button onClick={() => removeProtection(p.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  const renderOperationalItem = (o: SelectedOperationalItem) => (
    <div key={o.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px", border: o.isCustom ? "1px solid #F59E0B" : "none" }}>
      <div style={{ flex: 1 }}>
        <span style={{ color: o.isCustom ? "#F59E0B" : "#10B981", fontWeight: "bold" }}>{o.name}</span>
        {o.isCustom && <span style={{ marginLeft: "6px", fontSize: "0.6rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 5px", borderRadius: "3px" }}>CUSTOM</span>}
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>{o.effect || o.description}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" min={1} value={o.quantity} onChange={(e) => updateItemQuantity(setOperationals, o.instanceId, parseInt(e.target.value) || 1)} style={{ width: "50px", background: "#050505", border: "1px solid #333", color: "#10B981", padding: "4px", borderRadius: "4px", textAlign: "center" }} />
        <button onClick={() => openEditModal(o, "operational")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}><Edit size={14} /></button>
        <button onClick={() => removeOperational(o.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  const renderParanormalItem = (p: SelectedParanormalItem) => (
    <div key={p.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px", border: p.isCustom ? "1px solid #F59E0B" : "none" }}>
      <div style={{ flex: 1 }}>
        <span style={{ color: p.isCustom ? "#F59E0B" : "#A855F7", fontWeight: "bold" }}>{p.name}</span>
        {p.isCustom && <span style={{ marginLeft: "6px", fontSize: "0.6rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 5px", borderRadius: "3px" }}>CUSTOM</span>}
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>{p.effect || p.description}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" min={1} value={p.quantity} onChange={(e) => updateItemQuantity(setParanormals, p.instanceId, parseInt(e.target.value) || 1)} style={{ width: "50px", background: "#050505", border: "1px solid #333", color: "#A855F7", padding: "4px", borderRadius: "4px", textAlign: "center" }} />
        <button onClick={() => openEditModal(p, "paranormal")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}><Edit size={14} /></button>
        <button onClick={() => removeParanormal(p.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  const renderExplosiveItem = (e: SelectedExplosive) => (
    <div key={e.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px", border: e.isCustom ? "1px solid #F59E0B" : "none" }}>
      <div style={{ flex: 1 }}>
        <span style={{ color: e.isCustom ? "#F59E0B" : "#EF4444", fontWeight: "bold" }}>{e.name}</span>
        {e.isCustom && <span style={{ marginLeft: "6px", fontSize: "0.6rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 5px", borderRadius: "3px" }}>CUSTOM</span>}
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>{e.damage || e.effect}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" min={1} value={e.quantity} onChange={(ev) => updateItemQuantity(setExplosivesList, e.instanceId, parseInt(ev.target.value) || 1)} style={{ width: "50px", background: "#050505", border: "1px solid #333", color: "#EF4444", padding: "4px", borderRadius: "4px", textAlign: "center" }} />
        <button onClick={() => openEditModal(e, "explosive")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}><Edit size={14} /></button>
        <button onClick={() => removeExplosive(e.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  const renderAccessoryItem = (a: SelectedAccessory) => (
    <div key={a.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px", border: a.isCustom ? "1px solid #F59E0B" : "none" }}>
      <div style={{ flex: 1 }}>
        <span style={{ color: a.isCustom ? "#F59E0B" : "#EC4899", fontWeight: "bold" }}>{a.name}</span>
        {a.isCustom && <span style={{ marginLeft: "6px", fontSize: "0.6rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 5px", borderRadius: "3px" }}>CUSTOM</span>}
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>{a.effect}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" min={1} value={a.quantity} onChange={(e) => updateItemQuantity(setAccessoriesList, a.instanceId, parseInt(e.target.value) || 1)} style={{ width: "50px", background: "#050505", border: "1px solid #333", color: "#EC4899", padding: "4px", borderRadius: "4px", textAlign: "center" }} />
        <button onClick={() => openEditModal(a, "accessory")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}><Edit size={14} /></button>
        <button onClick={() => removeAccessory(a.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  const renderMagicItem = (m: SelectedMagicItem) => (
    <div key={m.instanceId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#111", borderRadius: "4px", border: m.isCustom ? "1px solid #F59E0B" : "none" }}>
      <div style={{ flex: 1 }}>
        <span style={{ color: m.isCustom ? "#F59E0B" : "#C084FC", fontWeight: "bold" }}>{m.name}</span>
        {m.isCustom && <span style={{ marginLeft: "6px", fontSize: "0.6rem", backgroundColor: "#F59E0B", color: "#000", padding: "2px 5px", borderRadius: "3px" }}>CUSTOM</span>}
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>{m.effect}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" min={1} value={m.quantity} onChange={(e) => updateItemQuantity(setMagicItems, m.instanceId, parseInt(e.target.value) || 1)} style={{ width: "50px", background: "#050505", border: "1px solid #333", color: "#C084FC", padding: "4px", borderRadius: "4px", textAlign: "center" }} />
        <button onClick={() => openEditModal(m, "magic")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer" }}><Edit size={14} /></button>
        <button onClick={() => removeMagicItem(m.instanceId)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "10px", color: "#E0E0E0", fontFamily: "'Rajdhani', sans-serif" }}>
      <h2 style={{ color: themeColor, fontSize: "1.3rem", marginBottom: "15px" }}>DEFESA & INVENTÁRIO</h2>

      {/* Especificações */}
      <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "8px", padding: "15px", marginBottom: "20px" }}>
        <h3 style={{ color: themeColor, fontSize: "0.9rem", marginBottom: "10px" }}>ESPECIFICAÇÕES</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "15px" }}>
          <div><div style={{ color: "#666", fontSize: "0.7rem" }}>Passiva</div><div style={{ fontSize: "1.5rem", fontWeight: "bold", color: themeColor }}>{passiveDefense}</div><div style={{ fontSize: "0.65rem", color: "#888" }}>10 + Des + Prot</div></div>
          <div><div style={{ color: "#666", fontSize: "0.7rem" }}>Esquiva</div><div style={{ fontSize: "1.5rem", fontWeight: "bold", color: themeColor }}>{dodgeDefense}</div><div style={{ fontSize: "0.65rem", color: "#888" }}>10 + Des + Ref + Prot</div></div>
          <div><div style={{ color: "#666", fontSize: "0.7rem" }}>Bloqueio</div><div style={{ fontSize: "1.5rem", fontWeight: "bold", color: themeColor }}>{blockDefense}</div><div style={{ fontSize: "0.65rem", color: "#888" }}>10 + For + Prot</div></div>
          <div><div style={{ color: "#666", fontSize: "0.7rem" }}>Bônus de Reflexo</div><input type="number" value={reflexBonus} onChange={e => setReflexBonus(parseInt(e.target.value) || 0)} style={{ width: "60px", background: "#050505", border: "1px solid #333", color: "#fff", padding: "5px", borderRadius: "4px", fontSize: "1rem" }} /></div>
        </div>
      </div>

      {/* Resistências */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: themeColor, fontSize: "0.9rem", marginBottom: "10px" }}>RESISTÊNCIAS</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {resistanceTypes.map(type => {
            const value = resistances[type] || 0;
            return (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#1A1A1A", padding: "5px 10px", borderRadius: "6px", border: "1px solid #333" }}>
                <span style={{ color: value > 0 ? themeColor : "#666", fontWeight: "bold", minWidth: "80px" }}>{type}</span>
                <input type="number" min={0} value={value} onChange={(e) => updateResistance(type, parseInt(e.target.value) || 0)} style={{ width: "50px", background: "#050505", border: "1px solid #333", color: value > 0 ? themeColor : "#fff", padding: "4px", borderRadius: "4px", textAlign: "center", fontWeight: "bold" }} />
                {value > 0 && <button onClick={() => updateResistance(type, 0)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: "1rem" }}>✕</button>}
              </div>
            );
          })}
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

      {/* Seções de itens com edição */}
      {renderSection("ARMAS SIMPLES", weapons.filter(w => simpleWeapons.some(sw => sw.id === w.id) || w.isCustom), () => setActiveModal("simpleWeapons"), () => { setEditingItem(null); setEditType("weapon"); }, renderWeaponItem, themeColor)}
      {renderSection("ARMAS PESADAS / TÁTICAS", weapons.filter(w => heavyWeapons.some(hw => hw.id === w.id) || w.isCustom), () => setActiveModal("heavyWeapons"), () => { setEditingItem(null); setEditType("weapon"); }, renderWeaponItem, themeColor)}
      {renderSection("MUNIÇÕES", ammunitions, () => setActiveModal("ammunition"), () => { setEditingItem(null); setEditType("ammunition"); }, renderAmmunitionItem, "#FBBF24")}
      {renderSection("PROTEÇÕES", protectionsList, () => setActiveModal("protections"), () => { setEditingItem(null); setEditType("protection"); }, renderProtectionItem, "#3B82F6")}
      {renderSection("ITENS OPERACIONAIS", operationals, () => setActiveModal("operational"), () => { setEditingItem(null); setEditType("operational"); }, renderOperationalItem, "#10B981")}
      {renderSection("ITENS PARANORMAIS", paranormals, () => setActiveModal("paranormal"), () => { setEditingItem(null); setEditType("paranormal"); }, renderParanormalItem, "#A855F7")}
      {renderSection("EXPLOSIVOS", explosivesList, () => setActiveModal("explosives"), () => { setEditingItem(null); setEditType("explosive"); }, renderExplosiveItem, "#EF4444")}
      {renderSection("ACESSÓRIOS", accessoriesList, () => setActiveModal("accessories"), () => { setEditingItem(null); setEditType("accessory"); }, renderAccessoryItem, "#EC4899")}
      {renderSection("ITENS MÁGICOS", magicItems, () => setActiveModal("magic"), () => { setEditingItem(null); setEditType("magic"); }, renderMagicItem, "#C084FC")}

      {/* Modais oficiais */}
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
              {magicTab === "amulet" && amulets.map(item => (<div key={item.id} onClick={() => { addMagicItem(item, "amulet"); setActiveModal(null); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", cursor: "pointer" }}><div style={{ color: "#C084FC", fontWeight: "bold", fontSize: "0.9rem" }}>{item.name}</div><div style={{ fontSize: "0.75rem", color: "#666" }}>{item.effect}</div></div>))}
              {magicTab === "ingredient" && ingredients.map(item => (<div key={item.id} onClick={() => { addMagicItem(item, "ingredient"); setActiveModal(null); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", cursor: "pointer" }}><div style={{ color: "#C084FC", fontWeight: "bold", fontSize: "0.9rem" }}>{item.name} ({item.quality})</div><div style={{ fontSize: "0.75rem", color: "#666" }}>{item.effect}</div></div>))}
              {magicTab === "potion" && potions.map(item => (<div key={item.id} onClick={() => { addMagicItem(item, "potion"); setActiveModal(null); }} style={{ padding: "10px", backgroundColor: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", cursor: "pointer" }}><div style={{ color: "#C084FC", fontWeight: "bold", fontSize: "0.9rem" }}>{item.name}</div><div style={{ fontSize: "0.75rem", color: "#666" }}>{item.effect}</div></div>))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição/Criação Customizada */}
      {editType && renderEditModal()}
    </div>
  );
}
