import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

export function matchesDominantEvent(
  variant: NarrativeVariant,
  context: StoryContext
) {
  const dominantEvent = variant.conditions?.dominantEvent;

  if (!dominantEvent) return true;

  return dominantEvent === context.dominantEvent;
}