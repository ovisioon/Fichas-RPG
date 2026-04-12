import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface SavedMagic {
  id: string;
  circle: number;
  name: string;
  content: string;
}

interface MagicsTabProps {
  themeColor: string;
}

const CIRCLES = [1, 2, 3, 4, 5];

export default function MagicsTab({ themeColor }: MagicsTabProps) {
  const [selectedCircle, setSelectedCircle] = useState<number>(1);
  const [magicName, setMagicName] = useState('');
  const [magicContent, setMagicContent] = useState('');
  const [savedMagics, setSavedMagics] = useState<SavedMagic[]>([]);
  const [expandedMagicId, setExpandedMagicId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar magias do localStorage ao montar o componente
  useEffect(() => {
    const stored = localStorage.getItem('rpg-magias');
    if (stored) {
      try {
        setSavedMagics(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao carregar magias:', e);
      }
    }
  }, []);

  // Salvar magias no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem('rpg-magias', JSON.stringify(savedMagics));
  }, [savedMagics]);

  const handleSaveMagic = () => {
    if (!magicName.trim() || !magicContent.trim()) {
      alert('Por favor, preencha o nome e o conteúdo da magia');
      return;
    }

    const newMagic: SavedMagic = {
      id: Date.now().toString(),
      circle: selectedCircle,
      name: magicName,
      content: magicContent,
    };

    setSavedMagics([...savedMagics, newMagic]);
    setMagicName('');
    setMagicContent('');
  };

  const handleRemoveMagic = (id: string) => {
    setSavedMagics(savedMagics.filter((m) => m.id !== id));
    if (expandedMagicId === id) {
      setExpandedMagicId(null);
    }
  };

  const handleLoadMagic = (magic: SavedMagic) => {
    setSelectedCircle(magic.circle);
    setMagicName(magic.name);
    setMagicContent(magic.content);
    setExpandedMagicId(magic.id);
  };

  const filteredMagics = savedMagics.filter(
    (m) =>
      m.circle === selectedCircle &&
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMagicsCount = savedMagics.length;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(100%, calc(100% - 320px), 1fr) clamp(200px, 100%, 300px)',
        gap: 'clamp(12px, 3vw, 16px)',
        padding: 'clamp(12px, 3vw, 16px)',
        backgroundColor: '#0a0a0a',
        borderRadius: '4px',
        minHeight: 'calc(100vh - 200px)',
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
      }}
    >
      {/* ─── LEFT PANEL: INPUT AREA ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Circle Selection */}
        <div>
          <h3
            style={{
              color: themeColor,
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '0.95rem',
              letterSpacing: '0.06em',
              marginBottom: '8px',
            }}
          >
            CÍRCULO
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))', gap: '6px' }}>
            {CIRCLES.map((circle) => (
              <button
                key={circle}
                onClick={() => setSelectedCircle(circle)}
                style={{
                  backgroundColor:
                    selectedCircle === circle ? themeColor : 'transparent',
                  borderColor: themeColor,
                  borderWidth: '2px',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
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

        {/* Magic Name Input */}
        <div>
          <label
            style={{
              color: themeColor,
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            NOME DA MAGIA
          </label>
          <input
            type="text"
            placeholder="Ex: Bola de Fogo"
            value={magicName}
            onChange={(e) => setMagicName(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#1a1a1a',
              borderColor: `${themeColor}60`,
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '8px 12px',
              color: '#fff',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.85rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Magic Content Textarea */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label
            style={{
              color: themeColor,
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              marginBottom: '6px',
            }}
          >
            CONTEÚDO DA MAGIA
          </label>
          <textarea
            placeholder="Cole aqui o texto da magia do seu livro. Você pode editar livremente..."
            value={magicContent}
            onChange={(e) => setMagicContent(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: '#1a1a1a',
              borderColor: `${themeColor}60`,
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '12px',
              color: '#fff',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.85rem',
              outline: 'none',
              resize: 'none',
            }}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveMagic}
          style={{
            backgroundColor: '#22C55E',
            borderWidth: '0',
            borderRadius: '4px',
            padding: '12px 16px',
            color: '#000',
            fontFamily: "'Bebas Neue', cursive",
            fontSize: '0.9rem',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#22C55E')}
        >
          + SALVAR MAGIA
        </button>
      </div>

      {/* ─── RIGHT PANEL: SAVED MAGICS ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          backgroundColor: '#0a0a0a',
          borderRadius: '4px',
          padding: '16px',
          borderWidth: '2px',
          borderColor: `${themeColor}40`,
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
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
            MAGIAS SALVAS ({filteredMagics.length} de {totalMagicsCount})
          </h3>
          <input
            type="text"
            placeholder="Buscar magia..."
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

        {filteredMagics.length === 0 ? (
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.85rem',
              textAlign: 'center',
              padding: '20px 0',
            }}
          >
            Nenhuma magia salva para {selectedCircle}º círculo
          </p>
        ) : (
          filteredMagics.map((magic) => (
            <div
              key={magic.id}
              style={{
                backgroundColor: expandedMagicId === magic.id ? `${themeColor}20` : '#1a1a1a',
                borderRadius: '4px',
                borderWidth: '1px',
                borderColor: expandedMagicId === magic.id ? themeColor : `${themeColor}40`,
                padding: '12px',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <button
                  onClick={() => handleLoadMagic(magic)}
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
                  {magic.name} <span style={{ color: themeColor, fontSize: '0.8rem' }}>({magic.circle} PE)</span>
                </button>
                <button
                  onClick={() => handleRemoveMagic(magic.id)}
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
                  title="Remover magia"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {expandedMagicId === magic.id && (
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
                    <span style={{ color: '#FCD34D', fontFamily: "'Rajdhani', sans-serif", fontSize: '0.85rem', fontWeight: 'bold' }}>{magic.circle} PE</span>
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
                    {magic.content}
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
