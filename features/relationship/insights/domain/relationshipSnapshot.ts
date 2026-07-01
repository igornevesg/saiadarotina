import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";
import type { RelationshipScore } from "@/features/relationship/insights/domain/relationshipScore";

export type RelationshipSnapshot = {
  metrics: InsightMetrics;

  score: RelationshipScore;
};