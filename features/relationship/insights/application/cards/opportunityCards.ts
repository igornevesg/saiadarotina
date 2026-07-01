import type { CoupleOpportunity } from "@/features/relationship/insights/domain/coupleOpportunity";
import type { InsightCard } from "@/features/relationship/insights/domain/insightCard";

export const opportunityCards: Record<CoupleOpportunity, InsightCard> = {
  moreExperiences: {
    id: "moreExperiences",
    title: "Hora de viver algo novo",
    description:
      "Vocês podem fortalecer ainda mais a relação criando novas experiências juntos.",
    icon: "✨",
    priority: "high",
  },

  celebrateDates: {
    id: "celebrateDates",
    title: "Celebrem mais momentos",
    description:
      "Datas especiais ajudam a transformar o tempo em lembranças marcantes.",
    icon: "📅",
    priority: "medium",
  },

  createMemories: {
    id: "createMemories",
    title: "Registrem mais memórias",
    description:
      "Alguns momentos simples merecem ser guardados para contar a história de vocês.",
    icon: "📖",
    priority: "medium",
  },

  surprisePartner: {
    id: "surprisePartner",
    title: "Surpreenda seu par",
    description:
      "Pequenas surpresas podem reacender a curiosidade e criar novas conexões.",
    icon: "🎁",
    priority: "medium",
  },

  improveCommunication: {
    id: "improveCommunication",
    title: "Criem mais espaço para conversar",
    description:
      "Conversas intencionais ajudam o casal a se entender melhor e evoluir junto.",
    icon: "💬",
    priority: "high",
  },
};