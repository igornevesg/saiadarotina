import { eventDispatcher } from "@/infrastructure/eventBus/eventDispatcher";
import {
  DomainEvents,
  type MemoryCreatedPayload,
} from "@/features/platform/events/domainEvents";
import { registerRelationshipListeners } from "@/features/relationship/events/registerRelationshipListeners";

export async function executeCreateMemory(input: MemoryCreatedPayload) {
  registerRelationshipListeners();

  await eventDispatcher.dispatch(DomainEvents.MemoryCreated, input, {
    source: "relationship.create-memory",
  });

  return { ok: true };
}