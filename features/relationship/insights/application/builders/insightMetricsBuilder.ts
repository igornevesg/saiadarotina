import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";

type BuildInsightMetricsInput = {
  events: StoryEvent[];
  totalChapters: number;
};

function countByType(events: StoryEvent[], type: string) {
  return events.filter((event) => event.type === type).length;
}

function getRelationshipDays(events: StoryEvent[]) {
  if (events.length === 0) return 0;

  const timestamps = events.map((event) =>
    new Date(event.occurredAt).getTime()
  );

  const first = Math.min(...timestamps);
  const last = Math.max(...timestamps);

  return Math.max(
    1,
    Math.floor((last - first) / 1000 / 60 / 60 / 24) + 1
  );
}

export function buildInsightMetrics({
  events,
  totalChapters,
}: BuildInsightMetricsInput): InsightMetrics {
  const totalProductClicks = countByType(events, "product_clicked");
  const totalProductPurchases = countByType(events, "product_purchased");

  return {
  totalEvents: events.length,
  totalMatches: countByType(events, "match_created"),
  totalMemories: countByType(events, "memory_created"),
  totalExperiences: countByType(events, "experience_completed"),
  totalSpecialDates: countByType(events, "special_date_added"),
  totalProducts: totalProductClicks + totalProductPurchases,
  totalChapters,
  relationshipDays: getRelationshipDays(events),
};
}