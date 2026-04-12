import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  classe: string;
  level: number;
  createdAt: string;
}

interface CharacterSelectProps {
  onSelectCharacter: (characterId: string) => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    // Load all characters from localStorage
    const allCharacters: Character[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('character_') && !key.endsWith('_createdAt')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          // Extract ID: from 'character_char_1712675400000' -> 'char_1712675400000'
          const id = key.replace('character_', '');
          allCharacters.push({
            id,
            name: data.characterName || 'Sem Nome',
            classe: data.classe || 'Sem Classe',
            level: data.level || 1,
            createdAt: data.createdAt || new Date().toISOString(),
          });
        } catch (e) {
          console.error('Error loading character:', key);
        }
      }
    }
    setCharacters(allCharacters.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const handleCreateCharacter = () => {
    const newId = `char_${Date.now()}`;
    // Initialize skills array with all skills set to untrained
    const initialSkills = [
      { name: 'Acrobacia', attr: 'Destreza', trained: false, bonus: 0 },
      { name: 'Adestramento', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Artes', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Atletismo', attr: 'Força', trained: false, bonus: 0 },
      { name: 'Atualidades', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Ciências', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Crime', attr: 'Destreza', trained: false, bonus: 0 },
      { name: 'Diplomacia', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Enganação', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Fortitude', attr: 'Constituição', trained: false, bonus: 0 },
      { name: 'Furtividade', attr: 'Destreza', trained: false, bonus: 0 },
      { name: 'Iniciativa', attr: 'Destreza', trained: false, bonus: 0 },
      { name: 'Intimidação', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Intuição', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Investigação', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Luta', attr: 'Força', trained: false, bonus: 0 },
      { name: 'Medicina', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Ocultismo', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Percepção', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Pilotagem', attr: 'Destreza', trained: false, bonus: 0 },
      { name: 'Pontaria', attr: 'Destreza', trained: false, bonus: 0 },
      { name: 'Profissão', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Reflexos', attr: 'Destreza', trained: false, bonus: 0 },
      { name: 'Religião', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Sobrevivência', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Tática', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Tecnologia', attr: 'Inteligência', trained: false, bonus: 0 },
      { name: 'Vontade', attr: 'Carisma', trained: false, bonus: 0 },
      { name: 'Misticismo', attr: 'Inteligência', trained: false, bonus: 0 },
    ];
    const newCharacter = {
      characterName: 'Novo Personagem',
      attrs: { forca: 0, destreza: 0, intelecto: 0, constituicao: 0, sabedoria: 0, carisma: 0 },
      status: { pvAtual: 0, pvMax: 0, peAtual: 0, peMax: 0, evAtual: 0 },
      level: 1,
      origem: '',
      classe: '',
      skills: initialSkills,
      selectedAbilities: [],
      selectedTrailAbilities: [],
      conditions: [],
      defenseInventory: null,
      characterImage: null,
      rituals: [],
      magics: [],
      activeConditions: [],
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(`character_${newId}`, JSON.stringify(newCharacter));
    onSelectCharacter(newId);
  };

  const handleDeleteCharacter = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este personagem?')) {
      localStorage.removeItem(`character_${id}`);
      setCharacters(characters.filter(c => c.id !== id));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'inherit',
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#4ADE80',
            margin: '0 0 10px 0',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            FICHA DE PERSONAGEM
          </h1>
          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #4ADE80, transparent)',
            marginBottom: '20px',
          }} />
          <p style={{
            color: '#888',
            fontSize: '0.9rem',
            margin: 0,
          }}>
            Selecione um personagem ou crie um novo
          </p>
        </div>

        {/* Characters List */}
        <div style={{
          display: 'grid',
          gap: '12px',
          marginBottom: '20px',
        }}>
          {characters.length === 0 ? (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              border: '2px dashed #4ADE80',
              borderRadius: '8px',
              color: '#888',
            }}>
              <p>Nenhum personagem criado ainda</p>
              <p style={{ fontSize: '0.85rem' }}>Clique em "Criar Nova Ficha" para começar</p>
            </div>
          ) : (
            characters.map(char => (
              <button
                key={char.id}
                onClick={() => onSelectCharacter(char.id)}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                  border: '2px solid #4ADE80',
                  borderRadius: '8px',
                  color: '#4ADE80',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(74, 222, 128, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div>{char.name}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#666',
                    marginTop: '4px',
                  }}>
                    {char.classe} • Nível {char.level}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCharacter(char.id);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff6b6b',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  }}
                  title="Deletar personagem"
                >
                  <Trash2 size={18} />
                </button>
              </button>
            ))
          )}
        </div>

        {/* Create New Button */}
        <button
          onClick={handleCreateCharacter}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #4ADE80 0%, #22c55e 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(74, 222, 128, 0.4)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          <Plus size={20} />
          Criar Nova Ficha
        </button>
      </div>
    </div>
  );
};
