import type { DashboardViewModel } from "@/features/relationship/dashboard/presentation/view-models/dashboardViewModel";

export type DashboardPresentationCard = {
  id: string;
  title: string;
  narrative: string;
  icon: string;
  tone: "positive" | "warning" | "neutral";
  reflection?: string;
  badge?: string;
  action?: {
    label: string;
    href: string;
  };
};

export type DashboardPresentationModel = {
  hero: {
    title: string;
    subtitle: string;
    score: string;
    progress: number;
    badge: string;
    tone: "excellent" | "good" | "attention" | "start";
  };

  sections: {
    strengths: DashboardPresentationCard[];
    opportunities: DashboardPresentationCard[];
    highlights: DashboardPresentationCard[];
  };

  latestChapter: {
    title: string;
    headline: string;
    summary: string;
  } | null;
};

function getHeroTone(value: number): DashboardPresentationModel["hero"]["tone"] {
  if (value >= 80) return "excellent";
  if (value >= 60) return "good";
  if (value >= 40) return "attention";

  return "start";
}

function getHeroBadge(value: number) {
  if (value >= 80) return "Nossa conexão está muito forte";
  if (value >= 60) return "Estamos construindo uma boa conexão";
  if (value >= 40) return "Nossa história está em construção";

  return "O começo da nossa jornada";
}

function getCardTone(
  priority: "low" | "medium" | "high"
): DashboardPresentationCard["tone"] {
  if (priority === "high") return "warning";
  if (priority === "medium") return "neutral";

  return "positive";
}

function presentCards(
  cards: DashboardViewModel["strengths"]
): DashboardPresentationCard[] {
  return cards.map((card) => ({
    id: card.id,
    title: card.title,
    narrative: card.description,
    icon: card.icon,
    tone: getCardTone(card.priority),
  }));
}

export function presentDashboard(
  viewModel: DashboardViewModel
): DashboardPresentationModel {
  return {
    hero: {
      title: viewModel.score.label,
      subtitle: viewModel.score.description,
      score: viewModel.score.percentage,
      progress: viewModel.score.value,
      badge: getHeroBadge(viewModel.score.value),
      tone: getHeroTone(viewModel.score.value),
    },

    sections: {
      strengths: presentCards(viewModel.strengths),
      opportunities: presentCards(viewModel.opportunities),
      highlights: presentCards(viewModel.highlights),
    },

    latestChapter: viewModel.latestChapter,
  };
}