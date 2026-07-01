export type ScoreResult = {
  value: number;
  reasons: string[];
};

export type RelationshipScore = {
  connection: ScoreResult;
  romance: ScoreResult;
  adventure: ScoreResult;
  communication: ScoreResult;
  consistency: ScoreResult;
};