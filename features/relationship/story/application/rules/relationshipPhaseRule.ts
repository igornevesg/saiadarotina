import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

export function matchesRelationshipPhase(
  variant: NarrativeVariant,
  context: StoryContext
) {
  const phase = variant.conditions?.relationshipPhase;

  if (!phase) return true;

  return phase === context.intelligence.phase;
}