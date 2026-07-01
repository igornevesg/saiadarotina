import type { RecommendationReason } from "@/features/relationship/recommendation/domain/recommendationReason";

export type RecommendationPolicyResult = {
  matched: boolean;
  priority: number;
  reason?: RecommendationReason;
};