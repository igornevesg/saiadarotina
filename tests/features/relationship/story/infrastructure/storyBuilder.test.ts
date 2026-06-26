import { describe, expect, it } from "vitest";

import { buildStoryFromTimeline } from "@/features/relationship/story/infrastructure/builders/storyBuilder";

import { timelineEventsFixture } from "@/tests/fixtures/timelineEvents";

import { expectValidStory } from "@/tests/helpers/storyAssertions";

describe("storyBuilder", () => {
  it("agrupa eventos do mesmo dia em um capítulo", () => {
    const story = buildStoryFromTimeline({
      coupleId: "1",
      events: timelineEventsFixture.matchAndMemory(),
    });

    expectValidStory(story);

    expect(story.totalChapters).toBe(1);

    expect(story.chapters[0].events).toHaveLength(2);
  });

  it("cria dois capítulos para dias diferentes", () => {
    const story = buildStoryFromTimeline({
      coupleId: "1",
      events: timelineEventsFixture.twoDifferentDays(),
    });

    expect(story.totalChapters).toBe(2);
  });
});