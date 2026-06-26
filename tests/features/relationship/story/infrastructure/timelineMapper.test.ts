import { describe, expect, it } from "vitest";

import { mapTimelineToStoryEvents } from "@/features/relationship/story/infrastructure/mappers/timelineToStoryMapper";

describe("timelineToStoryMapper", () => {
  it("converte eventos da timeline para eventos do Story Engine", () => {
    const result = mapTimelineToStoryEvents([
      {
        id: "event-1",
        event_type: "match_created",
        title: "Surpresa romântica",
        description: "Essa experiência pode fazer sentido para vocês.",
        created_at: "2026-06-26T10:00:00.000Z",
      },
    ]);

    expect(result).toHaveLength(1);

    expect(result[0]).toEqual({
      id: "event-1",
      type: "match_created",
      title: "Surpresa romântica",
      description: "Essa experiência pode fazer sentido para vocês.",
      occurredAt: "2026-06-26T10:00:00.000Z",
    });
  });
});