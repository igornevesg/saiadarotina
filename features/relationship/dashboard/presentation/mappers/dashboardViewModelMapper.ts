import type { RelationshipDashboard } from "@/features/relationship/dashboard/public";
import type {
  DashboardCardViewModel,
  DashboardLatestChapterViewModel,
  DashboardScoreViewModel,
  DashboardViewModel,
} from "@/features/relationship/dashboard/presentation/view-models/dashboardViewModel";

function toPercentage(value: number) {
  return `${Math.round(value)}%`;
}

function getAverageScore(dashboard: RelationshipDashboard) {
  const { score } = dashboard.insights;

  const values = [
    score.connection.value,
    score.romance.value,
    score.adventure.value,
    score.communication.value,
    score.consistency.value,
  ];

  return Math.round(
    values.reduce((total, current) => total + current, 0) / values.length
  );
}

function getScoreDescription(value: number) {
  if (value >= 80) {
    return "A relação de vocês demonstra uma base muito forte e cheia de sinais positivos.";
  }

  if (value >= 60) {
    return "A relação de vocês mostra bons sinais de conexão, com espaço para evoluir ainda mais.";
  }

  if (value >= 40) {
    return "A relação de vocês já possui pontos importantes, mas ainda pode ganhar mais constância e novas experiências.";
  }

  return "Este é um ótimo momento para começar a criar mais memórias, experiências e momentos especiais juntos.";
}

function mapScore(dashboard: RelationshipDashboard): DashboardScoreViewModel {
  const value = getAverageScore(dashboard);

  return {
    label: "Retrato da relação",
    value,
    percentage: toPercentage(value),
    description: getScoreDescription(value),
  };
}

function mapCards(cards: RelationshipDashboard["insights"]["cards"]) {
  return cards.map((card) => ({
    id: card.id,
    title: card.title,
    description: card.description,
    icon: card.icon,
    priority: card.priority,
  }));
}

function getStrengthIds(dashboard: RelationshipDashboard) {
  const { primaryStrength, secondaryStrength } = dashboard.insights.profile;

  return [primaryStrength, secondaryStrength];
}

function mapStrengths(dashboard: RelationshipDashboard): DashboardCardViewModel[] {
  const strengthIds = getStrengthIds(dashboard);

  return mapCards(dashboard.insights.cards).filter((card) =>
    strengthIds.includes(card.id as never)
  );
}

function mapOpportunities(
  dashboard: RelationshipDashboard
): DashboardCardViewModel[] {
  const opportunities = dashboard.insights.profile.opportunities;

  return mapCards(dashboard.insights.cards).filter((card) =>
    opportunities.includes(card.id as never)
  );
}

function mapHighlights(dashboard: RelationshipDashboard): DashboardCardViewModel[] {
  const strengthIds = getStrengthIds(dashboard);
  const opportunities = dashboard.insights.profile.opportunities;

  return mapCards(dashboard.insights.cards).filter((card) => {
    return (
      !strengthIds.includes(card.id as never) &&
      !opportunities.includes(card.id as never)
    );
  });
}

function mapLatestChapter(
  dashboard: RelationshipDashboard
): DashboardLatestChapterViewModel | null {
  const latestChapter = dashboard.story.chapters[0];

  if (!latestChapter) return null;

  return {
    title: latestChapter.title,
    headline: latestChapter.headline,
    summary: latestChapter.narrative,
  };
}

export function mapDashboardToViewModel(
  dashboard: RelationshipDashboard
): DashboardViewModel {
  return {
    score: mapScore(dashboard),
    strengths: mapStrengths(dashboard),
    opportunities: mapOpportunities(dashboard),
    highlights: mapHighlights(dashboard),
    latestChapter: mapLatestChapter(dashboard),
  };
}