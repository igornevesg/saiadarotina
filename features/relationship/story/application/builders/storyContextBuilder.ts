import { buildChapterEventProfile } from "@/features/relationship/story/application/builders/chapterEventProfileBuilder";
import { analyzeStoryEvents } from "@/features/relationship/story/application/analyzers/storyAnalyzer";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

export function buildStoryContext(events: StoryEvent[]): StoryContext {
  const context = analyzeStoryEvents(events);

  return {
    ...context,
    eventProfile: buildChapterEventProfile(events),
  };
}