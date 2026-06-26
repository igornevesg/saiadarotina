import type { StoryChapter } from "./Chapter";

export type RelationshipStory = {
  coupleId: string;
  chapters: StoryChapter[];
  totalChapters: number;
  generatedAt: string;
};