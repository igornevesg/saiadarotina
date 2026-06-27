import type { RelationshipPhase } from "@/features/relationship/intelligence/domain/relationshipPhase";
import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";

export type NarrativeVariant = {
  relationshipPhase?: RelationshipPhase;
  minMemories?: number;
  maxMemories?: number;
  package: NarrativePackage;
};