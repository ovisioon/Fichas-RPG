// Fase 3 — Habilidades do RPG com Trilhas em Níveis

export interface Ability {
  id: string;
  name: string;
  description: string;
  cost?: string;
  prerequisite?: string;
}

export interface PathLevel {
  level: number;
  abilities: Ability[];
}

export interface Path {
  name: string;
  levels: PathLevel[];
}

export interface ClassAbilities {
  name: string;
  generalAbilities: Ability[];
  paths: Path[];
}

export const ABILITIES: Record<string, ClassAbilities> = {
  combatente: {
    name: "Combatente",
    generalAbilities: [
      {
        id: "c1",
        name: "FÚRIA INCONTIDA",
        description:
          "Você pode gastar 3 PE para entrar em um estado de fúria por 3 rodadas. Durante a fúria, você ganha +2 em rolagens de dano corpo a corpo e resistência a dano físico 2, mas não pode conjurar rituais",
        cost: "3 PE",
      },
      {
        id: "c2",
        name: "INVESTIDA DESTRUTIVA",
        description:
          "Quando você se move pelo menos 6 metros em linha reta antes de atacar, pode gastar 2 PE para adicionar +1d8 de dano ao seu ataque.",
        cost: "2 PE",
      },
      {
        id: "c3",
        name: "VITALIDADE MACABRA",
        description:
          "Você pode conjurar um dos seus rituais de Maldição pagando PV iguais aos PE que você pegaria normalmente pelo ritual, o Compactuado também afeta esse custo de PV.",
      },
      {
        id: "c4",
        name: "GOLPE FOCADO",
        description:
          "Quando faz um ataque, você pode gastar 2 PE para receber +5 no teste de ataque ou na rolagem de dano. Conforme avança de NEX, você pode gastar +1 PE para receber mais bônus de +5.",
        cost: "2+ PE",
      },
      {
        id: "c5",
        name: "ATAQUE OPORTUNO",
        description: "Você gasta 2 PE para executar um GOLPE ADICIONAL na mesma rodada.",
        cost: "2 PE",
      },
      {
        id: "c6",
        name: "AMANTE DA VIOLÊNCIA",
        description:
          "Você pode gastar 2 PE e por 4 Rodadas, todos os seus testes de ataque e manobras e seus de dano recebem um bônus de +2 no modificador.",
        cost: "2 PE",
      },
      {
        id: "c7",
        name: "DETERMINAÇÃO FORTALEZA PSÍQUICA",
        description:
          "Você gasta 3 PE para ganhar +1 no modificador contra testes que vão contra sua Sanidade, e você ganha resistência 5 a dano de sua Sanidade após fazer o teste.",
        cost: "3 PE",
      },
      {
        id: "c8",
        name: "TÉCNICA IMPREVISÍVEL",
        description: "Você pode executar manobras mesmo se suas mãos estiverem ocupadas.",
      },
      {
        id: "c9",
        name: "TREINAMENTO ATLÉTICO",
        description: "Em um teste relacionado à Atletismo você pode rolar com vantagem",
      },
      {
        id: "c10",
        name: "MESTRE DE ARMAS",
        description:
          "Você pode escolher uma das categorias de arma, sendo Corpo A Corpo ou Precisão e você adiciona 1 dado a mais da arma em dano do mesmo tipo",
      },
      {
        id: "c11",
        name: "DEMÔNIO DO SUBMUNDO",
        description:
          "Caso o inimigo se desloque a 2 metros gaste 2 PE para executar um ataque no mesmo e caso for crítico você interrompe seu deslocamento e ele fica na posição onde tomou o ataque",
        cost: "2 PE",
      },
      {
        id: "c12",
        name: "COMBATE AMBIDESTRO",
        description: "Com uma arma leve em cada mão, você pode executar um GOLPE ADICIONAL com a segunda arma",
      },
      {
        id: "c13",
        name: "INFLUÊNCIA CORPORAL",
        description:
          "Você pode usar traços relacionados ao seu corpo em vez de traços relacionados a presença para intimidar alguém",
      },
      {
        id: "c14",
        name: "ÍMPETO ASSASSINO",
        description:
          "Ao finalizar um inimigo você pode executar um ataque logo após em outro inimigo ao alcance de sua arma",
      },
      {
        id: "c15",
        name: "DEFESA IMPENETRÁVEL",
        description:
          "Gastando sua reação e 3 PE, você ganha resistência 5 a danos físicos até o final da sua próxima rodada",
        cost: "3 PE",
      },
      {
        id: "c16",
        name: "VIGOR SOBRE-HUMANO",
        description:
          "Quando você rolar 1d20 para um teste relacionado ao seu corpo e cair 19, gaste 1 PE para o tornar um crítico.",
        cost: "1 PE",
      },
      {
        id: "c17",
        name: "VIDA LONGA AO REI",
        description:
          "Quando você cair com 0 PV ou entrar no estado morrendo, gaste 2 PE para você levantar com 5 PV",
        cost: "2 PE",
      },
      {
        id: "c18",
        name: "PUNHOS DE FERRO",
        description:
          "Seus socos naturalmente causam 1d6 de dano e são considerados Armas Brancas e conta como duas armas leves cada, você pode usar talentos que só funcionam em arma em seus punhos seguindo seus pré-requisitos.",
      },
      {
        id: "c19",
        name: "MANIFESTAÇÃO SOBRENATURAL",
        description:
          "Você expõe a forma física do seu pacto adicionando +1d6 de dano paranormal somado a primeira arma que estiver em sua mão é aos seus danos físicos pelo resto do combate",
      },
      {
        id: "c20",
        name: "LÍDER TÁTICO",
        description:
          "Gaste 3 PE para coordenar seus aliados durante um combate, escolha para até três aliados uma das seguintes posições: Linha de Frente (+1d4 em testes de manobra), Artilharia (+1d4 de Dano), ou Médico de batalha (+1d4 em testes para auxiliar).",
        cost: "3 PE",
      },
      {
        id: "c21",
        name: "GOLPE DO OUTRO LADO",
        description:
          "Você pode gastar 2 PE para receber uma quantidade de dano extra igual a +2 para cada Defeito atual do seu personagem até o começo do seu próximo turno.",
        cost: "2 PE",
      },
      {
        id: "c22",
        name: "ASSIMILAÇÃO CARNAL",
        description:
          "Ao ver alguém morrendo que não seja uma criatura paranormal, você pode gastar 2 PE para roubar parte da carne do mesmo para se recuperar, recuperando 1d8 PV",
        cost: "2 PE",
      },
      {
        id: "c23",
        name: "MENTE BLINDADA",
        description:
          "Para cada defeito mental do seu personagem, você ganha +1 na sua Defesa passiva quando estiver sem armadura.",
      },
      {
        id: "c24",
        name: "Armamento Pesado",
        description: "Você recebe proficiência com armas pesadas.",
        prerequisite: "Força 2",
      },
      {
        id: "c25",
        name: "Artista Marcial",
        description:
          "Seus ataques desarmados causam 1d6 pontos de dano. Em Nível 7, o dano aumenta para 1d8 e, em Nível 14, para 1d10.",
      },
      {
        id: "c26",
        name: "ESTILO DE DUAS LÂMINAS",
        description:
          "Se estiver usando duas armas (e pelo menos uma for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –1D20 em todos os testes de ataque até o seu próximo turno.",
        prerequisite: "Agilidade 3, treinado em Luta ou Pontaria",
      },
      {
        id: "c27",
        name: "POSTURA CAUTELOSA",
        description:
          "Quando usa a ação agredir, você pode combater defensivamente. Se fizer isso, até seu próximo turno, sofre –1D20 em todos os testes de ataque, mas recebe +5 na Defesa.",
        prerequisite: "Inteligência 2",
      },
      {
        id: "c28",
        name: "Golpe Pesado",
        description: "O dano de suas armas corpo a corpo aumenta em mais um dado do mesmo tipo.",
      },
      {
        id: "c29",
        name: "Incansável",
        description:
          "Uma vez por cena, você pode gastar 2 PE para fazer uma ação de investigação adicional, mas deve usar Força ou Agilidade como atributo-base do teste.",
        cost: "2 PE",
      },
      {
        id: "c30",
        name: "AGILIDADE TÁTICA",
        description:
          "Quando faz um teste de facilitar a investigação, você pode gastar 1 PE para usar Força ou Agilidade no lugar do atributo-base da perícia. Se passar no teste, o próximo aliado que usar seu bônus também recebe +1D20 no teste.",
        cost: "1 PE",
      },
      {
        id: "c31",
        name: "TREINAMENTO EM ARMADURAS PESADAS",
        description: "Você recebe proficiência com Proteções Pesadas.",
        prerequisite: "Nível 6",
      },
      {
        id: "c32",
        name: "Reflexos Defensivos",
        description: "Você recebe +2 em Defesa e em testes de resistência.",
        prerequisite: "Agilidade 2",
      },
      {
        id: "c33",
        name: "Saque Rápido",
        description:
          "Você pode sacar ou guardar itens como uma ação livre. Uma vez por rodada pode recarregar uma arma de disparo como uma ação livre.",
        prerequisite: "treinado em Iniciativa",
      },
      {
        id: "c34",
        name: "RAJADA CONTÍNUA",
        description:
          "Sempre que acerta um ataque com uma arma de fogo, pode fazer outro ataque com a mesma arma contra o mesmo alvo, pagando 2 PE por cada ataque já realizado no turno.",
        prerequisite: "Nível 12",
        cost: "2+ PE",
      },
      {
        id: "c35",
        name: "ANÁLISE DE COMBATE",
        description:
          "Você pode gastar uma ação de movimento e 2 PE para analisar o ambiente. Se fizer isso, recebe um bônus em Defesa e em testes de resistência igual ao seu Intelecto até o final da cena.",
        prerequisite: "treinado em Percepção e Tática",
        cost: "2 PE",
      },
      {
        id: "c36",
        name: "Tanque de Guerra",
        description:
          "Se estiver usando uma TREINAMENTO EM ARMADURAS PESADAS, a Defesa e a resistência a dano que ela fornece aumentam em +2.",
        prerequisite: "TREINAMENTO EM ARMADURAS PESADAS",
      },
      {
        id: "c37",
        name: "MIRA AFIADA",
        description:
          "Se estiver usando uma arma de disparo, você soma sua Agilidade nas rolagens de dano e ignora a penalidade contra alvos envolvidos em combate corpo a corpo.",
        prerequisite: "treinado em Pontaria",
      },
      {
        id: "c38",
        name: "FOGO DE SUPRESSÃO",
        description:
          "Você pode gastar uma ação padrão e 1 PE para disparar uma arma de fogo para forçar um personagem a se proteger. Se vencer no teste de Pontaria contra a Vontade do alvo, até o início do seu próximo turno o alvo não pode sair do lugar e sofre –5 em testes de ataque.",
        cost: "1 PE",
      },
      {
        id: "c39",
        name: "DOR MANTENEDORA",
        description:
          "Você não fica inconsciente por estar morrendo, mas sempre que terminar uma rodada nesta condição e consciente, perde 2 pontos de Sanidade",
      },
      {
        id: "c40",
        name: "MÁRTIR DO GRUPO",
        description:
          "Quando usa a ação sacrifício em uma cena de perseguição, você pode gastar 1 PE para fornecer +1D20 extra nos testes dos outros personagens.",
        cost: "1 PE",
      },
      {
        id: "c41",
        name: "Instinto de Fuga",
        description:
          "Quando uma cena de perseguição tem início, você recebe +2 em todos os testes de perícia que fizer durante a cena.",
        prerequisite: "treinado em Intuição",
      },
      {
        id: "c42",
        name: "DESPERTAR PARANORMAL",
        description:
          "Escolha um poder paranormal. Você recebe o poder escolhido, mas não ganha Sanidade neste aumento de NEX. Você pode escolher este poder várias vezes.",
      },
      {
        id: "c43",
        name: "Treinamento em Perícia",
        description:
          "Escolha duas perícias. Você se torna treinado nessas perícias. A partir de Nível 7, você pode escolher perícias nas quais já é treinado para se tornar veterano.",
      },
    ],
    paths: [
      {
        name: "Trilha de Armas",
        levels: [
          {
            level: 1,
            abilities: [
              {
                id: "ca1-1",
                name: "Maestria em Armas de Fogo - Nível 1",
                description:
                  "Você recebe proficiência com armas táticas de fogo e +1 em rolagens de dano com essas armas.",
              },
            ],
          },
          {
            level: 2,
            abilities: [
              {
                id: "ca1-2",
                name: "Maestria em Armas de Fogo - Nível 2",
                description:
                  "Você recebe proficiência com armas táticas de fogo e +2 em rolagens de dano com essas armas.",
              },
            ],
          },
          {
            level: 3,
            abilities: [
              {
                id: "ca1-3",
                name: "Maestria em Armas de Fogo - Nível 3",
                description:
                  "Você recebe proficiência com armas táticas de fogo e +3 em rolagens de dano com essas armas.",
              },
            ],
          },
          {
            level: 4,
            abilities: [
              {
                id: "ca1-4",
                name: "Maestria em Armas de Fogo - Nível 4",
                description:
                  "Você recebe proficiência com armas táticas de fogo e +4 em rolagens de dano com essas armas.",
              },
            ],
          },
          {
            level: 5,
            abilities: [
              {
                id: "ca1-5",
                name: "Maestria em Armas de Fogo - Nível 5",
                description:
                  "Você recebe proficiência com armas táticas de fogo e +5 em rolagens de dano com essas armas.",
              },
            ],
          },
        ],
      },
      {
        name: "Trilha de Defesa",
        levels: [
          {
            level: 1,
            abilities: [
              {
                id: "cd1-1",
                name: "Esconderijo Desesperado - Nível 1",
                description:
                  "Você já esteve diante de coisas que não podem ser derrotadas. Você não sofre –1D20 em testes de Furtividade por se mover ao seu deslocamento normal.",
              },
            ],
          },
          {
            level: 2,
            abilities: [
              {
                id: "cd1-2",
                name: "Esconderijo Desesperado - Nível 2",
                description:
                  "Você já esteve diante de coisas que não podem ser derrotadas. Você não sofre –1D20 em testes de Furtividade por se mover ao seu deslocamento normal e recebe +1 em testes de Furtividade.",
              },
            ],
          },
          {
            level: 3,
            abilities: [
              {
                id: "cd1-3",
                name: "Esconderijo Desesperado - Nível 3",
                description:
                  "Você já esteve diante de coisas que não podem ser derrotadas. Você não sofre –1D20 em testes de Furtividade por se mover ao seu deslocamento normal e recebe +2 em testes de Furtividade.",
              },
            ],
          },
          {
            level: 4,
            abilities: [
              {
                id: "cd1-4",
                name: "Esconderijo Desesperado - Nível 4",
                description:
                  "Você já esteve diante de coisas que não podem ser derrotadas. Você não sofre –1D20 em testes de Furtividade por se mover ao seu deslocamento normal e recebe +3 em testes de Furtividade.",
              },
            ],
          },
          {
            level: 5,
            abilities: [
              {
                id: "cd1-5",
                name: "Esconderijo Desesperado - Nível 5",
                description:
                  "Você já esteve diante de coisas que não podem ser derrotadas. Você não sofre –1D20 em testes de Furtividade por se mover ao seu deslocamento normal e recebe +4 em testes de Furtividade.",
              },
            ],
          },
        ],
      },
    ],
  },

  especialista: {
    name: "Especialista",
    generalAbilities: [
      {
        id: "e1",
        name: "MENTE ANALÍTICA",
        description:
          "Uma vez por cena, você pode observar um inimigo por uma rodada completa. No seu próximo turno, seus ataques contra esse inimigo têm vantagem e causam +1d6 de dano extra.",
      },
      {
        id: "e2",
        name: "GAMBIARRA EXPLOSIVA",
        description:
          "Gastando 3 PE e uma ação completa, você pode transformar um item eletrônico comum em uma granada improvisada que causa 3d6 de dano em área (raio de 3m).",
        cost: "3 PE",
      },
      {
        id: "e3",
        name: "CONCENTRAÇÃO EXTREMA",
        description:
          "Quando conjurar um ritual que precisa de um teste de resistência do alvo, você pode gastar 1 PE para adicionar +2 na DT do teste temporariamente.",
        cost: "1+ PE",
      },
      {
        id: "e4",
        name: "ESPECIALISTA NATO",
        description:
          "Escolha duas perícias nas quais você é treinado. Quando faz um teste de uma dessas perícias, você pode gastar 2 PE para somar +1d6 no resultado do teste.",
        cost: "2+ PE",
      },
      {
        id: "e5",
        name: "REAÇÃO ANÔMALA",
        description: "Você pode usar sua reação para aderir +2 na sua Defesa.",
      },
      {
        id: "e6",
        name: "MOVIMENTAÇÃO ESPECTRAL",
        description:
          "Você consegue se contorcer e se movimentar de forma tão esguia que nenhuma outra pessoa consegue. Você recebe vantagem em testes para passar por terrenos difíceis.",
      },
      {
        id: "e7",
        name: "CONHECIMENTO GERAL",
        description:
          "Quando faz um teste de uma perícia, você pode gastar 2 PE para receber os benefícios de ser treinado nesta perícia",
        cost: "2 PE",
      },
      {
        id: "e8",
        name: "CONJURAÇÃO INSTINTIVA",
        description:
          "Você não paga o custo do primeiro ritual que você usar em uma cena de combate.",
      },
      {
        id: "e9",
        name: "ÂNCORA ESPIRITUAL",
        description:
          "Você pode sustentar dois rituais simultaneamente desde que você pague o custo de ambas as sustentações",
      },
      {
        id: "e10",
        name: "EXPANSÃO DE DOMÍNIO",
        description:
          "Quando um alvo tiver que fazer um teste para resistir a um dos seus rituais, você pode usar essa habilidade gastando 2 PE para que ele tenha desvantagem nesse teste.",
        cost: "2 PE",
      },
    ],
    paths: [
      {
        name: "Trilha de Magia",
        levels: [
          {
            level: 1,
            abilities: [
              {
                id: "em1-1",
                name: "Domínio da Magia - Nível 1",
                description:
                  "Você aprende a canalizar melhor sua energia mágica. Seus rituais ganham +1 em testes de resistência.",
              },
            ],
          },
          {
            level: 2,
            abilities: [
              {
                id: "em1-2",
                name: "Domínio da Magia - Nível 2",
                description:
                  "Você aprende a canalizar melhor sua energia mágica. Seus rituais ganham +2 em testes de resistência.",
              },
            ],
          },
          {
            level: 3,
            abilities: [
              {
                id: "em1-3",
                name: "Domínio da Magia - Nível 3",
                description:
                  "Você aprende a canalizar melhor sua energia mágica. Seus rituais ganham +3 em testes de resistência.",
              },
            ],
          },
          {
            level: 4,
            abilities: [
              {
                id: "em1-4",
                name: "Domínio da Magia - Nível 4",
                description:
                  "Você aprende a canalizar melhor sua energia mágica. Seus rituais ganham +4 em testes de resistência.",
              },
            ],
          },
          {
            level: 5,
            abilities: [
              {
                id: "em1-5",
                name: "Domínio da Magia - Nível 5",
                description:
                  "Você aprende a canalizar melhor sua energia mágica. Seus rituais ganham +5 em testes de resistência.",
              },
            ],
          },
        ],
      },
      {
        name: "Trilha de Perícia",
        levels: [
          {
            level: 1,
            abilities: [
              {
                id: "ep1-1",
                name: "Maestria em Perícia - Nível 1",
                description:
                  "Você se torna um mestre em suas perícias. Receba +1 em testes de perícias nas quais você é treinado.",
              },
            ],
          },
          {
            level: 2,
            abilities: [
              {
                id: "ep1-2",
                name: "Maestria em Perícia - Nível 2",
                description:
                  "Você se torna um mestre em suas perícias. Receba +2 em testes de perícias nas quais você é treinado.",
              },
            ],
          },
          {
            level: 3,
            abilities: [
              {
                id: "ep1-3",
                name: "Maestria em Perícia - Nível 3",
                description:
                  "Você se torna um mestre em suas perícias. Receba +3 em testes de perícias nas quais você é treinado.",
              },
            ],
          },
          {
            level: 4,
            abilities: [
              {
                id: "ep1-4",
                name: "Maestria em Perícia - Nível 4",
                description:
                  "Você se torna um mestre em suas perícias. Receba +4 em testes de perícias nas quais você é treinado.",
              },
            ],
          },
          {
            level: 5,
            abilities: [
              {
                id: "ep1-5",
                name: "Maestria em Perícia - Nível 5",
                description:
                  "Você se torna um mestre em suas perícias. Receba +5 em testes de perícias nas quais você é treinado.",
              },
            ],
          },
        ],
      },
    ],
  },

  ocultista: {
    name: "Ocultista",
    generalAbilities: [
      {
        id: "o1",
        name: "PACTO SOMBRIO",
        description:
          "Você fez um pacto com uma entidade paranormal. Você pode gastar 2 PE para receber +1d6 em um teste de Ocultismo.",
        cost: "2 PE",
      },
      {
        id: "o2",
        name: "VISÃO PARANORMAL",
        description:
          "Você pode ver criaturas paranormais invisíveis para outros mortais. Você recebe vantagem em testes de Percepção para detectar criaturas paranormais.",
      },
      {
        id: "o3",
        name: "RITUAL APRIMORADO",
        description:
          "Você aprende a aprimorar seus rituais. Quando conjura um ritual, você pode gastar 1 PE adicional para aumentar a DT em +2.",
        cost: "1+ PE",
      },
      {
        id: "o4",
        name: "CONHECIMENTO OCULTO",
        description:
          "Você tem conhecimento profundo sobre o mundo paranormal. Você recebe +2 em testes de Ocultismo.",
      },
      {
        id: "o5",
        name: "PROTEÇÃO PARANORMAL",
        description:
          "Você aprendeu a se proteger de ataques paranormais. Você recebe +2 em testes de resistência contra efeitos paranormais.",
      },
      {
        id: "o6",
        name: "CANALIZAÇÃO DE ENERGIA",
        description:
          "Você pode canalizar energia paranormal. Uma vez por cena, você pode gastar 3 PE para recuperar 1d8 de Sanidade.",
        cost: "3 PE",
      },
      {
        id: "o7",
        name: "LIGAÇÃO COM O VAZIO",
        description:
          "Você estabeleceu uma ligação com o Vazio. Você pode gastar 1 ponto de Vazio para receber vantagem em um teste.",
      },
      {
        id: "o8",
        name: "MANIFESTAÇÃO ESPIRITUAL",
        description:
          "Você pode invocar espíritos para ajudá-lo. Uma vez por cena, você pode gastar 2 PE para invocar um espírito aliado.",
        cost: "2 PE",
      },
    ],
    paths: [
      {
        name: "Trilha do Vazio",
        levels: [
          {
            level: 1,
            abilities: [
              {
                id: "ov1-1",
                name: "Domínio do Vazio - Nível 1",
                description:
                  "Você aprofunda sua ligação com o Vazio. Você pode gastar 1 ponto de Vazio para receber +1 em um teste.",
              },
            ],
          },
          {
            level: 2,
            abilities: [
              {
                id: "ov1-2",
                name: "Domínio do Vazio - Nível 2",
                description:
                  "Você aprofunda sua ligação com o Vazio. Você pode gastar 1 ponto de Vazio para receber +2 em um teste.",
              },
            ],
          },
          {
            level: 3,
            abilities: [
              {
                id: "ov1-3",
                name: "Domínio do Vazio - Nível 3",
                description:
                  "Você aprofunda sua ligação com o Vazio. Você pode gastar 1 ponto de Vazio para receber +3 em um teste.",
              },
            ],
          },
          {
            level: 4,
            abilities: [
              {
                id: "ov1-4",
                name: "Domínio do Vazio - Nível 4",
                description:
                  "Você aprofunda sua ligação com o Vazio. Você pode gastar 1 ponto de Vazio para receber +4 em um teste.",
              },
            ],
          },
          {
            level: 5,
            abilities: [
              {
                id: "ov1-5",
                name: "Domínio do Vazio - Nível 5",
                description:
                  "Você aprofunda sua ligação com o Vazio. Você pode gastar 1 ponto de Vazio para receber +5 em um teste.",
              },
            ],
          },
        ],
      },
      {
        name: "Trilha Paranormal",
        levels: [
          {
            level: 1,
            abilities: [
              {
                id: "op1-1",
                name: "Maestria Paranormal - Nível 1",
                description:
                  "Você se torna um mestre em lidar com o paranormal. Receba +1 em testes relacionados a criaturas paranormais.",
              },
            ],
          },
          {
            level: 2,
            abilities: [
              {
                id: "op1-2",
                name: "Maestria Paranormal - Nível 2",
                description:
                  "Você se torna um mestre em lidar com o paranormal. Receba +2 em testes relacionados a criaturas paranormais.",
              },
            ],
          },
          {
            level: 3,
            abilities: [
              {
                id: "op1-3",
                name: "Maestria Paranormal - Nível 3",
                description:
                  "Você se torna um mestre em lidar com o paranormal. Receba +3 em testes relacionados a criaturas paranormais.",
              },
            ],
          },
          {
            level: 4,
            abilities: [
              {
                id: "op1-4",
                name: "Maestria Paranormal - Nível 4",
                description:
                  "Você se torna um mestre em lidar com o paranormal. Receba +4 em testes relacionados a criaturas paranormais.",
              },
            ],
          },
          {
            level: 5,
            abilities: [
              {
                id: "op1-5",
                name: "Maestria Paranormal - Nível 5",
                description:
                  "Você se torna um mestre em lidar com o paranormal. Receba +5 em testes relacionados a criaturas paranormais.",
              },
            ],
          },
        ],
      },
    ],
  },
};
