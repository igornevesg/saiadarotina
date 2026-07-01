import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";
import type { ScoreResult } from "@/features/relationship/insights/domain/relationshipScore";

export function calculateConnectionScore(
  metrics: InsightMetrics
): ScoreResult {
  const value = Math.min(metrics.totalMatches * 8 + metrics.totalMemories * 5, 100);

  return {
    value,
    reasons: [
      `${metrics.totalMatches} interesse${metrics.totalMatches === 1 ? "" : "s"} em comum`,
      `${metrics.totalMemories} memória${metrics.totalMemories === 1 ? "" : "s"} registrada${metrics.totalMemories === 1 ? "" : "s"}`,
    ],
  };
}