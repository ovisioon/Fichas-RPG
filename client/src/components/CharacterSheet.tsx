// src/components/CharacterSheet.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AttributeCircle } from "./AttributeCircle";
import { AbilitiesTab } from "./AbilitiesTab";
import DefenseInventoryTab from "./DefenseInventoryTab";
import RitualsTab from "./RitualsTab";
import MagicsTab from "./MagicsTab";
import { ConditionsTab } from "./ConditionsTab";
import { Upload, Save, ArrowLeft, LogOut } from "lucide-react";
import type { Ability } from "@/data/abilities";
import { toast } from "sonner";

// Firebase
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { listFichas, updateFicha } from "../../services/fichasClient";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Elemento = "sangue" | "energia" | "morte" | "conhecimento" | "medo" | null;

interface Attributes {
  forca: number;
  destreza: number;
  intelecto: number;
  constituicao: number;
  sabedoria: number;
  carisma: number;
}

interface StatusBars {
  pvAtual: number;
  pvMax: number;
  peAtual: number;
  peMax: number;
  evAtual: number;
}

interface Skill {
  name: string;
  attr: string;
  trained: boolean;
  bonus: number;
}

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

interface CharacterSheetProps {
  characterId: string;
  onBackToSelect: () => void;
}

type ActiveTab =
  | "personagem"
  | "status"
  | "habilidades"
  | "defesa"
  | "rituais"
  | "magias"
  | "condições";

const TAB_LABELS: Record<ActiveTab, string> = {
  personagem: "Personagem",
  status: "Status & Perícias",
  habilidades: "Habilidades",
  defesa: "Defesa & Inventário",
  rituais: "Rituais",
  magias: "Magias",
  condições: "Condições",
};

const ATTR_MAP: Record<string, keyof Attributes> = {
  força: "forca",
  forca: "forca",
  destreza: "destreza",
  intelecto: "intelecto",
  inteligência: "intelecto",
  inteligencia: "intelecto",
  constituição: "constituicao",
  constituicao: "constituicao",
  sabedoria: "sabedoria",
  carisma: "carisma",
};

const SKILLS_LIST: Omit<Skill, "trained" | "bonus">[] = [
  { name: "Acrobacia", attr: "Destreza" },
  { name: "Adestramento", attr: "Carisma" },
  { name: "Artes", attr: "Carisma" },
  { name: "Atletismo", attr: "Força" },
  { name: "Atualidades", attr: "Inteligência" },
  { name: "Ciências", attr: "Inteligência" },
  { name: "Crime", attr: "Destreza" },
  { name: "Diplomacia", attr: "Carisma" },
  { name: "Enganação", attr: "Carisma" },
  { name: "Fortitude", attr: "Constituição" },
  { name: "Furtividade", attr: "Destreza" },
  { name: "Iniciativa", attr: "Destreza" },
  { name: "Intimidação", attr: "Carisma" },
  { name: "Intuição", attr: "Carisma" },
  { name: "Investigação", attr: "Inteligência" },
  { name: "Luta", attr: "Força" },
  { name: "Medicina", attr: "Inteligência" },
  { name: "Ocultismo", attr: "Inteligência" },
  { name: "Percepção", attr: "Sabedoria" },
  { name: "Pilotagem", attr: "Destreza" },
  { name: "Pontaria", attr: "Destreza" },
  { name: "Profissão", attr: "Inteligência" },
  { name: "Reflexos", attr: "Destreza" },
  { name: "Religião", attr: "Sabedoria" },
  { name: "Sobrevivência", attr: "Sabedoria" },
  { name: "Tática", attr: "Inteligência" },
  { name: "Tecnologia", attr: "Inteligência" },
  { name: "Vontade", attr: "Sabedoria" },
];

// Mapeamento de elemento para classes de borda (estáticas)
const elementoBorderClass: Record<string, string> = {
  sangue: "border-red-500",
  energia: "border-purple-500",
  morte: "border-gray-400",
  conhecimento: "border-yellow-500",
  medo: "border-white",
  default: "border-green-400",
};

// Mapeamento de elemento para cores (hex)
const elementoColorMap: Record<string, string> = {
  sangue: "#ef4444",
  energia: "#a855f7",
  morte: "#9ca3af",
  conhecimento: "#eab308",
  medo: "#ffffff",
  default: "#4ade80",
};

// Mapeamento para classes de texto (usado nas tabs)
const elementoTextClass: Record<string, string> = {
  sangue: "text-red-500",
  energia: "text-purple-500",
  morte: "text-gray-400",
  conhecimento: "text-yellow-500",
  medo: "text-white",
  default: "text-green-400",
};

// Mapeamento para classes de background (tabs ativas)
const elementoBgClass: Record<string, string> = {
  sangue: "bg-red-500",
  energia: "bg-purple-500",
  morte: "bg-gray-400",
  conhecimento: "bg-yellow-500",
  medo: "bg-white",
  default: "bg-green-400",
};

// ─── Helper Components (mantidos) ───────────────────────────────────────────────

const StatusBar = ({ label, current, max, color, onChange }: { label: string; current: number; max: number; color: string; onChange: (val: number, isMax: boolean) => void }) => {
  const safeMax = Math.max(1, max);
  const pct = Math.min((current / safeMax) * 100, 100);
  return (
    <div className="mb-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[0.78rem] font-bold tracking-wide" style={{ color }}>{label}</span>
        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/40 px-2 py-1">
          <input type="number" value={current} onChange={(e) => onChange(parseInt(e.target.value) || 0, false)} className="w-12 bg-transparent text-right text-sm text-white outline-none" />
          <span className="text-white/40">/</span>
          <input type="number" value={max} onChange={(e) => onChange(parseInt(e.target.value) || 0, true)} className="w-12 bg-transparent text-left text-sm text-white outline-none" />
        </div>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10 sm:h-3">
        <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
};

const VoidBar = ({ current, onChange }: { current: number; onChange: (val: number) => void }) => (
  <div className="mb-4">
    <div className="mb-2 flex items-center justify-between gap-2">
      <span className="text-[0.78rem] font-bold tracking-wide text-purple-400">ESFORÇO DE VAZIO</span>
      <input type="number" value={current} onChange={(e) => onChange(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right text-sm text-white outline-none" />
    </div>
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <button key={i} type="button" onClick={() => onChange(i + 1)}
          className={`h-3 rounded-sm border transition-colors sm:h-3.5 ${i < current ? "border-purple-400 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.35)]" : "border-purple-400/70 bg-black/70"}`}
          aria-label={`Esforço de vazio ${i + 1}`}
        />
      ))}
    </div>
  </div>
);

const SkillRow = ({ skill, attrValue, onToggle, onBonusChange }: { skill: Skill; attrValue: number; onToggle: () => void; onBonusChange: (val: number) => void }) => {
  const total = attrValue + (skill.trained ? 5 : 0) + skill.bonus;
  return (
    <div className="flex items-center gap-2 border-b border-white/10 px-2 py-2 last:border-b-0 sm:gap-3 sm:px-3">
      <input type="checkbox" checked={skill.trained} onChange={onToggle} className="h-4 w-4 accent-green-400" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm text-white sm:text-base">{skill.name}</div>
        <div className="text-[0.72rem] text-white/45 sm:text-xs">{skill.attr}</div>
      </div>
      <div className="flex items-center gap-1 rounded-md border border-white/10 bg-black/40 px-2 py-1">
        <span className="text-[0.72rem] text-white/50 sm:text-xs">Bônus</span>
        <input type="number" value={skill.bonus} onChange={(e) => onBonusChange(parseInt(e.target.value) || 0)} className="w-10 bg-transparent text-center text-sm text-white outline-none" />
      </div>
      <div className={`w-12 text-right text-sm font-bold sm:w-14 ${total >= 0 ? "text-green-400" : "text-red-400"}`}>
        {total >= 0 ? `+${total}` : total}
      </div>
    </div>
  );
};

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function CharacterSheet({ characterId, onBackToSelect }: CharacterSheetProps) {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("personagem");
  const [characterName, setCharacterName] = useState("Novo Personagem");
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const [elemento, setElemento] = useState<Elemento>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [attributes, setAttributes] = useState<Attributes>({
    forca: 0, destreza: 0, intelecto: 0, constituicao: 0, sabedoria: 0, carisma: 0,
  });

  const [status, setStatus] = useState<StatusBars>({
    pvAtual: 20, pvMax: 20, peAtual: 20, peMax: 20, evAtual: 0,
  });

  const [skills, setSkills] = useState<Skill[]>(
    SKILLS_LIST.map((s) => ({ ...s, trained: false, bonus: 0 }))
  );

  const [selectedAbilities, setSelectedAbilities] = useState<SelectedAbility[]>([]);
  const [selectedTrailAbilities, setSelectedTrailAbilities] = useState<SelectedTrailAbility[]>([]);
  const [defenseInventoryData, setDefenseInventoryData] = useState<any>(null);
  const [activeConditions, setActiveConditions] = useState<any[]>([]);

  const attributeGridClass = "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 place-items-center";

  // Determinar classes com base no elemento selecionado
  const elementoKey = elemento || "default";
  const borderClass = elementoBorderClass[elementoKey];
  const textClass = elementoTextClass[elementoKey];
  const bgClass = elementoBgClass[elementoKey];
  const elementColor = elementoColorMap[elementoKey];

  const panelClass = `mx-auto w-full max-w-[1200px] rounded-xl border ${borderClass} bg-[#111] p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] sm:p-5`;

  const skillAttrValue = useMemo(
    () => (attrLabel: string) => {
      const key = ATTR_MAP[attrLabel.toLowerCase()] ?? "intelecto";
      return attributes[key] ?? 0;
    },
    [attributes]
  );

  // Buscar username
  useEffect(() => {
    if (!user) return;
    const fetchUsername = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) setDisplayName(userDoc.data().username);
        else setDisplayName(user.displayName || user.email || "Usuário");
      } catch {
        setDisplayName(user.email || "Usuário");
      }
    };
    fetchUsername();
  }, [user]);

  // Carregar ficha
  useEffect(() => {
    if (!user) {
      toast.error("Usuário não autenticado");
      onBackToSelect();
      return;
    }
    const loadCharacter = async () => {
      try {
        setIsLoading(true);
        const fichas = await listFichas(user.uid);
        const ficha = fichas.find((f: any) => f.id === characterId) as any;
        if (!ficha) {
          toast.error("Ficha não encontrada");
          onBackToSelect();
          return;
        }
        const data = ficha.data || {};
        if (data.characterName) setCharacterName(data.characterName);
        if (data.attrs) setAttributes(data.attrs);
        if (data.status) setStatus(data.status);
        if (data.skills) setSkills(data.skills);
        if (data.characterImage) setCharacterImage(data.characterImage);
        if (data.elemento) setElemento(data.elemento);
        setSelectedAbilities(Array.isArray(data.selectedAbilities) ? data.selectedAbilities : []);
        setSelectedTrailAbilities(Array.isArray(data.selectedTrailAbilities) ? data.selectedTrailAbilities : []);
        setDefenseInventoryData(data.defenseInventory || null);
        setActiveConditions(Array.isArray(data.conditions) ? data.conditions : []);
      } catch (error) {
        console.error("Erro ao carregar ficha:", error);
        toast.error("Erro ao carregar dados da ficha");
      } finally {
        setIsLoading(false);
      }
    };
    loadCharacter();
  }, [characterId, user, onBackToSelect]);

  const saveToFirestore = async (data: any) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updateFicha(user.uid, characterId, data);
      toast.success("Ficha salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar ficha");
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualSave = () => {
    const dataToSave = {
      characterName,
      attrs: attributes,
      status,
      skills,
      characterImage,
      elemento,
      selectedAbilities,
      selectedTrailAbilities,
      defenseInventory: defenseInventoryData,
      conditions: activeConditions,
      lastSaved: new Date().toISOString(),
    };
    saveToFirestore(dataToSave);
  };

  useEffect(() => {
    if (isLoading) return;
    const dataToSave = {
      characterName,
      attrs: attributes,
      status,
      skills,
      characterImage,
      elemento,
      selectedAbilities,
      selectedTrailAbilities,
      defenseInventory: defenseInventoryData,
      conditions: activeConditions,
      lastSaved: new Date().toISOString(),
    };
    const timer = setTimeout(() => {
      if (user) updateFicha(user.uid, characterId, dataToSave).catch((err) => console.error("Auto-save falhou:", err));
    }, 1000);
    return () => clearTimeout(timer);
  }, [characterName, attributes, status, skills, characterImage, elemento, selectedAbilities, selectedTrailAbilities, defenseInventoryData, activeConditions, characterId, user, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCharacterImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const updateAttribute = (attr: keyof Attributes, val: number) => setAttributes(prev => ({ ...prev, [attr]: val }));
  const updateStatus = (key: keyof StatusBars, val: number) => setStatus(prev => ({ ...prev, [key]: val }));
  const toggleSkill = (index: number) => setSkills(prev => prev.map((s, i) => i === index ? { ...s, trained: !s.trained } : s));
  const updateSkillBonus = (index: number, val: number) => setSkills(prev => prev.map((s, i) => i === index ? { ...s, bonus: val } : s));

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch {
      toast.error("Erro ao sair");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-white">
        Carregando ficha...
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] px-2 py-3 text-white sm:px-4 sm:py-5 relative z-0">
      {/* Header customizado com logo "Oitavo B" glitch */}
      <div className={`mx-auto mb-3 flex w-full max-w-[1200px] flex-col gap-3 border-b ${borderClass} pb-3 sm:flex-row sm:items-center sm:justify-between`}>
        {/* Botão Voltar */}
        <button 
          onClick={onBackToSelect} 
          className={`inline-flex items-center justify-center gap-2 self-start rounded-md border ${borderClass} px-3 py-2 text-xs font-bold ${textClass} transition-transform active:scale-[0.98] sm:text-sm whitespace-nowrap`}
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        {/* Logo centralizada */}
        <h1 className="glitch-text text-center text-2xl sm:text-4xl order-first sm:order-none mb-2 sm:mb-0" data-text="OITAVO B">
          OITAVO B
        </h1>

        {/* Área do usuário e logout */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs sm:text-sm text-white/70 truncate max-w-[100px] sm:max-w-none">{displayName}</span>
          <button 
            onClick={handleLogout} 
            className="inline-flex items-center gap-1 rounded-md border border-red-400/70 px-2 py-1.5 sm:px-3 text-xs text-red-400 hover:bg-red-400/10 whitespace-nowrap"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto mb-3 w-full max-w-[1200px] overflow-x-auto pb-1">
        <div className="flex w-max gap-2 sm:w-full sm:flex-nowrap">
          {(Object.keys(TAB_LABELS) as ActiveTab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  "whitespace-nowrap rounded-md border px-3 py-2 text-[0.72rem] font-bold uppercase transition-colors sm:px-5 sm:py-3 sm:text-xs",
                  isActive
                    ? `${borderClass} ${bgClass} text-black shadow-[0_0_14px_rgba(74,222,128,0.22)]`
                    : `${borderClass} bg-[#111] ${textClass}`,
                ].join(" ")}
              >
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className={panelClass}>
        {activeTab === "personagem" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-8">
            <div className="text-center">
              <div onClick={() => fileInputRef.current?.click()} className={`flex aspect-[4/5] min-h-[260px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed ${borderClass} bg-[#050505] p-3 sm:min-h-[340px]`}>
                {characterImage ? (
                  <img src={characterImage} alt="Personagem" className="h-full w-full object-cover" />
                ) : (
                  <>
                    <Upload color={elementColor} size={48} />
                    <p className="mt-3 max-w-[260px] text-center text-[0.82rem] leading-tight sm:text-sm" style={{ color: elementColor }}>
                      Clique para fazer upload da imagem do personagem
                    </p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              <div className="mt-4">
                <label className="mb-2 block text-left text-[0.7rem] uppercase tracking-widest" style={{ color: elementColor }}>
                  Nome do personagem
                </label>
                <input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} className={`w-full rounded-lg border ${borderClass} bg-[#050505] px-3 py-3 text-base text-white outline-none placeholder:text-white/30 focus:ring-1 focus:ring-${elementoKey} sm:text-lg`} />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-left text-[0.7rem] uppercase tracking-widest" style={{ color: elementColor }}>
                  Elemento
                </label>
                <select value={elemento || ""} onChange={(e) => setElemento(e.target.value as Elemento || null)} className={`w-full rounded-lg border ${borderClass} bg-[#050505] px-3 py-3 text-base text-white outline-none sm:text-lg`}>
                  <option value="">Nenhum (Verde)</option>
                  <option value="sangue">Sangue (Vermelho)</option>
                  <option value="energia">Energia (Roxo)</option>
                  <option value="morte">Morte (Cinza)</option>
                  <option value="conhecimento">Conhecimento (Amarelo)</option>
                  <option value="medo">Medo (Branco)</option>
                </select>
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold tracking-widest sm:text-base" style={{ color: elementColor }}>
                ATRIBUTOS
              </h3>
              <div className={attributeGridClass}>
                <AttributeCircle label="FORÇA" subLabel="FOR" value={attributes.forca} onChange={(v) => updateAttribute("forca", v)} color={elementColor} />
                <AttributeCircle label="DESTREZA" subLabel="DES" value={attributes.destreza} onChange={(v) => updateAttribute("destreza", v)} color={elementColor} />
                <AttributeCircle label="INTELECTO" subLabel="INT" value={attributes.intelecto} onChange={(v) => updateAttribute("intelecto", v)} color={elementColor} />
                <AttributeCircle label="CONSTITUIÇÃO" subLabel="CON" value={attributes.constituicao} onChange={(v) => updateAttribute("constituicao", v)} color={elementColor} />
                <AttributeCircle label="SABEDORIA" subLabel="SAB" value={attributes.sabedoria} onChange={(v) => updateAttribute("sabedoria", v)} color={elementColor} />
                <AttributeCircle label="CARISMA" subLabel="CAR" value={attributes.carisma} onChange={(v) => updateAttribute("carisma", v)} color={elementColor} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "status" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
            <div>
              <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold tracking-widest sm:text-base" style={{ color: elementColor }}>
                STATUS
              </h3>
              <StatusBar label="PONTOS DE VIDA" current={status.pvAtual} max={status.pvMax} color="#EF4444" onChange={(v, isMax) => updateStatus(isMax ? "pvMax" : "pvAtual", v)} />
              <StatusBar label="PONTOS DE ESFORÇO" current={status.peAtual} max={status.peMax} color="#3B82F6" onChange={(v, isMax) => updateStatus(isMax ? "peMax" : "peAtual", v)} />
              <VoidBar current={status.evAtual} onChange={(v) => updateStatus("evAtual", v)} />
            </div>
            <div>
              <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold tracking-widest sm:text-base" style={{ color: elementColor }}>
                PERÍCIAS
              </h3>
              <div className="max-h-[520px] overflow-y-auto pr-1 sm:pr-2">
                {skills.map((skill, i) => (
                  <SkillRow key={skill.name} skill={skill} attrValue={skillAttrValue(skill.attr)} onToggle={() => toggleSkill(i)} onBonusChange={(v) => updateSkillBonus(i, v)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "habilidades" && (
          <AbilitiesTab selectedAbilities={selectedAbilities} onAbilitiesChange={setSelectedAbilities} selectedTrailAbilities={selectedTrailAbilities} onTrailAbilitiesChange={setSelectedTrailAbilities} />
        )}
        {activeTab === "defesa" && (
          <DefenseInventoryTab characterData={{ attributes: attributes as unknown as Record<string, number> }} initialData={defenseInventoryData} onUpdate={setDefenseInventoryData} />
        )}
        {activeTab === "rituais" && <RitualsTab themeColor={elementColor} />}
        {activeTab === "magias" && <MagicsTab themeColor={elementColor} />}
        {activeTab === "condições" && (
          <ConditionsTab activeConditions={activeConditions} onConditionsChange={setActiveConditions} />
        )}

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex justify-center">
            <button onClick={handleManualSave} disabled={isSaving} className="inline-flex items-center gap-2 rounded-md bg-green-400 px-5 py-3 text-sm font-bold text-black shadow-[0_0_15px_rgba(74,222,128,0.22)] transition-transform active:scale-[0.98] disabled:opacity-50 sm:px-8 sm:py-3.5 sm:text-base" style={{ backgroundColor: elementColor }}>
              <Save size={18} />
              {isSaving ? "SALVANDO..." : "SALVAR FICHA"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
