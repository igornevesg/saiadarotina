import type { StoryEvent } from "@/features/relationship/story/public";

const storageKey = "saiadarotina.memory.storyEvents";

export function saveMemoryStoryEvent(event: StoryEvent) {
  const events = listMemoryStoryEvents();

  localStorage.setItem(storageKey, JSON.stringify([event, ...events]));
}

export function listMemoryStoryEvents(): StoryEvent[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(storageKey);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as StoryEvent[];
  } catch {
    return [];
  }
}