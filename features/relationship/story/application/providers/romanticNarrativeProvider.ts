import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";

const romanticNarratives: NarrativeVariant[] = [
  {
    relationshipPhase: "discovery",
    package: {
      chapterTitle: "Uma descoberta para guardar",
      quote: "Alguns momentos começam com uma descoberta simples.",
      narrative:
        "Hoje vocês descobriram um interesse em comum e decidiram guardar esse momento na história de vocês.",
      reflection:
        "Quando uma descoberta vira memória, ela começa a fazer parte da jornada do casal.",
      mood: "romantic",
    },
  },
  {
    relationshipPhase: "connection",
    package: {
      chapterTitle: "Quando os caminhos se encontram",
      quote: "Às vezes, basta uma ideia em comum para abrir uma nova página.",
      narrative:
        "Vocês encontraram algo que despertou curiosidade nos dois. Pequenas descobertas assim podem se transformar em lembranças muito especiais.",
      reflection:
        "O mais bonito é perceber que uma história também se constrói nos detalhes que aproximam.",
      mood: "romantic",
    },
  },
  {
    relationshipPhase: "routine",
    package: {
      chapterTitle: "Mesmo nas pequenas coisas",
      quote: "O amor também se revela nos detalhes da rotina.",
      narrative:
        "Mesmo em meio aos dias comuns, vocês encontraram um novo ponto de conexão para guardar na história.",
      reflection:
        "Às vezes, o que mantém uma história viva são justamente os pequenos gestos repetidos com carinho.",
      mood: "romantic",
    },
  },
  {
    relationshipPhase: "adventure",
    package: {
      chapterTitle: "Um sim para a próxima memória",
      quote: "Toda conexão começa quando duas vontades se reconhecem.",
      narrative:
        "Neste capítulo, um interesse compartilhado apareceu como convite para viver algo novo juntos.",
      reflection:
        "Quando os dois se permitem experimentar, o relacionamento ganha novas páginas para lembrar.",
      mood: "romantic",
    },
  },
  {
    relationshipPhase: "celebration",
    package: {
      chapterTitle: "A beleza de descobrir juntos",
      quote: "Descobrir algo a dois torna o momento ainda mais especial.",
      narrative:
        "Hoje a história de vocês ganhou um novo ponto de encontro: uma ideia que fez sentido para os dois.",
      reflection:
        "As melhores memórias muitas vezes começam assim, com uma escolha simples feita em conjunto.",
      mood: "romantic",
    },
  },
];

function getDeterministicIndex(seed: string, length: number) {
  const total = seed.split("").reduce((sum, char) => {
    return sum + char.charCodeAt(0);
  }, 0);

  return total % length;
}

export function getRomanticNarrative(seed = "default") {
  const index = getDeterministicIndex(seed, romanticNarratives.length);

  return romanticNarratives[index].package;
}