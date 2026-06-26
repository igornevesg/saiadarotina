import { createMemory } from "@/features/relationship/infrastructure/repositories/memoryRepository";
import type { MemoryCreatedPayload } from "@/features/platform/events/domainEvents";

export async function onMemoryCreated(payload: MemoryCreatedPayload) {
  return createMemory({
    coupleId: payload.coupleId,
    userId: payload.userId || null,
    ideaId: payload.ideaId || null,
    title: payload.title,
    content: payload.content || null,
    rating: payload.rating || null,
    mood: payload.mood || null,
    metadata: {
      source: "living_book",
    },
  });
}