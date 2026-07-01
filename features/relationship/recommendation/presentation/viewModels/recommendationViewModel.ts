import type { Moment } from "@/features/relationship/moment/public";
import type { RecommendationPresentation } from "@/features/relationship/recommendation/presentation/recommendationPresenter";

export type RecommendationViewModel = {
  moment: Moment;
  presentation: RecommendationPresentation;
};