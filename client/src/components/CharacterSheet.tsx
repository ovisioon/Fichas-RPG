// src/components/CharacterSheet.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AttributeCircle } from "./AttributeCircle";
import { AbilitiesTab } from "./AbilitiesTab";
import DefenseInventoryTab from "./DefenseInventoryTab";
import RitualsTab from "./RitualsTab";
import MagicsTab from "./MagicsTab";
import { ConditionsTab } from "./ConditionsTab";
import { PactosTab } from "./PactosTab";
import { InvestigacaoTab } from "./InvestigacaoTab";
import { Upload, Save, ArrowLeft, LogOut, Swords, Brain, Sparkles, Trash2 } from "lucide-react";
import type { Ability } from "@/data/abilities";
import { toast } from "sonner";

// Firebase
import { auth, db } from "../firebase";
import { signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { listFichas, updateFicha, deleteFicha, listAllFichas } from "../../services/fichasClient";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Elemento = "sangue" | "energia" | "morte" | "conhecimento" | "medo" | null;
type Classe = "combatente" | "especialista" | "ocultista" | null;

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
  evMax: number;
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

interface SelectedPacto {
  id: string;
  name: string;
  cost: string;
  description: string;
}

interface HabilidadeInvestigativa {
  id: string;
  name: string;
  cost: string;
  description: string;
}

interface SelectedArquetipo {
  id: string;
  name: string;
  description: string;
  habilidades: HabilidadeInvestigativa[];
}

interface SavedRitual {
  id: string;
  element: string;
  circle: number;
  name: string;
  content: string;
  isCustom?: boolean;
  originalRitualId?: string;
}

interface CharacterSheetProps {
  characterId: string;
  user: User;
  onBackToSelect: () => void;
}

type ActiveTab =
  | "personagem"
  | "status"
  | "habilidades"
  | "defesa"
  | "rituais"
  | "magias"
  | "condições"
  | "pactos"
  | "investigacao";

const TAB_LABELS: Record<ActiveTab, string> = {
  personagem: "Personagem",
  status: "Status & Perícias",
  habilidades: "Habilidades",
  defesa: "Defesa & Inventário",
  rituais: "Rituais",
  magias: "Magias",
  condições: "Condições",
  pactos: "Pactos",
  investigacao: "Investigação",
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
  { name: "Atualidades", attr: "Intelecto" },
  { name: "Ciências", attr: "Intelecto" },
  { name: "Crime", attr: "Destreza" },
  { name: "Diplomacia", attr: "Carisma" },
  { name: "Enganação", attr: "Carisma" },
  { name: "Fortitude", attr: "Constituicao" },
  { name: "Furtividade", attr: "Destreza" },
  { name: "Iniciativa", attr: "Destreza" },
  { name: "Intimidação", attr: "Carisma" },
  { name: "Intuição", attr: "Carisma" },
  { name: "Investigação", attr: "Intelecto" },
  { name: "Luta", attr: "Força" },
  { name: "Medicina", attr: "Intelecto" },
  { name: "Misticismo", attr: "Intelecto" },
  { name: "Ocultismo", attr: "Intelecto" },
  { name: "Percepção", attr: "Carisma" },
  { name: "Pilotagem", attr: "Destreza" },
  { name: "Pontaria", attr: "Destreza" },
  { name: "Profissão", attr: "Intelecto" },
  { name: "Reflexos", attr: "Destreza" },
  { name: "Religião", attr: "Sabedoria" },
  { name: "Sobrevivência", attr: "Intelecto" },
  { name: "Tática", attr: "Intelecto" },
  { name: "Tecnologia", attr: "Intelecto" },
  { name: "Vontade", attr: "Sabedoria" },
];

const classTrainedSkills: Record<string, string[]> = {
  combatente: ["Luta", "Pontaria", "Fortitude"],
  especialista: ["Pontaria", "Investigação"],
  ocultista: ["Misticismo", "Ocultismo"],
};

function calculateBasePV(classe: Classe, nivel: number, constituicao: number): number {
  if (!classe) return 10 + nivel * 2;
  const baseInitial: Record<string, number> = {
    combatente: 16,
    especialista: 16,
    ocultista: 13,
  };
  const perLevel: Record<string, number> = {
    combatente: 5,
    especialista: 4,
    ocultista: 4,
  };
  const initial = baseInitial[classe] + constituicao + Math.floor(nivel / 2);
  const extra = (nivel - 1) * perLevel[classe];
  return initial + extra;
}

function calculateBasePE(classe: Classe, nivel: number): number {
  if (!classe) return 10 + nivel * 2;
  const baseInitial: Record<string, number> = {
    combatente: 14,
    especialista: 15,
    ocultista: 15,
  };
  const perLevel: Record<string, number> = {
    combatente: 3,
    especialista: 3,
    ocultista: 5,
  };
  return baseInitial[classe] + (nivel - 1) * perLevel[classe];
}

const classeBorderClass: Record<string, string> = {
  combatente: "border-red-500",
  especialista: "border-blue-500",
  ocultista: "border-green-400",
  default: "border-white",
};

const classeColorMap: Record<string, string> = {
  combatente: "#ef4444",
  especialista: "#3b82f6",
  ocultista: "#4ade80",
  default: "#ffffff",
};

const classeTextClass: Record<string, string> = {
  combatente: "text-red-500",
  especialista: "text-blue-500",
  ocultista: "text-green-400",
  default: "text-white",
};

const classeBgClass: Record<string, string> = {
  combatente: "bg-red-500",
  especialista: "bg-blue-500",
  ocultista: "bg-green-400",
  default: "bg-white",
};

const classeIconMap: Record<string, React.ReactNode> = {
  combatente: <Swords size={18} />,
  especialista: <Brain size={18} />,
  ocultista: <Sparkles size={18} />,
};

// ─── Helper Components ────────────────────────────────────────────────────────

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

const VoidBar = ({ current, onChange }: { current: number; max: number; onChange: (val: number) => void }) => (
  <div className="mb-4">
    <div className="mb-2 flex items-center justify-between gap-2">
      <span className="text-[0.78rem] font-bold tracking-wide text-purple-400">ESFORÇO DE VAZIO</span>
      <input type="number" value={current} onChange={(e) => onChange(Math.min(5, Math.max(0, parseInt(e.target.value) || 0)))} className="w-12 bg-transparent text-right text-sm text-white outline-none" />
    </div>
    <div className="grid grid-cols-5 gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
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
      <div className={`w-12 text-right text-sm font-bold sm:w-14 ${total >= 0 ? "text-white" : "text-red-400"}`}>
        {total >= 0 ? `+${total}` : total}
      </div>
    </div>
  );
};

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function CharacterSheet({ characterId, user, onBackToSelect }: CharacterSheetProps) {
  const MASTER_UID = import.meta.env.VITE_MASTER_UID;
  const isMaster = user?.uid === MASTER_UID;

  const [displayName, setDisplayName] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("personagem");
  const [characterName, setCharacterName] = useState("Novo Personagem");
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const [elemento, setElemento] = useState<Elemento>(null);
  const [classe, setClasse] = useState<Classe>(null);
  const [nivel, setNivel] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [attributes, setAttributes] = useState<Attributes>({
    forca: 0, destreza: 0, intelecto: 0, constituicao: 0, sabedoria: 0, carisma: 0,
  });

  const [status, setStatus] = useState<StatusBars>({
    pvAtual: 20, pvMax: 20,
    peAtual: 20, peMax: 20,
    evAtual: 0, evMax: 5,
  });

  const defaultSkills = SKILLS_LIST.map((s) => ({ ...s, trained: false, bonus: 0 }));
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);

  const [selectedAbilities, setSelectedAbilities] = useState<SelectedAbility[]>([]);
  const [selectedTrailAbilities, setSelectedTrailAbilities] = useState<SelectedTrailAbility[]>([]);
  const [defenseInventoryData, setDefenseInventoryData] = useState<any>(null);
  const [activeConditions, setActiveConditions] = useState<any[]>([]);
  const [selectedPacto, setSelectedPacto] = useState<SelectedPacto | null>(null);
  const [selectedArquetipo, setSelectedArquetipo] = useState<SelectedArquetipo | null>(null);
  const [piAtual, setPiAtual] = useState<number>(0);
  const [piMax, setPiMax] = useState<number>(5);
  const [rituals, setRituals] = useState<SavedRitual[]>([]);

  const [usedSpaces, setUsedSpaces] = useState<number>(0);
  const maxSpaces = 15;

  const attributeGridClass = "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 place-items-center";

  const classeKey = classe || "default";
  const borderClass = classeBorderClass[classeKey];
  const textClass = classeTextClass[classeKey];
  const bgClass = classeBgClass[classeKey];
  const themeColor = classeColorMap[classeKey];

  const panelClass = `mx-auto w-full max-w-[1200px] rounded-xl border ${borderClass} bg-[#111] p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] sm:p-5`;

  const skillAttrValue = useMemo(
    () => (attrLabel: string) => {
      if (!attrLabel) return 0;
      const key = ATTR_MAP[attrLabel.toLowerCase()] ?? "intelecto";
      return attributes[key] ?? 0;
    },
    [attributes]
  );

  useEffect(() => {
    if (!classe) return;
    const trainedList = classTrainedSkills[classe] || [];
    setSkills(prev => prev.map(skill => {
      if (trainedList.includes(skill.name)) return { ...skill, trained: true };
      return skill;
    }));
  }, [classe]);

  useEffect(() => {
    if (!classe) {
      setStatus(prev => ({ ...prev, pvMax: 10 + nivel * 2, peMax: 10 + nivel * 2 }));
      return;
    }
    const newPV = calculateBasePV(classe, nivel, attributes.constituicao);
    const newPE = calculateBasePE(classe, nivel);
    setStatus(prev => ({
      ...prev,
      pvMax: newPV,
      pvAtual: Math.min(prev.pvAtual, newPV),
      peMax: newPE,
      peAtual: Math.min(prev.peAtual, newPE),
      evMax: 5,
    }));
  }, [classe, nivel, attributes.constituicao]);

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

  // Carregar ficha (mestre usa listAllFichas)
  useEffect(() => {
    if (!user) {
      toast.error("Usuário não autenticado");
      onBackToSelect();
      return;
    }

    const loadCharacter = async () => {
      try {
        setIsLoading(true);
        let ficha;
        if (isMaster) {
          const todas = await listAllFichas();
          ficha = todas.find((f: any) => f.id === characterId);
        } else {
          const fichas = await listFichas(user.uid);
          ficha = fichas.find((f: any) => f.id === characterId) as any;
        }

        if (!ficha) {
          toast.error("Ficha não encontrada ou acesso negado");
          onBackToSelect();
          return;
        }

        if (!isMaster && ficha.userId !== user.uid) {
          toast.error("Você não tem permissão para acessar esta ficha");
          onBackToSelect();
          return;
        }

        const data = ficha.data || {};
        if (data.characterName) setCharacterName(data.characterName);
        if (data.attrs) setAttributes(data.attrs);
        if (data.status) {
          setStatus({
            pvAtual: data.status.pvAtual ?? 20,
            pvMax: data.status.pvMax ?? 20,
            peAtual: data.status.peAtual ?? 20,
            peMax: data.status.peMax ?? 20,
            evAtual: data.status.evAtual ?? 0,
            evMax: 5,
          });
        }
        if (Array.isArray(data.skills) && data.skills.length === defaultSkills.length) {
          setSkills(data.skills);
        } else {
          setSkills(defaultSkills);
        }
        if (data.characterImage) setCharacterImage(data.characterImage);
        if (data.elemento) setElemento(data.elemento);
        if (data.classe) setClasse(data.classe);
        if (data.nivel) setNivel(data.nivel);
        setSelectedAbilities(Array.isArray(data.selectedAbilities) ? data.selectedAbilities : []);
        setSelectedTrailAbilities(Array.isArray(data.selectedTrailAbilities) ? data.selectedTrailAbilities : []);
        setDefenseInventoryData(data.defenseInventory || null);
        setActiveConditions(Array.isArray(data.conditions) ? data.conditions : []);
        if (data.selectedPacto) setSelectedPacto(data.selectedPacto);
        if (data.selectedArquetipo) setSelectedArquetipo(data.selectedArquetipo);
        if (data.piAtual !== undefined) setPiAtual(data.piAtual);
        if (data.piMax !== undefined) setPiMax(data.piMax);
        if (Array.isArray(data.rituals)) setRituals(data.rituals);
      } catch (error) {
        console.error("Erro ao carregar ficha:", error);
        toast.error("Erro ao carregar dados da ficha");
      } finally {
        setIsLoading(false);
      }
    };
    loadCharacter();
  }, [characterId, user, onBackToSelect, isMaster]);

  const saveToFirestore = async (data: any) => {
    if (!user) return;
    setIsSaving(true);
    try {
      let targetUserId = user.uid;
      if (isMaster) {
        const todas = await listAllFichas();
        const fichaOriginal = todas.find((f: any) => f.id === characterId) as any; // ← CORRIGIDO
        targetUserId = fichaOriginal?.userId || user.uid;
      }
      await updateFicha(targetUserId, characterId, data);
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
      classe,
      nivel,
      selectedAbilities,
      selectedTrailAbilities,
      defenseInventory: defenseInventoryData,
      conditions: activeConditions,
      selectedPacto,
      selectedArquetipo,
      piAtual,
      piMax,
      usedSpaces,
      rituals,
      lastSaved: new Date().toISOString(),
    };
    saveToFirestore(dataToSave);
  };

  const handleDeleteFicha = async () => {
    if (!user) return;
    if (!window.confirm("Tem certeza que deseja excluir permanentemente esta ficha?")) return;
    setIsDeleting(true);
    try {
      await deleteFicha(characterId);
      toast.success("Ficha excluída com sucesso!");
      onBackToSelect();
    } catch (error) {
      console.error("Erro ao excluir ficha:", error);
      toast.error("Erro ao excluir ficha");
    } finally {
      setIsDeleting(false);
    }
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
      classe,
      nivel,
      selectedAbilities,
      selectedTrailAbilities,
      defenseInventory: defenseInventoryData,
      conditions: activeConditions,
      selectedPacto,
      selectedArquetipo,
      piAtual,
      piMax,
      usedSpaces,
      rituals,
      lastSaved: new Date().toISOString(),
    };
    const timer = setTimeout(() => {
      if (user) {
        const targetUserId = isMaster ? user.uid : user.uid;
        updateFicha(targetUserId, characterId, dataToSave).catch((err) => console.error("Auto-save falhou:", err));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [characterName, attributes, status, skills, characterImage, elemento, classe, nivel, selectedAbilities, selectedTrailAbilities, defenseInventoryData, activeConditions, selectedPacto, selectedArquetipo, piAtual, piMax, usedSpaces, rituals, characterId, user, isLoading, isMaster]);

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

  const protectionBonus = defenseInventoryData?.protections?.reduce((sum: number, p: any) => sum + (p.defense || 0), 0) || 0;
  const shieldBonus = defenseInventoryData?.protections?.some((p: any) => p.id === "escudo") ? 2 : 0;
  const totalProtection = protectionBonus + shieldBonus;

  const passiveDefense = 10 + attributes.destreza + totalProtection;
  const dodgeDefense = 10 + attributes.destreza + (defenseInventoryData?.reflexBonus || 0) + totalProtection;
  const blockDefense = 10 + attributes.forca + totalProtection;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-white">
        Carregando ficha...
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] px-2 py-3 text-white sm:px-4 sm:py-5 relative z-0">
      <div className={`mx-auto mb-3 flex w-full max-w-[1200px] flex-col gap-3 border-b ${borderClass} pb-3 sm:flex-row sm:items-center sm:justify-between`}>
        <button onClick={onBackToSelect} className={`inline-flex items-center justify-center gap-2 self-start rounded-md border ${borderClass} px-3 py-2 text-xs font-bold ${textClass} transition-transform active:scale-[0.98] sm:text-sm whitespace-nowrap`}>
          <ArrowLeft size={16} /> Voltar
        </button>
        <h1 className="glitch-text text-center text-2xl sm:text-4xl order-first sm:order-none mb-2 sm:mb-0" data-text="OITAVO B">OITAVO B</h1>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs sm:text-sm text-white/70 truncate max-w-[100px] sm:max-w-none">{displayName}</span>
          <button onClick={handleLogout} className="inline-flex items-center gap-1 rounded-md border border-red-400/70 px-2 py-1.5 sm:px-3 text-xs text-red-400 hover:bg-red-400/10 whitespace-nowrap">
            <LogOut size={14} /> Sair
          </button>
        </div>
      </div>

      <div className="mx-auto mb-3 w-full max-w-[1200px]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/70">Limite de Carga</span>
          <span className="text-white font-bold">{usedSpaces} / {maxSpaces}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10">
          <div className="h-full rounded-full bg-yellow-500" style={{ width: `${Math.min((usedSpaces / maxSpaces) * 100, 100)}%` }} />
        </div>
      </div>

      <div className="mx-auto mb-3 w-full max-w-[1200px] overflow-x-auto pb-1">
        <div className="flex w-max gap-2 sm:w-full sm:flex-nowrap">
          {(Object.keys(TAB_LABELS) as ActiveTab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={["whitespace-nowrap rounded-md border px-3 py-2 text-[0.72rem] font-bold uppercase transition-colors sm:px-5 sm:py-3 sm:text-xs", isActive ? `${borderClass} ${bgClass} text-black shadow-[0_0_14px_rgba(255,255,255,0.22)]` : `${borderClass} bg-[#111] ${textClass}`].join(" ")}>
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </div>
      </div>

      <div className={panelClass}>
        {activeTab === "personagem" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-8">
            <div className="text-center">
              <div onClick={() => fileInputRef.current?.click()} className={`flex aspect-[4/5] min-h-[260px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed ${borderClass} bg-[#050505] p-3 sm:min-h-[340px]`}>
                {characterImage ? (
                  <img src={characterImage} alt="Personagem" className="h-full w-full object-cover" />
                ) : (
                  <>
                    <Upload color={themeColor} size={48} />
                    <p className="mt-3 max-w-[260px] text-center text-[0.82rem] leading-tight sm:text-sm" style={{ color: themeColor }}>
                      Clique para fazer upload da imagem do personagem
                    </p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              
              <div className="mt-4">
                <label className="mb-2 block text-left text-[0.7rem] uppercase tracking-widest" style={{ color: themeColor }}>
                  Nome do personagem
                </label>
                <input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} className={`w-full rounded-lg border ${borderClass} bg-[#050505] px-3 py-3 text-base text-white outline-none placeholder:text-white/30 focus:ring-1 focus:ring-${classeKey} sm:text-lg`} />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-left text-[0.7rem] uppercase tracking-widest" style={{ color: themeColor }}>
                  Classe
                </label>
                <div className="relative">
                  <select 
                    value={classe || ""} 
                    onChange={(e) => setClasse(e.target.value as Classe || null)} 
                    className={`w-full rounded-lg border ${borderClass} bg-[#050505] px-3 py-3 text-base text-white outline-none sm:text-lg appearance-none`}
                  >
                    <option value="">Nenhuma</option>
                    <option value="combatente">Combatente</option>
                    <option value="especialista">Especialista</option>
                    <option value="ocultista">Ocultista</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: themeColor }}>
                    {classe ? classeIconMap[classe] : <Sparkles size={18} />}
                  </div>
                </div>
                {classe && (
                  <div className="mt-2 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1" style={{ borderColor: themeColor, color: themeColor }}>
                      {classeIconMap[classe]}
                      <span className="text-xs font-semibold uppercase">{classe}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-left text-[0.7rem] uppercase tracking-widest" style={{ color: themeColor }}>
                  Nível (1-20)
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={nivel}
                  onChange={(e) => setNivel(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
                  className={`w-full rounded-lg border ${borderClass} bg-[#050505] px-3 py-3 text-base text-white outline-none sm:text-lg`}
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-left text-[0.7rem] uppercase tracking-widest text-white/70">
                  Elemento
                </label>
                <select value={elemento || ""} onChange={(e) => setElemento(e.target.value as Elemento || null)} className="w-full rounded-lg border border-white/30 bg-[#050505] px-3 py-3 text-base text-white outline-none sm:text-lg">
                  <option value="">Nenhum</option>
                  <option value="sangue">Sangue</option>
                  <option value="energia">Energia</option>
                  <option value="morte">Morte</option>
                  <option value="conhecimento">Conhecimento</option>
                  <option value="medo">Medo</option>
                </select>
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold tracking-widest sm:text-base" style={{ color: themeColor }}>
                ATRIBUTOS
              </h3>
              <div className={attributeGridClass}>
                <AttributeCircle label="FORÇA" subLabel="FOR" value={attributes.forca} onChange={(v) => updateAttribute("forca", v)} color={themeColor} />
                <AttributeCircle label="DESTREZA" subLabel="DES" value={attributes.destreza} onChange={(v) => updateAttribute("destreza", v)} color={themeColor} />
                <AttributeCircle label="INTELECTO" subLabel="INT" value={attributes.intelecto} onChange={(v) => updateAttribute("intelecto", v)} color={themeColor} />
                <AttributeCircle label="CONSTITUIÇÃO" subLabel="CON" value={attributes.constituicao} onChange={(v) => updateAttribute("constituicao", v)} color={themeColor} />
                <AttributeCircle label="SABEDORIA" subLabel="SAB" value={attributes.sabedoria} onChange={(v) => updateAttribute("sabedoria", v)} color={themeColor} />
                <AttributeCircle label="CARISMA" subLabel="CAR" value={attributes.carisma} onChange={(v) => updateAttribute("carisma", v)} color={themeColor} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "status" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
            <div>
              <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold tracking-widest sm:text-base" style={{ color: themeColor }}>
                STATUS
              </h3>
              <StatusBar label="PONTOS DE VIDA" current={status.pvAtual} max={status.pvMax} color="#EF4444" onChange={(v, isMax) => updateStatus(isMax ? "pvMax" : "pvAtual", v)} />
              <StatusBar label="PONTOS DE ESFORÇO" current={status.peAtual} max={status.peMax} color="#3B82F6" onChange={(v, isMax) => updateStatus(isMax ? "peMax" : "peAtual", v)} />
              <VoidBar current={status.evAtual} max={5} onChange={(v) => updateStatus("evAtual", v)} />
            </div>
            <div>
              <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold tracking-widest sm:text-base" style={{ color: themeColor }}>
                PERÍCIAS
              </h3>
              <div className="max-h-[520px] overflow-y-auto pr-1 sm:pr-2" style={{ minHeight: "200px" }}>
                {skills.length === 0 ? (
                  <p className="text-white/50 text-center py-4">Nenhuma perícia encontrada.</p>
                ) : (
                  skills.map((skill, i) => (
                    <SkillRow
                      key={skill.name}
                      skill={skill}
                      attrValue={skillAttrValue(skill.attr)}
                      onToggle={() => toggleSkill(i)}
                      onBonusChange={(v) => updateSkillBonus(i, v)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "habilidades" && (
          <AbilitiesTab selectedAbilities={selectedAbilities} onAbilitiesChange={setSelectedAbilities} selectedTrailAbilities={selectedTrailAbilities} onTrailAbilitiesChange={setSelectedTrailAbilities} />
        )}
        {activeTab === "defesa" && (
          <DefenseInventoryTab
            characterData={{ attributes: attributes as unknown as Record<string, number> }}
            initialData={defenseInventoryData}
            onUpdate={(data) => {
              setDefenseInventoryData(data);
              const totalSpaces = (data.weapons || []).reduce((sum: number, w: any) => sum + (w.spaces || 0) * (w.quantity || 1), 0) +
                (data.ammunitions || []).reduce((sum: number, a: any) => sum + (a.spaces || 0) * (a.quantity || 1), 0) +
                (data.protections || []).reduce((sum: number, p: any) => sum + (p.spaces || 0), 0) +
                (data.operationals || []).reduce((sum: number, o: any) => sum + (o.spaces || 0) * (o.quantity || 1), 0) +
                (data.paranormals || []).reduce((sum: number, p: any) => sum + (p.spaces || 0) * (p.quantity || 1), 0) +
                (data.explosives || []).reduce((sum: number, e: any) => sum + (e.spaces || 0) * (e.quantity || 1), 0) +
                (data.accessories || []).reduce((sum: number, a: any) => sum + (a.spaces || 0) * (a.quantity || 1), 0) +
                (data.magicItems || []).reduce((sum: number, m: any) => sum + ((m.spaces || 0) * (m.quantity || 1)), 0);
              setUsedSpaces(totalSpaces);
            }}
            passiveDefense={passiveDefense}
            dodgeDefense={dodgeDefense}
            blockDefense={blockDefense}
            themeColor={themeColor}
          />
        )}
        {activeTab === "rituais" && (
          <RitualsTab
            themeColor={themeColor}
            savedRituals={rituals}
            onRitualsChange={setRituals}
          />
        )}
        {activeTab === "magias" && <MagicsTab themeColor={themeColor} />}
        {activeTab === "condições" && (
          <ConditionsTab activeConditions={activeConditions} onConditionsChange={setActiveConditions} />
        )}
        {activeTab === "pactos" && (
          <PactosTab selectedPacto={selectedPacto} onPactoChange={setSelectedPacto} themeColor="#C084FC" />
        )}
        {activeTab === "investigacao" && (
          <InvestigacaoTab
            selectedArquetipo={selectedArquetipo}
            onArquetipoChange={setSelectedArquetipo}
            piAtual={piAtual}
            piMax={piMax}
            onPiChange={(atual, max) => { setPiAtual(atual); setPiMax(max); }}
            themeColor="#F59E0B"
          />
        )}

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex justify-center gap-4">
            <button
              onClick={handleManualSave}
              disabled={isSaving || isDeleting}
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.22)] transition-transform active:scale-[0.98] disabled:opacity-50 sm:px-8 sm:py-3.5 sm:text-base"
              style={{ backgroundColor: themeColor }}
            >
              <Save size={18} />
              {isSaving ? "SALVANDO..." : "SALVAR FICHA"}
            </button>

            <button
              onClick={handleDeleteFicha}
              disabled={isSaving || isDeleting}
              className="inline-flex items-center gap-2 rounded-md border border-red-500 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.22)] transition-transform hover:bg-red-500 hover:text-white active:scale-[0.98] disabled:opacity-50 sm:px-8 sm:py-3.5 sm:text-base"
            >
              <Trash2 size={18} />
              {isDeleting ? "EXCLUINDO..." : "EXCLUIR FICHA"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}