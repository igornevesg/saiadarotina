import type { StoryContext } from "@/features/relationship/story/domain/storyContext";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";
import { getRomanticNarrative } from "@/features/relationship/story/application/providers/romanticNarrativeProvider";
import { getHappyNarrative } from "@/features/relationship/story/application/providers/happyNarrativeProvider";
import { getNostalgicNarrative } from "@/features/relationship/story/application/providers/nostalgicNarrativeProvider";
import { getAdventureNarrative } from "@/features/relationship/story/application/providers/adventureNarrativeProvider";
import { getNeutralNarrative } from "@/features/relationship/story/application/providers/neutralNarrativeProvider";

export function selectNarrativeProvider(
  events: StoryEvent[],
  context: StoryContext
): NarrativePackage {
  if (context.hasMatch && context.hasMemory) {
    return getRomanticNarrative();
  }

  if (context.dominantEvent === "memory") {
    return getNostalgicNarrative();
  }

  if (context.dominantEvent === "experience") {
    return getAdventureNarrative();
  }

  if (context.dominantEvent === "match") {
    return getHappyNarrative();
  }

  return getNeutralNarrative(events);
}