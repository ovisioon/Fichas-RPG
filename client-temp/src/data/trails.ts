// Design Philosophy: Dark Fantasy Manga - Neon Green Trails
// Trilhas com níveis (2, 8, 13, 20) e descrições completas para cada classe

export interface TrailLevel {
  level: number;
  name: string;
  description: string;
}

export interface Trail {
  id: string;
  name: string;
  description: string;
  levels: TrailLevel[];
  requirement?: string;
}

export interface ClassTrails {
  [className: string]: Trail[];
}

export const trails: ClassTrails = {
  combatente: [
    {
      id: "exterminador",
      name: "EXTERMINADOR",
      description: "Você é treinado para abater alvos com eficiência e velocidade. Suas armas são suas melhores amigas e você cuida tão bem delas quanto de seus companheiros de equipe. Talvez até melhor.",
      levels: [
        {
          level: 2,
          name: "ARMA DE ESTIMAÇÃO",
          description: "Escolha uma arma para ser sua favorita, como katana ou fuzil de assalto. A categoria da arma escolhida é reduzida em I."
        },
        {
          level: 8,
          name: "GOLPE ASSINATURA",
          description: "A categoria da arma favorita passa a ser reduzida em II. Quando faz um ataque com ela, você pode gastar 2 PE para executar um dos efeitos abaixo como parte do ataque. Você pode adicionar mais efeitos gastando +2 PE por efeito adicional. Amplo - O ataque pode atingir um alvo adicional em seu alcance e adjacente ao original. Destruidor - Aumenta o multiplicador de crítico da arma em +1."
        },
        {
          level: 13,
          name: "Técnica Sublime",
          description: "Você adiciona os seguintes efeitos à lista de sua GOLPE ASSINATURA: Letal - Aumenta a margem de ameaça em +2. Você pode escolher este efeito duas vezes para aumentar a margem de ameaça em +5. Perfurante - Ignora até 5 pontos de resistência a dano de qualquer tipo do alvo."
        },
        {
          level: 20,
          name: "Máquina de Matar",
          description: "A categoria da arma favorita passa a ser reduzida em III, ela recebe +2 na margem de ameaça e seu dano aumenta em um dado do mesmo tipo."
        }
      ]
    },
    {
      id: "lutador",
      name: "LUTADOR",
      description: "Você treinou sua musculatura e movimentos a ponto de transformar seu corpo em uma verdadeira arma. Com golpes corpo a corpo tão poderosos quanto uma bala, você encara os perigos de frente.",
      levels: [
        {
          level: 2,
          name: "PRECISÃO MORTAL",
          description: "Você recebe um aumento de +2 na margem de ameaça com todos os seus ataques corpo a corpo."
        },
        {
          level: 8,
          name: "Revidar",
          description: "Sempre que bloquear um ataque, você pode gastar uma reação e 2 PE para fazer um ataque corpo a corpo no inimigo que o atacou."
        },
        {
          level: 13,
          name: "ÍMPETO ESMAGADOR",
          description: "Quando acerta um ataque corpo a corpo, você pode gastar 1 PE para realizar uma manobra derrubar ou empurrar contra o alvo do ataque como ação livre. Se escolher empurrar, recebe um bônus de +5 para cada 10 pontos de dano que causou no alvo. Se escolher derrubar e vencer no teste oposto, você pode gastar 1 PE para fazer um ataque adicional contra o alvo caído."
        },
        {
          level: 20,
          name: "Potência Máxima",
          description: "Quando usa seu GOLPE FOCADO com armas corpo a corpo, todos os bônus numéricos são dobrados. Por exemplo, se usar 5 PE para receber +5 no ataque e +15 no dano, você recebe +10 no ataque e +30 no dano."
        }
      ]
    },
    {
      id: "operacoes-especiais",
      name: "OPERAÇÕES ESPECIAIS",
      description: "Você é um combatente eficaz. Suas ações são calculadas e otimizadas, sempre antevendo os movimentos inimigos e se posicionando da maneira mais inteligente no campo de batalha.",
      levels: [
        {
          level: 2,
          name: "Iniciativa Aprimorada",
          description: "Você recebe +5 em Iniciativa e uma ação de movimento adicional na primeira rodada."
        },
        {
          level: 8,
          name: "Ataque Extra",
          description: "Uma vez por rodada, quando faz um ataque, você pode gastar 2 PE para fazer um ataque adicional."
        },
        {
          level: 13,
          name: "REFLEXOS ACELERADOS",
          description: "Uma vez por rodada, você pode gastar 5 PE para realizar uma ação padrão ou de movimento adicional."
        },
        {
          level: 20,
          name: "Sempre Alerta",
          description: "Você recebe uma ação padrão adicional no início de cada cena de combate."
        }
      ]
    },
    {
      id: "vanguarda",
      name: "VANGUARDA",
      description: "Você é duro na queda. Treinou seu corpo para resistir a traumas físicos, tornando-o praticamente TITÃ, e por isso não teme se colocar entre seus aliados e o perigo.",
      levels: [
        {
          level: 2,
          name: "Casca Grossa",
          description: "Você recebe +1 PV para cada 5% de NEX e, quando faz um bloqueio, soma seu Vigor na resistência a dano recebida."
        },
        {
          level: 8,
          name: "Cai Dentro",
          description: "Sempre que um oponente em alcance curto ataca um de seus aliados, você pode gastar uma reação e 1 PE para fazer com que esse oponente faça um teste de Vontade (DT Vigor). Se falhar, o oponente deve atacar você em vez de seu aliado."
        },
        {
          level: 13,
          name: "Duro de Matar",
          description: "Ao sofrer dano não paranormal, você pode gastar uma reação e 2 PE para reduzir esse dano à metade. Em Nível 17, você pode usar esta habilidade para reduzir dano paranormal."
        },
        {
          level: 20,
          name: "TITÃ",
          description: "Enquanto estiver machucado, você recebe +5 na Defesa e resistência a dano 5. Enquanto estiver morrendo, em vez do normal, você não fica indefeso e ainda pode realizar ações."
        }
      ]
    }
  ],
  especialista: [
    {
      id: "bibliotecario",
      name: "BIBLIOTECÁRIO",
      description: "Poucas pessoas leem tanto quanto você, mas diferente do que imaginam, passar a vida cercado de conhecimento não o torna menos apto. Na verdade, seu vasto conhecimento é muitas vezes a única solução para situações desesperadoras.",
      levels: [
        {
          level: 2,
          name: "Conhecimento Prático",
          description: "Você pode se lembrar de muitas informações úteis de suas leituras. Quando faz um teste de perícia (exceto Luta e Pontaria), você pode gastar 2 PE para mudar o atributo-base da perícia para Int. Se possuir o poder INTELECTUAL PRÁTICO, em vez disso seu custo é reduzido em –1 PE."
        },
        {
          level: 8,
          name: "Leitor Contumaz",
          description: "Você consome livros de forma obstinada. Cada dado de bônus que você recebe pela ação de interlúdio ler aumenta para 1d8 e você pode aplicar esse bônus em testes de qualquer perícia. Além disso, quando usa este bônus em um teste, você pode gastar 2 PE para aumentá-lo em +1 dado (de 1d8 para 2d8)."
        },
        {
          level: 13,
          name: "MESTRE DOS ARQUIVOS",
          description: "Acostumado com bibliotecas, você sabe como extrair informações de qualquer lugar repleto de livros (como uma livraria, uma biblioteca ou um antiquário), você pode gastar alguns minutos (ou, se estiver em uma cena de investigação, uma rodada) para receber os benefícios de uma ação de interlúdio à sua escolha entre ler e revisar caso."
        },
        {
          level: 20,
          name: "A Força do Saber",
          description: "Tanto tempo passado entre livros e textos fortaleceu sua mente. Seu Intelecto aumenta em +1 e você soma o valor desse atributo em seu total de PE. Além disso, escolha uma perícia qualquer. Você troca o atributo-base dessa perícia para Intelecto."
        }
      ]
    },
    {
      id: "sobrevivente",
      name: "SOBREVIVENTE",
      description: "Você sabe que é um sobrevivente. Talvez tenha sido o único a escapar com vida de uma grande tragédia, ou simplesmente possua o espírito necessário para perseverar onde todos os outros caíram. Seja por experiência ou instinto, você tem certeza que seria o último sobrevivente a sair vivo.",
      levels: [
        {
          level: 2,
          name: "ADAPTAÇÃO RÁPIDA",
          description: "Você não é um sobrevivente à toa. Quando as coisas dão errado, você consegue pensar em alguma solução inusitada. Você pode gastar 2 PE para rolar novamente 1 dos dados de um teste recém-realizado (apenas uma vez por teste) e ficar com o melhor resultado entre as duas rolagens."
        },
        {
          level: 8,
          name: "Fuga Obstinada",
          description: "Seu instinto de sobrevivência lhe impulsiona para desprender as mais desesperadas fugas. Você recebe +1D20 em testes de perícia para fugir de um inimigo (seja em uma perseguição ou não). Além disso, em cenas de perseguição, se você for a presa, pode acumular até 4 falhas antes de ser pego."
        },
        {
          level: 13,
          name: "Determinação Inquestionável",
          description: "Nos momentos mais sombrios, você consegue encontrar em seu interior a força para perseverar. Uma vez por cena, você pode gastar 5 PE e uma ação padrão para remover uma condição de medo, mental ou de paralisia que esteja lhe afligindo."
        },
        {
          level: 20,
          name: "RECUSA EM CAIR",
          description: "Você não chegou até aqui para morrer, e fará qualquer coisa para escapar com vida. Uma vez por rodada, quando sofre dano que reduziria seus PV a 0, você pode gastar 5 PE para, em vez disso, ficar com 1 PV. Esta habilidade não funciona contra danos massivo."
        }
      ]
    },
    {
      id: "terapeuta-oculto",
      name: "TERAPEUTA DO OCULTO",
      description: "Você esteve em um meio de pessoas dedicadas a cuidar da mente humana. Mas quando descobriu a maior ameaça para a nossa psique, descobriu também que seus colegas não passavam de tolos céticos. Desprezado pela academia, você decidiu perseguir a verdade sozinho.",
      requirement: "Requer: Treinado em Profissão (psicólogo)",
      levels: [
        {
          level: 2,
          name: "TRATAMENTO MENTAL",
          description: "Por meio de seus estudos parapsicológicos, você começa a compreender os efeitos do paranormal sobre a mente humana. Você pode usar Profissão (psicólogo) como Diplomacia. Além disso, uma vez por rodada, quando você ou um aliado em alcance curto falha em um teste de resistência contra um efeito que causa danos mental, você pode gastar 2 PE para fazer um teste de Profissão (psicólogo)."
        },
        {
          level: 8,
          name: "Palavras-chave",
          description: "Combinando psicologia e estudos do Outro Lado, você desenvolveu técnicas e sabe o que dizer para restaurar a sanidade de seus pacientes. Quando passa em um teste de perícia para acalmar, você pode gastar uma quantidade de pontos de energia até seu limite de PE. Para cada 1 PE gasto desta forma, a pessoa que está sendo tratada recupera 1 ponto de Sanidade."
        },
        {
          level: 13,
          name: "Reprogramação Mental",
          description: "Ignorando os avisos de cautela de seus pares, você descobriu como hipnotizar e manipular a mente humana para reprogramar suas capacidades. Você pode gastar 5 PE e uma ação de interlúdio para manipular o cérebro de outra pessoa voluntária em alcance curto."
        },
        {
          level: 20,
          name: "A Sanidade Está Lá Fora",
          description: "Graças aos seus estudos, a capacidade de curar a mente humana de (quase) todas as mazelas estão ao seu alcance. Você pode gastar uma ação de movimento e 5 PE para remover todas as condições de medo ou mentais de uma pessoa adjacente (incluindo você mesmo)."
        }
      ]
    },
    {
      id: "atirador-elite",
      name: "ATIRADOR DE ELITE",
      description: "Um tiro, uma morte. Ao contrário dos combatentes, você é ESPECIALISTA NATO em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.",
      levels: [
        {
          level: 2,
          name: "OLHOS DE ÁGUIA",
          description: "Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas."
        },
        {
          level: 8,
          name: "TIRO FATAL",
          description: "Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno."
        },
        {
          level: 13,
          name: "PROJÉTIL DE FORÇA",
          description: "Se estiver usando uma arma de fogo com calibre grosso você pode gastar 2 PE para fazer as manobras derrubar, desarmar, empurrar e quebrar usando um ataque a distância."
        },
        {
          level: 20,
          name: "Atirar para Matar",
          description: "Quando faz um acerto crítico com uma arma de fogo, você causa danos máximo, sem precisar rolar dados."
        }
      ]
    },
    {
      id: "fantasma",
      name: "FANTASMA",
      description: "Você é um ESPECIALISTA NATO em infiltração e sabe neutralizar alvos desprevenidos sem causar alarde. Combinando talento acrobático, destreza manual e conhecimento você é capaz de superar qualquer barreira de defesa, mesmo quando a missão parece impossível.",
      levels: [
        {
          level: 2,
          name: "Ataque Furtivo",
          description: "Você sabe atingir os pontos vitais de um inimigo distraído. Uma vez por rodada, quando atinge um alvo desprevenido com um ataque corpo a corpo ou em alcance curto, ou um alvo que você esteja flanqueando, você pode gastar 1 PE para causar +1d6 pontos de dano do mesmo tipo da arma."
        },
        {
          level: 8,
          name: "Gatuno",
          description: "Você recebe +5 em Atletismo e Crime e pode percorrer seu deslocamento normal quando se esconder sem penalidade."
        },
        {
          level: 13,
          name: "GOLPE DE MISERICÓRDIA",
          description: "Você pode gastar uma ação de movimento e 3 PE para analisar um alvo em alcance curto. Até o fim de seu próximo turno, seu primeiro GOLPE TRAIÇOEIRO que causar dano a ele tem seus dados de dano extras dessa habilidade dobrados."
        },
        {
          level: 20,
          name: "Sombra Fugaz",
          description: "Quando faz um teste de Furtividade após atacar ou fazer outra ação chamativa, você pode gastar 3 PE para não sofrer a penalidade de –15 no teste."
        }
      ]
    },
    {
      id: "socorrista-combate",
      name: "SOCORRISTA DE COMBATE",
      description: "Você é treinado em técnicas de primeiros socorros e tratamento de emergência, o que torna você um membro valioso para qualquer grupo de agentes. Ao contrário dos profissionais de saúde convencionais, você está acostumado com o campo de batalha.",
      requirement: "Requer: Treinado em Medicina. Precisa possuir um kit de medicina.",
      levels: [
        {
          level: 2,
          name: "PRIMEIROS SOCORROS",
          description: "Você pode usar uma ação padrão e 2 PE para curar 2d10 pontos de vida de um aliado adjacente. Você pode curar +1d10 PV respectivamente em Nível 8, 65% e 99%, gastando +1 PE por dado adicional de cura."
        },
        {
          level: 8,
          name: "TRATAMENTO DE CHOQUE",
          description: "Você pode usar uma ação padrão e 2 PE para remover uma condição negativa (exceto morrendo) de um aliado adjacente."
        },
        {
          level: 13,
          name: "Resgate",
          description: "Uma vez por rodada, se estiver em alcance curto de um aliado machucado ou morrendo, você pode se aproximar do aliado com uma ação livre. Além disso, sempre que curar PV ou remover condições do aliado, você e o aliado recebem +5 na Defesa até o início de seu próximo turno."
        },
        {
          level: 20,
          name: "DESFIBRILAÇÃO",
          description: "Uma vez por cena, você pode gastar uma ação completa e 10 PE para trazer de volta a vida um personagem que tenha morrido na mesma cena (exceto morte por dano massivo)."
        }
      ]
    },
    {
      id: "engenheiro-tatico",
      name: "ENGENHEIRO TÁTICO",
      description: "Sua principal habilidade é a manutenção e reparo do valioso equipamento que seu time carrega em missão. Seu conhecimento também permite que improvise ferramentas com o que tiver à disposição e sabote os itens usados por seus inimigos.",
      levels: [
        {
          level: 2,
          name: "Inventário Otimizado",
          description: "Você soma seu Intelecto à sua Força para calcular sua capacidade de carga. Por exemplo, se você tem Força 1 e Intelecto 3, seu inventário tem 20 espaços."
        },
        {
          level: 8,
          name: "Remendão",
          description: "Você pode gastar uma ação completa e 1 PE para remover a condição quebrado de um equipamento adjacente até o final da cena. Além disso, qualquer equipamento geral tem sua categoria reduzida em I para você."
        },
        {
          level: 13,
          name: "GAMBIARRA",
          description: "Você pode GAMBIARRA equipamentos com materiais ao seu redor. Escolha um equipamento geral e gaste uma ação completa e 2 PE, mais 2 PE por categoria do item escolhido. Você cria uma versão funcional do equipamento."
        },
        {
          level: 20,
          name: "CONJURAÇÃO INSTINTIVA para Tudo",
          description: "Você sempre tem o que precisa para qualquer situação. Sempre que precisar de um item qualquer (exceto armas), pode gastar uma ação de movimento e 3 PE por categoria do item para lembrar que colocou ele no fundo da bolsa!"
        }
      ]
    }
  ],
  ocultista: [
    {
      id: "canalizador",
      name: "CANALIZADOR",
      description: "Você domina os aspectos fundamentais da conjuração de rituais e é capaz de aumentar o alcance e velocidade de suas conjurações. Conforme sua conexão com as entidades paranormais aumenta você se torna capaz de interferir com os rituais de outros ocultistas.",
      levels: [
        {
          level: 2,
          name: "EXPANSÃO MÍSTICA",
          description: "Quando lança um ritual, você pode gastar +2 PE para aumentar seu alcance em um passo (de curto para médio, de médio para longo ou de longo para extremo) ou dobrar sua área de efeito."
        },
        {
          level: 8,
          name: "CONJURAÇÃO RÁPIDA",
          description: "Uma vez por rodada, você pode aumentar o custo de um ritual em 4 PE para conjurá-lo como uma ação livre."
        },
        {
          level: 13,
          name: "CONTRA-MÁGICA",
          description: "Quando for alvo de um ritual, você pode gastar uma quantidade de PE igual ao custo pago por esse ritual e fazer um teste oposto de Ocultismo contra o conjurador. Se vencer, você anula o ritual, cancelando todos os seus efeitos."
        },
        {
          level: 20,
          name: "FLUXO DO TERROR",
          description: "Você aprende o ritual FLUXO DO TERROR."
        }
      ]
    },
    {
      id: "sanguinario",
      name: "SANGUINÁRIO",
      description: "Dor é um poderoso catalisador paranormal e você aprendeu a transformá-la em poder para seus rituais. Quando se torna especialmente poderoso, consegue usar a dor e o sofrimento de seus inimigos como instrumento de seus rituais ocultistas.",
      levels: [
        {
          level: 2,
          name: "MAGIA DE SANGUE",
          description: "Ao conjurar um ritual, você pode gastar seus próprios pontos de vida para pagar o custo em pontos de energia, à taxa de 2 PV por PE pago. Pontos de vida gastos dessa forma só podem ser recuperados com descanso."
        },
        {
          level: 8,
          name: "MASOQUISMO MÍSTICO",
          description: "Sempre que sofrer dano não paranormal, você pode gastar uma reação e 2 PE para reduzir esse dano à metade."
        },
        {
          level: 13,
          name: "DEVORAR SOFRIMENTO",
          description: "Sempre que reduz um ou mais inimigos a 0 PV com um ritual, você recebe uma quantidade de PE temporários igual ao círculo do ritual utilizado. Por exemplo, se ativar esse poder com um ritual de 2º círculo, receberá 2 PE."
        },
        {
          level: 20,
          name: "TERROR MATERIALIZADO",
          description: "Você aprende o ritual TERROR MATERIALIZADO."
        }
      ]
    },
    {
      id: "erudito-oculto",
      name: "ERUDITO DO OCULTO",
      description: "Você foca seus estudos em se tornar um conjurador versátil e poderoso, conhecendo mais rituais que os outros ocultistas e sendo capaz de torná-los mais difíceis de serem resistidos. Seu objetivo é desvendar e dominar os segredos do Outro Lado.",
      levels: [
        {
          level: 2,
          name: "CONHECIMENTO EXPANDIDO",
          description: "Você aprende um ritual de 1º círculo. Toda vez que ganha acesso a um novo círculo, aprende um ritual adicional daquele círculo. Esses rituais não contam no seu limite de rituais."
        },
        {
          level: 8,
          name: "TOMO DE PODER",
          description: "Você cria um grimório especial, que armazena rituais que sua mente não seria capaz de guardar. Você aprende uma quantidade de rituais de 1º ou 2º círculos igual ao seu Intelecto. O grimório ocupa 1 espaço em seu inventário."
        },
        {
          level: 13,
          name: "CONJURAÇÃO PERFEITA",
          description: "A DT para resistir a todos os seus rituais aumenta em +5."
        },
        {
          level: 20,
          name: "COMPREENSÃO DO TERROR",
          description: "Você aprende o ritual COMPREENSÃO DO TERROR."
        }
      ]
    },
    {
      id: "mistico-inato",
      name: "MÍSTICO INATO",
      description: "Assim como combatentes treinam seus corpos para resistir a traumas físicos, você preparou sua mente para resistir aos efeitos do Outro Lado. Seu foco e força de vontade fazem com que você expanda os limites de suas capacidades paranormais.",
      levels: [
        {
          level: 2,
          name: "BLINDAGEM MENTAL",
          description: "Você compreende melhor as entidades do Outro Lado, e passa a ser menos abalado por seus efeitos. Você recebe resistência paranormal +5 (+5 em testes de resistência contra efeitos paranormais)."
        },
        {
          level: 8,
          name: "AURA MAGNÉTICA",
          description: "Sua resiliência mental faz com que você possa extrair mais do Outro Lado. Você adiciona sua Presença ao seu limite de PE por turno, mas apenas para conjurar rituais (não para DT)."
        },
        {
          level: 13,
          name: "FORTALEZA PSÍQUICA",
          description: "Você recebe resistência a dano mental e paranormal 10. Além disso, quando é alvo de um efeito paranormal que permite um teste de Vontade para reduzir o dano à metade, você não sofre dano algum se passar."
        },
        {
          level: 20,
          name: "AURA DE TERROR",
          description: "Você aprende o ritual AURA DE TERROR."
        }
      ]
    },
    {
      id: "guerreiro-arcano",
      name: "GUERREIRO ARCANO",
      description: "Alguns ocultistas preferem ficar fechados em suas bibliotecas estudando livros e rituais. Outros preferem investigar fenômenos paranormais em sua fonte. Já você, prefere usar o paranormal como uma arma. Você aprendeu e dominou técnicas de luta mesclando suas habilidades de conjuração com suas capacidades de combate.",
      levels: [
        {
          level: 2,
          name: "ARMA ENCANTADA",
          description: "Você aprende o ritual Amaldiçoar Arma. Se já o conhece, seu custo é reduzido em –1 PE. Além disso, quando conjura esse ritual, você pode usar Ocultismo, em vez de Luta ou Pontaria, para testes de ataque com a arma amaldiçoada."
        },
        {
          level: 8,
          name: "COMBATENTE MÍSTICO",
          description: "Sempre que acerta um ataque corpo a corpo em um inimigo, você recebe 2 PE temporários. Você pode ganhar um máximo de PE temporários por cena igual ao seu limite de PE. PE temporários desaparecem no final da cena."
        },
        {
          level: 13,
          name: "MAGIA DE COMBATE",
          description: "Uma vez por rodada, quando você lança um ritual com execução de uma ação padrão, pode gastar 2 PE para fazer um ataque corpo a corpo como uma ação livre."
        },
        {
          level: 20,
          name: "GOLPE ATERRORIZANTE",
          description: "Você aprende o ritual GOLPE ATERRORIZANTE."
        }
      ]
    }
  ]
};
