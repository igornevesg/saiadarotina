import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

export interface Narrator {
  create(events: StoryEvent[], context: StoryContext): NarrativePackage;
}