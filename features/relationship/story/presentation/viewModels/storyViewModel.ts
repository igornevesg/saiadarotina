export type StoryChapterViewModel = {
  id: string;
  chapterLabel: string;
  title: string;
  headline: string;
  quote: string;
  narrative: string;
  reflection: string;
  dateLabel: string;
  moodLabel: string;
  events: {
    id: string;
    icon: string;
    title: string;
    label: string;
    description?: string | null;
  }[];
};

export type StoryViewModel = {
  hero: {
    eyebrow: string;
    title: string;
    narrative: string;
  };
  stats: {
    chaptersLabel: string;
    experiencesLabel: string;
    lastMemoryLabel: string;
  };
  chapters: StoryChapterViewModel[];
  epilogue?: {
    title: string;
    text: string;
  };
};