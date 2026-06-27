import type { NarrativeMood } from "./Narrative";

export type StoryEvent = {
  id: string;
  type: string;
  title: string;
  description?: string | null;
  occurredAt: string;
};

export type StoryChapter = {
  id: string;
  title: string;
  headline: string;
  quote: string;
  narrative: string;
  reflection: string;
  mood: NarrativeMood;
  date: string;
  events: StoryChapterEvent[];
};

export type StoryChapterEvent = StoryEvent & {
  icon: string;
  label: string;
};