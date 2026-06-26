import { eventDispatcher } from "@/infrastructure/eventBus/eventDispatcher";
import {
  DomainEvents,
  type MatchCreatedPayload,
  type MemoryCreatedPayload,
} from "@/features/platform/events/domainEvents";
import { onMatchCreated } from "./matchCreated.listener";
import { onMemoryCreated } from "./memoryCreated.listener";

let registered = false;

export function registerRelationshipListeners() {
  if (registered) return;

  eventDispatcher.subscribe(DomainEvents.MatchCreated, async (event) => {
    await onMatchCreated(event.payload as MatchCreatedPayload);
  });

  eventDispatcher.subscribe(DomainEvents.MemoryCreated, async (event) => {
    await onMemoryCreated(event.payload as MemoryCreatedPayload);
  });

  registered = true;
}