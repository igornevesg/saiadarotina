import { presentRelationshipDna } from "@/features/relationship/dna/presentation/presenters/relationshipDnaPresenter";
import { buildRecommendationPipeline } from "@/features/relationship/recommendation/public";
import type { DashboardPresentationModel } from "@/features/relationship/dashboard/presentation/presenters/dashboardPresenter";
import type { RecommendationSignal } from "@/features/relationship/recommendation/public";
import type { TimelinePreviewItem } from "@/shared/ui/components";

type DashboardProviderResult = DashboardPresentationModel & {
  dna: ReturnType<typeof presentRelationshipDna>;
  recommendation: ReturnType<typeof buildRecommendationPipeline>["recommendation"];
  reflection: {
    icon: string;
    quote: string;
  };
  timelinePreview: TimelinePreviewItem[];
};

function mapSignalToOpportunity(signal: RecommendationSignal) {
  return {
    id: `signal-${signal.id}`,
    title: signal.reason.title,
    narrative: signal.reason.narrative,
    icon: signal.id === "routine" ? "✨" : "💌",
    tone: signal.priority >= 80 ? "warning" : "neutral",
    reflection:
      "Toda fase da nossa história pode abrir espaço para uma nova lembrança.",
    badge: "Percepção da nossa relação",
  } as const;
}

export function getDashboard(): DashboardProviderResult {
  const recommendationPipeline = buildRecommendationPipeline();
  const dna = presentRelationshipDna();

  const recommendationOpportunities =
    recommendationPipeline.signals.map(mapSignalToOpportunity);

  return {
    hero: {
      title: "Uma história surpreendente",
      subtitle:
        "Cada memória compartilhada fortalece uma relação que continua sendo escrita todos os dias.",
      score: "84%",
      progress: 84,
      badge: "Nossa conexão está muito forte",
      tone: "excellent",
    },

    dna,

    recommendation: recommendationPipeline.recommendation,

    reflection: {
      icon: "✨",
      quote:
        "As melhores histórias normalmente começam com um pequeno momento que quase passou despercebido.",
    },

    timelinePreview: [
      {
        id: "1",
        icon: "💌",
        title: "Registramos uma nova memória",
        subtitle: "Mais um momento simples ganhou espaço na nossa história.",
        timeLabel: "Hoje",
      },
      {
        id: "2",
        icon: "✨",
        title: "Vivemos um momento diferente",
        subtitle:
          "Uma pequena mudança na rotina abriu espaço para uma lembrança especial.",
        timeLabel: "Ontem",
      },
      {
        id: "3",
        icon: "📖",
        title: "Um novo capítulo começou",
        subtitle:
          "A história continua sendo escrita nos detalhes que escolhemos guardar.",
        timeLabel: "5 dias atrás",
      },
    ],

    sections: {
      strengths: [
        {
          id: "companionship",
          title: "Nossa conexão é um ponto forte",
          narrative:
            "Os pequenos momentos compartilhados mostram que construímos uma relação baseada em presença, confiança e carinho.",
          icon: "🤝",
          tone: "positive",
          reflection:
            "As relações mais fortes costumam crescer nos gestos mais simples.",
          badge: "Pilar da nossa história",
        },
        {
          id: "memories",
          title: "Nossas memórias aproximam",
          narrative:
            "As lembranças registradas mostram que valorizamos aquilo que vivemos juntos.",
          icon: "💌",
          tone: "positive",
          reflection:
            "Guardar uma lembrança também é uma forma de dizer que ela importou.",
          badge: "Memória viva",
        },
      ],

      opportunities:
        recommendationOpportunities.length > 0
          ? recommendationOpportunities
          : [
              {
                id: "nextDiscovery",
                title: "Nossa história pode ganhar uma nova descoberta",
                narrative:
                  "Uma experiência diferente pode transformar um dia comum em uma lembrança especial.",
                icon: "✨",
                tone: "neutral",
                reflection:
                  "Grandes lembranças normalmente começam com um pequeno convite.",
                badge: "Nova descoberta",
              },
            ],

      highlights: [],
    },

    latestChapter: {
      title: "Capítulo I",
      headline: "Uma descoberta para guardar",
      summary:
        "Hoje descobrimos um interesse em comum e demos início a uma nova possibilidade na nossa história.",
    },
  };
}