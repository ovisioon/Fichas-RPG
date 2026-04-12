import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface SavedRitual {
  id: string;
  element: string;
  circle: number;
  name: string;
  content: string;
}

interface RitualsTabProps {
  themeColor: string;
}

const ELEMENTS = ['Conhecimento', 'Energia', 'Sangue', 'Morte', 'Medo'];
const CIRCLES = [1, 2, 3, 4];

const elementColors: Record<string, string> = {
  'Conhecimento': '#FBBF24',
  'Energia': '#A855F7',
  'Sangue': '#7F1D1D',
  'Morte': '#6B7280',
  'Medo': '#F5F5F5',
};

export default function RitualsTab({ themeColor }: RitualsTabProps) {
  const [selectedElements, setSelectedElements] = useState<string[]>(['Conhecimento']);
  const [selectedCircle, setSelectedCircle] = useState<number>(1);
  const [ritualName, setRitualName] = useState('');
  const [ritualContent, setRitualContent] = useState('');
  const [savedRituals, setSavedRituals] = useState<SavedRitual[]>([]);
  const [expandedRitualId, setExpandedRitualId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar rituais do localStorage ao montar o componente
  useEffect(() => {
    const stored = localStorage.getItem('rpg-rituais');
    if (stored) {
      try {
        setSavedRituals(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao carregar rituais:', e);
      }
    }
  }, []);

  // Salvar rituais no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem('rpg-rituais', JSON.stringify(savedRituals));
  }, [savedRituals]);

  const handleSaveRitual = () => {
    if (!ritualName.trim() || !ritualContent.trim()) {
      alert('Por favor, preencha o nome e o conteúdo do ritual');
      return;
    }

    const newRitual: SavedRitual = {
      id: Date.now().toString(),
      element: selectedElements[0] || 'Conhecimento',
      circle: selectedCircle,
      name: ritualName,
      content: ritualContent,
    };

    setSavedRituals([...savedRituals, newRitual]);
    setRitualName('');
    setRitualContent('');
  };

  const handleRemoveRitual = (id: string) => {
    setSavedRituals(savedRituals.filter((r) => r.id !== id));
    if (expandedRitualId === id) {
      setExpandedRitualId(null);
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

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(100%, calc(100% - 380px), 1fr) clamp(280px, 100%, 350px)',
        gap: 'clamp(12px, 3vw, 24px)',
        padding: 'clamp(12px, 3vw, 20px)',
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          LADO ESQUERDO — Área de Cola/Salva
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* SELETOR DE ELEMENTO */}
        <div>
          <h3
            style={{
              color: themeColor,
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '1rem',
              letterSpacing: '0.08em',
              marginBottom: '8px',
            }}
          >
            ELEMENTO
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '6px' }}>
            {ELEMENTS.map((element) => (
              <button
                key={element}
                onClick={() => toggleElement(element)}
                style={{
                  backgroundColor:
                    selectedElements.includes(element) ? elementColors[element] : 'transparent',
                  borderColor: elementColors[element],
                  borderWidth: '2px',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  color: selectedElements.includes(element) ? '#000' : elementColors[element],
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {element}
              </button>
            ))}
          </div>
        </div>

        {/* SELETOR DE CÍRCULO */}
        <div>
          <h3
            style={{
              color: themeColor,
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '1rem',
              letterSpacing: '0.08em',
              marginBottom: '8px',
            }}
          >
            CÍRCULO
          </h3>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {CIRCLES.map((circle) => (
              <button
                key={circle}
                onClick={() => setSelectedCircle(circle)}
                style={{
                  backgroundColor: selectedCircle === circle ? themeColor : 'transparent',
                  borderColor: themeColor,
                  borderWidth: '2px',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  color: selectedCircle === circle ? '#000' : themeColor,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {circle}º
              </button>
            ))}
          </div>
        </div>

        {/* CAMPO DE NOME DO RITUAL */}
        <div>
          <label
            style={{
              display: 'block',
              color: themeColor,
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '0.95rem',
              letterSpacing: '0.06em',
              marginBottom: '8px',
            }}
          >
            NOME DO RITUAL
          </label>
          <input
            type="text"
            value={ritualName}
            onChange={(e) => setRitualName(e.target.value)}
            placeholder="Ex: Compreensão Paranormal"
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#1a1a1a',
              borderWidth: '2px',
              borderColor: `${themeColor}60`,
              borderRadius: '4px',
              color: '#fff',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.95rem',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = themeColor)}
            onBlur={(e) => (e.target.style.borderColor = `${themeColor}60`)}
          />
        </div>

        {/* TEXTAREA PARA COLAR RITUAL */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label
            style={{
              color: themeColor,
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '0.95rem',
              letterSpacing: '0.06em',
              marginBottom: '8px',
            }}
          >
            CONTEÚDO DO RITUAL
          </label>
          <textarea
            value={ritualContent}
            onChange={(e) => setRitualContent(e.target.value)}
            placeholder="Cole aqui o texto do ritual do seu livro. Você pode editar livremente..."
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#1a1a1a',
              borderWidth: '2px',
              borderColor: `${themeColor}60`,
              borderRadius: '4px',
              color: '#fff',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.9rem',
              resize: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease',
              minHeight: '400px',
            }}
            onFocus={(e) => (e.target.style.borderColor = themeColor)}
            onBlur={(e) => (e.target.style.borderColor = `${themeColor}60`)}
          />
        </div>

        {/* BOTÃO SALVAR */}
        <button
          onClick={handleSaveRitual}
          style={{
            backgroundColor: themeColor,
            color: '#000',
            padding: '12px 20px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '1rem',
            fontFamily: "'Bebas Neue', cursive",
            letterSpacing: '0.06em',
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <Plus size={20} />
          SALVAR RITUAL
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          LADO DIREITO — Rituais Salvos
          ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxHeight: 'clamp(300px, 60vh, 600px)',
          overflowY: 'auto',
          minWidth: 'clamp(200px, 100%, 350px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3
            style={{
              color: themeColor,
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '0.95rem',
              letterSpacing: '0.06em',
              marginBottom: '0px',
            }}
          >
            RITUAIS SALVOS ({filteredRituals.length} de {totalRitualsCount})
          </h3>
          <input
            type="text"
            placeholder="Buscar ritual..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: '#1a1a1a',
              borderColor: `${themeColor}60`,
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '8px 12px',
              color: '#fff',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
        </div>

        {filteredRituals.length === 0 ? (
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.85rem',
              textAlign: 'center',
              padding: '20px 0',
            }}
          >
            Nenhum ritual salvo para {selectedElements.join(', ')} • {selectedCircle}º círculo
          </p>
        ) : (
          filteredRituals.map((ritual) => (
            <div
              key={ritual.id}
              style={{
                backgroundColor: expandedRitualId === ritual.id ? `${themeColor}20` : '#1a1a1a',
                borderRadius: '4px',
                borderWidth: '1px',
                borderColor: expandedRitualId === ritual.id ? themeColor : `${themeColor}40`,
                padding: '12px',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <button
                  onClick={() => handleLoadRitual(ritual)}
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    padding: '0',
                  }}
                >
                  {ritual.name} <span style={{ color: themeColor, fontSize: '0.8rem' }}>({ritual.circle} PE)</span>
                </button>
                <button
                  onClick={() => handleRemoveRitual(ritual.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#EF4444',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Remover ritual"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {expandedRitualId === ritual.id && (
                <div
                  style={{
                    backgroundColor: '#0a0a0a',
                    borderRadius: '4px',
                    padding: '8px',
                    marginTop: '8px',
                    borderTopWidth: '1px',
                    borderTopColor: `${themeColor}40`,
                    paddingTop: '12px',
                  }}
                >
                  <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottomWidth: '1px', borderBottomColor: `${themeColor}40` }}>
                    <span style={{ color: themeColor, fontFamily: "'Bebas Neue', cursive", fontSize: '0.9rem', fontWeight: 'bold', marginRight: '8px' }}>CUSTO:</span>
                    <span style={{ color: '#FCD34D', fontFamily: "'Rajdhani', sans-serif", fontSize: '0.85rem', fontWeight: 'bold' }}>{ritual.circle} PE</span>
                  </div>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '0.8rem',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {ritual.content}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
