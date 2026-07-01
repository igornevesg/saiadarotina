export type RelationshipRhythmStatus =
  | "active"
  | "stable"
  | "fallingIntoRoutine"
  | "needsNewExperiences";

export type RelationshipRhythm = {
  status: RelationshipRhythmStatus;
  title: string;
  narrative: string;
  recommendation: string;
};