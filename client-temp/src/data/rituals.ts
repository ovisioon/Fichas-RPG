export interface RitualVersion {
  pe: number;
  description: string;
  requirements?: string;
}

export interface Ritual {
  id: string;
  name: string;
  element: 'Conhecimento' | 'Energia' | 'Sangue' | 'Morte' | 'Medo';
  circle: 1 | 2 | 3;
  execution: string;
  range: string;
  target: string;
  duration: string;
  resistance: string;
  description: string;
  versions: {
    base: RitualVersion;
    discente?: RitualVersion;
    verdadeiro?: RitualVersion;
  };
}

export const getRitualsByElementAndCircle = (element: string, circle: number): Ritual[] => {
  const key = `${element}_${circle}`;
  return RITUALS[key] || [];
};

export const getAllElements = (): string[] => {
  return ['Conhecimento', 'Energia', 'Sangue', 'Morte', 'Medo'];
};

export const getCirclesByElement = (element: string): number[] => {
  const circles = new Set<number>();
  Object.keys(RITUALS).forEach(key => {
    if (key.startsWith(element)) {
      const circle = parseInt(key.split('_')[1]);
      if (!isNaN(circle)) circles.add(circle);
    }
  });
  return Array.from(circles).sort((a, b) => a - b);
};

export const RITUALS: Record<string, Ritual[]> = {
  // 1º CÍRCULO - CONHECIMENTO (6 rituais)
  'Conhecimento_1': [
    {
      id: 'compreensao-paranormal',
      name: 'Compreensão Paranormal',
      element: 'Conhecimento',
      circle: 1,
      execution: 'padrão',
      range: 'toque',
      target: '1 ser ou objeto',
      duration: 'cena',
      resistance: 'Vontade anula',
      description: 'O ritual confere a você compreensão sobrenatural da linguagem. Se tocar um objeto contendo informação (livro, documento, gravação etc.), você entende as palavras mesmo que não conheça o idioma, desde que seja um idioma humano. Se tocar uma pessoa, pode se comunicar com ela como se falassem um idioma em comum. Se tocar um ser não inteligente, percebe seus sentimentos básicos.',
      versions: {
        base: { pe: 0, description: 'Alcance: toque; Alvo: 1 ser ou objeto; Você compreende linguagem sobrenatural.' },
        discente: { pe: 2, description: 'Alcance muda para curto; Alvo muda para alvos escolhidos; Você entende todos os alvos afetados.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Alcance muda para pessoal; Alvo muda para você; Você pode falar, entender e escrever qualquer idioma humano.', requirements: '3º círculo' },
      },
    },
    {
      id: 'enfeiticar',
      name: 'Enfeitiçar',
      element: 'Conhecimento',
      circle: 1,
      execution: 'padrão',
      range: 'curto',
      target: '1 pessoa',
      duration: 'cena',
      resistance: 'Vontade anula',
      description: 'O ritual torna o alvo prestativo. Ele não fica sob seu controle, mas interpreta suas palavras e ações da forma mais favorável possível. Você recebe +10 em testes de Diplomacia com o alvo. Um alvo hostil ou em combate recebe +5 no teste de resistência.',
      versions: {
        base: { pe: 0, description: 'Você recebe +10 em testes de Diplomacia com o alvo.' },
        discente: { pe: 2, description: 'Em vez do efeito normal, você sugere uma ação ao alvo e ele a executa. A sugestão deve parecer razoável. Você pode definir uma condição específica para a ação.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Afeta todos os alvos dentro do alcance.', requirements: '3º círculo' },
      },
    },
    {
      id: 'ouvir-sussurros',
      name: 'Ouvir os Sussurros',
      element: 'Conhecimento',
      circle: 1,
      execution: 'completa',
      range: 'pessoal',
      target: 'você',
      duration: 'instantânea',
      resistance: 'nenhuma',
      description: 'Você se conecta aos sussurros do Outro Lado, memórias ecoadas que podem oferecer conhecimento proibido. Faça uma pergunta sobre um evento que acontecerá nesta cena, que possa ser respondida com "sim" ou "não". O mestre rola 1d6: 2-6 o ritual funciona, 1 o ritual falha.',
      versions: {
        base: { pe: 0, description: 'Pergunta sobre evento que acontecerá nesta cena. Usar novamente sobre o mesmo assunto retorna o mesmo resultado.' },
        discente: { pe: 2, description: 'Execução muda para 1 minuto; A pergunta pode ser sobre algo até 1 dia no futuro; A resposta pode vir como frase, profecia ou enigma.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Execução muda para 10 minutos; Duração: 5 rodadas; Você pode fazer uma pergunta por rodada.', requirements: '3º círculo' },
      },
    },
    {
      id: 'perturbacao',
      name: 'Perturbação',
      element: 'Conhecimento',
      circle: 1,
      execution: 'padrão',
      range: 'curto',
      target: '1 pessoa',
      duration: '1 rodada',
      resistance: 'Vontade anula',
      description: 'Você dá uma ordem verbal que o alvo deve ser capaz de ouvir. Se falhar na resistência, ele obedece no próprio turno. Comandos: Fuja (tenta se afastar), Largue (solta tudo), Pare (fica pasmo), Sente-se (senta imediatamente), Venha (se aproxima).',
      versions: {
        base: { pe: 0, description: 'Alvo obedece um comando simples no próprio turno.' },
        discente: { pe: 2, description: 'Alvo muda para 1 ser; Novo comando: Sofra (alvo sofre 3d8 de dano de Conhecimento e fica abalado).', requirements: '3º círculo e afinidade' },
        verdadeiro: { pe: 5, description: 'Alvo muda para até 5 seres; Novo comando: Ataque (alvo deve usar Agredir contra outro alvo em alcance médio).', requirements: '3º círculo e afinidade' },
      },
    },
    {
      id: 'tecer-ilusao',
      name: 'Tecer Ilusão',
      element: 'Conhecimento',
      circle: 1,
      execution: 'padrão',
      range: 'médio',
      target: 'até 4 cubos de 1,5 m',
      duration: 'cena',
      resistance: 'Vontade desacredita',
      description: 'Cria uma ilusão visual ou sonora simples. Exemplos: Uma pessoa, Uma parede, Um grito, Um uivo. Limitações: Volume equivalente à voz de uma pessoa por cubo; Não cria cheiros, textura ou temperatura; Não cria sons complexos; Objetos e criaturas atravessam a ilusão sem sofrer dano.',
      versions: {
        base: { pe: 0, description: 'Cria ilusão visual ou sonora em até 4 cubos de 1,5 m.' },
        discente: { pe: 2, description: 'Efeito: 8 cubos de 1,5 m; Duração: sustentada; Combina imagem + som.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Efeito: até 16 cubos de 1,5 m; Duração: sustentada; Combina imagem + som + movimento.', requirements: '3º círculo' },
      },
    },
    {
      id: 'terceiro-olho',
      name: 'Terceiro Olho',
      element: 'Conhecimento',
      circle: 1,
      execution: 'padrão',
      range: 'pessoal',
      target: 'você',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Você ganha visão paranormal que permite ver através de objetos sólidos, ilusões mágicas e escuridão. Você pode ver até 30 metros através de paredes, portas, etc. Você consegue discernir ilusões mágicas. Você pode ver no escuro como se fosse luz do dia.',
      versions: {
        base: { pe: 0, description: 'Você pode ver através de objetos sólidos até 30 metros. Discerne ilusões mágicas. Vê no escuro.' },
        discente: { pe: 2, description: 'Alcance aumenta para 60 metros.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Alcance aumenta para 120 metros. Você também pode ver auras mágicas.', requirements: '3º círculo' },
      },
    },
  ],

  // 1º CÍRCULO - ENERGIA (6 rituais)
  'Energia_1': [
    {
      id: 'amaldicoar-tecnologia',
      name: 'Amaldiçoar Tecnologia',
      element: 'Energia',
      circle: 1,
      execution: 'padrão',
      range: 'toque',
      target: '1 objeto tecnológico',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Você amaldiçoa um objeto tecnológico, causando mau funcionamento. O objeto sofre penalidade em testes de funcionamento.',
      versions: {
        base: { pe: 0, description: 'Objeto sofre -5 em testes de funcionamento.' },
        discente: { pe: 2, description: 'Penalidade aumenta para -10. Objeto pode falhar completamente.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Objeto fica completamente inoperante até o fim da cena.', requirements: '3º círculo' },
      },
    },
    {
      id: 'coincidencia-forcada',
      name: 'Coincidência Forçada',
      element: 'Energia',
      circle: 1,
      execution: 'padrão',
      range: 'curto',
      target: '1 criatura',
      duration: '1 rodada',
      resistance: 'Vontade anula',
      description: 'Você força uma coincidência favorável. O alvo sofre penalidade em seu próximo teste.',
      versions: {
        base: { pe: 0, description: 'Alvo sofre -5 em seu próximo teste.' },
        discente: { pe: 2, description: 'Penalidade aumenta para -10. Você pode afetar até 2 alvos.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Penalidade é -15. Você pode afetar até 5 alvos.', requirements: '3º círculo' },
      },
    },
    {
      id: 'eletrocussao',
      name: 'Eletrocussão',
      element: 'Energia',
      circle: 1,
      execution: 'padrão',
      range: 'médio',
      target: '1 criatura',
      duration: 'instantânea',
      resistance: 'Destreza reduz',
      description: 'Você lança um raio de eletricidade que causa dano ao alvo.',
      versions: {
        base: { pe: 0, description: 'Alvo sofre 2d6 de dano elétrico.' },
        discente: { pe: 2, description: 'Dano aumenta para 4d6. Alvo pode ficar atordoado.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Dano aumenta para 6d6. Você pode afetar até 3 alvos em linha.', requirements: '3º círculo' },
      },
    },
    {
      id: 'embaralhar',
      name: 'Embaralhar',
      element: 'Energia',
      circle: 1,
      execution: 'padrão',
      range: 'curto',
      target: 'até 5 objetos',
      duration: 'instantânea',
      resistance: 'nenhuma',
      description: 'Você embaralha a posição de objetos próximos, causando confusão.',
      versions: {
        base: { pe: 0, description: 'Até 5 objetos trocam de posição de forma aleatória.' },
        discente: { pe: 2, description: 'Você pode controlar melhor o embaralhamento. Até 10 objetos.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Você pode embaralhar a posição de criaturas também. Até 20 objetos ou 5 criaturas.', requirements: '3º círculo' },
      },
    },
    {
      id: 'luz',
      name: 'Luz',
      element: 'Energia',
      circle: 1,
      execution: 'padrão',
      range: 'médio',
      target: 'até 4 cubos de 1,5 m',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Você cria uma fonte de luz brilhante que ilumina a área.',
      versions: {
        base: { pe: 0, description: 'Cria luz equivalente à luz do dia em até 4 cubos.' },
        discente: { pe: 2, description: 'Área aumenta para 8 cubos. Luz é ofuscante para criaturas sensíveis.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Área aumenta para 16 cubos. Luz pode ser cegante.', requirements: '3º círculo' },
      },
    },
    {
      id: 'polarizacao-caotica',
      name: 'Polarização Caótica',
      element: 'Energia',
      circle: 1,
      execution: 'completa',
      range: 'pessoal',
      target: 'você',
      duration: '1 minuto',
      resistance: 'nenhuma',
      description: 'Você se envolve em uma aura de energia caótica que afeta tudo ao seu redor.',
      versions: {
        base: { pe: 0, description: 'Criaturas próximas sofrem -2 em testes enquanto o ritual está ativo.' },
        discente: { pe: 2, description: 'Penalidade aumenta para -5. Você pode se mover normalmente.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Penalidade é -10. Você pode lançar o efeito para criaturas específicas.', requirements: '3º círculo' },
      },
    },
  ],

  // 1º CÍRCULO - SANGUE (6 rituais)
  'Sangue_1': [
    {
      id: 'lamina-atroz',
      name: 'Lâmina Atroz',
      element: 'Sangue',
      circle: 1,
      execution: 'padrão',
      range: 'toque',
      target: '1 arma',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Você envolve uma arma em energia sangrenta, aumentando seu poder destrutivo.',
      versions: {
        base: { pe: 0, description: 'Arma causa +2d6 de dano adicional.' },
        discente: { pe: 2, description: 'Dano adicional aumenta para +4d6. Arma causa ferimentos que sangram.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Dano adicional é +6d6. Ferimentos são especialmente graves.', requirements: '3º círculo' },
      },
    },
    {
      id: 'coragem-hemorragica',
      name: 'Coragem Hemorrágica',
      element: 'Sangue',
      circle: 1,
      execution: 'padrão',
      range: 'toque',
      target: '1 criatura',
      duration: 'cena',
      resistance: 'Vontade anula',
      description: 'Você infunde coragem sobrenatural em um aliado, aumentando sua capacidade de combate.',
      versions: {
        base: { pe: 0, description: 'Alvo recebe +2 em testes de ataque e +1d6 em dano.' },
        discente: { pe: 2, description: 'Bônus aumenta para +4 em testes de ataque e +2d6 em dano.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Bônus é +6 em testes de ataque e +3d6 em dano. Você pode afetar até 3 aliados.', requirements: '3º círculo' },
      },
    },
    {
      id: 'metabolismo-adaptativo',
      name: 'Metabolismo Adaptativo',
      element: 'Sangue',
      circle: 1,
      execution: 'completa',
      range: 'pessoal',
      target: 'você',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Seu corpo se adapta aos danos sofridos, desenvolvendo resistência.',
      versions: {
        base: { pe: 0, description: 'Você ganha resistência 5 contra um tipo de dano.' },
        discente: { pe: 2, description: 'Resistência aumenta para 10. Você pode mudar o tipo de dano uma vez por cena.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Resistência é 15. Você pode ter resistência contra múltiplos tipos de dano.', requirements: '3º círculo' },
      },
    },
    {
      id: 'metamorfose-facial',
      name: 'Metamorfose Facial',
      element: 'Sangue',
      circle: 1,
      execution: 'padrão',
      range: 'pessoal',
      target: 'você',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Você altera seu rosto e características faciais para se parecer com outra pessoa.',
      versions: {
        base: { pe: 0, description: 'Você pode se parecer com uma pessoa genérica. Testes de Enganação recebem +5.' },
        discente: { pe: 2, description: 'Você pode se parecer com uma pessoa específica que você conhece.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Transformação é quase perfeita. Testes para detectar a fraude sofrem -10.', requirements: '3º círculo' },
      },
    },
    {
      id: 'sentidos-predatorios',
      name: 'Sentidos Predatórios',
      element: 'Sangue',
      circle: 1,
      execution: 'padrão',
      range: 'pessoal',
      target: 'você',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Seus sentidos se aguçam como os de um predador, permitindo rastrear presas.',
      versions: {
        base: { pe: 0, description: 'Você pode rastrear criaturas pelo cheiro em um raio de 100 metros.' },
        discente: { pe: 2, description: 'Raio aumenta para 500 metros. Você pode rastrear através de obstáculos.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Raio aumenta para 1 km. Você pode rastrear qualquer criatura que tenha visto.', requirements: '3º círculo' },
      },
    },
    {
      id: 'frenesi-sanguinario',
      name: 'Frenesi Sanguinário',
      element: 'Sangue',
      circle: 1,
      execution: 'padrão',
      range: 'pessoal',
      target: 'você',
      duration: '1 minuto',
      resistance: 'nenhuma',
      description: 'Você entra em um estado de frenesi, aumentando sua capacidade de combate.',
      versions: {
        base: { pe: 0, description: 'Você pode fazer um ataque adicional por turno. Recebe -2 em testes de defesa.' },
        discente: { pe: 2, description: 'Você pode fazer 2 ataques adicionais. Penalidade de defesa reduz para -1.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Você pode fazer 3 ataques adicionais. Sem penalidade de defesa.', requirements: '3º círculo' },
      },
    },
  ],

  // 1º CÍRCULO - MORTE (5 rituais)
  'Morte_1': [
    {
      id: 'aceleracao-cadaverica',
      name: 'Aceleração Cadavérica',
      element: 'Morte',
      circle: 1,
      execution: 'padrão',
      range: 'toque',
      target: '1 corpo morto',
      duration: 'instantânea',
      resistance: 'nenhuma',
      description: 'Você acelera a decomposição de um corpo, deixando apenas ossos em segundos.',
      versions: {
        base: { pe: 0, description: 'Corpo se desintegra completamente em 1 rodada.' },
        discente: { pe: 2, description: 'Você pode controlar o processo. Corpo pode se desintegrar parcialmente.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Você pode afetar múltiplos corpos. Processo é instantâneo.', requirements: '3º círculo' },
      },
    },
    {
      id: 'devorar-essencia-vital',
      name: 'Devorar Essência Vital',
      element: 'Morte',
      circle: 1,
      execution: 'padrão',
      range: 'curto',
      target: '1 criatura viva',
      duration: 'instantânea',
      resistance: 'Constituição reduz',
      description: 'Você drena a energia vital de um alvo, causando dano e curando a si mesmo.',
      versions: {
        base: { pe: 0, description: 'Alvo sofre 2d6 de dano. Você cura metade do dano causado.' },
        discente: { pe: 2, description: 'Dano aumenta para 4d6. Você cura todo o dano causado.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Dano é 6d6. Você cura o dano e ganha bônus temporário de PV.', requirements: '3º círculo' },
      },
    },
    {
      id: 'toque-decadencia',
      name: 'Toque da Decadência',
      element: 'Morte',
      circle: 1,
      execution: 'padrão',
      range: 'toque',
      target: '1 criatura viva',
      duration: 'cena',
      resistance: 'Constituição anula',
      description: 'Seu toque causa envelhecimento acelerado, enfraquecendo o alvo.',
      versions: {
        base: { pe: 0, description: 'Alvo sofre -2 em testes de força e resistência.' },
        discente: { pe: 2, description: 'Penalidade aumenta para -5. Alvo envelhece visivelmente.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Penalidade é -10. Alvo pode ficar permanentemente envelhecido.', requirements: '3º círculo' },
      },
    },
    {
      id: 'enfraquecimento-vital',
      name: 'Enfraquecimento Vital',
      element: 'Morte',
      circle: 1,
      execution: 'padrão',
      range: 'médio',
      target: '1 criatura',
      duration: '1 minuto',
      resistance: 'Vontade anula',
      description: 'Você enfraquece a vitalidade de um alvo, reduzindo sua capacidade de combate.',
      versions: {
        base: { pe: 0, description: 'Alvo sofre -3 em testes de ataque e dano.' },
        discente: { pe: 2, description: 'Penalidade aumenta para -6. Alvo também sofre -2 em testes de defesa.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Penalidade é -10 em tudo. Você pode afetar até 3 alvos.', requirements: '3º círculo' },
      },
    },
    {
      id: 'espirais-entropia',
      name: 'Espirais da Entropia',
      element: 'Morte',
      circle: 1,
      execution: 'completa',
      range: 'pessoal',
      target: 'você',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Você se envolve em uma aura de entropia que causa deterioração ao seu redor.',
      versions: {
        base: { pe: 0, description: 'Objetos próximos começam a se deteriorar lentamente.' },
        discente: { pe: 2, description: 'Deterioração é mais rápida. Criaturas próximas sofrem -2 em testes.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Você pode controlar o efeito. Deterioração é muito rápida.', requirements: '3º círculo' },
      },
    },
  ],

  // 1º CÍRCULO - MEDO (2 rituais)
  'Medo_1': [
    {
      id: 'nevoa-cineraria',
      name: 'Névoa Cinerária',
      element: 'Medo',
      circle: 1,
      execution: 'padrão',
      range: 'médio',
      target: 'até 4 cubos de 1,5 m',
      duration: 'cena',
      resistance: 'Vontade desacredita',
      description: 'Você cria uma névoa assustadora que causa medo e confusão.',
      versions: {
        base: { pe: 0, description: 'Criaturas na névoa sofrem -2 em testes. Visibilidade é reduzida.' },
        discente: { pe: 2, description: 'Penalidade aumenta para -5. Criaturas podem ficar assustadas.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Penalidade é -10. Criaturas podem ficar aterrorizadas.', requirements: '3º círculo' },
      },
    },
    {
      id: 'imbuir-arma-paranormal',
      name: 'Imbuir Arma Paranormal',
      element: 'Medo',
      circle: 1,
      execution: 'padrão',
      range: 'toque',
      target: '1 arma',
      duration: 'cena',
      resistance: 'nenhuma',
      description: 'Você envolve uma arma em energia paranormal que causa medo aos atingidos.',
      versions: {
        base: { pe: 0, description: 'Arma causa +1d6 de dano adicional. Alvo atingido sofre -1 em próximos testes.' },
        discente: { pe: 2, description: 'Dano adicional é +2d6. Penalidade aumenta para -3.', requirements: '2º círculo' },
        verdadeiro: { pe: 5, description: 'Dano adicional é +3d6. Alvo pode ficar assustado.', requirements: '3º círculo' },
      },
    },
  ],
};
