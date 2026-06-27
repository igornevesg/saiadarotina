import type { EpilogueVariant } from "@/features/relationship/story/domain/EpilogueVariant";
import type { StorySummaryContext } from "@/features/relationship/story/domain/storySummaryContext";

function matchesConditions(
  variant: EpilogueVariant,
  context: StorySummaryContext
) {
  const conditions = variant.conditions;

  if (!conditions) return false;

  if (
    conditions.dominantJourney &&
    conditions.dominantJourney !== context.dominantJourney
  ) {
    return false;
  }

  if (
    conditions.dominantEmotion &&
    conditions.dominantEmotion !== context.dominantEmotion
  ) {
    return false;
  }

  return true;
}

export function selectEpilogueVariant(
  variants: EpilogueVariant[],
  context: StorySummaryContext
) {
  const specificCandidates = variants.filter((variant) =>
    matchesConditions(variant, context)
  );

  const fallbackCandidates = variants.filter((variant) => !variant.conditions);

  const candidates =
    specificCandidates.length > 0
      ? specificCandidates
      : fallbackCandidates.length > 0
        ? fallbackCandidates
        : variants;

  return candidates[0];
}