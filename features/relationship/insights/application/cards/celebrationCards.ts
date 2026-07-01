import type { InsightCard } from "@/features/relationship/insights/domain/insightCard";

export const celebrationCards = {
  firstMemory: {
    id: "firstMemory",
    title: "A primeira memória",
    description:
      "Toda grande história começa com um primeiro capítulo. Vocês já começaram a escrever a de vocês.",
    icon: "🌱",
    priority: "low",
  },

  tenMemories: {
    id: "tenMemories",
    title: "10 memórias registradas",
    description:
      "Vocês já construíram uma bela coleção de momentos especiais juntos.",
    icon: "📖",
    priority: "medium",
  },

  fiftyMemories: {
    id: "fiftyMemories",
    title: "50 memórias inesquecíveis",
    description:
      "Poucos casais registram tantas lembranças. A história de vocês está ficando incrível.",
    icon: "🏆",
    priority: "high",
  },

  firstExperience: {
    id: "firstExperience",
    title: "Primeira experiência juntos",
    description:
      "Sair da rotina é o primeiro passo para criar lembranças inesquecíveis.",
    icon: "✨",
    priority: "medium",
  },

 tenExperiences: {
    id: "tenExperiences",
    title: "Exploradores da relação",
    description:
      "Vocês já viveram muitas experiências juntos. Continuem explorando o mundo lado a lado.",
    icon: "🧭",
    priority: "high",
  },

  oneYear: {
    id: "oneYear",
    title: "Um ano de história",
    description:
      "Um ano pode parecer pouco para o mundo, mas representa inúmeros momentos para um casal.",
    icon: "❤️",
    priority: "medium",
  },
} as const;