import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";
import { matchesDominantEvent } from "@/features/relationship/story/application/rules/dominantEventRule";
import { matchesExperiences } from "@/features/relationship/story/application/rules/experiencesRule";
import { matchesMemories } from "@/features/relationship/story/application/rules/memoriesRule";
import { matchesRelationshipPhase } from "@/features/relationship/story/application/rules/relationshipPhaseRule";
import { matchesEventProfile } from "@/features/relationship/story/application/rules/eventProfileRule";

function getDeterministicIndex(seed: string, length: number) {
  const total = seed.split("").reduce((sum, char) => {
    return sum + char.charCodeAt(0);
  }, 0);

  return total % length;
}

function hasConditions(variant: NarrativeVariant) {
  return Boolean(variant.conditions);
}

function matchesConditions(variant: NarrativeVariant, context: StoryContext) {
  return (
    matchesRelationshipPhase(variant, context) &&
    matchesDominantEvent(variant, context) &&
    matchesMemories(variant, context) &&
    matchesExperiences(variant, context) &&
    matchesEventProfile(variant, context)
  );
}

export function selectNarrativeVariant(
  variants: NarrativeVariant[],
  context: StoryContext,
  seed = "default"
) {
  const specificCandidates = variants.filter((variant) => {
    return hasConditions(variant) && matchesConditions(variant, context);
  });

  const fallbackCandidates = variants.filter((variant) => {
    return !hasConditions(variant);
  });

  const candidates =
    specificCandidates.length > 0
      ? specificCandidates
      : fallbackCandidates.length > 0
        ? fallbackCandidates
        : variants;

  const index = getDeterministicIndex(seed, candidates.length);

  return candidates[index].package;
}