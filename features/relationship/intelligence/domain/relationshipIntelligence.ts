import type { RelationshipPhase } from "@/features/relationship/intelligence/domain/relationshipPhase";

export type RelationshipIntelligence = {
  phase: RelationshipPhase;
  totalEvents: number;
  totalMatches: number;
  totalMemories: number;
  totalExperiences: number;
  hasRecentActivity: boolean;
};