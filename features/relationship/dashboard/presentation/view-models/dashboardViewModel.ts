export type DashboardCardViewModel = {
  id: string;
  title: string;
  description: string;
  icon: string;
  priority: "low" | "medium" | "high";
};

export type DashboardScoreViewModel = {
  label: string;
  value: number;
  percentage: string;
  description: string;
};

export type DashboardLatestChapterViewModel = {
  title: string;
  headline: string;
  summary: string;
};

export type DashboardViewModel = {
  score: DashboardScoreViewModel;
  strengths: DashboardCardViewModel[];
  opportunities: DashboardCardViewModel[];
  highlights: DashboardCardViewModel[];
  latestChapter: DashboardLatestChapterViewModel | null;
};