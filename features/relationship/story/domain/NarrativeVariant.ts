import type { RelationshipPhase } from "@/features/relationship/intelligence/domain/relationshipPhase";
import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";
import type { StoryDominantEvent } from "@/features/relationship/story/domain/storyContext";

export type NarrativeVariantConditions = {
  relationshipPhase?: RelationshipPhase;
  dominantEvent?: StoryDominantEvent;

  minMemories?: number;
  maxMemories?: number;
  minExperiences?: number;
  maxExperiences?: number;

  requiresMatch?: boolean;
  requiresMemory?: boolean;
  requiresExperience?: boolean;
  requiresPurchase?: boolean;
  requiresProductInteraction?: boolean;
  requiresSpecialDate?: boolean;
};

export type NarrativeVariant = {
  conditions?: NarrativeVariantConditions;
  package: NarrativePackage;
};