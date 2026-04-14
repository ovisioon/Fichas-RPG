// client/src/data/investigacao.ts

export interface HabilidadeInvestigativa {
  id: string;
  name: string;
  cost: string;
  description: string;
}

export interface ArquetipoInvestigativo {
  id: string;
  name: string;
  description: string;
  habilidades: HabilidadeInvestigativa[];
}

export const arquetiposInvestigativos: ArquetipoInvestigativo[] = [
  {
    id: "autoridade",
    name: "Autoridade",
    description: "Ligado à sua capacidade de lidar com pessoas, tanto aliados quanto possíveis suspeitos.",
    habilidades: [
      {
        id: "alerta-maximo",
        name: "Alerta Máximo",
        cost: "1 PI",
        description: "Gastando 1 PI, você recebe +4 no seu próximo teste de investigação."
      },
      {
        id: "intimidacao-persuasiva",
        name: "Intimidação Persuasiva",
        cost: "1 PI",
        description: "Gastando 1 PI, você força um alvo de interrogação a ficar na condição Apavorado pelos próximos 2 testes."
      },
      {
        id: "restricao-de-evidencia",
        name: "Restrição de Evidência",
        cost: "1 PI",
        description: "Gastando 1 PI, você pode fazer um item de um alvo visível a sua escolha ficar indisponível para ele até o final da investigação."
      },
      {
        id: "inquerito-direcionado",
        name: "Inquérito Direcionado",
        cost: "1 PI",
        description: "Gastando 1 PI, você pode fazer um questionamento para o mestre sobre uma das pistas específicas que deve ser respondido de forma entendível para você."
      },
      {
        id: "comando-tatico",
        name: "Comando Tático",
        cost: "1 PI",
        description: "Gastando 1 PI, você pode conceder a um aliado +4 em seu próximo teste de investigação."
      },
      {
        id: "verificacao-dupla",
        name: "Verificação Dupla",
        cost: "1 PI",
        description: "Gastando 1 PI, você pode realizar uma checagem extra em um ponto investigativo que você ou alguém já olhou."
      }
    ]
  },
  {
    id: "mentalizador",
    name: "Mentalizador",
    description: "Ligado à sua capacidade de raciocinar e se utilizar das artes da magia para resolver seus casos.",
    habilidades: [
      {
        id: "pressagio-oculto",
        name: "Presságio Oculto",
        cost: "1 PI",
        description: "Você pode gastar 1 PI, você sabe se tem alguma ameaça presente no local ou que possivelmente virá."
      },
      {
        id: "conexao-analitica",
        name: "Conexão Analítica",
        cost: "1 PI",
        description: "Gastando 1 PI, você deve escolher duas pistas que tenha encontrado, o mestre deve dizer qual e se têm alguma relação entre as duas pistas."
      },
      {
        id: "reconstituicao-psiquica",
        name: "Reconstituição Psíquica",
        cost: "1 PI",
        description: "Gastando 1 PI, você pode fazer um teste ligado às suas capacidades mágicas e de percepção DT 12, caso passe você consegue interpretar o ambiente simulando um acontecimento que pode ter acontecido naquele ambiente."
      },
      {
        id: "persistencia-infalivel",
        name: "Persistência Infalível",
        cost: "1 PI",
        description: "Gastando 1 PI, você pode re-rolar um teste de investigação cujo você tenha fracassado, porém tendo que aceitar o novo resultado."
      }
    ]
  },
  {
    id: "sorrateiro",
    name: "Sorrateiro",
    description: "Utiliza táticas e métodos mais ardilosos, tomando cuidado ao localizar pistas e evidências.",
    habilidades: [
      {
        id: "vigilancia-agucada",
        name: "Vigilância Aguçada",
        cost: "1 PI",
        description: "Você pode gastar 1 PI, para caso aconteça um ataque surpresa após uma cena de investigação, você role a iniciativa com Vantagem."
      },
      {
        id: "subtracao-discreta",
        name: "Subtração Discreta",
        cost: "1 ação de investigação",
        description: "Gastando 1 ação de investigação você pode tentar roubar 1 PI de um alvo, porém se o alvo não tiver 1 ponto você não obtém nada."
      },
      {
        id: "destreza-sutil",
        name: "Destreza Sutil",
        cost: "1 PI",
        description: "Você pode gastar 1 PI, para caso você precise pegar uma pista furtivamente ou abrir uma porta simples fechada com cuidado você tenha um sucesso automático, principalmente para liberar pontos de interesse bloqueados."
      },
      {
        id: "orientacao-oculta",
        name: "Orientação Oculta",
        cost: "1 PI",
        description: "Gastando 1 PI, você recebe de uma indicação do mestre de onde nas proximidades você poderia investigar para ter algo relevante como um quarto ou cômodo."
      },
      {
        id: "seguindo-o-rastro",
        name: "Seguindo o Rastro",
        cost: "1 PI",
        description: "Gastando 1 PI, quando encontrar uma pista de uma pessoa específica, você consegue saber onde aquela pessoa foi depois que a pista ficou presente."
      }
    ]
  }
];