import type { StoryChapter } from "./Chapter";
import type { StoryEpilogue } from "@/features/relationship/story/domain/storyEpilogue";

export type RelationshipStory = {
  epilogue?: StoryEpilogue;
  coupleId: string;
  chapters: StoryChapter[];
  totalChapters: number;
  generatedAt: string;
  
};