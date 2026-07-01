import type { RelationshipSnapshot } from "@/features/relationship/insights/domain/relationshipSnapshot";
import type { RelationshipTrait } from "@/features/relationship/insights/domain/relationshipTrait";
import type { RelationshipTraits } from "@/features/relationship/insights/domain/relationshipTraits";

export function analyzeRelationshipTraits(
  snapshot: RelationshipSnapshot
): RelationshipTraits {
  const traits: RelationshipTrait[] = [];

  if (snapshot.score.connection.value >= 70) {
    traits.push("highlyConnected");
  }

  if (snapshot.score.romance.value >= 70) {
    traits.push("romantic");
  }

  if (snapshot.score.adventure.value >= 70) {
    traits.push("adventurous");
  }

  if (snapshot.score.consistency.value >= 70) {
    traits.push("consistent");
  }

  if (snapshot.score.communication.value >= 70) {
    traits.push("communicative");
  }

  if (snapshot.metrics.totalMemories >= 15) {
    traits.push("memoryKeeper");
  }

  if (snapshot.metrics.totalExperiences < 5) {
    traits.push("needsExperiences");
  }

  if (snapshot.metrics.totalSpecialDates < 3) {
    traits.push("needsCelebrations");
  }

  if (snapshot.score.communication.value < 60) {
    traits.push("needsCommunication");
  }

  return {
    traits,
  };
}