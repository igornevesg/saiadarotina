import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";
import type { ScoreResult } from "@/features/relationship/insights/domain/relationshipScore";

export function calculateAdventureScore(metrics: InsightMetrics): ScoreResult {
  const value = Math.min(metrics.totalExperiences * 12, 100);

  return {
    value,
    reasons: [
      `${metrics.totalExperiences} experiência${metrics.totalExperiences === 1 ? "" : "s"} vivida${metrics.totalExperiences === 1 ? "" : "s"}`,
    ],
  };
}