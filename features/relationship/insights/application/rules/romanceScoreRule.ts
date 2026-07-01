import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";
import type { ScoreResult } from "@/features/relationship/insights/domain/relationshipScore";

export function calculateRomanceScore(metrics: InsightMetrics): ScoreResult {
  const value = Math.min(
    metrics.totalSpecialDates * 20 + metrics.totalProducts * 8,
    100
  );

  return {
    value,
    reasons: [
      `${metrics.totalSpecialDates} data${metrics.totalSpecialDates === 1 ? "" : "s"} especial${metrics.totalSpecialDates === 1 ? "" : "is"}`,
      `${metrics.totalProducts} interação${metrics.totalProducts === 1 ? "" : "ões"} com produto${metrics.totalProducts === 1 ? "" : "s"}`,
    ],
  };
}