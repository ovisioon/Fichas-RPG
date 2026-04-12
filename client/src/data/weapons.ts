export interface Weapon {
  id: string;
  name: string;
  type: string;
  category: string;
  damage: string;
  critical: string;
  range?: string;
  damageType: string;
  spaces: number;
  ammunition?: string;
  description: string;
  defense?: number;
}

export interface Ammunition {
  id: string;
  name: string;
  category: string;
  spaces: number;
  description: string;
  duration: string;
}

export interface Protection {
  id: string;
  name: string;
  defense: number;
  category: string;
  spaces: number;
  description: string;
  effects?: string[];
}

export const simpleWeapons: Weapon[] = [
  {
    id: "acha",
    name: "Acha",
    type: "Corpo a Corpo - Duas Mãos",
    category: "I",
    damage: "1d12",
    critical: "x3",
    damageType: "Corte",
    spaces: 2,
    description: "Um machado grande e pesado, usado no corte de árvores largas.",
  },
  {
    id: "arco",
    name: "Arco",
    type: "Arma de Disparo - Duas Mãos",
    category: "0",
    damage: "1d6",
    critical: "x3",
    range: "Médio",
    damageType: "Perfuração",
    spaces: 2,
    ammunition: "Flechas",
    description: "Um arco e flecha comum, próprio para tiro ao alvo.",
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
    description: "Arco moderno com sistema de roldanas. Permite aplicar Força no dano.",
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
    description: "Besta pesada com disparos poderosos. Recarregar exige ação de movimento.",
  },
  {
    id: "besta",
    name: "Besta",
    type: "Arma de Disparo - Duas Mãos",
    category: "0",
    damage: "1d8",
    critical: "19",
    range: "Médio",
    damageType: "Perfuração",
    spaces: 2,
    ammunition: "Flechas",
    description: "Arma antiga que exige ação de movimento para recarregar.",
  },
  {
    id: "bastao",
    name: "Bastão",
    type: "Corpo a Corpo - Uma Mão",
    category: "0",
    damage: "1d6/1d8",
    critical: "x2",
    damageType: "Impacto",
    spaces: 1,
    description: "Pode ser usado com uma ou duas mãos (dano maior com duas).",
  },
  {
    id: "cajado",
    name: "Cajado",
    type: "Corpo a Corpo - Duas Mãos",
    category: "0",
    damage: "1d6/1d6",
    critical: "x2",
    damageType: "Impacto",
    spaces: 2,
    description: "Arma ágil que permite ataques adicionais como combate com duas armas.",
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
    description: "Usar arma de fogo como arma corpo a corpo.",
  },
  {
    id: "faca",
    name: "Faca",
    type: "Corpo a Corpo - Leve",
    category: "0",
    damage: "1d4",
    critical: "19",
    range: "Curto",
    damageType: "Corte",
    spaces: 1,
    description: "Arma ágil, pode ser arremessada.",
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
    description: "Popular entre caçadores e fazendeiros.",
  },
  {
    id: "lanca",
    name: "Lança",
    type: "Corpo a Corpo - Uma Mão",
    category: "0",
    damage: "1d6",
    critical: "x2",
    range: "Curto",
    damageType: "Perfuração",
    spaces: 1,
    description: "Pode ser arremessada.",
  },
  {
    id: "machete",
    name: "Machete",
    type: "Corpo a Corpo - Uma Mão",
    category: "0",
    damage: "1d6",
    critical: "19",
    damageType: "Corte",
    spaces: 1,
    description: "Usada para abrir trilhas.",
  },
  {
    id: "martelo",
    name: "Martelo",
    type: "Corpo a Corpo - Leve",
    category: "0",
    damage: "1d6",
    critical: "x2",
    damageType: "Impacto",
    spaces: 1,
    description: "Ferramenta comum usada como arma improvisada.",
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
    description: "Arma comum e fácil de recarregar.",
  },
  {
    id: "punhal",
    name: "Punhal",
    type: "Corpo a Corpo - Leve",
    category: "0",
    damage: "1d4",
    critical: "x3",
    damageType: "Perfuração",
    spaces: 1,
    description: "Arma ágil usada em rituais.",
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
    description: "Muito comum e confiável.",
  },
];

export const heavyWeapons: Weapon[] = [
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
    description: "Causa dano em área (3m). Pode atingir ponto no chão sem teste de ataque.",
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
    description: "Atinge em linha e pode incendiar alvos.",
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
    description: "Arma automática pesada; exige força ou apoio para uso eficaz.",
  },
];

export const ammunition: Ammunition[] = [
  {
    id: "balas-curtas",
    name: "Balas Curtas",
    category: "0",
    spaces: 1,
    description: "Munição básica usada em pistolas, revólveres e submetralhadoras.",
    duration: "Um pacote de balas curtas dura duas cenas.",
  },
  {
    id: "balas-longas",
    name: "Balas Longas",
    category: "I",
    spaces: 1,
    description: "Munição maior e mais potente, usada em fuzis e metralhadoras.",
    duration: "Um pacote de balas longas dura uma cena.",
  },
  {
    id: "cartuchos",
    name: "Cartuchos",
    category: "I",
    spaces: 1,
    description: "Usados em espingardas, carregados com esferas de chumbo.",
    duration: "Um pacote de cartuchos dura uma cena.",
  },
  {
    id: "combustivel",
    name: "Combustível",
    category: "I",
    spaces: 1,
    description: "Tanque de combustível para lança-chamas.",
    duration: "Dura uma cena.",
  },
  {
    id: "flechas",
    name: "Flechas",
    category: "0",
    spaces: 1,
    description: "Usadas em arcos e bestas. Podem ser reaproveitadas após cada combate.",
    duration: "Um pacote de flechas dura uma missão inteira.",
  },
  {
    id: "foguete",
    name: "Foguete",
    category: "I",
    spaces: 1,
    description: "Disparado por bazucas. Diferente de outras munições, cada foguete dura apenas um disparo.",
    duration: "Para realizar vários ataques, é necessário carregar vários foguetes.",
  },
];

export const protections: Protection[] = [
  {
    id: "escudo",
    name: "Escudo",
    defense: 2,
    category: "I",
    spaces: 2,
    description: "Um escudo medieval ou moderno, como os usados por tropas de choque. Para efeitos de proficiência, conta como proteção pesada. Precisa ser empunhado em uma mão.",
    effects: ["Fornece Defesa +2"],
  },
  {
    id: "protecao-leve",
    name: "Proteção Leve",
    defense: 5,
    category: "I",
    spaces: 2,
    description: "Jaqueta de couro pesada ou colete de kevlar. Esse tipo de proteção é tipicamente usado por seguranças e policiais.",
    effects: [],
  },
  {
    id: "protecao-pesada",
    name: "Proteção Pesada",
    defense: 10,
    category: "II",
    spaces: 5,
    description: "Equipamento usado por forças especiais da polícia e pelo exército. Inclui capacete, ombreiras, joelheiras, caneleiras e um colete com várias camadas de kevlar.",
    effects: [
      "Resistência 2 a balístico, corte, impacto e perfuração",
      "Penalidade: –5 em testes de perícias que sofrem penalidade de carga",
    ],
  },
];

export const operationalItems = [
  {
    id: "algemas",
    name: "Algemas",
    category: "0",
    spaces: 1,
    description: "Um par de algemas de aço usado para imobilizar pessoas.",
  },
  {
    id: "arpeu",
    name: "Arpéu",
    category: "0",
    spaces: 1,
    description: "Gancho de aço preso a uma corda usado para se fixar em muros, janelas ou parapeitos.",
  },
];
