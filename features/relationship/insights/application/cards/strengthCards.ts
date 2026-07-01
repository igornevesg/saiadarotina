import type { InsightCard } from "@/features/relationship/insights/domain/insightCard";
import type { CoupleStrength } from "@/features/relationship/insights/domain/coupleStrength";

export const strengthCards: Record<CoupleStrength, InsightCard> = {
  companionship: {
    id: "companionship",
    title: "Conexão muito forte",
    description:
      "Vocês demonstram uma relação construída sobre confiança e momentos compartilhados.",
    icon: "❤️",
    priority: "high",
  },

  romance: {
    id: "romance",
    title: "Romantismo em destaque",
    description:
      "Pequenos gestos românticos aparecem com frequência na história de vocês.",
    icon: "🌹",
    priority: "high",
  },

  adventure: {
    id: "adventure",
    title: "Espírito aventureiro",
    description:
      "Vocês gostam de criar novas experiências e sair da rotina juntos.",
    icon: "🧭",
    priority: "medium",
  },

  communication: {
    id: "communication",
    title: "Boa comunicação",
    description:
      "O relacionamento demonstra uma comunicação consistente e saudável.",
    icon: "💬",
    priority: "medium",
  },

  memories: {
    id: "memories",
    title: "Colecionadores de memórias",
    description:
      "Vocês registram momentos importantes e constroem uma linda história.",
    icon: "📖",
    priority: "medium",
  },

  consistency: {
    id: "consistency",
    title: "Constância admirável",
    description:
      "A relação mostra estabilidade e continuidade ao longo do tempo.",
    icon: "⭐",
    priority: "medium",
  },
};