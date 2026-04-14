// client/src/data/magic.ts

export interface Amulet {
  id: string;
  name: string;
  description: string;
  effect: string;
  ingredients?: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  quality: "Precário" | "Ordinário" | "Absoluto";
  type: string;
  description: string;
  effect: string;
  quantity?: number;
}

export interface Potion {
  id: string;
  name: string;
  description: string;
  effect: string;
  ingredients: string[];
}

export const amulets: Amulet[] = [
  {
    id: "runa-salvamento-mental",
    name: "Runa de Salvamento Mental",
    description: "Após uma cena de conflito, todos os aliados curam 2d6 PS.",
    effect: "Cura 2d6 PS em aliados após cena de conflito.",
    ingredients: ["1 Pilha de Sucata Precária", "1 Porção de Álisso Absoluto"]
  },
  {
    id: "runa-absorcao-energetica",
    name: "Runa de Absorção Energética",
    description: "Ao começar uma cena de conflito, todos os aliados recebem 2 PE.",
    effect: "Concede 2 PE a todos os aliados no início de cena de conflito.",
    ingredients: ["3 Pilhas de Sucata Precária", "1 Porção de Álisso Absoluto"]
  },
  {
    id: "runa-fortalecimento-corporal",
    name: "Runa de Fortalecimento Corporal",
    description: "Ao começar uma cena de conflito, todos os aliados recebem 2 de resistência Física ou Balística até o final do próximo turno.",
    effect: "Resistência Física ou Balística +2 por 1 rodada.",
    ingredients: ["1 Mistura de Cristais"]
  }
];

export const ingredients: Ingredient[] = [
  // Garrafa de Álcool
  {
    id: "alcool-precario",
    name: "Garrafa de Álcool Precário",
    quality: "Precário",
    type: "Base",
    description: "Base comum de poção. Torna a poção arremessável em área curta.",
    effect: "Poção arremessável em área curta.",
    quantity: 3
  },
  {
    id: "alcool-ordinario",
    name: "Garrafa de Álcool Ordinário",
    quality: "Ordinário",
    type: "Base",
    description: "Álcool padrão de preparo alquímico.",
    effect: "Continua arremessável, mas atinge apenas um alvo em vez de área.",
    quantity: 2
  },
  {
    id: "alcool-absoluto",
    name: "Garrafa de Álcool Absoluto",
    quality: "Absoluto",
    type: "Base",
    description: "Destilação refinada.",
    effect: "A poção pode ser consumida diretamente por um alvo específico ou usar os efeitos das versões anteriores.",
    quantity: 1
  },
  // Sucata
  {
    id: "sucata-precaria",
    name: "Sucata Precária",
    quality: "Precário",
    type: "Metal",
    description: "Material simples.",
    effect: "Usado apenas para itens sem finalidade destrutiva.",
    quantity: 3
  },
  {
    id: "sucata-ordinaria",
    name: "Sucata Ordinária",
    quality: "Ordinário",
    type: "Metal",
    description: "Material de qualidade moderada.",
    effect: "Permite criar itens capazes de causar dano, mas ainda moderados.",
    quantity: 2
  },
  {
    id: "sucata-absoluta",
    name: "Sucata Absoluta",
    quality: "Absoluto",
    type: "Metal",
    description: "Metal refinado.",
    effect: "Ideal para itens destrutivos ou de grande eficiência.",
    quantity: 1
  },
  // Álisso
  {
    id: "alisso-precario",
    name: "Álisso Precário",
    quality: "Precário",
    type: "Essência",
    description: "Essência frágil da planta álisso.",
    effect: "Concede 2d4 de dano físico ao item.",
    quantity: 3
  },
  {
    id: "alisso-ordinario",
    name: "Álisso Ordinário",
    quality: "Ordinário",
    type: "Essência",
    description: "Álisso fresco e de boa qualidade.",
    effect: "Dados aumentam para 2d6. Pode causar dano elemental em vez de físico ou substituir por cura de PV.",
    quantity: 2
  },
  {
    id: "alisso-absoluto",
    name: "Álisso Absoluto",
    quality: "Absoluto",
    type: "Essência",
    description: "Colhido sob condições raras.",
    effect: "Permite substituir o efeito por cura de PS ou causar dano.",
    quantity: 1
  },
  // Cristais
  {
    id: "cristais-precarios",
    name: "Cristais Precários",
    quality: "Precário",
    type: "Cristal",
    description: "Fragmentos instáveis.",
    effect: "Concede 2 de resistência a dano físico ou balístico.",
    quantity: 3
  },
  {
    id: "cristais-ordinarios",
    name: "Cristais Ordinários",
    quality: "Ordinário",
    type: "Cristal",
    description: "Cristais mais estáveis.",
    effect: "Concede 4 de resistência a dano físico, balístico ou elemental.",
    quantity: 2
  },
  {
    id: "cristais-absolutos",
    name: "Cristais Absolutos",
    quality: "Absoluto",
    type: "Cristal",
    description: "Cristais refinados.",
    effect: "Concede 6 de resistência a dano físico, balístico, elemental ou paranormal.",
    quantity: 1
  },
  // Mistura de Minérios
  {
    id: "mistura-minerios-precaria",
    name: "Mistura de Minérios Precária",
    quality: "Precário",
    type: "Mistura",
    description: "Mistura volátil.",
    effect: "Causa uma condição até o início da próxima rodada: Caído, Imóvel ou Queimando.",
    quantity: 1
  },
  {
    id: "mistura-minerios-ordinaria",
    name: "Mistura de Minérios Ordinária",
    quality: "Ordinário",
    type: "Mistura",
    description: "Mistura equilibrada.",
    effect: "Pode aplicar até o final da próxima rodada: Cego, Eletrocutado ou Envenenado.",
    quantity: 1
  },
  {
    id: "mistura-minerios-absoluta",
    name: "Mistura de Minérios Absoluta",
    quality: "Absoluto",
    type: "Mistura",
    description: "Fusão mineral refinada.",
    effect: "Adiciona novas condições: Atordoado, Furtivo, Indefeso.",
    quantity: 1
  },
  // Pacote de Ervas
  {
    id: "pacote-ervas",
    name: "Pacote de Ervas",
    quality: "Ordinário",
    type: "Ervas",
    description: "Mistura de flores, musgos e plantas medicinais.",
    effect: "Aumenta em +1 a quantidade de dados do efeito do item.",
    quantity: 1
  },
  // Flor Morbidus
  {
    id: "flor-morbidus-precaria",
    name: "Flor Morbidus Precária",
    quality: "Precário",
    type: "Flor",
    description: "",
    effect: "Adiciona +2 rodadas de duração ao efeito do item. Penalidade: o usuário perde 1 PE.",
    quantity: 2
  },
  {
    id: "flor-morbidus-ordinaria",
    name: "Flor Morbidus Ordinária",
    quality: "Ordinário",
    type: "Flor",
    description: "",
    effect: "Aumenta a duração do efeito para 3 rodadas, sem drenagem.",
    quantity: 1
  },
  {
    id: "flor-morbidus-absoluta",
    name: "Flor Morbidus Absoluta",
    quality: "Absoluto",
    type: "Flor",
    description: "",
    effect: "Todos os efeitos do item duram 4 rodadas.",
    quantity: 1
  },
  // Rubrum Crystallum
  {
    id: "rubrum-crystallum",
    name: "Rubrum Crystallum",
    quality: "Absoluto",
    type: "Cristal Especial",
    description: "Cristal vermelho poderoso energizado pelo plano energético.",
    effect: "Simula o efeito de um feitiço de 1º círculo de duração instantânea à escolha do criador. Anula efeitos de Álisso, Cristais, Mistura de Minérios e Pacote de Ervas.",
    quantity: 1
  }
];

export const potions: Potion[] = [
  {
    id: "pocao-cura-vida",
    name: "Poção de Cura de Vida",
    description: "Cura ferimentos e restaura a vitalidade.",
    effect: "Cura 3d6 PV.",
    ingredients: ["1 Garrafa de Álcool Absoluto", "1 Pacote de Ervas", "1 Porção de Álisso Ordinário"]
  },
  {
    id: "pocao-cura-mente",
    name: "Poção de Cura de Mente",
    description: "Restaura a sanidade mental.",
    effect: "Cura 3d6 PS.",
    ingredients: ["1 Garrafa de Álcool Absoluto", "1 Pacote de Ervas", "1 Porção de Álisso Absoluto"]
  },
  {
    id: "pocao-fortalecimento-resistencia",
    name: "Poção de Fortalecimento de Resistência",
    description: "Concede resistência física temporária.",
    effect: "+2 Resistência Física por 3 rodadas.",
    ingredients: ["1 Garrafa de Álcool Precário", "1 Porção de Cristais Precários", "1 Flor Morbidus Ordinária"]
  },
  {
    id: "pocao-explosiva-area",
    name: "Poção Explosiva de Área",
    description: "Explosivo líquido incendiário.",
    effect: "Causa 3d6 de dano de fogo em área curta.",
    ingredients: ["1 Garrafa de Álcool Precário", "1 Pacote de Ervas", "1 Porção de Álisso Ordinário"]
  },
  {
    id: "pocao-feitico-instantaneo",
    name: "Poção de Feitiço Instantâneo",
    description: "Simula o efeito de um feitiço de 1º círculo de duração instantânea.",
    effect: "Ativado em área curta.",
    ingredients: ["1 Garrafa de Álcool Precário", "1 Porção de Rubrum Crystallum"]
  },
  {
    id: "pocao-cegueira-area",
    name: "Poção de Cegueira em Área",
    description: "Bomba líquida de luz intensa.",
    effect: "Todos na área curta ficam cegos por 3 rodadas.",
    ingredients: ["1 Garrafa de Álcool Precário", "1 Mistura de Minérios Ordinária", "1 Flor Morbidus Ordinária"]
  }
];
