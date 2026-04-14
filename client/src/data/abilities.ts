export interface Ability {
  id: string;
  name: string;
  classId: "Combatente" | "Especialista" | "Ocultista";
  description: string;
  prerequisite?: string;
  type?: "ativa" | "passiva";
  cost?: string;
}

export const ABILITIES: Ability[] = [
  // COMBATENTE
  {
    id: "furia-incontida",
    name: "Fúria Incontida",
    classId: "Combatente",
    description: "Você gasta 3 PE para entrar em um estado de fúria por 3 rodadas, recebendo +2 em rolagens de dano corpo a corpo e resistência a dano físico 2, porém não pode conjurar magias.",
    type: "ativa",
    cost: "3 PE"
  },
  {
    id: "investida-destrutiva",
    name: "Investida Destrutiva",
    classId: "Combatente",
    description: "Você gasta 2 PE ao se mover pelo menos 6 metros em linha reta antes de atacar para adicionar +1d8 de dano ao ataque.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "vitalidade-macabra",
    name: "Vitalidade Macabra",
    classId: "Combatente",
    description: "Você pode conjurar uma de suas magias de Maldição pagando PV iguais aos PE do custo da magia, sendo afetado normalmente por habilidades que alterem esse custo.",
    type: "passiva"
  },
  {
    id: "golpe-focado",
    name: "Golpe Focado",
    classId: "Combatente",
    description: "Você gasta 2 PE ao realizar um ataque para receber +5 no teste de ataque ou na rolagem de dano, podendo gastar +1 PE adicional para cada +5 extra, distribuindo entre ataque ou dano.",
    type: "ativa",
    cost: "2+ PE"
  },
  {
    id: "ataque-oportuno",
    name: "Ataque Oportuno",
    classId: "Combatente",
    description: "Você gasta 2 PE para realizar um golpe adicional na mesma rodada.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "amante-da-violencia",
    name: "Amante da Violência",
    classId: "Combatente",
    description: "Você gasta 2 PE para, durante 4 rodadas, receber +2 em testes de ataque, manobras e dano.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "determinacao-fortaleza-psiquica",
    name: "Determinação Fortaleza Psíquica",
    classId: "Combatente",
    description: "Você gasta 3 PE para ganhar +1 em testes contra sanidade e resistência 5 a dano de sanidade após o teste.",
    type: "ativa",
    cost: "3 PE"
  },
  {
    id: "tecnica-imprevisivel",
    name: "Técnica Imprevisível",
    classId: "Combatente",
    description: "Você, de forma passiva, pode executar manobras mesmo com as mãos ocupadas.",
    type: "passiva"
  },
  {
    id: "treinamento-atletico",
    name: "Treinamento Atlético",
    classId: "Combatente",
    description: "Você, de forma passiva, pode rolar com vantagem em testes de Atletismo.",
    type: "passiva"
  },
  {
    id: "mestre-de-armas",
    name: "Mestre de Armas",
    classId: "Combatente",
    description: "Você, de forma passiva, escolhe uma categoria de arma (corpo a corpo ou precisão) e adiciona +1 dado de dano do mesmo tipo.",
    type: "passiva"
  },
  {
    id: "demonio-do-submundo",
    name: "Demônio do Submundo",
    classId: "Combatente",
    description: "Você gasta 2 PE quando um inimigo se desloca até 2 metros para realizar um ataque nele, e em caso de crítico, interrompe o movimento.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "combate-ambidestro",
    name: "Combate Ambidestro",
    classId: "Combatente",
    description: "Você, de forma passiva, ao usar duas armas leves pode realizar um golpe adicional com a segunda arma.",
    type: "passiva"
  },
  {
    id: "influencia-corporal",
    name: "Influência Corporal",
    classId: "Combatente",
    description: "Você, de forma passiva, pode usar traços físicos no lugar de presença para intimidar.",
    type: "passiva"
  },
  {
    id: "impeto-assassino",
    name: "Ímpeto Assassino",
    classId: "Combatente",
    description: "Você, de forma passiva, ao derrotar um inimigo pode realizar um ataque imediato contra outro alvo ao alcance.",
    type: "passiva"
  },
  {
    id: "defesa-impenetravel",
    name: "Defesa Impenetrável",
    classId: "Combatente",
    description: "Você gasta 3 PE como reação para receber resistência 5 a dano físico até o final da próxima rodada.",
    type: "ativa",
    cost: "3 PE"
  },
  {
    id: "vigor-sobre-humano",
    name: "Vigor Sobre-Humano",
    classId: "Combatente",
    description: "Você gasta 1 PE ao tirar 19 em um teste físico com 1d20 para transformar o resultado em crítico.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "vida-longa-ao-rei",
    name: "Vida Longa ao Rei",
    classId: "Combatente",
    description: "Você gasta 2 PE ao cair a 0 PV ou entrar em estado de morrendo para se levantar com 5 PV.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "punhos-de-ferro",
    name: "Punhos de Ferro",
    classId: "Combatente",
    description: "Você, de forma passiva, causa 1d6 de dano com socos, que contam como armas leves e permitem uso de talentos aplicáveis.",
    type: "passiva"
  },
  {
    id: "manifestacao-sobrenatural",
    name: "Manifestação Sobrenatural",
    classId: "Combatente",
    description: "Você gasta 2 PE para adicionar +1d6 de dano paranormal à sua arma principal e aos seus danos físicos pelo resto do combate.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "lider-tatico",
    name: "Líder Tático",
    classId: "Combatente",
    description: "Você gasta 3 PE para designar até três aliados com funções (linha de frente, artilharia ou médico), concedendo +1d4 em efeitos específicos, mantendo com reação a cada rodada.",
    type: "ativa",
    cost: "3 PE"
  },
  {
    id: "golpe-do-outro-lado",
    name: "Golpe do Outro Lado",
    classId: "Combatente",
    description: "Você gasta 2 PE para receber +2 de dano por defeito atual até o início do seu próximo turno.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "assimilacao-carnal",
    name: "Assimilação Carnal",
    classId: "Combatente",
    description: "Você gasta 2 PE ao ver um ser morrer para recuperar 1d8 PV absorvendo sua carne.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "mente-blindada",
    name: "Mente Blindada",
    classId: "Combatente",
    description: "Você, de forma passiva, recebe +1 de Defesa por defeito mental enquanto estiver sem armadura.",
    type: "passiva"
  },
  {
    id: "armamento-pesado",
    name: "Armamento Pesado",
    classId: "Combatente",
    description: "Você, de forma passiva, recebe proficiência com armas pesadas. Pré-requisito: For 2.",
    type: "passiva",
    prerequisite: "For 2"
  },
  {
    id: "artista-marcial",
    name: "Artista Marcial",
    classId: "Combatente",
    description: "Você, de forma passiva, causa 1d6 de dano desarmado (evoluindo com nível), podendo causar dano letal e sendo considerado arma ágil.",
    type: "passiva"
  },
  {
    id: "estilo-de-duas-laminas",
    name: "Estilo de Duas Lâminas",
    classId: "Combatente",
    description: "Você, de forma passiva, ao atacar com duas armas pode realizar dois ataques, sofrendo –1d20 nos testes até o próximo turno. Pré-requisitos: Agi 3.",
    type: "passiva",
    prerequisite: "Agi 3"
  },
  {
    id: "postura-cautelosa",
    name: "Postura Cautelosa",
    classId: "Combatente",
    description: "Você gasta 1 PE ao atacar para receber +5 na Defesa, sofrendo –1d20 nos testes de ataque até o próximo turno. Pré-requisito: Int 2.",
    type: "ativa",
    cost: "1 PE",
    prerequisite: "Int 2"
  },
  {
    id: "golpe-pesado",
    name: "Golpe Pesado",
    classId: "Combatente",
    description: "Você, de forma passiva, aumenta o dano de armas corpo a corpo em +1 dado do mesmo tipo.",
    type: "passiva"
  },
  {
    id: "incansavel",
    name: "Incansável",
    classId: "Combatente",
    description: "Você gasta 2 PE uma vez por cena para realizar uma ação extra de investigação usando Força ou Agilidade.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "agilidade-tatica",
    name: "Agilidade Tática",
    classId: "Combatente",
    description: "Você gasta 1 PE para usar Força ou Agilidade em testes de investigação e, se passar, concede +1d20 ao próximo aliado.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "treinamento-em-armaduras-pesadas",
    name: "Treinamento em Armaduras Pesadas",
    classId: "Combatente",
    description: "Você, de forma passiva, recebe proficiência com armaduras pesadas. Pré-requisito: Nível 6.",
    type: "passiva",
    prerequisite: "Nível 6"
  },
  {
    id: "reflexos-defensivos",
    name: "Reflexos Defensivos",
    classId: "Combatente",
    description: "Você, de forma passiva, recebe +2 em Defesa e testes de resistência. Pré-requisito: Agi 2.",
    type: "passiva",
    prerequisite: "Agi 2"
  },
  {
    id: "rajada-continua",
    name: "Rajada Contínua",
    classId: "Combatente",
    description: "Você gasta PE progressivamente ao acertar ataques com arma de fogo para realizar ataques adicionais no mesmo alvo até errar ou atingir o limite.",
    type: "ativa",
    cost: "variável"
  },
  {
    id: "analise-de-combate",
    name: "Análise de Combate",
    classId: "Combatente",
    description: "Você gasta 2 PE e uma ação de movimento para ganhar bônus em Defesa e resistência igual ao Intelecto até o fim da cena.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "tanque-de-guerra",
    name: "Tanque de Guerra",
    classId: "Combatente",
    description: "Você, de forma passiva, aumenta em +2 a Defesa e resistência de armaduras pesadas. Pré-requisito: treinamento em armaduras pesadas.",
    type: "passiva",
    prerequisite: "treinamento em armaduras pesadas"
  },
  {
    id: "mira-afiada",
    name: "Mira Afiada",
    classId: "Combatente",
    description: "Você, de forma passiva, soma Agilidade no dano com armas de disparo e ignora penalidades contra alvos engajados.",
    type: "passiva"
  },
  {
    id: "fogo-de-supressao",
    name: "Fogo de Supressão",
    classId: "Combatente",
    description: "Você gasta 1 PE e uma ação para forçar um alvo a se proteger, impedindo movimento e impondo –5 em ataques se falhar.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "dor-mantenedora",
    name: "Dor Mantenedora",
    classId: "Combatente",
    description: "Você, de forma passiva, não fica inconsciente ao estar morrendo, mas perde 2 PE por rodada nessa condição.",
    type: "passiva"
  },
  {
    id: "martir-do-grupo",
    name: "Mártir do Grupo",
    classId: "Combatente",
    description: "Você gasta 1 PE para melhorar bônus de aliados em perseguições ou furtividade ao se expor.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "instinto-de-fuga",
    name: "Instinto de Fuga",
    classId: "Combatente",
    description: "Você, de forma passiva, recebe +2 em testes durante perseguições. Pré-requisito: Intuição.",
    type: "passiva",
    prerequisite: "Intuição"
  },
  {
    id: "despertar-paranormal-combatente",
    name: "Despertar Paranormal",
    classId: "Combatente",
    description: "Você, de forma passiva, recebe um poder paranormal sem ganhar sanidade, podendo escolher várias vezes.",
    type: "passiva"
  },
  {
    id: "treinamento-em-pericia-combatente",
    name: "Treinamento em Perícia",
    classId: "Combatente",
    description: "Você, de forma passiva, se torna treinado em duas perícias, podendo evoluir com nível e repetir o talento.",
    type: "passiva"
  },

  // ESPECIALISTA
  {
    id: "mente-analitica",
    name: "Mente Analítica",
    classId: "Especialista",
    description: "Você gasta 2 PE ao observar um inimigo por uma rodada completa para, no próximo turno, receber vantagem nos ataques contra ele e causar +1d6 de dano extra.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "gambiarra-explosiva",
    name: "Gambiarra Explosiva",
    classId: "Especialista",
    description: "Você gasta 3 PE e uma ação completa para transformar um item eletrônico comum em uma granada improvisada que causa 3d6 de dano em área (raio de 3m).",
    type: "ativa",
    cost: "3 PE"
  },
  {
    id: "concentracao-extrema",
    name: "Concentração Extrema",
    classId: "Especialista",
    description: "Você gasta 1 PE ao conjurar uma magia que exige teste de resistência para aumentar a DT em +2, podendo gastar +1 PE adicional para aumentar ainda mais esse bônus.",
    type: "ativa",
    cost: "1+ PE"
  },
  {
    id: "especialista-nato",
    name: "Especialista Nato",
    classId: "Especialista",
    description: "Você gasta 2 PE ao realizar um teste em uma das duas perícias escolhidas para adicionar +1d6, podendo gastar +1 PE extra para aumentar o dado conforme o nível.",
    type: "ativa",
    cost: "2+ PE"
  },
  {
    id: "reacao-anomala",
    name: "Reação Anômala",
    classId: "Especialista",
    description: "Você gasta 1 PE como reação para receber +2 na Defesa.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "movimentacao-espectral",
    name: "Movimentação Espectral",
    classId: "Especialista",
    description: "Você, de forma passiva, possui vantagem em testes para atravessar terrenos difíceis ou espaços apertados.",
    type: "passiva"
  },
  {
    id: "conhecimento-geral",
    name: "Conhecimento Geral",
    classId: "Especialista",
    description: "Você gasta 2 PE ao realizar um teste de perícia para receber os benefícios de ser treinado nela.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "conjuracao-instintiva",
    name: "Conjuração Instintiva",
    classId: "Especialista",
    description: "Você, de forma passiva, não paga o custo da primeira magia usada em uma cena de combate.",
    type: "passiva"
  },
  {
    id: "ancora-espiritual",
    name: "Âncora Espiritual",
    classId: "Especialista",
    description: "Você, de forma passiva, pode sustentar dois rituais simultaneamente pagando normalmente seus custos.",
    type: "passiva"
  },
  {
    id: "expansao-de-dominio",
    name: "Expansão de Domínio",
    classId: "Especialista",
    description: "Você gasta 2 PE para impor desvantagem no teste de resistência de um alvo contra suas magias.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "suporte-mistico",
    name: "Suporte Místico",
    classId: "Especialista",
    description: "Você gasta 2 PE ao auxiliar um aliado para conceder vantagem e adicionar um dos seus traços ao teste dele.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "aceleracao-obscura",
    name: "Aceleração Obscura",
    classId: "Especialista",
    description: "Você gasta 3 PE para conjurar todas as suas magias como ação de movimento até o final do turno. Pré-requisito: Nível 10.",
    type: "ativa",
    cost: "3 PE",
    prerequisite: "Nível 10"
  },
  {
    id: "pericia-maximizada",
    name: "Perícia Maximizada",
    classId: "Especialista",
    description: "Você gasta 2 PE ao realizar um teste com um traço para dobrar o bônus total concedido por ele.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "lider-dos-fugitivos",
    name: "Líder dos Fugitivos",
    classId: "Especialista",
    description: "Você gasta 2 PE para realizar uma ação de furtividade em grupo usando apenas sua rolagem.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "adaptacao-a-armaduras",
    name: "Adaptação a Armaduras",
    classId: "Especialista",
    description: "Você, de forma passiva, pode usar armaduras pesadas. Pré-requisito: Nível 10.",
    type: "passiva",
    prerequisite: "Nível 10"
  },
  {
    id: "absorcao-eficiente",
    name: "Absorção Eficiente",
    classId: "Especialista",
    description: "Você, de forma passiva, rola duas vezes os dados de PE ao absorver um item sagrado e escolhe o melhor resultado.",
    type: "passiva"
  },
  {
    id: "talento-inato",
    name: "Talento Inato",
    classId: "Especialista",
    description: "Você gasta 1 PE ao realizar um teste envolvendo um traço para adicionar +1d4 ao resultado.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "golpe-furtivo-aprimorado",
    name: "Golpe Furtivo Aprimorado",
    classId: "Especialista",
    description: "Você gasta 1 PE para adicionar +1d6 de dano em ataques furtivos.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "ajudante-energetico",
    name: "Ajudante Energético",
    classId: "Especialista",
    description: "Você gasta 1 PE para conceder resistência a dano igual à metade de +4 a um aliado no próximo teste de Vontade.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "dor-catalisadora",
    name: "Dor Catalisadora",
    classId: "Especialista",
    description: "Você sofre 2d8 de dano de PE para receber vantagem no seu próximo teste.",
    type: "ativa",
    cost: "2d8 PE"
  },
  {
    id: "percepcao-aguçada",
    name: "Percepção Aguçada",
    classId: "Especialista",
    description: "Você, de forma passiva, possui vantagem em testes de percepção durante cenas apropriadas.",
    type: "passiva"
  },
  {
    id: "ultima-chance",
    name: "Última Chance",
    classId: "Especialista",
    description: "Você gasta 2 PE para transformar sua ação de movimento em reação até o final da próxima rodada.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "carrasco",
    name: "Carrasco",
    classId: "Especialista",
    description: "Você gasta 2 PE ao conjurar uma magia de maldição sustentada para fazer com que, se ela for cancelada, o alvo sofra 2d8 de dano do mesmo elemento.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "genialidade-oculta",
    name: "Genialidade Oculta",
    classId: "Especialista",
    description: "Você, de forma passiva, ao tirar 19 em testes de ocultismo com 1d20, transforma o resultado em crítico.",
    type: "passiva"
  },
  {
    id: "ajudante",
    name: "Ajudante",
    classId: "Especialista",
    description: "Você gasta 1 PE para conceder vantagem no próximo teste de um aliado durante combate.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "mente-de-caçador",
    name: "Mente de Caçador",
    classId: "Especialista",
    description: "Você gasta 2 PE e uma ação para fazer duas perguntas sobre uma criatura em vez de uma.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "recuperacao-mental",
    name: "Recuperação Mental",
    classId: "Especialista",
    description: "Você, de forma passiva, ao chegar a 0 PE ou ficar insano, retorna ao estado normal com 1 PE.",
    type: "passiva"
  },
  {
    id: "jogo-do-destino",
    name: "Jogo do Destino",
    classId: "Especialista",
    description: "Você gasta 16 PE durante seu turno para reiniciar toda a rodada, anulando eventos, danos, ações e mortes, mantendo apenas o dano mental sofrido. Pré-requisito: Nível 14.",
    type: "ativa",
    cost: "16 PE",
    prerequisite: "Nível 14"
  },
  {
    id: "maestria-em-armas-de-fogo",
    name: "Maestria em Armas de Fogo",
    classId: "Especialista",
    description: "Você, de forma passiva, recebe proficiência com armas de fogo táticas e +2 no dano com elas.",
    type: "passiva"
  },
  {
    id: "intelecto-pratico",
    name: "Intelecto Prático",
    classId: "Especialista",
    description: "Você gasta 2 PE para usar Intelecto no lugar do atributo base em testes de perícia. Pré-requisito: Int 2.",
    type: "ativa",
    cost: "2 PE",
    prerequisite: "Int 2"
  },
  {
    id: "invasor-de-sistemas",
    name: "Invasor de Sistemas",
    classId: "Especialista",
    description: "Você, de forma passiva, recebe +5 em testes de tecnologia para invasão e reduz o tempo de hack para uma ação completa.",
    type: "passiva"
  },
  {
    id: "maos-rapidas",
    name: "Mãos Rápidas",
    classId: "Especialista",
    description: "Você gasta 1 PE para realizar testes de Crime como ação livre. Pré-requisitos: Agi 3.",
    type: "ativa",
    cost: "1 PE",
    prerequisite: "Agi 3"
  },
  {
    id: "na-trilha-certa",
    name: "Na Trilha Certa",
    classId: "Especialista",
    description: "Você gasta 1 PE ao encontrar pistas para receber +1d20 no próximo teste, podendo acumular.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "nerd",
    name: "Nerd",
    classId: "Especialista",
    description: "Você gasta 2 PE uma vez por cena para fazer um teste de Atualidades (DT 20) e receber uma informação útil.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "pensamento-agil",
    name: "Pensamento Ágil",
    classId: "Especialista",
    description: "Você gasta 2 PE para realizar uma ação adicional de procurar pistas em investigação.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "perito-em-explosivos",
    name: "Perito em Explosivos",
    classId: "Especialista",
    description: "Você, de forma passiva, soma Intelecto na DT dos seus explosivos e pode excluir alvos da área igual ao seu Intelecto.",
    type: "passiva"
  },
  {
    id: "carisma-inicial",
    name: "Carisma Inicial",
    classId: "Especialista",
    description: "Você, de forma passiva, recebe +2d20 no primeiro teste social da cena.",
    type: "passiva"
  },
  {
    id: "treinamento-em-pericia-especialista",
    name: "Treinamento em Perícia",
    classId: "Especialista",
    description: "Você, de forma passiva, se torna treinado em duas perícias, podendo evoluir com nível e repetir o talento.",
    type: "passiva"
  },
  {
    id: "camuflagem-social",
    name: "Camuflagem Social",
    classId: "Especialista",
    description: "Você gasta 1 PE para se disfarçar rapidamente como ação completa sem kit, recebendo bônus se usar um.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "esconderijo-desesperado",
    name: "Esconderijo Desesperado",
    classId: "Especialista",
    description: "Você, de forma passiva, não sofre penalidade por se mover furtivamente e reduz mais sua visibilidade ao se esconder.",
    type: "passiva"
  },
  {
    id: "especialista-diletante",
    name: "Especialista Diletante",
    classId: "Especialista",
    description: "Você, de forma passiva, aprende um poder de outra classe que cumpra os pré-requisitos. Pré-requisito: Nível 6.",
    type: "passiva",
    prerequisite: "Nível 6"
  },
  {
    id: "plano-de-fuga",
    name: "Plano de Fuga",
    classId: "Especialista",
    description: "Você gasta 2 PE para substituir testes de fuga por sucesso automático ou usar Intelecto no lugar de Força em perseguições.",
    type: "ativa",
    cost: "2 PE"
  },

  // OCULTISTA
  {
    id: "aptidao-versatil",
    name: "Aptidão Versátil",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao realizar um teste específico à sua escolha para receber +2 nesse teste, podendo usar esse talento apenas uma vez por teste, porém ele pode ser aplicado em qualquer tipo de teste.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "treinamento-leve",
    name: "Treinamento Leve",
    classId: "Ocultista",
    description: "Você, de forma passiva, pode utilizar armaduras de categoria leve sem necessidade de ação ou custo adicional de PE.",
    type: "passiva"
  },
  {
    id: "insight-analitico",
    name: "Insight Analítico",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao realizar um teste que envolva suas capacidades mentais ou conhecimentos para adicionar 1d6 ao resultado.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "marca-do-fracasso",
    name: "Marca do Fracasso",
    classId: "Ocultista",
    description: "Sempre que você errar um ataque ou um teste com intuito de ferir alguém, você pode, como reação e sem custo de PE, colocar essa pessoa na sua lista negra.",
    type: "passiva"
  },
  {
    id: "armazenamento-otimizado",
    name: "Armazenamento Otimizado",
    classId: "Ocultista",
    description: "De forma passiva, itens feitos através da alquimia não ocupam espaço no inventário, porém ainda é necessário sacar eles normalmente.",
    type: "passiva"
  },
  {
    id: "fortaleza-mental",
    name: "Fortaleza Mental",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao ser alvo de um teste contra sua sanidade para receber +2 no modificador e resistência 5 a dano de sanidade até o final da sua próxima rodada.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "intervencao-de-campo",
    name: "Intervenção de Campo",
    classId: "Ocultista",
    description: "Você gasta 2 PE ao realizar um teste de medicina, podendo definir a DT como 10 e, a cada +5 na DT, adicionar 1d6 na cura (exemplo: DT 15 = 2d6), podendo remover a condição de morrendo.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "golpe-envenenado",
    name: "Golpe Envenenado",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao aplicar veneno em sua arma e realizar um ataque no mesmo momento, adicionando 1d4 de dano de veneno ao dano principal, desde que não seja uma arma pesada no caso de precisão.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "maestria-em-armas-pesadas-ocultista",
    name: "Maestria em Armas Pesadas",
    classId: "Ocultista",
    description: "De forma passiva, você pode utilizar armas de categoria pesada sem custo adicional.",
    type: "passiva"
  },
  {
    id: "vitalidade-ampliada",
    name: "Vitalidade Ampliada",
    classId: "Ocultista",
    description: "De forma passiva, você adiciona +2 em qualquer efeito de cura e +1 em bônus de modificadores vindos de magias, talentos ou itens.",
    type: "passiva"
  },
  {
    id: "banquete-restaurador",
    name: "Banquete Restaurador",
    classId: "Ocultista",
    description: "Durante um interlúdio, você pode cozinhar sem custo de PE para fazer todos recuperarem o dobro de PV ao descansar.",
    type: "passiva"
  },
  {
    id: "comando-tatico",
    name: "Comando Tático",
    classId: "Ocultista",
    description: "Você gasta 1 PE como reação ao ver um aliado falhar ou precisar de auxílio, permitindo que ele rerrole o dado, ficando com o novo resultado, desde que possa te ver ou ouvir.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "adaptacao-intelectual",
    name: "Adaptação Intelectual",
    classId: "Ocultista",
    description: "Você gasta 1 PE para alterar um dos seus traços até o final da cena.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "paradoxo-logico",
    name: "Paradoxo Lógico",
    classId: "Ocultista",
    description: "Você gasta 1 PE como reação ao passar em um teste de recordar conhecimento para impor desvantagem no próximo teste de uma criatura.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "eco-da-sorte",
    name: "Eco da Sorte",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao auxiliar um aliado e, caso ele tenha sucesso, ganha 1 ponto de Sorte (PSO), podendo gastar PSO para receber +1d6 em testes, acumulando até 2.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "vantagem-inicial",
    name: "Vantagem Inicial",
    classId: "Ocultista",
    description: "De forma passiva, uma de suas armas começa com uma modificação extra.",
    type: "passiva"
  },
  {
    id: "tenacidade-mental",
    name: "Tenacidade Mental",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao ser alvo de efeitos contra sua sanidade para ganhar +1 no modificador e resistência 5 a dano de sanidade até o começo da sua próxima rodada.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "memoria-afiada",
    name: "Memória Afiada",
    classId: "Ocultista",
    description: "De forma passiva, ao rolar 1d20 em testes de alquimia ou ciência e obter 19, o resultado se torna um crítico.",
    type: "passiva"
  },
  {
    id: "alquimia-em-combate",
    name: "Alquimia em Combate",
    classId: "Ocultista",
    description: "Você gasta 2 PE ao criar um item de alquimia durante o combate, seguindo as regras normais de criação.",
    type: "ativa",
    cost: "2 PE"
  },
  {
    id: "precisao-absoluta",
    name: "Precisão Absoluta",
    classId: "Ocultista",
    description: "Você gasta 1 PE como reação ao realizar um teste para ignorar um único defeito associado a ele.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "potencial-imprevisivel",
    name: "Potencial Imprevisível",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao realizar uma ação de movimento para fazer um teste de ciência (DT 10 + seu nível) e adicionar metade do seu nível como modificador de dano em uma arma até o fim da cena.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "preparo-preventivo",
    name: "Preparo Preventivo",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao declarar que comprou previamente um equipamento, pagando apenas o custo normal em créditos.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "catalisador-agressivo",
    name: "Catalisador Agressivo",
    classId: "Ocultista",
    description: "De forma passiva, você soma +1d8 de dano em efeitos ofensivos de itens de alquimia.",
    type: "passiva"
  },
  {
    id: "calculo-balistico",
    name: "Cálculo Balístico",
    classId: "Ocultista",
    description: "De forma passiva, sua DT para explosivos aumenta em +5 pelo resto da cena.",
    type: "passiva"
  },
  {
    id: "protecao-tatica",
    name: "Proteção Tática",
    classId: "Ocultista",
    description: "Você gasta 1 PE para anular efeitos de área de granadas ou itens de alquimia em aliados.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "engenharia-de-campo",
    name: "Engenharia de Campo",
    classId: "Ocultista",
    description: "Você gasta 1 PE durante um interlúdio para remover a condição quebrado de um item, arma ou cobertura, além de reduzir em 2 o custo de modificações de armas.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "maestria-pirotecnica",
    name: "Maestria Pirotécnica",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao realizar uma ação de movimento para fazer com que suas próximas magias, explosivos ou itens de dano em área tenham o dano dobrado até o fim da sua próxima rodada.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "foco-arcano",
    name: "Foco Arcano",
    classId: "Ocultista",
    description: "De forma passiva, você recebe +2 nas DTs de suas magias.",
    type: "passiva"
  },
  {
    id: "ampliacao-de-amuletos",
    name: "Ampliação de Amuletos",
    classId: "Ocultista",
    description: "De forma passiva, você aumenta seu limite de amuletos em +1, podendo escolher esse talento múltiplas vezes até o máximo de +3.",
    type: "passiva"
  },
  {
    id: "barganha-alquimica",
    name: "Barganha Alquímica",
    classId: "Ocultista",
    description: "Você gasta 1 PE ao comprar um ingrediente de alquimia para receber outro de mesmo valor gratuitamente durante essa compra.",
    type: "ativa",
    cost: "1 PE"
  },
  {
    id: "sintonia-coletiva",
    name: "Sintonia Coletiva",
    classId: "Ocultista",
    description: "Você gasta 2 PE durante um interlúdio ao realizar Canalização de Energia para conceder PE extra igual ao número de participantes, sendo +2 por Naturalista, podendo ser ativado apenas uma vez por interlúdio. Pré-requisito: acesso ao 2° círculo de magias.",
    type: "ativa",
    cost: "2 PE",
    prerequisite: "acesso ao 2° círculo"
  },
];