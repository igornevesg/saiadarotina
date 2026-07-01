import type { Moment } from "@/features/relationship/moment/public";
import type { MomentRecommendation } from "@/features/relationship/recommendation/domain/momentRecommendation";
import type { RecommendationOutcome } from "@/features/relationship/recommendation/domain/recommendationOutcome";
import type { RecommendationReason } from "@/features/relationship/recommendation/domain/recommendationReason";

type CreateMomentRecommendationInput = {
  moment: Moment;
  reasons: RecommendationReason[];
  outcome: RecommendationOutcome;
};

export function createMomentRecommendation({
  moment,
  reasons,
  outcome,
}: CreateMomentRecommendationInput): MomentRecommendation {
  return {
    moment,
    reasons: [...reasons].sort((a, b) => b.priority - a.priority),
    outcome,
  };
}