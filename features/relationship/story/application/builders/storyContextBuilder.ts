import { analyzeStoryEvents } from "@/features/relationship/story/application/analyzers/storyAnalyzer";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

export function buildStoryContext(events: StoryEvent[]): StoryContext {
  return analyzeStoryEvents(events);
}