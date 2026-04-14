// client/src/data/weapons.ts

export interface Weapon {
  id: string;
  name: string;
  type: string;
  category: number | string;
  damage: string;
  critical: string;
  range?: string;
  damageType: string;
  spaces: number;
  ammunition?: string;
  description: string;
  twoHanded?: boolean;
  light?: boolean;
  heavy?: boolean;
}

export interface Ammunition {
  id: string;
  name: string;
  category: number | string;
  spaces: number;
  description: string;
  duration: string;
}

export interface Protection {
  id: string;
  name: string;
  defense: number;
  category: number | string;
  spaces: number;
  description: string;
  effects?: string;
}

export interface OperationalItem {
  id: string;
  name: string;
  category: number | string;
  spaces: number;
  description: string;
  effect?: string;
  usage?: string;
  charges?: number;
}

export interface ParanormalItem {
  id: string;
  name: string;
  category: number | string;
  spaces: number;
  description: string;
  effect?: string;
  usage?: string;
  element?: string;
}

export interface Explosive {
  id: string;
  name: string;
  category: number | string;
  spaces: number;
  damage?: string;
  area?: string;
  effect: string;
  save?: string;
}

export interface Accessory {
  id: string;
  name: string;
  category: number | string;
  spaces: number;
  effect: string;
  skillBonus?: { skill: string; bonus: number };
}

// Armas Simples
export const simpleWeapons: Weapon[] = [
  {
    id: "bastao",
    name: "Bastão",
    type: "Corpo a Corpo - Uma Mão",
    category: 0,
    damage: "1d6/1d8",
    critical: "x2",
    damageType: "Impacto",
    spaces: 1,
    description: "Pode ser usado com uma ou duas mãos (dano maior com duas)."
  },
  {
    id: "faca",
    name: "Faca",
    type: "Corpo a Corpo - Leve",
    category: 0,
    damage: "1d4",
    critical: "19",
    range: "Curto",
    damageType: "Corte",
    spaces: 1,
    description: "Arma ágil, pode ser arremessada."
  },
  {
    id: "machete",
    name: "Machete",
    type: "Corpo a Corpo - Uma Mão",
    category: 0,
    damage: "1d6",
    critical: "19",
    damageType: "Corte",
    spaces: 1,
    description: "Usada para abrir trilhas."
  },
  {
    id: "martelo",
    name: "Martelo",
    type: "Corpo a Corpo - Leve",
    category: 0,
    damage: "1d6",
    critical: "x2",
    damageType: "Impacto",
    spaces: 1,
    description: "Ferramenta comum usada como arma improvisada."
  },
  {
    id: "punhal",
    name: "Punhal",
    type: "Corpo a Corpo - Leve",
    category: 0,
    damage: "1d4",
    critical: "x3",
    damageType: "Perfuração",
    spaces: 1,
    description: "Arma ágil usada em rituais."
  },
  {
    id: "soqueira",
    name: "Soqueira",
    type: "Corpo a Corpo - Leve",
    category: 0,
    damage: "+1 desarmado",
    critical: "x2",
    damageType: "Impacto",
    spaces: 1,
    description: "Reforça socos. Pode receber modificações e maldições de armas corpo a corpo."
  }
];

// Armas Pesadas / Táticas
export const heavyWeapons: Weapon[] = [
  {
    id: "acha",
    name: "Acha",
    type: "Corpo a Corpo - Duas Mãos",
    category: "I",
    damage: "1d12",
    critical: "x3",
    damageType: "Corte",
    spaces: 2,
    description: "Um machado grande e pesado, usado no corte de árvores largas."
  },
  {
    id: "arco",
    name: "Arco",
    type: "Arma de Disparo - Duas Mãos",
    category: 0,
    damage: "1d6",
    critical: "x3",
    range: "Médio",
    damageType: "Perfuração",
    spaces: 2,
    ammunition: "Flechas",
    description: "Um arco e flecha comum, próprio para tiro ao alvo."
  },
  {
    id: "arco-composto",
    name: "Arco Composto",
    type: "Arma de Disparo - Duas Mãos",
    category: "I",
    damage: "1d10",
    critical: "x3",
    range: "Médio",
    damageType: "Perfuração",
    spaces: 2,
    ammunition: "Flechas",
    description: "Arco moderno com sistema de roldanas. Permite aplicar Força no dano."
  },
  {
    id: "balestra",
    name: "Balestra",
    type: "Arma de Disparo - Duas Mãos",
    category: "I",
    damage: "1d12",
    critical: "19",
    range: "Médio",
    damageType: "Perfuração",
    spaces: 2,
    ammunition: "Flechas",
    description: "Besta pesada com disparos poderosos. Recarregar exige ação de movimento."
  },
  {
    id: "besta",
    name: "Besta",
    type: "Arma de Disparo - Duas Mãos",
    category: 0,
    damage: "1d8",
    critical: "19",
    range: "Médio",
    damageType: "Perfuração",
    spaces: 2,
    ammunition: "Flechas",
    description: "Arma antiga que exige ação de movimento para recarregar."
  },
  {
    id: "cajado",
    name: "Cajado",
    type: "Corpo a Corpo - Duas Mãos",
    category: 0,
    damage: "1d6/1d6",
    critical: "x2",
    damageType: "Impacto",
    spaces: 2,
    description: "Arma ágil que permite ataques adicionais como combate com duas armas."
  },
  {
    id: "coronhada",
    name: "Coronhada",
    type: "Corpo a Corpo - Leve",
    category: "-",
    damage: "1d4/1d6",
    critical: "x2",
    damageType: "Impacto",
    spaces: 0,
    description: "Usar arma de fogo como arma corpo a corpo."
  },
  {
    id: "fuzil-caca",
    name: "Fuzil de Caça",
    type: "Arma de Fogo - Duas Mãos",
    category: "I",
    damage: "2d8",
    critical: "19/x3",
    range: "Médio",
    damageType: "Balístico",
    spaces: 2,
    ammunition: "Balas Longas",
    description: "Popular entre caçadores e fazendeiros."
  },
  {
    id: "lanca",
    name: "Lança",
    type: "Corpo a Corpo - Uma Mão",
    category: 0,
    damage: "1d6",
    critical: "x2",
    range: "Curto",
    damageType: "Perfuração",
    spaces: 1,
    description: "Pode ser arremessada."
  },
  {
    id: "pistola",
    name: "Pistola",
    type: "Arma de Fogo - Leve",
    category: "I",
    damage: "1d12",
    critical: "18",
    range: "Curto",
    damageType: "Balístico",
    spaces: 1,
    ammunition: "Balas Curtas",
    description: "Arma comum e fácil de recarregar."
  },
  {
    id: "revolver",
    name: "Revólver",
    type: "Arma de Fogo - Leve",
    category: "I",
    damage: "2d6",
    critical: "19/x3",
    range: "Curto",
    damageType: "Balístico",
    spaces: 1,
    ammunition: "Balas Curtas",
    description: "Muito comum e confiável."
  },
  {
    id: "bazuca",
    name: "Bazuca",
    type: "Arma de Fogo - Duas Mãos",
    category: "III",
    damage: "10d8",
    critical: "x2",
    range: "Médio",
    damageType: "Impacto",
    spaces: 2,
    ammunition: "Foguete",
    description: "Causa dano em área (3m). Pode atingir ponto no chão sem teste de ataque."
  },
  {
    id: "lanca-chamas",
    name: "Lança-chamas",
    type: "Arma de Fogo - Duas Mãos",
    category: "III",
    damage: "6d6",
    critical: "x2",
    range: "Curto",
    damageType: "Fogo",
    spaces: 2,
    ammunition: "Combustível",
    description: "Atinge em linha e pode incendiar alvos."
  },
  {
    id: "metralhadora",
    name: "Metralhadora",
    type: "Arma de Fogo - Duas Mãos",
    category: "II",
    damage: "2d12",
    critical: "19/x3",
    range: "Médio",
    damageType: "Balístico",
    spaces: 2,
    ammunition: "Balas Longas",
    description: "Arma automática pesada; exige força ou apoio para uso eficaz."
  }
];

// Munições
export const ammunition: Ammunition[] = [
  {
    id: "balas-curtas",
    name: "Balas Curtas",
    category: 0,
    spaces: 1,
    description: "Munição básica usada em pistolas, revólveres e submetralhadoras.",
    duration: "um pacote dura duas cenas"
  },
  {
    id: "balas-longas",
    name: "Balas Longas",
    category: "I",
    spaces: 1,
    description: "Munição maior e mais potente, usada em fuzis e metralhadoras.",
    duration: "um pacote dura uma cena"
  },
  {
    id: "cartuchos",
    name: "Cartuchos",
    category: "I",
    spaces: 1,
    description: "Usados em espingardas, carregados com esferas de chumbo.",
    duration: "um pacote dura uma cena"
  },
  {
    id: "combustivel",
    name: "Combustível",
    category: "I",
    spaces: 1,
    description: "Tanque de combustível para lança-chamas.",
    duration: "dura uma cena"
  },
  {
    id: "flechas",
    name: "Flechas",
    category: 0,
    spaces: 1,
    description: "Usadas em arcos e bestas. Podem ser reaproveitadas após cada combate.",
    duration: "um pacote dura uma missão inteira"
  },
  {
    id: "foguete",
    name: "Foguete",
    category: "I",
    spaces: 1,
    description: "Disparado por bazucas. Cada foguete dura apenas um disparo.",
    duration: "um disparo por unidade"
  }
];

// Proteções
export const protections: Protection[] = [
  {
    id: "escudo",
    name: "Escudo",
    defense: 2,
    category: "I",
    spaces: 2,
    description: "Um escudo medieval ou moderno. Precisa ser empunhado em uma mão.",
    effects: "Defesa +2"
  },
  {
    id: "protecao-leve",
    name: "Proteção Leve",
    defense: 5,
    category: "I",
    spaces: 2,
    description: "Jaqueta de couro pesada ou colete de kevlar."
  },
  {
    id: "protecao-pesada",
    name: "Proteção Pesada",
    defense: 10,
    category: "II",
    spaces: 5,
    description: "Equipamento de forças especiais. Inclui capacete, ombreiras, joelheiras, caneleiras e colete com kevlar.",
    effects: "Resistência 2 a balístico, corte, impacto e perfuração. Penalidade: –5 em testes que sofrem penalidade de carga."
  }
];

// Itens Operacionais
export const operationalItems: OperationalItem[] = [
  {
    id: "algemas",
    name: "Algemas",
    category: 0,
    spaces: 1,
    description: "Um par de algemas de aço usado para imobilizar pessoas.",
    usage: "Agarrar alvo e vencer teste para prender pulsos."
  },
  {
    id: "arpeu",
    name: "Arpéu",
    category: 0,
    spaces: 1,
    description: "Gancho de aço preso a uma corda usado para se fixar em muros, janelas ou parapeitos.",
    effect: "+5 em Atletismo para subir."
  },
  {
    id: "bandoleira",
    name: "Bandoleira",
    category: "I",
    spaces: 1,
    description: "Cinto com bolsos e alças para carregar equipamentos.",
    effect: "1 vez por rodada, sacar ou guardar um item do inventário vira ação livre."
  },
  {
    id: "binoculos",
    name: "Binóculos",
    category: 0,
    spaces: 1,
    description: "Binóculos militares para observação à distância.",
    effect: "+5 em Percepção para observar coisas distantes."
  },
  {
    id: "bloqueador-sinal",
    name: "Bloqueador de Sinal",
    category: "I",
    spaces: 1,
    description: "Dispositivo que interfere em frequências de rádio.",
    effect: "Celulares em alcance médio não conseguem se conectar."
  },
  {
    id: "cicatrizante",
    name: "Cicatrizante",
    category: "I",
    spaces: 1,
    description: "Spray medicinal com efeito cicatrizante potente.",
    usage: "Ação padrão para curar 2d8+2 PV em você ou em um ser adjacente."
  },
  {
    id: "corda",
    name: "Corda",
    category: 0,
    spaces: 1,
    description: "10 metros de corda resistente.",
    effect: "+5 em Atletismo para descer buracos ou prédios."
  },
  {
    id: "equipamento-sobrevivencia",
    name: "Equipamento de Sobrevivência",
    category: 0,
    spaces: 2,
    description: "Mochila com saco de dormir, panelas, GPS e ferramentas.",
    effect: "+5 em Sobrevivência para acampar ou se orientar."
  },
  {
    id: "lanterna-tatica",
    name: "Lanterna Tática",
    category: "I",
    spaces: 1,
    description: "Lanterna usada em operações táticas.",
    usage: "Ação de movimento para ofuscar alvo por 1 rodada."
  },
  {
    id: "mascara-gas",
    name: "Máscara de Gás",
    category: 0,
    spaces: 1,
    description: "Máscara com filtro que cobre todo o rosto.",
    effect: "+10 em Fortitude contra efeitos respiratórios."
  },
  {
    id: "mochila-militar",
    name: "Mochila Militar",
    category: "I",
    spaces: -2,
    description: "Mochila leve e resistente.",
    effect: "Aumenta a capacidade de carga em 2 espaços."
  },
  {
    id: "oculos-termica",
    name: "Óculos de Visão Térmica",
    category: "I",
    spaces: 1,
    description: "Detecta calor corporal.",
    effect: "Ignora penalidade de camuflagem."
  },
  {
    id: "pe-cabra",
    name: "Pé de Cabra",
    category: 0,
    spaces: 1,
    description: "Barra de ferro para arrombar portas.",
    effect: "+5 em Força para arrombamento. Pode ser usado como bastão."
  },
  {
    id: "pistola-dardos",
    name: "Pistola de Dardos",
    category: "I",
    spaces: 1,
    description: "Dispara dardos com sonífero potente.",
    usage: "Ataque à distância; se acertar, alvo inconsciente até fim da cena (Fortitude DT Agi reduz).",
    charges: 2
  },
  {
    id: "pistola-sinalizadora",
    name: "Pistola Sinalizadora",
    category: 0,
    spaces: 1,
    description: "Arma de fogo que dispara sinalizadores luminosos.",
    effect: "Alcance curto, 2d6 dano de fogo.",
    charges: 2
  },
  {
    id: "spray-pimenta",
    name: "Spray de Pimenta",
    category: "I",
    spaces: 1,
    description: "Spray químico que causa dor intensa.",
    usage: "Ação padrão; alvo fica cego por 1d4 rodadas (Fortitude DT Agi evita).",
    charges: 2
  },
  {
    id: "taser",
    name: "Taser",
    category: "I",
    spaces: 1,
    description: "Dispositivo de eletrochoque.",
    effect: "1d6 dano de eletricidade e atordoado por 1 rodada (Fortitude DT Agi evita).",
    charges: 2
  },
  {
    id: "traje-hazmat",
    name: "Traje Hazmat",
    category: "I",
    spaces: 2,
    description: "Roupa de proteção contra materiais tóxicos.",
    effect: "+5 em testes contra efeitos ambientais, Resistência a químico 10."
  }
];

// Itens Paranormais
export const paranormalItems: ParanormalItem[] = [
  {
    id: "amarras-elemento",
    name: "Amarras de (Elemento)",
    category: "II",
    spaces: 1,
    description: "Cordas ou correntes feitas de um elemento paranormal específico.",
    effect: "Armadilha (imobiliza) ou laçar (paralisa).",
    element: "variável"
  },
  {
    id: "camera-aura",
    name: "Câmera de Aura Paranormal",
    category: "II",
    spaces: 1,
    description: "Tira fotos que revelam auras paranormais.",
    usage: "Ação padrão + 1 PE."
  },
  {
    id: "componentes-ritualisticos",
    name: "Componentes Ritualísticos (Elemento)",
    category: 0,
    spaces: 1,
    description: "Conjunto de objetos necessários para conjurar rituais de um elemento."
  },
  {
    id: "emissor-pulsos",
    name: "Emissor de Pulsos Paranormais",
    category: "II",
    spaces: 1,
    description: "Atua como isca paranormal.",
    usage: "Ação completa + 1 PE. Atrai criaturas do mesmo elemento, afasta do oposto."
  },
  {
    id: "escuta-ruidos",
    name: "Escuta de Ruídos Paranormais",
    category: "II",
    spaces: 1,
    description: "Grava ruídos por 24 horas.",
    effect: "+5 em Ocultismo para identificar criaturas."
  },
  {
    id: "medidor-estabilidade",
    name: "Medidor de Estabilidade da Membrana",
    category: "II",
    spaces: 1,
    description: "Analisa o estado da Membrana.",
    effect: "Testes de Ocultismo para avaliar risco de manifestação paranormal."
  },
  {
    id: "scanner-manifestacao",
    name: "Scanner de Manifestação Paranormal (Elemento)",
    category: "II",
    spaces: 1,
    description: "Detecta manifestações paranormais de um elemento.",
    usage: "Ação padrão + 1 PE por rodada, alcance longo."
  }
];

// Explosivos
export const explosives: Explosive[] = [
  {
    id: "granada-atrodoamento",
    name: "Granada de Atordoamento",
    category: 0,
    spaces: 1,
    area: "raio 6 m",
    effect: "Alvos ficam atordoados por 1 rodada. Fortitude (DT Agi) reduz para ofuscado e surdo."
  },
  {
    id: "granada-fragmentacao",
    name: "Granada de Fragmentação",
    category: "I",
    spaces: 1,
    damage: "8d6 perfuração",
    effect: "Reflexos (DT Agi) reduz à metade."
  },
  {
    id: "granada-fumaca",
    name: "Granada de Fumaça",
    category: 0,
    spaces: 1,
    area: "6 m",
    effect: "Área fica com camuflagem total. Alvos ficam cegos. Duração 2 rodadas."
  },
  {
    id: "granada-incendiaria",
    name: "Granada Incendiária",
    category: "I",
    spaces: 1,
    damage: "6d6 fogo",
    effect: "Em chamas. Reflexos (DT Agi) reduz dano à metade."
  },
  {
    id: "mina-antipessoal",
    name: "Mina Antipessoal",
    category: "I",
    spaces: 1,
    damage: "12d6 perfuração em cone de 6 m",
    effect: "Instalação: ação completa, Tática DT 15. Reflexos (DT Int) reduz à metade."
  }
];

// Acessórios
export const accessories: Accessory[] = [
  {
    id: "kit-pericia",
    name: "Kit de Perícia",
    category: 0,
    spaces: 1,
    effect: "Necessário para certas perícias. Sem ele: –5 no teste."
  },
  {
    id: "utensilio",
    name: "Utensílio",
    category: "I",
    spaces: 1,
    effect: "+2 em uma perícia escolhida (exceto Luta ou Pontaria)."
  },
  {
    id: "vestimenta",
    name: "Vestimenta",
    category: "I",
    spaces: 1,
    effect: "+2 em uma perícia específica. Máximo 2 vestimentas com bônus ao mesmo tempo."
  }
];
