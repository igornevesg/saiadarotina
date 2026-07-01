export type MemoryMood =
  | "happy"
  | "romantic"
  | "fun"
  | "calm"
  | "surprised"
  | "grateful";

export type MemorySource =
  | "manual"
  | "moment"
  | "recommendation"
  | "story";

export type MemoryImpact =
  | "small"
  | "special"
  | "unforgettable";

export type Memory = {
  id: string;

  title: string;

  narrative: string;

  createdAt: string;

  mood: MemoryMood;

  source: MemorySource;

  impact: MemoryImpact;

  favorite: boolean;

  tags: string[];

  relatedMomentId?: string;

  relatedStoryId?: string;

  photosCount?: number;
};