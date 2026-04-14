export interface TrailLevel {
  level: number;
  name: string;
  description: string;
}

export interface Trail {
  id: string;
  name: string;
  classId: "Combatente" | "Especialista" | "Ocultista";
  description: string;
  levels: TrailLevel[];
}

export const trails: Trail[] = [
  // COMBATENTE
  {
    id: "cacador",
    name: "Caçador",
    classId: "Combatente",
    description: "Em um mundo cheio de predadores sobrenaturais, você decidiu não ser mais uma presa.",
    levels: [
      {
        level: 2,
        name: "Rastrear o Paranormal",
        description: "Você estudou criaturas paranormais o suficiente para saber como identificar seus sinais e seguir seus rastros. Você recebe treinamento em Sobrevivência ou +2 se já for treinado. Pode usar Sobrevivência no lugar de Ocultismo para identificar criaturas e no lugar de Investigação/Percepção para perceber rastros paranormais."
      },
      {
        level: 8,
        name: "Estudar Fraquezas",
        description: "Gaste uma ação de interlúdio estudando fraquezas de um ser específico com uma pista ligada a ele. Receba uma informação útil e +1 em testes contra a criatura até o fim da missão por pista."
      },
      {
        level: 13,
        name: "Golpe Silencioso",
        description: "Não sofre penalidade de –1d20 em Furtividade por se mover normalmente. Penalidade por atacar na mesma rodada reduzida para –1d20. Visibilidade inicial em furtividade é reduzida em 1 ponto."
      },
      {
        level: 20,
        name: "Marcar Alvo",
        description: "Ao usar ANÁLISE DE VULNERABILIDADE contra criatura paranormal ou cultista, transforme o tipo em 'presa'. Receba +0 em testes de perícia, +1 margem de ameaça e multiplicador de crítico, e resistência a dano 5 contra esse tipo de ser."
      }
    ]
  },
  {
    id: "aberração",
    name: "Aberração",
    classId: "Combatente",
    description: "Você propositalmente desfigura e altera seu corpo para que as Entidades o invadam com maior intensidade.",
    levels: [
      {
        level: 2,
        name: "Ser Amaldiçoado",
        description: "Torne-se treinado em Ocultismo (+2 se já for). Escolha um elemento (Sangue, Morte, Conhecimento, Energia). Execute etapa ritualística diária para receber resistência 5 e bônus, com penalidade em perícias específicas."
      },
      {
        level: 8,
        name: "Ser Macabro",
        description: "Resistência a dano do elemento aumenta para 10, penalidade em perícias aumenta para –2d20. Receba efeitos adicionais: Sangue (usa Força para PE, cura 1d8 PV por PE), Morte (+1d20 Intimidação, usa Vigor para PE, 4 turnos morrendo), Conhecimento (+1 Intelecto, usa Intelecto para PE e Enganação), Energia (usa Agilidade para PE, +1d6 dano Energia por PE em ataques corpo a corpo)."
      },
      {
        level: 13,
        name: "Presença Aterrorizante",
        description: "Resistência a dano aumenta para 15, Presença reduzida em 1. Efeitos adicionais: Sangue (50% chance de ignorar dano crítico, mordida 1d8 com ataque extra por 1 PE), Morte (teste de Vigor DT15 para sair de morrendo, recupera 2 PE em crítico/morte), Conhecimento (troca perícia treinada por dados de bônus iguais ao Intelecto), Energia (resistência a químico, recupera PE de fontes elétricas)."
      },
      {
        level: 20,
        name: "Avatar do Medo",
        description: "Efeitos da etapa ritualística tornam-se permanentes, você é considerado criatura paranormal, resistência a dano aumenta para 20. Efeitos adicionais: Sangue (Int –1, For +1, cura 5 PV com mordida, aprende Forma Monstruosa mas deve fazer teste de Vontade ao sofrer dano para não conjurá-lo), Morte (Pre –1, Vig +1, imunidade a dano de Morte, imortal exceto por fogo/Energia, aprende Fim Inevitável), Conhecimento (For –1, Int +1, Percepção às Cegas, aprende ritual de 4º círculo mas perde memória da cena ao usá-lo), Energia (For –1, Agi +1, paira, passa por espaços minúsculos, imune a paralisia física, aprende Deflagração de Energia, não pode usar itens vestidos)."
      }
    ]
  },
  {
    id: "exterminador",
    name: "Exterminador",
    classId: "Combatente",
    description: "Você é treinado para abater alvos com eficiência e velocidade. Suas armas são suas melhores amigas.",
    levels: [
      { level: 2, name: "Arma de Estimação", description: "Escolha uma arma favorita. Sua categoria é reduzida em I." },
      { level: 8, name: "Golpe Assinatura", description: "Categoria reduzida em II. Gaste 2 PE ao atacar para executar efeitos especiais." },
      { level: 13, name: "Técnica Sublime", description: "Adiciona efeitos Letal (+2 margem de ameaça, pode escolher duas vezes para +5) e Perfurante (ignora 5 de resistência a dano)." },
      { level: 20, name: "Máquina de Matar", description: "Categoria reduzida em III, +2 margem de ameaça, dano aumenta em um dado do mesmo tipo." }
    ]
  },
  {
    id: "lutador",
    name: "Lutador",
    classId: "Combatente",
    description: "Você treinou sua musculatura e movimentos a ponto de transformar seu corpo em uma verdadeira arma.",
    levels: [
      { level: 2, name: "Precisão Mortal", description: "+2 na margem de ameaça com todos os ataques corpo a corpo." },
      { level: 8, name: "Revidar", description: "Ao bloquear um ataque, gaste reação e 2 PE para fazer um ataque corpo a corpo no inimigo." },
      { level: 13, name: "Ímpeto Esmagador", description: "Ao acertar ataque corpo a corpo, gaste 1 PE para manobra derrubar ou empurrar como ação livre. Empurrar recebe +5 a cada 10 de dano. Se derrubar e vencer, pode gastar 1 PE para ataque extra contra o alvo caído." },
      { level: 20, name: "Potência Máxima", description: "Com GOLPE FOCADO em armas corpo a corpo, bônus numéricos são dobrados." }
    ]
  },
  {
    id: "operacoes-especiais",
    name: "Operações Especiais",
    classId: "Combatente",
    description: "Você é um combatente eficaz, sempre antevendo os movimentos inimigos.",
    levels: [
      { level: 2, name: "Iniciativa Aprimorada", description: "+5 em Iniciativa e uma ação de movimento adicional na primeira rodada." },
      { level: 8, name: "Ataque Extra", description: "Uma vez por rodada, gaste 2 PE para fazer um ataque adicional." },
      { level: 13, name: "Reflexos Acelerados", description: "Uma vez por rodada, gaste 5 PE para realizar uma ação padrão ou de movimento adicional." },
      { level: 20, name: "Sempre Alerta", description: "Recebe uma ação padrão adicional no início de cada cena de combate." }
    ]
  },
  {
    id: "vanguarda",
    name: "Vanguarda",
    classId: "Combatente",
    description: "Você é duro na queda. Treinou seu corpo para resistir a traumas físicos.",
    levels: [
      { level: 2, name: "Casca Grossa", description: "+1 PV para cada 5% de NEX e soma Vigor na resistência a dano de bloqueio." },
      { level: 8, name: "Cai Dentro", description: "Quando oponente em alcance curto ataca aliado, gaste reação e 1 PE para forçar Vontade (DT Vigor) e redirecionar ataque para você." },
      { level: 13, name: "Duro de Matar", description: "Ao sofrer dano não paranormal, gaste reação e 2 PE para reduzir dano à metade. Nível 17: também para dano paranormal." },
      { level: 20, name: "Titã", description: "Enquanto machucado: +5 Defesa e resistência a dano 5. Enquanto morrendo: não fica indefeso e ainda pode realizar ações." }
    ]
  },

  // ESPECIALISTA
  {
    id: "bibliotecario",
    name: "Bibliotecário",
    classId: "Especialista",
    description: "Poucas pessoas leem tanto quanto você. Seu vasto conhecimento é muitas vezes a única solução.",
    levels: [
      { level: 2, name: "Conhecimento Prático", description: "Gaste 2 PE para usar Intelecto como atributo-base em qualquer perícia (exceto Luta/Pontaria)." },
      { level: 8, name: "Leitor Contumaz", description: "Dados de bônus da ação ler aumentam para 1d8 e podem ser usados em qualquer perícia. Gaste 2 PE para adicionar +1 dado." },
      { level: 13, name: "Mestre dos Arquivos", description: "Em ambiente com muitos livros, receba benefícios de uma ação de interlúdio (ler ou revisar caso) em uma rodada, uma vez por cena." },
      { level: 20, name: "A Força do Saber", description: "Intelecto +1, soma Intelecto no total de PE, escolha uma perícia para usar Intelecto como atributo-base." }
    ]
  },
  {
    id: "sobrevivente",
    name: "Sobrevivente",
    classId: "Especialista",
    description: "Você sabe que é um sobrevivente. Possui o espírito necessário para perseverar onde todos os outros caíram.",
    levels: [
      { level: 2, name: "Adaptação Rápida", description: "Gaste 2 PE para rolar novamente um dos dados de um teste recém-realizado (uma vez por teste)." },
      { level: 8, name: "Fuga Obstinada", description: "+1d20 em testes para fugir. Em perseguições como presa, pode acumular até 4 falhas antes de ser pego." },
      { level: 13, name: "Determinação Inquestionável", description: "Uma vez por cena, gaste 5 PE e ação padrão para remover uma condição de medo, mental ou paralisia." },
      { level: 20, name: "Recusa em Cair...", description: "Uma vez por rodada, quando dano reduziria PV a 0, gaste 5 PE para ficar com 1 PV. Não funciona contra dano massivo." }
    ]
  },
  {
    id: "terapeuta-do-oculto",
    name: "Terapeuta do Oculto",
    classId: "Especialista",
    description: "Você descobriu que o paranormal pode ser usado para sanar. (Requer Profissão: psicólogo)",
    levels: [
      { level: 2, name: "Tratamento Mental", description: "Use Profissão (psicólogo) como Diplomacia. Uma vez por rodada, quando aliado falha teste de resistência contra dano mental, gaste 2 PE para substituir pelo seu teste de Profissão." },
      { level: 8, name: "Palavras-chave", description: "Ao acalmar, gaste PE (até seu limite) para curar 1 Sanidade por PE gasto na pessoa tratada." },
      { level: 13, name: "Reprogramação Mental", description: "Gaste 5 PE e ação de interlúdio para conceder a pessoa voluntária um poder geral, da própria classe ou primeiro poder de outra trilha até o próximo interlúdio." },
      { level: 20, name: "A Sanidade Está Lá Fora", description: "Gaste ação de movimento e 5 PE para remover todas as condições de medo ou mentais de uma pessoa adjacente." }
    ]
  },
  {
    id: "atirador-de-elite",
    name: "Atirador de Elite",
    classId: "Especialista",
    description: "Um tiro, uma morte. Você é especialista em neutralizar ameaças de longe.",
    levels: [
      { level: 2, name: "Olhos de Águia", description: "Proficiência com armas de fogo que usam balas longas e soma Intelecto no dano com essas armas." },
      { level: 8, name: "Tiro Fatal", description: "Ao mirar, gaste 1 PE para aumentar em +2 a margem de ameaça do próximo ataque." },
      { level: 13, name: "Projétil de Força", description: "Com arma de fogo calibre grosso, gaste 2 PE para fazer manobras (derrubar, desarmar, empurrar, quebrar) com ataque à distância." },
      { level: 20, name: "Atirar para Matar", description: "Acerto crítico com arma de fogo causa dano máximo, sem rolar dados." }
    ]
  },
  {
    id: "fantasma",
    name: "Fantasma",
    classId: "Especialista",
    description: "Você é especialista em infiltração e sabe neutralizar alvos desprevenidos sem causar alarde.",
    levels: [
      { level: 2, name: "Ataque Furtivo", description: "Gaste 1 PE para causar +1d6 dano contra alvo desprevenido ou flanqueado. Aumenta para 2d6 (N8), 3d6 (N13), 4d6 (N20)." },
      { level: 8, name: "Gatuno", description: "+5 em Atletismo e Crime. Pode se mover deslocamento normal ao se esconder sem penalidade." },
      { level: 13, name: "Golpe de Misericórdia", description: "Gaste ação de movimento e 3 PE para analisar alvo. Primeiro Ataque Furtivo causa dados dobrados e pode deixar alvo inconsciente ou morrendo (Fortitude DT Agi evita)." },
      { level: 20, name: "Sombra Fugaz", description: "Ao fazer teste de Furtividade após ação chamativa, gaste 3 PE para não sofrer penalidade de –15." }
    ]
  },
  {
    id: "socorrista-de-combate",
    name: "Socorrista de Combate",
    classId: "Especialista",
    description: "Você é treinado em técnicas de primeiros socorros no campo de batalha. (Requer Medicina e kit de medicina)",
    levels: [
      { level: 2, name: "Primeiros Socorros", description: "Ação padrão e 2 PE para curar 2d10 PV em aliado adjacente. Aumenta +1d10 em níveis 8, 65%, 99% com +1 PE por dado extra." },
      { level: 8, name: "Tratamento de Choque", description: "Ação padrão e 2 PE para remover uma condição negativa (exceto morrendo) de aliado adjacente." },
      { level: 13, name: "Resgate", description: "Aproxime-se de aliado machucado/morrendo em alcance curto com ação livre. Ao curar, ambos recebem +5 Defesa até próximo turno. Espaços para carregar personagem reduzidos à metade." },
      { level: 20, name: "Desfibrilação", description: "Uma vez por cena, ação completa e 10 PE para reviver personagem morto na mesma cena (exceto dano massivo)." }
    ]
  },
  {
    id: "engenheiro-tatico",
    name: "Engenheiro Tático",
    classId: "Especialista",
    description: "Sua principal habilidade é a manutenção e reparo do valioso equipamento.",
    levels: [
      { level: 2, name: "Inventário Otimizado", description: "Soma Intelecto à Força para calcular capacidade de carga." },
      { level: 8, name: "Remendão", description: "Ação completa e 1 PE para remover condição quebrado de equipamento adjacente até o fim da cena. Equipamentos gerais têm categoria reduzida em I para você." },
      { level: 13, name: "Gambiarra", description: "Ação completa e 2 PE (+2 PE por categoria) para criar versão funcional de equipamento geral. Torna-se inútil ao fim da cena." },
      { level: 20, name: "Conjuração Instintiva para Tudo", description: "Ação de movimento e 3 PE por categoria para 'lembrar' que tem um item qualquer (exceto armas) no fundo da bolsa." }
    ]
  },

  // OCULTISTA
  {
    id: "canalizador",
    name: "Canalizador",
    classId: "Ocultista",
    description: "Você domina os aspectos fundamentais da conjuração de rituais.",
    levels: [
      { level: 2, name: "Expansão Mística", description: "Gaste +2 PE para aumentar alcance do ritual em um passo ou dobrar área de efeito." },
      { level: 8, name: "Conjuração Rápida", description: "Uma vez por rodada, aumente custo do ritual em 4 PE para conjurá-lo como ação livre." },
      { level: 13, name: "Contra-Mágica", description: "Quando alvo de ritual, gaste PE igual ao custo pago e faça teste oposto de Ocultismo para anular o ritual." },
      { level: 20, name: "Fluxo do Terror", description: "Aprende o ritual Fluxo do Terror." }
    ]
  },
  {
    id: "sanguinario",
    name: "Sanguinário",
    classId: "Ocultista",
    description: "Dor é um poderoso catalisador paranormal e você aprendeu a transformá-la em poder.",
    levels: [
      { level: 2, name: "Magia de Sangue", description: "Gaste 2 PV por PE para pagar custo de rituais. PV gastos só recuperam com descanso." },
      { level: 8, name: "Masoquismo Místico", description: "Ao sofrer dano não paranormal, gaste reação e 2 PE para reduzir dano à metade." },
      { level: 13, name: "Devorar Sofrimento", description: "Ao reduzir inimigos a 0 PV com ritual, receba PE temporários igual ao círculo do ritual." },
      { level: 20, name: "Terror Materializado", description: "Aprende o ritual Terror Materializado." }
    ]
  },
  {
    id: "erudito-do-oculto",
    name: "Erudito do Oculto",
    classId: "Ocultista",
    description: "Você foca seus estudos em se tornar um conjurador versátil e poderoso.",
    levels: [
      { level: 2, name: "Conhecimento Expandido", description: "Aprende um ritual de 1º círculo. A cada novo círculo, aprende um ritual adicional daquele círculo (não conta no limite)." },
      { level: 8, name: "Tomo de Poder", description: "Cria grimório que armazena rituais de 1º ou 2º círculo igual ao seu Intelecto. Para conjurar, precisa empunhar grimório e gastar ação completa folheando." },
      { level: 13, name: "Conjuração Perfeita", description: "DT para resistir a todos os seus rituais aumenta em +5." },
      { level: 20, name: "Compreensão do Terror", description: "Aprende o ritual Compreensão do Terror." }
    ]
  },
  {
    id: "mistico-inato",
    name: "Místico Inato",
    classId: "Ocultista",
    description: "Você preparou sua mente para resistir aos efeitos do Outro Lado.",
    levels: [
      { level: 2, name: "Blindagem Mental", description: "Resistência paranormal +5 (+5 em testes de resistência contra efeitos paranormais)." },
      { level: 8, name: "Aura Magnética", description: "Adiciona Presença ao limite de PE por turno (apenas para conjurar rituais)." },
      { level: 13, name: "Fortaleza Psíquica", description: "Resistência a dano mental e paranormal 10. Quando passa em teste de Vontade para reduzir dano paranormal à metade, não sofre dano." },
      { level: 20, name: "Aura de Terror", description: "Aprende o ritual Aura de Terror." }
    ]
  },
  {
    id: "guerreiro-arcano",
    name: "Guerreiro Arcano",
    classId: "Ocultista",
    description: "Você prefere usar o paranormal como uma arma, mesclando conjuração com combate.",
    levels: [
      { level: 2, name: "Arma Encantada", description: "Aprende Amaldiçoar Arma (custo reduzido em –1 PE se já conhece). Pode usar Ocultismo para testes de ataque com a arma amaldiçoada." },
      { level: 8, name: "Combatente Místico", description: "Ao acertar ataque corpo a corpo em inimigo, recebe 2 PE temporários (máximo por cena igual ao limite de PE)." },
      { level: 13, name: "Magia de Combate", description: "Uma vez por rodada, ao lançar ritual com ação padrão, gaste 2 PE para fazer ataque corpo a corpo como ação livre." },
      { level: 20, name: "Golpe Aterrorizante", description: "Aprende o ritual Golpe Aterrorizante." }
    ]
  }
];