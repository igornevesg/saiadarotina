import type { RecommendationReason } from "@/features/relationship/recommendation/public";

export type RecommendationSignal = {
  id: string;
  priority: number;
  reason: RecommendationReason;
};