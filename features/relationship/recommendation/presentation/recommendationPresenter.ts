import type { Moment } from "@/features/relationship/moment/public";
import type { RecommendationSignal } from "@/features/relationship/recommendation/public";

export type ExperienceJourneyChapter = {
  id: string;
  icon: string;
  title: string;
  items: string[];
};

export type ExperienceComplement = {
  title: string;
  description: string;
  available: boolean;
};

export type RelationshipConfidence = {
  level: "starting" | "growing" | "mature";
  title: string;
  description: string;
};

export type RecommendationPresentation = {
  title: string;
  narrative: string;
  why: string;
  cta: string;
  journey: ExperienceJourneyChapter[];
  complement: ExperienceComplement;
  confidence: RelationshipConfidence;
};

export function presentRecommendation(
  moment: Moment,
  signals: RecommendationSignal[]
): RecommendationPresentation {
  const hasRoutineSignal = signals.some((signal) => signal.id === "routine");

  const why = hasRoutineSignal
    ? "Percebemos que a rotina ficou um pouco mais previsível nos últimos dias. Escolhemos uma experiência leve para transformar uma noite comum em uma nova lembrança juntos."
    : "Escolhemos uma experiência que combina com o momento atual da relação e pode render mais uma boa história.";

  return {
    title: moment.title,
    narrative: moment.narrative,
    why,
    cta: "Quando viverem esse momento, contem para nós como foi ❤️",

    journey: [
      {
        id: "environment",
        icon: "🕯️",
        title: "Criando o ambiente",
        items: [
          "Deixem as luzes mais baixas.",
          "Coloquem os celulares no silencioso.",
          "Escolham uma música tranquila para acompanhar o momento.",
        ],
      },
      {
        id: "connection",
        icon: "❤️",
        title: "Aproveitando o momento",
        items: [
          "Conversem sem pressa.",
          "Façam algo simples que ajude vocês a se aproximarem.",
          "Permitam que esse momento seja só de vocês.",
        ],
      },
      {
        id: "memory",
        icon: "📖",
        title: "Guardando essa lembrança",
        items: [
          "Depois, registrem como foi viver esse momento.",
          "Guardem um detalhe especial para virar parte da nossa história.",
        ],
      },
    ],

    complement: {
      title: "Um toque especial para este momento",
      description:
        "Estamos preparando sugestões que façam sentido para cada experiência. Quando estiverem disponíveis, aparecerão aqui.",
      available: false,
    },

    confidence: {
      level: "starting",
      title: "Conhecendo melhor vocês",
      description:
        "Cada momento vivido, cada memória registrada e cada feedback nos ajudam a entender melhor o estilo da relação de vocês. Assim conseguimos sugerir experiências cada vez mais parecidas com aquilo que realmente faz sentido para nós.",
    },
  };
}