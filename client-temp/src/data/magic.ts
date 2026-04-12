// ════════════════════════════════════════════════════════════════════
// SISTEMA DE MAGIA - Amuletos, Ingredientes e Poções
// Design: Dark Fantasy Manga com verde neon
// ════════════════════════════════════════════════════════════════════

export interface MagicItem {
  id: string;
  name: string;
  type: "amulet" | "ingredient" | "potion";
  description: string;
  effect: string;
  quantity?: number;
  rarity?: "precária" | "ordinária" | "absoluta";
}

export interface MagicInventoryItem extends MagicItem {
  quantity: number;
}

// ════════════════════════════════════════════════════════════════════
// AMULETOS BÁSICOS
// ════════════════════════════════════════════════════════════════════

export const amulets: MagicItem[] = [
  {
    id: "amulet-1",
    name: "Amuleto de Proteção",
    type: "amulet",
    description: "Um amuleto antigo que oferece proteção contra o mal.",
    effect: "+2 em testes de resistência a magia",
  },
  {
    id: "amulet-2",
    name: "Amuleto de Sorte",
    type: "amulet",
    description: "Traz boa sorte ao portador.",
    effect: "+1 em um teste por dia",
  },
  {
    id: "amulet-3",
    name: "Amuleto de Vitalidade",
    type: "amulet",
    description: "Restaura a energia vital.",
    effect: "+5 PV máximo",
  },
];

// ════════════════════════════════════════════════════════════════════
// INGREDIENTES MÁGICOS
// ════════════════════════════════════════════════════════════════════

export const ingredients: MagicItem[] = [
  // ÁLCOOL
  {
    id: "ingredient-alcool-precario",
    name: "Álcool Precário",
    type: "ingredient",
    rarity: "precária",
    description: "Base comum de poção.",
    effect: "A poção se torna arremessável e se espalha em área curta.",
    quantity: 3,
  },
  {
    id: "ingredient-alcool-ordinario",
    name: "Álcool Ordinário",
    type: "ingredient",
    rarity: "ordinária",
    description: "Álcool padrão de preparo alquímico.",
    effect: "Continua arremessável, mas atinge apenas um alvo em vez de área.",
    quantity: 2,
  },
  {
    id: "ingredient-alcool-absoluto",
    name: "Álcool Absoluto",
    type: "ingredient",
    rarity: "absoluta",
    description: "Destilação refinada.",
    effect: "A poção pode ser consumida diretamente por um alvo específico ou usar os efeitos das versões anteriores.",
    quantity: 1,
  },

  // SUCATA
  {
    id: "ingredient-sucata-precaria",
    name: "Sucata Precária",
    type: "ingredient",
    rarity: "precária",
    description: "Material simples.",
    effect: "Usado apenas para itens sem finalidade destrutiva.",
    quantity: 3,
  },
  {
    id: "ingredient-sucata-ordinaria",
    name: "Sucata Ordinária",
    type: "ingredient",
    rarity: "ordinária",
    description: "Material de qualidade moderada.",
    effect: "Permite criar itens capazes de causar dano, mas ainda moderados.",
    quantity: 2,
  },
  {
    id: "ingredient-sucata-absoluta",
    name: "Sucata Absoluta",
    type: "ingredient",
    rarity: "absoluta",
    description: "Metal refinado.",
    effect: "Ideal para itens destrutivos ou de grande eficiência.",
    quantity: 1,
  },

  // ÁLISSO
  {
    id: "ingredient-alisso-precario",
    name: "Álisso Precário",
    type: "ingredient",
    rarity: "precária",
    description: "Essência frágil da planta álisso.",
    effect: "Concede 2d4 de dano físico ao item.",
    quantity: 3,
  },
  {
    id: "ingredient-alisso-ordinario",
    name: "Álisso Ordinário",
    type: "ingredient",
    rarity: "ordinária",
    description: "Álisso fresco e de boa qualidade.",
    effect: "Dados aumentam para 2d6. Pode causar dano elemental em vez de físico. Pode substituir o efeito por cura de PV.",
    quantity: 2,
  },
  {
    id: "ingredient-alisso-absoluto",
    name: "Álisso Absoluto",
    type: "ingredient",
    rarity: "absoluta",
    description: "Colhido sob condições raras.",
    effect: "Permite substituir o efeito por cura de PS ou causar dano.",
    quantity: 1,
  },

  // CRISTAIS
  {
    id: "ingredient-cristal-precario",
    name: "Cristais Precários",
    type: "ingredient",
    rarity: "precária",
    description: "Fragmentos instáveis.",
    effect: "Concede 2 de resistência a dano físico ou balístico.",
    quantity: 3,
  },
  {
    id: "ingredient-cristal-ordinario",
    name: "Cristais Ordinários",
    type: "ingredient",
    rarity: "ordinária",
    description: "Cristais mais estáveis.",
    effect: "Concede 4 de resistência a dano físico, balístico ou elemental.",
    quantity: 2,
  },
  {
    id: "ingredient-cristal-absoluto",
    name: "Cristais Absolutos",
    type: "ingredient",
    rarity: "absoluta",
    description: "Cristais refinados.",
    effect: "Concede 6 de resistência a dano físico, balístico, elemental ou paranormal.",
    quantity: 1,
  },

  // MISTURA DE MINÉRIOS
  {
    id: "ingredient-minerios-precaria",
    name: "Mistura de Minérios Precária",
    type: "ingredient",
    rarity: "precária",
    description: "Mistura volátil.",
    effect: "Causa uma condição até o início da próxima rodada: Caído, Imóvel ou Queimando.",
    quantity: 1,
  },
  {
    id: "ingredient-minerios-ordinaria",
    name: "Mistura de Minérios Ordinária",
    type: "ingredient",
    rarity: "ordinária",
    description: "Mistura equilibrada.",
    effect: "Pode aplicar até o final da próxima rodada: Cego, Eletrocutado ou Envenenado.",
    quantity: 1,
  },
  {
    id: "ingredient-minerios-absoluta",
    name: "Mistura de Minérios Absoluta",
    type: "ingredient",
    rarity: "absoluta",
    description: "Fusão mineral refinada.",
    effect: "Adiciona novas condições: Atordoado, Furtivo ou Indefeso.",
    quantity: 1,
  },

  // PACOTE DE ERVAS
  {
    id: "ingredient-ervas",
    name: "Pacote de Ervas",
    type: "ingredient",
    description: "Mistura de flores, musgos e plantas medicinais.",
    effect: "Aumenta em +1 a quantidade de dados do efeito do item (caso ele possua dados).",
    quantity: 1,
  },

  // FLOR MORBIDUS
  {
    id: "ingredient-flor-precaria",
    name: "Flor Morbidus Precária",
    type: "ingredient",
    rarity: "precária",
    description: "Flor rara e delicada.",
    effect: "Adiciona +2 rodadas de duração ao efeito do item. Penalidade: o usuário perde 1 PE.",
    quantity: 2,
  },
  {
    id: "ingredient-flor-ordinaria",
    name: "Flor Morbidus Ordinária",
    type: "ingredient",
    rarity: "ordinária",
    description: "Flor de qualidade moderada.",
    effect: "Aumenta a duração do efeito para 3 rodadas, sem drenagem.",
    quantity: 1,
  },
  {
    id: "ingredient-flor-absoluta",
    name: "Flor Morbidus Absoluta",
    type: "ingredient",
    rarity: "absoluta",
    description: "Flor perfeita e radiante.",
    effect: "Todos os efeitos do item duram 4 rodadas.",
    quantity: 1,
  },

  // RUBRUM CRYSTALLUM
  {
    id: "ingredient-rubrum",
    name: "Rubrum Crystallum",
    type: "ingredient",
    description: "Cristal vermelho poderoso energizado pelo plano energético.",
    effect: "Ao ser colocado em uma poção, ela simula o efeito de um feitiço de 1º círculo de duração instantânea à escolha do criador.",
    quantity: 1,
  },
];

// ════════════════════════════════════════════════════════════════════
// FÓRMULAS DE POÇÕES
// ════════════════════════════════════════════════════════════════════

export const potions: MagicItem[] = [
  {
    id: "potion-cura-vida",
    name: "Poção de Cura de Vida",
    type: "potion",
    description: "Cura ferimentos e restaura a vitalidade do usuário.",
    effect: "Cura 3d6 PV em quem consumir.",
  },
  {
    id: "potion-cura-mente",
    name: "Poção de Cura de Mente",
    type: "potion",
    description: "Restaura a sanidade mental do consumidor.",
    effect: "Cura 3d6 PS.",
  },
  {
    id: "potion-fortalecimento",
    name: "Poção de Fortalecimento de Resistência",
    type: "potion",
    description: "Concede resistência física temporária.",
    effect: "+2 Resistência Física por 3 rodadas.",
  },
  {
    id: "potion-explosiva",
    name: "Poção Explosiva de Área",
    type: "potion",
    description: "Explosivo líquido incendiário.",
    effect: "Causa 3d6 de dano de fogo em área curta.",
  },
  {
    id: "potion-feitico",
    name: "Poção de Feitiço Instantâneo",
    type: "potion",
    description: "Simula o efeito de um feitiço de 1º círculo de duração instantânea.",
    effect: "Ativado em área curta.",
  },
  {
    id: "potion-cegueira",
    name: "Poção de Cegueira em Área",
    type: "potion",
    description: "Bomba líquida de luz intensa.",
    effect: "Todos na área curta ficam cegos por 3 rodadas.",
  },
];

// ════════════════════════════════════════════════════════════════════
// FUNÇÕES AUXILIARES
// ════════════════════════════════════════════════════════════════════

export function getAllMagicItems(): MagicItem[] {
  return [...amulets, ...ingredients, ...potions];
}

export function getMagicItemsByType(type: "amulet" | "ingredient" | "potion"): MagicItem[] {
  const all = getAllMagicItems();
  return all.filter((item) => item.type === type);
}
