import { createMemory } from "@/features/relationship/infrastructure/repositories/memoryRepository";
import { createTimelineEvent } from "@/features/relationship/infrastructure/repositories/timelineRepository";
import type { MemoryCreatedPayload } from "@/features/platform/events/domainEvents";

export async function onMemoryCreated(payload: MemoryCreatedPayload) {
  const memory = await createMemory({
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

  await createTimelineEvent({
    coupleId: payload.coupleId,
    userId: payload.userId || null,
    ideaId: payload.ideaId || null,
    eventType: "memory_created",
    title: payload.title,
    description:
      payload.content || "Uma nova memória foi adicionada à história de vocês.",
    visibility: "couple",
    metadata: {
      memoryId: memory.id,
      mood: payload.mood || null,
      rating: payload.rating || null,
    },
  });

  return memory;
}