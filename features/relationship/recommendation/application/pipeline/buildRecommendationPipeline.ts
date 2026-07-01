import { buildRelationshipContext } from "@/features/relationship/context/public";
import { selectMomentFromSignals } from "@/features/relationship/recommendation/application/selectors/momentSelector";
import { resolveSignals } from "@/features/relationship/recommendation/application/resolveSignals";
import { evaluateRoutineRecommendation } from "@/features/relationship/recommendation/policies/routineRecommendationPolicy";
import { presentRecommendation } from "@/features/relationship/recommendation/presentation/recommendationPresenter";
import type { RecommendationViewModel } from "@/features/relationship/recommendation/presentation/viewModels/recommendationViewModel";

export function buildRecommendationPipeline() {
  const context = buildRelationshipContext();

  const signals = resolveSignals([
    evaluateRoutineRecommendation(context),
  ]);

  const moment = selectMomentFromSignals(signals);

  const presentation = presentRecommendation(moment, signals);

  const recommendation: RecommendationViewModel = {
    moment,
    presentation,
  };

  return {
    context,
    signals,
    recommendation,
  };
}