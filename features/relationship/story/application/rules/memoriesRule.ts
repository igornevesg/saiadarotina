import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

export function matchesMemories(
  variant: NarrativeVariant,
  context: StoryContext
) {
  const minMemories = variant.conditions?.minMemories;
  const maxMemories = variant.conditions?.maxMemories;
  const totalMemories = context.intelligence.totalMemories;

  if (typeof minMemories === "number" && totalMemories < minMemories) {
    return false;
  }

  if (typeof maxMemories === "number" && totalMemories > maxMemories) {
    return false;
  }

  return true;
}