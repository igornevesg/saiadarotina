import type { Moment } from "@/features/relationship/moment/public";
import type { RecommendationOutcome } from "@/features/relationship/recommendation/domain/recommendationOutcome";
import type { RecommendationReason } from "@/features/relationship/recommendation/domain/recommendationReason";

export type MomentRecommendation = {
  moment: Moment;
  reasons: RecommendationReason[];
  outcome: RecommendationOutcome;
};