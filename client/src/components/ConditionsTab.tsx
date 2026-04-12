import { useState } from "react";

interface Condition {
  name: string;
  description: string;
  category: string;
}

const CONDITIONS: Condition[] = [
  { name: "Abalado", description: "O personagem sofre –2 em testes de perícia. Se ficar abalado novamente, em vez disso fica apavorado.", category: "Medo" },
  { name: "Agarrado", description: "O personagem fica desprevenido e imóvel, sofre –2 em testes de ataque e só pode atacar com armas leves. Ataques à distância contra um alvo envolvido em uma manobra agarrar têm 50% de chance de acertar o alvo errado.", category: "Movimento" },
  { name: "Alquebrado", description: "O custo em pontos de mana das habilidades do personagem aumenta em +1.", category: "Mental" },
  { name: "Apavorado", description: "O personagem sofre –5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo.", category: "Medo" },
  { name: "Atordoado", description: "O personagem fica desprevenido e não pode fazer ações.", category: "Mental" },
  { name: "Caído", description: "O personagem sofre –5 na Defesa contra ataques corpo a corpo e recebe +5 na Defesa contra ataques à distância (cumulativos com outras condições). Além disso, sofre –5 em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m.", category: "Movimento" },
  { name: "Cego", description: "O personagem fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre –5 em testes de perícias baseadas em Força ou Destreza. Todos os alvos de seus ataques recebem camuflagem total. Você é considerado cego enquanto estiver em uma área de escuridão total, a menos que algo lhe permita perceber no escuro.", category: "Sentidos" },
  { name: "Confuso", description: "O personagem comporta-se de modo aleatório. Role 1d6 no início de seus turnos: 1) Movimenta-se em uma direção escolhida por uma rolagem de 1d8; 2-3) Não pode fazer ações, e fica balbuciando incoerentemente; 4-5) Usa a arma que estiver empunhando para atacar a criatura mais próxima, ou a si mesmo se estiver sozinho (nesse caso, apenas role o dano); 6) A condição termina e pode agir normalmente.", category: "Mental" },
  { name: "Debilitado", description: "O personagem sofre –5 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos. Se o personagem ficar debilitado novamente, em vez disso fica inconsciente.", category: "Físico" },
  { name: "Desprevenido", description: "O personagem sofre –5 na Defesa e em Reflexos. Você fica desprevenido contra inimigos que não possa perceber.", category: "Defesa" },
  { name: "Doente", description: "Sob efeito de uma doença.", category: "Metabolismo" },
  { name: "Em Chamas", description: "O personagem está pegando fogo. No início de seus turnos, sofre 1d6 pontos de dano de fogo. O personagem pode gastar uma ação padrão para apagar o fogo com as mãos. Imersão em água também apaga as chamas.", category: "Dano" },
  { name: "Enfeitiçado", description: "O personagem se torna prestativo em relação à fonte da condição. Ele não fica sob controle da fonte, mas percebe suas palavras e ações da maneira mais favorável possível. A fonte da condição recebe +10 em testes de Diplomacia com o personagem.", category: "Mental" },
  { name: "Enjoado", description: "O personagem só pode realizar uma ação padrão ou de movimento (não ambas) por rodada. Ele pode gastar uma ação padrão para fazer uma investida, mas pode avançar no máximo seu deslocamento (e não o dobro).", category: "Metabolismo" },
  { name: "Enredado", description: "O personagem fica lento, vulnerável e sofre –2 em testes de ataque.", category: "Movimento" },
  { name: "Envenenado", description: "O efeito desta condição varia de acordo com o veneno. Pode ser perda de vida recorrente ou outra condição (como fraco ou enjoado). Perda de vida recorrente por venenos é cumulativa.", category: "Veneno" },
  { name: "Esmorecido", description: "O personagem sofre –5 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos.", category: "Mental" },
  { name: "Exausto", description: "O personagem fica debilitado, lento e vulnerável. Se ficar exausto novamente, em vez disso fica inconsciente.", category: "Cansaço" },
  { name: "Fascinado", description: "Com a atenção presa em alguma coisa. O personagem sofre –5 em Percepção e não pode fazer ações, exceto observar aquilo que o fascinou. Esta condição é anulada por ações hostis contra o personagem ou se o que o fascinou não estiver mais visível. Balançar uma criatura fascinada para tirá-la desse estado gasta uma ação padrão.", category: "Mental" },
  { name: "Fatigado", description: "O personagem fica fraco e vulnerável. Se ficar fatigado novamente, em vez disso fica exausto.", category: "Cansaço" },
  { name: "Fraco", description: "O personagem sofre –2 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos. Se ficar fraco novamente, em vez disso fica debilitado.", category: "Físico" },
  { name: "Frustrado", description: "O personagem sofre –2 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos. Se ficar frustrado novamente, em vez disso fica esmorecido.", category: "Mental" },
  { name: "Imóvel", description: "Todas as formas de deslocamento do personagem são reduzidas a 0m.", category: "Movimento" },
  { name: "Inconsciente", description: "O personagem fica indefeso e não pode fazer ações, incluindo reações (mas ainda pode fazer testes que sejam naturalmente feitos quando se está inconsciente, como testes de Constituição para estabilizar sangramento). Balançar uma criatura para acordá-la gasta uma ação padrão.", category: "Crítico" },
  { name: "Indefeso", description: "O personagem fica desprevenido, mas sofre –10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia.", category: "Defesa" },
  { name: "Lento", description: "Todas as formas de deslocamento do personagem são reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5m) e ele não pode correr ou fazer investidas.", category: "Movimento" },
  { name: "Ofuscado", description: "O personagem sofre –2 em testes de ataque e de Percepção.", category: "Sentidos" },
  { name: "Paralisado", description: "Fica imóvel e indefeso e só pode realizar ações puramente mentais.", category: "Movimento" },
  { name: "Pasmo", description: "Não pode fazer ações.", category: "Mental" },
  { name: "Petrificado", description: "O personagem fica inconsciente e recebe redução de dano 8.", category: "Metamorfose" },
  { name: "Sangrando", description: "No início de seu turno, o personagem deve fazer um teste de Constituição (CD 15). Se falhar, perde 1d6 pontos de vida e continua sangrando. Se passar, remove essa condição.", category: "Metabolismo" },
  { name: "Sobrecarregado", description: "O personagem sofre penalidade de armadura –5 e seu deslocamento é reduzido em –3m.", category: "Movimento" },
  { name: "Surdo", description: "O personagem não pode fazer testes de Percepção para ouvir e sofre –5 em testes de Iniciativa. Além disso, é considerado em condição ruim para lançar magias.", category: "Sentidos" },
  { name: "Surpreendido", description: "O personagem fica desprevenido e não pode fazer ações.", category: "Defesa" },
  { name: "Vulnerável", description: "O personagem sofre –2 na Defesa.", category: "Defesa" },
];

interface ActiveCondition {
  name: string;
  category: string;
}

export function ConditionsTab({ activeConditions, onConditionsChange }: { activeConditions: ActiveCondition[]; onConditionsChange: (conditions: ActiveCondition[]) => void }) {
  const [expandedCondition, setExpandedCondition] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedConditions = [...CONDITIONS].sort((a, b) => a.name.localeCompare(b.name));
  const filteredConditions = sortedConditions.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleCondition = (condition: Condition) => {
    const isActive = activeConditions.some((ac) => ac.name === condition.name);
    if (isActive) {
      onConditionsChange(activeConditions.filter((ac) => ac.name !== condition.name));
    } else {
      onConditionsChange([...activeConditions, { name: condition.name, category: condition.category }]);
    }
  };

  const removeCondition = (name: string) => {
    onConditionsChange(activeConditions.filter((ac) => ac.name !== name));
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", padding: "2rem" }}>
      {/* Lado esquerdo: Lista de condições */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ color: "#4ADE80", fontSize: "1.2rem", marginBottom: "1rem" }}>CONDIÇÕES DISPONÍVEIS</h3>

        {/* Campo de busca */}
        <input
          type="text"
          placeholder="Buscar condição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #4ADE80",
            background: "#0A0A0A",
            color: "#4ADE80",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.9rem",
          }}
        />

        {/* Lista de condições */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxHeight: "600px",
            overflowY: "auto",
            paddingRight: "0.5rem",
          }}
        >
          {filteredConditions.map((condition) => {
            const isActive = activeConditions.some((ac) => ac.name === condition.name);
            return (
              <div
                key={condition.name}
                onClick={() => setExpandedCondition(expandedCondition === condition.name ? null : condition.name)}
                style={{
                  padding: "0.75rem",
                  borderRadius: "4px",
                  border: `1px solid ${isActive ? "#4ADE80" : "#333"}`,
                  background: isActive ? "rgba(74,222,128,0.1)" : "#1a1a1a",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCondition(condition);
                  }}
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "3px",
                    border: `1.5px solid ${isActive ? "#4ADE80" : "rgba(74,222,128,0.35)"}`,
                    background: isActive ? "#4ADE80" : "transparent",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                    boxShadow: isActive ? "0 0 6px rgba(74,222,128,0.6)" : "none",
                  }}
                >
                  {isActive && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span style={{ color: "#4ADE80", fontSize: "0.9rem", flex: 1 }}>{condition.name}</span>
                <span style={{ color: "rgba(74,222,128,0.6)", fontSize: "0.75rem" }}>{condition.category}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lado direito: Detalhes e condições ativas */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Detalhes da condição expandida */}
        {expandedCondition && (
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "4px",
              border: "1px solid #4ADE80",
              background: "rgba(74,222,128,0.05)",
            }}
          >
            <h4 style={{ color: "#4ADE80", marginBottom: "0.75rem", fontSize: "1rem" }}>{expandedCondition}</h4>
            <p style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: 1.6 }}>
              {CONDITIONS.find((c) => c.name === expandedCondition)?.description}
            </p>
          </div>
        )}

        {/* Condições ativas */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ color: "#4ADE80", fontSize: "1.2rem" }}>CONDIÇÕES ATIVAS ({activeConditions.length})</h3>
          {activeConditions.length === 0 ? (
            <p style={{ color: "rgba(74,222,128,0.6)", fontSize: "0.9rem" }}>Nenhuma condição ativa</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {activeConditions.map((condition) => (
                <div
                  key={condition.name}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "4px",
                    border: "1px solid #4ADE80",
                    background: "rgba(74,222,128,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ color: "#4ADE80", fontSize: "0.9rem" }}>{condition.name}</span>
                    <span style={{ color: "rgba(74,222,128,0.6)", fontSize: "0.75rem", marginLeft: "0.75rem" }}>{condition.category}</span>
                  </div>
                  <button
                    onClick={() => removeCondition(condition.name)}
                    style={{
                      padding: "0.5rem 0.75rem",
                      borderRadius: "3px",
                      border: "1px solid #EF4444",
                      background: "transparent",
                      color: "#EF4444",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(239,68,68,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    REMOVER
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
