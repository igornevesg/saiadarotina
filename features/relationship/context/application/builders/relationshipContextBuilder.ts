import type { RelationshipContext } from "@/features/relationship/context/public";

export function buildRelationshipContext(): RelationshipContext {
  return {
    daysSinceLastMemory: 8,
    relationshipRhythm: "routine",
    totalMemories: 14,
    favoriteMoments: 3,
    currentSeason: "winter",
  };
}