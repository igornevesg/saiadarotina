import type { EpilogueVariant } from "@/features/relationship/story/domain/EpilogueVariant";

export const romanticEpilogues: EpilogueVariant[] = [
  {
    conditions: {
      dominantJourney: "discovery",
    },

    title: "Toda história merece um começo",

    text:
      "Toda grande história começa com pequenas descobertas. Vocês deram os primeiros passos dessa jornada mostrando que afinidade nasce nos detalhes e cresce quando dois corações escolhem caminhar na mesma direção.",
  },

  {
    conditions: {
      dominantJourney: "connection",
    },

    title: "Laços que se fortalecem",

    text:
      "As páginas desta história mostram que o relacionamento de vocês foi além das primeiras descobertas. Cada lembrança registrada fortaleceu a conexão construída ao longo do tempo.",
  },

  {
    conditions: {
      dominantJourney: "adventure",
    },

    title: "Vivendo além da rotina",

    text:
      "Vocês escolheram transformar afinidade em experiências. Cada nova aventura escrita neste livro mostra que viver momentos juntos é uma das formas mais bonitas de fortalecer um relacionamento.",
  },

  {
    conditions: {
      dominantJourney: "celebration",
    },

    title: "Celebrando cada capítulo",

    text:
      "Alguns casais contam o tempo em dias. Vocês escolheram contar em momentos especiais. Este livro mostra que celebrar pequenas conquistas também faz parte de uma grande história.",
  },

  {
    title: "A história continua",

    text:
      "Nenhuma boa história termina na última página. Ela apenas faz uma pausa para que novos capítulos possam ser escritos. Que cada descoberta continue encontrando espaço entre as memórias de vocês.",
  },
];