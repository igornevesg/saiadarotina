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
  subtitle: string;
  narrative: string;
  date: string;
  events: StoryChapterEvent[];
};

export type StoryChapterEvent = StoryEvent & {
  icon: string;
  label: string;
};