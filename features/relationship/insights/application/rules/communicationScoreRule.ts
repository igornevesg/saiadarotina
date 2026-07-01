import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";
import type { ScoreResult } from "@/features/relationship/insights/domain/relationshipScore";

export function calculateCommunicationScore(
  metrics: InsightMetrics
): ScoreResult {
  const value =
    metrics.totalEvents === 0
      ? 0
      : Math.min(40 + metrics.totalMemories * 4, 100);

  return {
    value,
    reasons: [
      `${metrics.totalEvents} acontecimento${metrics.totalEvents === 1 ? "" : "s"} registrado${metrics.totalEvents === 1 ? "" : "s"}`,
      `${metrics.totalMemories} memória${metrics.totalMemories === 1 ? "" : "s"} compartilhada${metrics.totalMemories === 1 ? "" : "s"}`,
    ],
  };
}