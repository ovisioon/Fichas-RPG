// client/src/data/pactos.ts

export interface Pacto {
  id: string;
  name: string;
  cost: string;
  description: string;
}

export const pactos: Pacto[] = [
  {
    id: "mutacao-da-hydra",
    name: "Mutação da Hydra",
    cost: "1d4 de Sanidade",
    description: "Quando você conjurar uma das suas magias conectadas que seja de alcance pessoal, você pode mudar para 1 alvo a alcance de toque."
  },
  {
    id: "reclamar-direitos",
    name: "Reclamar Direitos",
    cost: "1d6 de Sanidade",
    description: "Quando você conjurar uma das suas magias de maldição conectadas que causa dano, você pode aumentar o dano de todos os dados da magia em uma categoria acima, caso já esteja no máximo, aumente para +1 dado do mesmo tipo (d12)."
  },
  {
    id: "flagelo-mental",
    name: "Flagelo Mental",
    cost: "1d6 de Sanidade",
    description: "Quando você conjurar uma das suas magias conectadas, você pode reduzir o custo da magia e de suas amplificações a -1 (não podendo reduzir nenhum custo a 0)."
  },
  {
    id: "ampliacao",
    name: "Ampliação",
    cost: "1d4 de Sanidade",
    description: "Quando você conjurar uma das suas magias conectadas que não seja de alcance pessoal, você pode aumentar o alcance da magia em uma categoria toda vez que usar esse Auxílio. Toque > Curta > Média > Longa (Ex: de Toque > Longa 3d4)."
  },
  {
    id: "despertar-o-pior",
    name: "Despertar o Pior",
    cost: "1d6 de Sanidade",
    description: "Escolha uma condição entre Queimando, Cego, Eletrocutado ou Envenenado. Quando você estiver sob a condição escolhida, você pode ignorá-la pelo resto da cena."
  },
  {
    id: "expansao",
    name: "Expansão",
    cost: "1d8 de Sanidade",
    description: "Você pode exigir que a entidade te conceda até o final da cena uma magia de uma parede que você possua a sua escolha, porém você terá que pagar 1 de PS toda vez que o usar na cena e +1 para cada amplificação conjurada junto."
  },
  {
    id: "misericordia",
    name: "Misericórdia",
    cost: "1d6 de Sanidade",
    description: "Você pode restaurar todos os usos de um dos seus talentos que você possua caso o talento tenha usos. Gaste uma ação de Movimento e o custo do pacto para ativar."
  },
  {
    id: "espalhando-agonia",
    name: "Espalhando Agonia",
    cost: "1d8 de Sanidade",
    description: "Parte da energia da entidade se implanta em uma arma que esteja segurando. Ao efetuar um próximo ataque com sucesso, causando um dos seguintes efeitos a sua escolha: 1° O alvo recebe 1d12 de dano energético. 2° O alvo fica atordoado até o final de sua próxima rodada. Gaste uma ação de Movimento e o custo do pacto para ativar."
  }
];