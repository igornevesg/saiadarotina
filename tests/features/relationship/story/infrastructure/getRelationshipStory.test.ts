import { describe, expect, it, vi } from "vitest";

vi.mock(
  "@/features/relationship/infrastructure/repositories/timelineRepository",
  () => ({
    getTimelineByCouple: vi.fn().mockResolvedValue([
      {
        id: "1",
        event_type: "match_created",
        title: "Surpresa romântica",
        description: "Uma nova experiência.",
        created_at: "2026-06-26T10:00:00.000Z",
      },
    ]),
  })
);

import { executeGetRelationshipStory } from "@/features/relationship/story/application/use-cases/getRelationshipStory";

describe("Get Relationship Story", () => {
  it("deve retornar uma história construída a partir da timeline", async () => {
    const story = await executeGetRelationshipStory({
      coupleId: "couple-1",
    });

    expect(story.coupleId).toBe("couple-1");
    expect(story.totalChapters).toBe(1);
    expect(story.chapters).toHaveLength(1);
    expect(story.chapters[0].events).toHaveLength(1);
    expect(story.chapters[0].events[0].type).toBe("match_created");
  });
});