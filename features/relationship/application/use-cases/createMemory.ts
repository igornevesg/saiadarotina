import { createMemory } from "@/features/relationship/memory/public";
import type { MemoryImpact, MemoryMood } from "@/features/relationship/memory/public";
import { eventDispatcher } from "@/infrastructure/eventBus/eventDispatcher";
import {
  DomainEvents,
  type MemoryCreatedPayload,
} from "@/features/platform/events/domainEvents";
import { registerRelationshipListeners } from "@/features/relationship/events/registerRelationshipListeners";
import { generateId } from "@/shared/identity/generateId";
import { toMemoryCreatedPayload } from "@/features/relationship/memory/mappers/memoryEventMapper";

const allowedMoods: MemoryMood[] = [
  "happy",
  "romantic",
  "fun",
  "calm",
  "surprised",
  "grateful",
];

function normalizeMood(mood?: string | null): MemoryMood {
  if (mood && allowedMoods.includes(mood as MemoryMood)) {
    return mood as MemoryMood;
  }

  return "happy";
}

function getImpactFromRating(rating?: number | null): MemoryImpact {
  if (!rating) return "special";

  if (rating >= 5) return "unforgettable";

  if (rating <= 2) return "small";

  return "special";
}

export async function executeCreateMemory(input: MemoryCreatedPayload) {
  registerRelationshipListeners();

  const memory = createMemory({
    id: generateId(),
    title: input.title,
    narrative: input.content || input.title,
    mood: normalizeMood(input.mood),
    source: "manual",
    impact: getImpactFromRating(input.rating),
    tags: input.ideaId ? ["idea"] : [],
    relatedMomentId: input.ideaId ?? undefined,
  });

  await eventDispatcher.dispatch(
  DomainEvents.MemoryCreated,
  toMemoryCreatedPayload(memory, input),
  {
    source: "relationship.create-memory",
  }
);

  return { ok: true };
}