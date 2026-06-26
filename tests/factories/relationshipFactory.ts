import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

export const relationshipFactory = {
  storyEvent(
    overrides: Partial<StoryEvent> = {}
  ): StoryEvent {
    return {
      id: crypto.randomUUID(),
      type: "match_created",
      title: "Surpresa romântica",
      description: "Essa experiência pode fazer sentido para vocês.",
      occurredAt: "2026-06-26T10:00:00.000Z",
      ...overrides,
    };
  },
};