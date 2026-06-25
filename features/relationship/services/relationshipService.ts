import { eventDispatcher } from "@/infrastructure/eventBus/eventDispatcher";
import {
  DomainEvents,
  type MatchCreatedPayload,
} from "@/features/platform/events/domainEvents";
import { registerRelationshipListeners } from "../events/registerRelationshipListeners";

export async function registerMatchInTimeline(input: MatchCreatedPayload) {
  registerRelationshipListeners();

  await eventDispatcher.dispatch(DomainEvents.MatchCreated, input, {
    source: "relationship.match",
  });

  return { ok: true };
}