import { eventDispatcher } from "@/infrastructure/eventBus/eventDispatcher";

import {
  DomainEvents,
  type RecommendationFeedbackPayload,
} from "@/features/platform/events/domainEvents";

import {
  saveRecommendationFeedback,
} from "@/features/relationship/recommendation/application/store/recommendationFeedbackStore";

export async function executeRecommendationFeedback(
  input: RecommendationFeedbackPayload
) {
  saveRecommendationFeedback({
    momentId: input.momentId,
    action: input.action,
    createdAt: new Date(),
  });

  await eventDispatcher.dispatch(
    DomainEvents.RecommendationFeedback,
    input,
    {
      source: "relationship.recommendation.feedback",
    }
  );

  return {
    ok: true,
  };
}