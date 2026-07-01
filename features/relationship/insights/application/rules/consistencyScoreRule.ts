import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";
import type { ScoreResult } from "@/features/relationship/insights/domain/relationshipScore";

export function calculateConsistencyScore(
  metrics: InsightMetrics
): ScoreResult {
  if (metrics.relationshipDays === 0) {
    return {
      value: 0,
      reasons: ["Ainda não há eventos suficientes para medir consistência."],
    };
  }

  const eventsPerWeek = metrics.totalEvents / Math.max(metrics.relationshipDays / 7, 1);
  const value = Math.min(Math.round(eventsPerWeek * 20), 100);

  return {
    value,
    reasons: [
      `${metrics.totalEvents} acontecimento${metrics.totalEvents === 1 ? "" : "s"} ao longo de ${metrics.relationshipDays} dia${metrics.relationshipDays === 1 ? "" : "s"}`,
    ],
  };
}