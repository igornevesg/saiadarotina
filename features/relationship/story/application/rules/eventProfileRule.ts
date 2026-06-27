import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

export function matchesEventProfile(
  variant: NarrativeVariant,
  context: StoryContext
) {
  const conditions = variant.conditions;

  if (!conditions) return true;

  const profile = context.eventProfile;

  if (conditions.requiresMatch && !profile.hasMatch) return false;

  if (conditions.requiresMemory && !profile.hasMemory) return false;

  if (conditions.requiresExperience && !profile.hasExperience) return false;

  if (conditions.requiresPurchase && !profile.hasPurchase) return false;

  if (
    conditions.requiresProductInteraction &&
    !profile.hasProductInteraction
  ) {
    return false;
  }

  if (conditions.requiresSpecialDate && !profile.hasSpecialDate) return false;

  return true;
}