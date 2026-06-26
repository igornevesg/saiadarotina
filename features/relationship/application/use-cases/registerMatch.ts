import { eventDispatcher } from "@/infrastructure/eventBus/eventDispatcher";
import {
  DomainEvents,
  type MatchCreatedPayload,
} from "@/features/platform/events/domainEvents";
import { registerRelationshipListeners } from "@/features/relationship/events/registerRelationshipListeners";

export async function executeRegisterMatch(input: MatchCreatedPayload) {
  registerRelationshipListeners();

  await eventDispatcher.dispatch(DomainEvents.MatchCreated, input, {
    source: "relationship.register-match",
  });

  return { ok: true };
}