export type MomentCategory =
  | "romance"
  | "connection"
  | "fun"
  | "adventure"
  | "communication"
  | "sensual"
  | "celebration";

export type MomentIntensity = "light" | "medium" | "high";

export type Moment = {
  id: string;
  title: string;
  narrative: string;
  category: MomentCategory;
  intensity: MomentIntensity;
  estimatedDurationMinutes: number;
  icon: string;
  tags: string[];
  productHint?: string;
};