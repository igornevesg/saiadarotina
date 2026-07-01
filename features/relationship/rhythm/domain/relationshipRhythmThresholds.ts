export const relationshipRhythmThresholds = {
  needsNewExperiences: {
    minRelationshipDays: 14,
    maxExperiences: 0,
  },

  fallingIntoRoutine: {
    minRelationshipDays: 30,
    maxExperiences: 2,
  },

  active: {
    minExperiences: 5,
    minMemories: 10,
  },
} as const;