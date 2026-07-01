import type { CoupleOpportunity } from "@/features/relationship/insights/domain/coupleOpportunity";
import type { CoupleProfile } from "@/features/relationship/insights/domain/coupleProfile";
import type { CoupleStrength } from "@/features/relationship/insights/domain/coupleStrength";
import type { RelationshipSnapshot } from "@/features/relationship/insights/domain/relationshipSnapshot";
import type { RelationshipTraits } from "@/features/relationship/insights/domain/relationshipTraits";

type BuildCoupleProfileInput = {
  snapshot: RelationshipSnapshot;
  traits: RelationshipTraits;
};

function hasTrait(traits: RelationshipTraits, trait: string) {
  return traits.traits.includes(trait as never);
}

function getPrimaryStrength(traits: RelationshipTraits): CoupleStrength {
  if (hasTrait(traits, "highlyConnected")) return "companionship";

  if (hasTrait(traits, "romantic")) return "romance";

  if (hasTrait(traits, "adventurous")) return "adventure";

  if (hasTrait(traits, "communicative")) return "communication";

  if (hasTrait(traits, "memoryKeeper")) return "memories";

  if (hasTrait(traits, "consistent")) return "consistency";

  return "companionship";
}

function getSecondaryStrength(
  traits: RelationshipTraits,
  primaryStrength: CoupleStrength
): CoupleStrength {
  const candidates: CoupleStrength[] = [
    hasTrait(traits, "romantic") ? "romance" : null,
    hasTrait(traits, "adventurous") ? "adventure" : null,
    hasTrait(traits, "communicative") ? "communication" : null,
    hasTrait(traits, "memoryKeeper") ? "memories" : null,
    hasTrait(traits, "consistent") ? "consistency" : null,
    hasTrait(traits, "highlyConnected") ? "companionship" : null,
  ].filter(Boolean) as CoupleStrength[];

  return (
    candidates.find((candidate) => candidate !== primaryStrength) ||
    "memories"
  );
}

function getOpportunities(
  snapshot: RelationshipSnapshot,
  traits: RelationshipTraits
): CoupleOpportunity[] {
  const opportunities: CoupleOpportunity[] = [];

  if (hasTrait(traits, "needsExperiences")) {
    opportunities.push("moreExperiences");
  }

  if (hasTrait(traits, "needsCelebrations")) {
    opportunities.push("celebrateDates");
  }

  if (snapshot.metrics.totalMemories < 10) {
    opportunities.push("createMemories");
  }

  if (snapshot.metrics.totalProducts < 3) {
    opportunities.push("surprisePartner");
  }

  if (hasTrait(traits, "needsCommunication")) {
    opportunities.push("improveCommunication");
  }

  return opportunities;
}

export function analyzeCoupleProfile({
  snapshot,
  traits,
}: BuildCoupleProfileInput): CoupleProfile {
  const primaryStrength = getPrimaryStrength(traits);

  return {
    primaryStrength,
    secondaryStrength: getSecondaryStrength(traits, primaryStrength),
    opportunities: getOpportunities(snapshot, traits),
  };
}