import { describe, expect, it } from "vitest";

import { buildChapterFromEvents } from "@/features/relationship/story/infrastructure/builders/chapterBuilder";
import { timelineEventsFixture } from "@/tests/fixtures/timelineEvents";

describe("Chapter Builder", () => {
  describe("Quando recebe eventos do mesmo dia", () => {
    it("deve criar um capítulo com título, narrativa e eventos", () => {
      const events = timelineEventsFixture.matchAndMemory();

      const chapter = buildChapterFromEvents(
        "2026-06-26",
        events,
        0
      );

      expect(chapter.title).toBe("Capítulo I");

      expect(chapter.headline.length).toBeGreaterThan(5);

      expect(chapter.narrative.length).toBeGreaterThan(20);

      expect(chapter.events).toHaveLength(2);

      expect(chapter.events[0]).toHaveProperty("icon");
      expect(chapter.events[0]).toHaveProperty("label");
    });
  });
});