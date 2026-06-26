import { eventDispatcher } from "@/infrastructure/eventBus/eventDispatcher";
import {
  DomainEvents,
  type MatchCreatedPayload,
} from "@/features/platform/events/domainEvents";
import { onMatchCreated } from "./matchCreated.listener";

let registered = false;

export function registerRelationshipListeners() {
  if (registered) return;

  eventDispatcher.subscribe(DomainEvents.MatchCreated, async (event) => {
    await onMatchCreated(event.payload as MatchCreatedPayload);
  });

  registered = true;
}