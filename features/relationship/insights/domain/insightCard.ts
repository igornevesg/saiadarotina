export type InsightPriority = "low" | "medium" | "high";

export type InsightCard = {
  id: string;

  title: string;

  description: string;

  icon: string;

  priority: InsightPriority;
};