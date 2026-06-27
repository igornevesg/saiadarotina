import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

export function matchesExperiences(
  variant: NarrativeVariant,
  context: StoryContext
) {
  const minExperiences = variant.conditions?.minExperiences;
  const maxExperiences = variant.conditions?.maxExperiences;
  const totalExperiences = context.intelligence.totalExperiences;

  if (
    typeof minExperiences === "number" &&
    totalExperiences < minExperiences
  ) {
    return false;
  }

  if (
    typeof maxExperiences === "number" &&
    totalExperiences > maxExperiences
  ) {
    return false;
  }

  return true;
}