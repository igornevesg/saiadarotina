import type { CoupleProfile } from "@/features/relationship/insights/domain/coupleProfile";
import type { InsightCard } from "@/features/relationship/insights/domain/insightCard";
import type { InsightMetrics } from "@/features/relationship/insights/domain/insightMetrics";
import type { RelationshipScore } from "@/features/relationship/insights/domain/relationshipScore";

export type RelationshipInsights = {
  metrics: InsightMetrics;

  score: RelationshipScore;

  profile: CoupleProfile;

  cards: InsightCard[];
};