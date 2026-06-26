import { relationshipFactory } from "../factories/relationshipFactory";

export const timelineEventsFixture = {
  singleMatch() {
    return [
      relationshipFactory.storyEvent(),
    ];
  },

  matchAndMemory() {
    return [
      relationshipFactory.storyEvent(),

      relationshipFactory.storyEvent({
        type: "memory_created",
        title: "Nossa primeira memória",
      }),
    ];
  },

  twoDifferentDays() {
    return [
      relationshipFactory.storyEvent({
        occurredAt: "2026-06-25T09:00:00.000Z",
      }),

      relationshipFactory.storyEvent({
        occurredAt: "2026-06-26T09:00:00.000Z",
      }),
    ];
  },
};