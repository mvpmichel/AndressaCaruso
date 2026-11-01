// Todo o texto e os dados do site ficam aqui.
// Fotos de exemplo: Unsplash (licença livre). Troque pelas fotos reais.
// Troque os placeholders pelos dados reais antes de publicar.

const whatsapp = '5551999999999';

function whatsappCom(mensagem) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const site = {
  nome: 'Andressa Caruso',
  cidade: 'Porto Alegre',
  whatsapp,
  whatsappCom,
  whatsappLink: whatsappCom('Olá, Andressa! Gostaria de agendar uma avaliação.'),
  telefone: '(51) 99999-9999',
  email: 'contato@andressacaruso.com.br',
  instagram: 'https://www.instagram.com/andressacaruso',
  instagramUser: '@andressacaruso',
  avaliacoes: 'https://g.page/r/andressacaruso/review',
  mapa: 'https://maps.google.com/?q=Porto+Alegre+RS',
  endereco: ['Rua Exemplo, 123, sala 45', 'Bairro Exemplo, Porto Alegre, RS'],
  horario: 'Segunda a sexta, das 9h às 19h. Sábados com agendamento.',
};

export const hero = {
  titulo: 'Laser com precisão, pele com cuidado.',
  destaque: 'precisão',
  texto:
    'Remoção de tatuagem e micropigmentação, tratamentos de pele e formação para profissionais em Porto Alegre. Cada sessão começa com uma avaliação honesta do que é possível para você.',
  cta: 'Agendar avaliação pelo WhatsApp',
  mensagem: 'Olá, Andressa! Gostaria de agendar uma avaliação.',
  linkSecundario: { href: '#procedimentos', texto: 'Ver procedimentos' },
  imagem: {
    src: 'https://images.unsplash.com/photo-1713085085470-fba013d67e65?w=900&h=1200&fit=crop&crop=faces&q=80&auto=format',
    alt: 'Paciente de olhos fechados recebendo tratamento facial com aparelho',
  },
  chips: [
    { titulo: '10+ anos', texto: 'de experiência com laser' },
    { titulo: 'Avaliação', texto: 'personalizada antes de tudo' },
  ],
  rolar: 'Role para descobrir',
};

// Faixa animada logo abaixo do hero.
export const faixa = [
  'Remoção de tatuagem',
  'Micropigmentação',
  'Manchas',
  'Rejuvenescimento',
  'Cicatrizes de acne',
  'Cursos para profissionais',
];

export const sobre = {
  titulo: 'Oi, eu sou a Andressa.',
  paragrafos: [
    'Trabalho com laser e estética da pele há mais de dez anos. Comecei atendendo em uma clínica pequena e hoje recebo pessoas no meu espaço em Porto Alegre, sempre com a mesma ideia: explicar tudo antes de começar.',
    'Acredito que um bom resultado depende de diagnóstico, paciência e equipamento certo. Por isso cada tratamento é planejado para a sua pele, o seu tempo e o seu objetivo.',
    'Também ensino. Nos cursos, divido com outras profissionais o que aprendi na prática, dos protocolos à biossegurança.',
  ],
  // Números placeholder: troque pelos reais.
  numeros: [
    { valor: 10, sufixo: '+', rotulo: 'anos com laser' },
    { valor: 300, sufixo: '+', rotulo: 'alunas formadas' },
    { valor: 5000, sufixo: '+', rotulo: 'atendimentos' },
  ],
  fatos: [
    { termo: 'Experiência', valor: 'Mais de 10 anos com laser' },
    { termo: 'Formação', valor: 'Especialização em estética avançada' },
    { termo: 'Atendimento', valor: 'Individual e com hora marcada' },
    { termo: 'Alunas formadas', valor: 'Mais de 300 profissionais' },
  ],
  imagem: {
    src: 'https://images.unsplash.com/photo-1731355771317-b2ab72c79124?w=800&h=1000&fit=crop&crop=faces&q=80&auto=format',
    alt: 'Andressa Caruso atendendo uma paciente',
  },
};

export const procedimentos = {
  titulo: 'Procedimentos',
  intro:
    'Todos os procedimentos começam com uma avaliação. O número de sessões é uma estimativa e pode mudar conforme a resposta da sua pele.',
  grupos: [
    {
      nome: 'Remoção a laser',
      imagem: { src: 'https://images.unsplash.com/photo-1598300195998-364bf445842c?w=800&h=600&fit=crop&crop=faces&q=80&auto=format', alt: '' },
      itens: [
        {
          nome: 'Remoção de tatuagem',
          resumo: 'Clareamento gradual ou remoção completa de tatuagens.',
          detalhes:
            'O laser fragmenta o pigmento em partículas pequenas, que o organismo elimina aos poucos. Cores escuras respondem mais rápido; tons claros podem exigir mais sessões.',
          sessoes: 'De 4 a 10 sessões, com intervalo de 45 a 60 dias.',
        },
        {
          nome: 'Remoção de micropigmentação',
          resumo: 'Correção ou remoção de sobrancelhas, lábios e olhos.',
          detalhes:
            'Indicado para pigmentos que mudaram de cor, ficaram fora do desenho ou simplesmente não agradam mais. Pode ser feito para preparar a pele para uma nova micropigmentação.',
          sessoes: 'De 2 a 6 sessões, com intervalo de 30 a 45 dias.',
        },
        {
          nome: 'Clareamento para cobertura',
          resumo: 'Prepara a tatuagem antiga para receber um novo desenho.',
          detalhes:
            'Quando a ideia é fazer uma cobertura, algumas sessões de clareamento dão mais liberdade ao tatuador e deixam o resultado final mais limpo.',
          sessoes: 'De 2 a 4 sessões, com intervalo de 45 dias.',
        },
      ],
    },
    {
      nome: 'Tratamentos de pele',
      imagem: { src: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&h=600&fit=crop&crop=faces&q=80&auto=format', alt: '' },
      itens: [
        {
          nome: 'Tratamento de manchas',
          resumo: 'Melasma, manchas de sol e hiperpigmentação.',
          detalhes:
            'Combinação de laser e cuidados em casa para uniformizar o tom da pele. O protocolo é ajustado conforme o tipo de mancha e o fototipo.',
          sessoes: 'De 4 a 8 sessões, com intervalo de 21 a 30 dias.',
        },
        {
          nome: 'Rejuvenescimento a laser',
          resumo: 'Melhora de textura, poros e linhas finas.',
          detalhes:
            'Estimula a produção de colágeno e renova a superfície da pele. O tempo de recuperação varia conforme a intensidade escolhida.',
          sessoes: 'De 3 a 5 sessões, com intervalo de 30 dias.',
        },
        {
          nome: 'Cicatrizes de acne',
          resumo: 'Suaviza marcas e irregularidades de textura.',
          detalhes:
            'Tratamento progressivo que ajuda a nivelar a superfície da pele. Pode ser combinado com outros procedimentos para potencializar o resultado.',
          sessoes: 'De 4 a 6 sessões, com intervalo de 30 a 45 dias.',
        },
      ],
    },
  ],
};

export const cursos = {
  titulo: 'Cursos para profissionais',
  intro:
    'Formação prática para quem já atua na área e quer trabalhar com laser com segurança, técnica e confiança.',
  itens: [
    {
      nome: 'Remoção de tatuagem e micropigmentação a laser',
      formato: 'Presencial, turmas pequenas',
      carga: '16 horas',
      publico: 'Esteticistas, micropigmentadoras e tatuadoras',
      descricao:
        'Da física do laser à prática em modelo. Protocolos, avaliação de pigmentos, parâmetros, biossegurança e como conduzir o atendimento do início ao fim.',
    },
    {
      nome: 'Laser em tratamentos de pele',
      formato: 'Presencial, com prática supervisionada',
      carga: '12 horas',
      publico: 'Profissionais da estética com formação na área',
      descricao:
        'Manchas, rejuvenescimento e cicatrizes: como escolher o protocolo, ajustar os parâmetros para cada fototipo e acompanhar a evolução do tratamento.',
    },
  ],
};

export const depoimentos = {
  titulo: 'O que dizem',
  itens: [
    {
      nome: 'Cliente 1',
      texto: 'Fui muito bem orientada desde a primeira conversa. Ela explicou cada etapa e o resultado veio como prometido.',
      procedimento: 'Remoção de tatuagem',
    },
    {
      nome: 'Cliente 2',
      texto: 'Minha sobrancelha antiga estava avermelhada e hoje está limpa. Atendimento cuidadoso e muito profissional.',
      procedimento: 'Remoção de micropigmentação',
    },
    {
      nome: 'Cliente 3',
      texto: 'As manchas clarearam bastante e aprendi a cuidar melhor da minha pele em casa.',
      procedimento: 'Tratamento de manchas',
    },
    {
      nome: 'Cliente 4',
      texto: 'O curso foi direto ao ponto, com muita prática. Saí segura para atender minhas primeiras clientes.',
      procedimento: 'Curso de remoção a laser',
    },
  ],
  linkAvaliacoes: 'Ver avaliações no Google',
};

export const contato = {
  titulo: 'Vamos conversar?',
  texto:
    'Me conte o que você quer tratar e marcamos uma avaliação. Respondo pelo WhatsApp em horário comercial.',
  cta: 'Chamar no WhatsApp',
  mensagem: 'Olá, Andressa! Vim pelo site e gostaria de mais informações.',
  rodape: 'Laser e tratamentos de pele em Porto Alegre.',
};
