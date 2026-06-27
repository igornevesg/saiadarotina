import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

export interface NarrativeStrategy {
  create(events: StoryEvent[], context: StoryContext): NarrativePackage;
}