import type { Memory } from "@/features/relationship/memory/public";
import type { MemoryCreatedPayload } from "@/features/platform/events/domainEvents";

export function toMemoryCreatedPayload(
  memory: Memory,
  original: MemoryCreatedPayload
): MemoryCreatedPayload {
  return {
    ...original,
    title: memory.title,
    content: memory.narrative,
    mood: memory.mood,
  };
}