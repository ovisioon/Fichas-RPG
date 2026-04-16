import { useState } from 'react';
import { Plus, Trash2, Edit, X, Search, BookOpen } from 'lucide-react';
import { RITUALS, getRitualsByElementAndCircle, getAllElements, getCirclesByElement, Ritual } from '@/data/rituals';

interface SavedRitual {
  id: string;
  element: string;
  circle: number;
  name: string;
  content: string;
  isCustom?: boolean;
  originalRitualId?: string; // se for cópia editada de um oficial
}

interface RitualsTabProps {
  themeColor: string;
  savedRituals: SavedRitual[];
  onRitualsChange: (rituals: SavedRitual[]) => void;
}

const ELEMENTS = getAllElements();
const CIRCLES = [1, 2, 3, 4];

const elementColors: Record<string, string> = {
  'Conhecimento': '#FBBF24',
  'Energia': '#A855F7',
  'Sangue': '#7F1D1D',
  'Morte': '#6B7280',
  'Medo': '#F5F5F5',
};

export default function RitualsTab({ themeColor, savedRituals, onRitualsChange }: RitualsTabProps) {
  const [selectedElements, setSelectedElements] = useState<string[]>(['Conhecimento']);
  const [selectedCircle, setSelectedCircle] = useState<number>(1);
  const [ritualName, setRitualName] = useState('');
  const [ritualContent, setRitualContent] = useState('');
  const [expandedRitualId, setExpandedRitualId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showOfficialModal, setShowOfficialModal] = useState(false);
  const [editingRitual, setEditingRitual] = useState<SavedRitual | null>(null);
  const [officialElement, setOfficialElement] = useState('Conhecimento');
  const [officialCircle, setOfficialCircle] = useState(1);

  // Abrir modal para criar novo ritual customizado
  const openCreateModal = () => {
    setEditingRitual(null);
    setRitualName('');
    setRitualContent('');
    setSelectedElements(['Conhecimento']);
    setSelectedCircle(1);
    setShowFormModal(true);
  };

  // Abrir modal para editar ritual existente (customizado ou oficial)
  const openEditModal = (ritual: SavedRitual) => {
    setEditingRitual(ritual);
    setRitualName(ritual.name);
    setRitualContent(ritual.content);
    setSelectedElements([ritual.element]);
    setSelectedCircle(ritual.circle);
    setShowFormModal(true);
  };

  // Salvar ritual (criar ou editar)
  const handleSaveRitual = () => {
    if (!ritualName.trim() || !ritualContent.trim()) {
      alert('Por favor, preencha o nome e o conteúdo do ritual');
      return;
    }

    const element = selectedElements[0] || 'Conhecimento';

    if (editingRitual) {
      // Editar existente
      const updated = savedRituals.map(r =>
        r.id === editingRitual.id
          ? { ...r, name: ritualName, content: ritualContent, element, circle: selectedCircle }
          : r
      );
      onRitualsChange(updated);
    } else {
      // Criar novo customizado
      const newRitual: SavedRitual = {
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        element,
        circle: selectedCircle,
        name: ritualName,
        content: ritualContent,
        isCustom: true,
      };
      onRitualsChange([...savedRituals, newRitual]);
    }

    setShowFormModal(false);
    setEditingRitual(null);
  };

  // Adicionar ritual oficial à lista
  const handleAddOfficialRitual = (ritual: Ritual) => {
    // Formata o conteúdo com as versões
    let content = `**Execução:** ${ritual.execution}\n**Alcance:** ${ritual.range}\n**Alvo:** ${ritual.target}\n**Duração:** ${ritual.duration}\n**Resistência:** ${ritual.resistance}\n\n**Descrição:**\n${ritual.description}\n\n`;
    
    // Adiciona versões
    content += `**Versão Base (${ritual.versions.base.pe} PE):**\n${ritual.versions.base.description}\n`;
    if (ritual.versions.discente) {
      content += `\n**Versão Discente (${ritual.versions.discente.pe} PE):**\n${ritual.versions.discente.description}`;
      if (ritual.versions.discente.requirements) content += `\n*Requisitos: ${ritual.versions.discente.requirements}*`;
      content += '\n';
    }
    if (ritual.versions.verdadeiro) {
      content += `\n**Versão Verdadeiro (${ritual.versions.verdadeiro.pe} PE):**\n${ritual.versions.verdadeiro.description}`;
      if (ritual.versions.verdadeiro.requirements) content += `\n*Requisitos: ${ritual.versions.verdadeiro.requirements}*`;
      content += '\n';
    }

    const newRitual: SavedRitual = {
      id: `official-${ritual.id}-${Date.now()}`,
      element: ritual.element,
      circle: ritual.circle,
      name: ritual.name,
      content,
      isCustom: false,
      originalRitualId: ritual.id,
    };
    onRitualsChange([...savedRituals, newRitual]);
    setShowOfficialModal(false);
  };

  const handleRemoveRitual = (id: string) => {
    if (confirm('Tem certeza que deseja remover este ritual?')) {
      onRitualsChange(savedRituals.filter(r => r.id !== id));
      if (expandedRitualId === id) setExpandedRitualId(null);
    }
  };

  const handleLoadRitual = (ritual: SavedRitual) => {
    setSelectedElements([ritual.element]);
    setSelectedCircle(ritual.circle);
    setRitualName(ritual.name);
    setRitualContent(ritual.content);
    setExpandedRitualId(ritual.id);
  };

  const filteredRituals = savedRituals.filter(
    (r) =>
      selectedElements.includes(r.element) &&
      r.circle === selectedCircle &&
      r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRitualsCount = savedRituals.length;

  const toggleElement = (element: string) => {
    setSelectedElements((prev) =>
      prev.includes(element)
        ? prev.filter((e) => e !== element)
        : [...prev, element]
    );
  };

  const officialRituals = getRitualsByElementAndCircle(officialElement, officialCircle);

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '10px', flexWrap: 'wrap' }}>
        <h2 style={{ color: themeColor, fontSize: '1.3rem', fontWeight: 'bold', fontFamily: "'Bebas Neue', cursive", letterSpacing: '0.08em' }}>
          RITUAIS
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowOfficialModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: themeColor,
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              fontFamily: "'Bebas Neue', cursive",
              letterSpacing: '0.06em',
            }}
          >
            <BookOpen size={18} />
            RITUAIS OFICIAIS
          </button>
          <button
            onClick={openCreateModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: '#F59E0B',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              fontFamily: "'Bebas Neue', cursive",
              letterSpacing: '0.06em',
            }}
          >
            <Plus size={18} />
            CUSTOMIZADO
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '24px',
          width: '100%',
        }}
      >
        {/* LADO ESQUERDO — Lista de Rituais */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Filtros */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <div>
              <h4 style={{ color: themeColor, fontSize: '0.9rem', marginBottom: '6px' }}>Elemento</h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {ELEMENTS.map((el) => (
                  <button
                    key={el}
                    onClick={() => toggleElement(el)}
                    style={{
                      backgroundColor: selectedElements.includes(el) ? elementColors[el] : 'transparent',
                      border: `2px solid ${elementColors[el]}`,
                      borderRadius: '4px',
                      padding: '6px 12px',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      color: selectedElements.includes(el) ? '#000' : elementColors[el],
                      cursor: 'pointer',
                    }}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: themeColor, fontSize: '0.9rem', marginBottom: '6px' }}>Círculo</h4>
              <div style={{ display: 'flex', gap: '6px' }}>
                {CIRCLES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCircle(c)}
                    style={{
                      backgroundColor: selectedCircle === c ? themeColor : 'transparent',
                      border: `2px solid ${themeColor}`,
                      borderRadius: '4px',
                      padding: '6px 14px',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      color: selectedCircle === c ? '#000' : themeColor,
                      cursor: 'pointer',
                    }}
                  >
                    {c}º
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Barra de busca */}
          <input
            type="text"
            placeholder="Buscar ritual por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: '#1a1a1a',
              border: `1px solid ${themeColor}60`,
              borderRadius: '4px',
              padding: '10px 12px',
              color: '#fff',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.9rem',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />

          {/* Lista de rituais salvos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.8rem', padding: '0 4px' }}>
              <span>Rituais ({filteredRituals.length} de {totalRitualsCount})</span>
            </div>

            {filteredRituals.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                Nenhum ritual encontrado para os filtros atuais.
              </p>
            ) : (
              filteredRituals.map((ritual) => (
                <div
                  key={ritual.id}
                  style={{
                    backgroundColor: expandedRitualId === ritual.id ? `${themeColor}15` : '#1a1a1a',
                    border: `1px solid ${expandedRitualId === ritual.id ? themeColor : `${themeColor}40`}`,
                    borderRadius: '6px',
                    padding: '12px',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <button
                      onClick={() => handleLoadRitual(ritual)}
                      style={{
                        flex: 1,
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <span style={{ color: themeColor, marginRight: '8px' }}>{ritual.name}</span>
                      <span style={{ color: elementColors[ritual.element], fontSize: '0.8rem' }}>({ritual.circle}º)</span>
                      {ritual.isCustom ? (
                        <span style={{ marginLeft: '8px', fontSize: '0.6rem', backgroundColor: '#F59E0B', color: '#000', padding: '2px 5px', borderRadius: '3px' }}>
                          CUSTOM
                        </span>
                      ) : (
                        <span style={{ marginLeft: '8px', fontSize: '0.6rem', backgroundColor: '#3B82F6', color: '#fff', padding: '2px 5px', borderRadius: '3px' }}>
                          OFICIAL
                        </span>
                      )}
                    </button>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => openEditModal(ritual)}
                        style={{ background: 'none', border: 'none', color: '#3B82F6', cursor: 'pointer', padding: '4px' }}
                        title="Editar ritual"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveRitual(ritual.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                        title="Remover ritual"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {expandedRitualId === ritual.id && (
                    <div
                      style={{
                        marginTop: '12px',
                        padding: '10px',
                        backgroundColor: '#0a0a0a',
                        borderRadius: '4px',
                        borderLeft: `3px solid ${elementColors[ritual.element]}`,
                      }}
                    >
                      <div style={{ marginBottom: '8px', fontSize: '0.85rem' }}>
                        <span style={{ color: themeColor, fontWeight: 'bold' }}>Custo: </span>
                        <span style={{ color: '#FCD34D' }}>{ritual.circle} PE</span>
                      </div>
                      <p style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {ritual.content}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* LADO DIREITO — Visualização/Edição Rápida */}
        <div
          style={{
            backgroundColor: '#111',
            border: `1px solid ${themeColor}40`,
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            height: 'fit-content',
          }}
        >
          <h3 style={{ color: themeColor, fontFamily: "'Bebas Neue', cursive", fontSize: '1rem', margin: 0 }}>
            ÁREA DE EDIÇÃO RÁPIDA
          </h3>
          <p style={{ color: '#888', fontSize: '0.8rem', margin: '-8px 0 0 0' }}>
            Selecione um ritual na lista ou crie um novo para editar aqui.
          </p>

          <div>
            <label style={{ color: themeColor, fontSize: '0.8rem', marginBottom: '4px', display: 'block' }}>Nome</label>
            <input
              type="text"
              value={ritualName}
              onChange={(e) => setRitualName(e.target.value)}
              placeholder="Nome do ritual"
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#1a1a1a',
                border: `1px solid ${themeColor}60`,
                borderRadius: '4px',
                color: '#fff',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ color: themeColor, fontSize: '0.8rem', marginBottom: '4px', display: 'block' }}>Conteúdo</label>
            <textarea
              value={ritualContent}
              onChange={(e) => setRitualContent(e.target.value)}
              placeholder="Descrição completa do ritual..."
              rows={8}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#1a1a1a',
                border: `1px solid ${themeColor}60`,
                borderRadius: '4px',
                color: '#fff',
                resize: 'vertical',
                fontFamily: "'Rajdhani', sans-serif",
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSaveRitual}
              style={{
                flex: 1,
                backgroundColor: themeColor,
                color: '#000',
                padding: '10px',
                borderRadius: '4px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {editingRitual ? 'Atualizar' : 'Salvar como novo'}
            </button>
            {editingRitual && (
              <button
                onClick={() => {
                  setEditingRitual(null);
                  setRitualName('');
                  setRitualContent('');
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${themeColor}`,
                  color: themeColor,
                  padding: '10px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Criação/Edição (Customizado) */}
      {showFormModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#111', border: `2px solid ${themeColor}`, borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto', padding: '25px', position: 'relative' }}>
            <button onClick={() => setShowFormModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ color: themeColor, marginBottom: '20px' }}>{editingRitual ? 'EDITAR RITUAL' : 'NOVO RITUAL CUSTOMIZADO'}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ color: themeColor, fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Nome</label>
                <input
                  type="text"
                  value={ritualName}
                  onChange={(e) => setRitualName(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#1A1A1A', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ color: themeColor, fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Conteúdo</label>
                <textarea
                  value={ritualContent}
                  onChange={(e) => setRitualContent(e.target.value)}
                  rows={8}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#1A1A1A', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontFamily: 'inherit' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ color: themeColor, fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Elemento</label>
                  <select
                    value={selectedElements[0] || 'Conhecimento'}
                    onChange={(e) => setSelectedElements([e.target.value])}
                    style={{ width: '100%', padding: '8px', backgroundColor: '#1A1A1A', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                  >
                    {ELEMENTS.map(el => <option key={el} value={el}>{el}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ color: themeColor, fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Círculo</label>
                  <select
                    value={selectedCircle}
                    onChange={(e) => setSelectedCircle(parseInt(e.target.value))}
                    style={{ width: '100%', padding: '8px', backgroundColor: '#1A1A1A', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                  >
                    {CIRCLES.map(c => <option key={c} value={c}>{c}º</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={handleSaveRitual} style={{ flex: 1, padding: '10px', backgroundColor: themeColor, color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {editingRitual ? 'Salvar' : 'Criar'}
                </button>
                <button onClick={() => setShowFormModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: 'transparent', border: `1px solid ${themeColor}`, color: themeColor, borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Rituais Oficiais */}
      {showOfficialModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#111', border: `2px solid ${themeColor}`, borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', padding: '25px', position: 'relative' }}>
            <button onClick={() => setShowOfficialModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ color: themeColor, marginBottom: '20px' }}>RITUAIS OFICIAIS</h2>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: themeColor, fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Elemento</label>
                <select
                  value={officialElement}
                  onChange={(e) => setOfficialElement(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#1A1A1A', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                >
                  {ELEMENTS.map(el => <option key={el} value={el}>{el}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: themeColor, fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Círculo</label>
                <select
                  value={officialCircle}
                  onChange={(e) => setOfficialCircle(parseInt(e.target.value))}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#1A1A1A', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                >
                  {CIRCLES.map(c => <option key={c} value={c}>{c}º</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
              {officialRituals.length === 0 ? (
                <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>Nenhum ritual oficial encontrado para este elemento e círculo.</p>
              ) : (
                officialRituals.map(ritual => (
                  <div
                    key={ritual.id}
                    onClick={() => handleAddOfficialRitual(ritual)}
                    style={{
                      padding: '12px',
                      backgroundColor: '#1A1A1A',
                      border: `1px solid ${elementColors[ritual.element]}40`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1A1A1A'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: elementColors[ritual.element], fontWeight: 'bold', fontSize: '1rem' }}>{ritual.name}</span>
                      <span style={{ color: '#aaa', fontSize: '0.8rem' }}>{ritual.execution}</span>
                    </div>
                    <p style={{ color: '#ccc', fontSize: '0.8rem', margin: 0 }}>{ritual.description.substring(0, 120)}...</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}