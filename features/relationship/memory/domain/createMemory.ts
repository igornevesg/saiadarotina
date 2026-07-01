import type {
  Memory,
  MemoryImpact,
  MemoryMood,
  MemorySource,
} from "@/features/relationship/memory/domain/memory";

type CreateMemoryInput = {
  id: string;
  title: string;
  narrative: string;
  mood: MemoryMood;
  source?: MemorySource;
  impact?: MemoryImpact;
  tags?: string[];
  relatedMomentId?: string;
  relatedStoryId?: string;
  photosCount?: number;
  createdAt?: string;
};

export function createMemory(input: CreateMemoryInput): Memory {
  return {
    id: input.id,
    title: input.title.trim(),
    narrative: input.narrative.trim(),
    createdAt: input.createdAt ?? new Date().toISOString(),
    mood: input.mood,
    source: input.source ?? "manual",
    impact: input.impact ?? "special",
    favorite: false,
    tags: input.tags ?? [],
    relatedMomentId: input.relatedMomentId,
    relatedStoryId: input.relatedStoryId,
    photosCount: input.photosCount ?? 0,
  };
}