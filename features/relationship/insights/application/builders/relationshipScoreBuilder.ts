import { calculateAdventureScore } from "@/features/relationship/insights/application/rules/adventureScoreRule";
import { calculateCommunicationScore } from "@/features/relationship/insights/application/rules/communicationScoreRule";
import { calculateConnectionScore } from "@/features/relationship/insights/application/rules/connectionScoreRule";
import { calculateConsistencyScore } from "@/features/relationship/insights/application/rules/consistencyScoreRule";
import { calculateRomanceScore } from "@/features/relationship/insights/application/rules/romanceScoreRule";
import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";
import type { RelationshipScore } from "@/features/relationship/insights/domain/relationshipScore";

export function buildRelationshipScore(
  metrics: InsightMetrics
): RelationshipScore {
  return {
    connection: calculateConnectionScore(metrics),

    romance: calculateRomanceScore(metrics),

    adventure: calculateAdventureScore(metrics),

    communication: calculateCommunicationScore(metrics),

    consistency: calculateConsistencyScore(metrics),
  };
}