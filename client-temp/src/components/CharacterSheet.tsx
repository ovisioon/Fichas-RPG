import { useState, useRef, useEffect } from "react";
import { AttributeCircle } from "./AttributeCircle";
import { SparkleCircle } from "./SparkleCircle";
import { AbilitiesTab } from "./AbilitiesTab";
import DefenseInventoryTab from "./DefenseInventoryTab";
import RitualsTab from "./RitualsTab";
import MagicsTab from "./MagicsTab";
import { ConditionsTab } from "./ConditionsTab";
import { Upload, ChevronDown, Save, ArrowLeft } from "lucide-react";
import type { Ability } from "@/data/abilities";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Helper Components ────────────────────────────────────────────────────────

const StatusBar = ({ 
  label, 
  current, 
  max, 
  color, 
  onChange 
}: { 
  label: string; 
  current: number; 
  max: number; 
  color: string; 
  onChange: (val: number, isMax: boolean) => void;
}) => (
  <div style={{ marginBottom: "15px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
      <span style={{ color, fontWeight: "bold", fontSize: "0.8rem" }}>{label}</span>
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <input
          type="number"
          value={current}
          onChange={(e) => onChange(parseInt(e.target.value) || 0, false)}
          style={{ width: "40px", background: "none", border: "none", color: "#fff", textAlign: "right", fontSize: "0.9rem" }}
        />
        <span style={{ color: "#666" }}>/</span>
        <input
          type="number"
          value={max}
          onChange={(e) => onChange(parseInt(e.target.value) || 0, true)}
          style={{ width: "40px", background: "none", border: "none", color: "#fff", textAlign: "left", fontSize: "0.9rem" }}
        />
      </div>
    </div>
    <div style={{ height: "8px", background: "#222", borderRadius: "4px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.min((current / max) * 100, 100)}%`, background: color, transition: "width 0.3s" }} />
    </div>
  </div>
);

const VoidBar = ({ current, onChange }: { current: number; onChange: (val: number) => void }) => (
  <div style={{ marginBottom: "15px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
      <span style={{ color: "#A855F7", fontWeight: "bold", fontSize: "0.8rem" }}>ESFORÇO DE VAZIO</span>
      <input
        type="number"
        value={current}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        style={{ width: "40px", background: "none", border: "none", color: "#fff", textAlign: "right", fontSize: "0.9rem" }}
      />
    </div>
    <div style={{ display: "flex", gap: "4px" }}>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          onClick={() => onChange(i + 1)}
          style={{
            flex: 1,
            height: "12px",
            background: i < current ? "#A855F7" : "#222",
            border: "1px solid #A855F7",
            cursor: "pointer",
            borderRadius: "2px"
          }}
        />
      ))}
    </div>
  </div>
);

const SkillRow = ({ 
  skill, 
  attrValue, 
  onToggle, 
  onBonusChange 
}: { 
  skill: Skill; 
  attrValue: number; 
  onToggle: () => void; 
  onBonusChange: (val: number) => void;
}) => {
  const total = attrValue + (skill.trained ? 5 : 0) + skill.bonus;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", borderBottom: "1px solid #222" }}>
      <input type="checkbox" checked={skill.trained} onChange={onToggle} style={{ accentColor: "#4ADE80" }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "0.9rem", color: "#fff" }}>{skill.name}</div>
        <div style={{ fontSize: "0.7rem", color: "#666" }}>{skill.attr}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span style={{ color: "#666", fontSize: "0.8rem" }}>Bônus:</span>
        <input
          type="number"
          value={skill.bonus}
          onChange={(e) => onBonusChange(parseInt(e.target.value) || 0)}
          style={{ width: "35px", background: "#111", border: "1px solid #333", color: "#fff", fontSize: "0.8rem", textAlign: "center" }}
        />
      </div>
      <div style={{ width: "30px", textAlign: "right", fontWeight: "bold", color: "#4ADE80" }}>
        {total >= 0 ? `+${total}` : total}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function CharacterSheet({ characterId, onBackToSelect }: CharacterSheetProps) {
  const [activeTab, setActiveTab] = useState("personagem");
  const [characterName, setCharacterName] = useState("Novo Personagem");
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [attributes, setAttributes] = useState<Attributes>({
    forca: 0, destreza: 0, intelecto: 0, constituicao: 0, sabedoria: 0, carisma: 0
  });

  const [status, setStatus] = useState<StatusBars>({
    pvAtual: 20, pvMax: 20, peAtual: 20, peMax: 20, evAtual: 0
  });

  const [skills, setSkills] = useState<Skill[]>(
    SKILLS_LIST.map(s => ({ ...s, trained: false, bonus: 0 }))
  );

  const [selectedAbilities, setSelectedAbilities] = useState<SelectedAbility[]>([]);
  const [selectedTrailAbilities, setSelectedTrailAbilities] = useState<SelectedTrailAbility[]>([]);
  const [defenseInventoryData, setDefenseInventoryData] = useState<any>(null);
  const [activeConditions, setActiveConditions] = useState<string[]>([]);

  // Carregar dados do personagem específico
  useEffect(() => {
    const saved = localStorage.getItem(`character_${characterId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        
        if (data.characterName) setCharacterName(data.characterName);
        if (data.attrs) setAttributes(data.attrs);
        if (data.status) setStatus(data.status);
        if (data.skills) setSkills(data.skills);
        if (data.characterImage) setCharacterImage(data.characterImage);
        
        setSelectedAbilities(Array.isArray(data.selectedAbilities) ? data.selectedAbilities : []);
        setSelectedTrailAbilities(Array.isArray(data.selectedTrailAbilities) ? data.selectedTrailAbilities : []);
        setDefenseInventoryData(data.defenseInventory || null);
        setActiveConditions(Array.isArray(data.conditions) ? data.conditions : []);
        
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
        toast.error("Erro ao carregar dados do personagem");
      }
    }
  }, [characterId]);

  // Função de salvamento automático - CORRIGIDA para salvar trilhas roxas
  const saveCharacterData = () => {
    const dataToSave = {
      characterName,
      attrs: attributes,
      status,
      skills,
      characterImage,
      selectedAbilities: Array.isArray(selectedAbilities) ? selectedAbilities : [],
      selectedTrailAbilities: Array.isArray(selectedTrailAbilities) ? selectedTrailAbilities : [],
      defenseInventory: defenseInventoryData,
      conditions: Array.isArray(activeConditions) ? activeConditions : [],
      createdAt: localStorage.getItem(`character_${characterId}_createdAt`) || new Date().toISOString(),
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem(`character_${characterId}`, JSON.stringify(dataToSave));
  };

  // Função de salvamento manual
  const handleManualSave = () => {
    saveCharacterData();
    toast.success("Ficha salva com sucesso!");
  };

  // Salvar automaticamente quando as habilidades mudam
  useEffect(() => {
    saveCharacterData();
  }, [selectedAbilities, selectedTrailAbilities]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setCharacterImage(imageData);
        // Salvar imagem imediatamente
        const dataToSave = {
          characterName,
          attrs: attributes,
          status,
          skills,
          characterImage: imageData,
          selectedAbilities: Array.isArray(selectedAbilities) ? selectedAbilities : [],
          selectedTrailAbilities: Array.isArray(selectedTrailAbilities) ? selectedTrailAbilities : [],
          defenseInventory: defenseInventoryData,
          conditions: Array.isArray(activeConditions) ? activeConditions : [],
          createdAt: localStorage.getItem(`character_${characterId}_createdAt`) || new Date().toISOString(),
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem(`character_${characterId}`, JSON.stringify(dataToSave));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAttribute = (attr: keyof Attributes, val: number) => {
    setAttributes(prev => ({ ...prev, [attr]: val }));
  };

  const updateStatus = (key: keyof StatusBars, val: number) => {
    setStatus(prev => ({ ...prev, [key]: val }));
  };

  const toggleSkill = (index: number) => {
    setSkills(prev => prev.map((s, i) => i === index ? { ...s, trained: !s.trained } : s));
  };

  const updateSkillBonus = (index: number, val: number) => {
    setSkills(prev => prev.map((s, i) => i === index ? { ...s, bonus: val } : s));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", color: "#fff", fontFamily: "'Rajdhani', sans-serif", padding: "20px" }}>
      {/* Header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", borderBottom: "2px solid #4ADE80", paddingBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={onBackToSelect}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "8px 15px",
            backgroundColor: "transparent",
            color: "#4ADE80",
            border: "1px solid #4ADE80",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.8rem"
          }}
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", letterSpacing: "2px", color: "#4ADE80" }}>FICHA DE PERSONAGEM</h1>
        </div>
        <div style={{ width: "100px" }} />
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "5px", marginBottom: "20px", overflowX: "auto", paddingBottom: "5px" }}>
        {["personagem", "status", "habilidades", "defesa", "rituais", "magias", "condições"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === tab ? "#4ADE80" : "#111",
              color: activeTab === tab ? "#000" : "#4ADE80",
              border: "1px solid #4ADE80",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              whiteSpace: "nowrap"
            }}
          >
            {tab === "status" ? "Status & Perícias" : tab === "defesa" ? "Defesa & Inventário" : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: "#111", borderRadius: "8px", padding: "20px", border: "1px solid #222", position: "relative" }}>
        
        {activeTab === "personagem" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            <div style={{ textAlign: "center" }}>
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#050505", border: "2px dashed #4ADE80", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", overflow: "hidden", position: "relative" }}
              >
                {characterImage ? (
                  <img src={characterImage} alt="Personagem" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <Upload color="#4ADE80" size={48} />
                    <p style={{ color: "#4ADE80", marginTop: "10px", fontSize: "0.8rem" }}>Clique para fazer upload da imagem do personagem</p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: "none" }} accept="image/*" />
              <div style={{ marginTop: "20px" }}>
                <label style={{ display: "block", color: "#4ADE80", fontSize: "0.7rem", textAlign: "left", marginBottom: "5px" }}>NOME DO PERSONAGEM</label>
                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => {
                    setCharacterName(e.target.value);
                    // Salvar nome imediatamente
                    const dataToSave = {
                      characterName: e.target.value,
                      attrs: attributes,
                      status,
                      skills,
                      characterImage,
                      selectedAbilities: Array.isArray(selectedAbilities) ? selectedAbilities : [],
                      selectedTrailAbilities: Array.isArray(selectedTrailAbilities) ? selectedTrailAbilities : [],
                      defenseInventory: defenseInventoryData,
                      conditions: Array.isArray(activeConditions) ? activeConditions : [],
                      createdAt: localStorage.getItem(`character_${characterId}_createdAt`) || new Date().toISOString(),
                      lastSaved: new Date().toISOString()
                    };
                    localStorage.setItem(`character_${characterId}`, JSON.stringify(dataToSave));
                  }}
                  style={{ width: "100%", background: "#050505", border: "1px solid #4ADE80", padding: "10px", color: "#fff", borderRadius: "4px", fontSize: "1.1rem" }}
                />
              </div>
            </div>

            <div>
              <h3 style={{ color: "#4ADE80", marginBottom: "20px", fontSize: "1rem", borderBottom: "1px solid #222", paddingBottom: "5px" }}>ATRIBUTOS</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                <AttributeCircle label="FORÇA" value={attributes.forca} onChange={(v) => updateAttribute("forca", v)} color="#4ADE80" />
                <AttributeCircle label="DESTREZA" value={attributes.destreza} onChange={(v) => updateAttribute("destreza", v)} color="#4ADE80" />
                <AttributeCircle label="INTELECTO" value={attributes.intelecto} onChange={(v) => updateAttribute("intelecto", v)} color="#4ADE80" />
                <AttributeCircle label="CONSTITUIÇÃO" value={attributes.constituicao} onChange={(v) => updateAttribute("constituicao", v)} color="#4ADE80" />
                <AttributeCircle label="SABEDORIA" value={attributes.sabedoria} onChange={(v) => updateAttribute("sabedoria", v)} color="#4ADE80" />
                <AttributeCircle label="CARISMA" value={attributes.carisma} onChange={(v) => updateAttribute("carisma", v)} color="#4ADE80" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "status" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
            <div>
              <h3 style={{ color: "#4ADE80", marginBottom: "20px", fontSize: "1rem", borderBottom: "1px solid #222", paddingBottom: "5px" }}>STATUS</h3>
              <StatusBar label="PONTOS DE VIDA" current={status.pvAtual} max={status.pvMax} color="#EF4444" onChange={(v, isMax) => updateStatus(isMax ? "pvMax" : "pvAtual", v)} />
              <StatusBar label="PONTOS DE ESFORÇO" current={status.peAtual} max={status.peMax} color="#3B82F6" onChange={(v, isMax) => updateStatus(isMax ? "peMax" : "peAtual", v)} />
              <VoidBar current={status.evAtual} onChange={(v) => updateStatus("evAtual", v)} />
            </div>
            <div>
              <h3 style={{ color: "#4ADE80", marginBottom: "20px", fontSize: "1rem", borderBottom: "1px solid #222", paddingBottom: "5px" }}>PERÍCIAS</h3>
              <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
                {skills.map((skill, i) => (
                  <SkillRow 
                    key={skill.name} 
                    skill={skill} 
                    attrValue={attributes[skill.attr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") as keyof Attributes] || 0} 
                    onToggle={() => toggleSkill(i)}
                    onBonusChange={(v) => updateSkillBonus(i, v)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "habilidades" && (
          <AbilitiesTab 
            selectedAbilities={selectedAbilities || []} 
            onAbilitiesChange={setSelectedAbilities}
            selectedTrailAbilities={selectedTrailAbilities || []}
            onTrailAbilitiesChange={setSelectedTrailAbilities}
          />
        )}

        {activeTab === "defesa" && (
          <DefenseInventoryTab 
            characterData={{ attributes }} 
            initialData={defenseInventoryData}
            onUpdate={(data) => {
              setDefenseInventoryData(data);
            }} 
          />
        )}

        {activeTab === "rituais" && <RitualsTab />}
        {activeTab === "magias" && <MagicsTab />}
        {activeTab === "condições" && <ConditionsTab activeConditions={activeConditions || []} onConditionsChange={setActiveConditions} />}

        {/* Botão de Salvar Global */}
        <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #222", display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleManualSave}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 30px",
              backgroundColor: "#4ADE80",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 0 15px rgba(74, 222, 128, 0.3)",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <Save size={20} />
            SALVAR FICHA
          </button>
        </div>
      </div>
    </div>
  );
}
