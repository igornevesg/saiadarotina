export type NarrativeMood =
  | "romantic"
  | "happy"
  | "adventure"
  | "nostalgic"
  | "neutral";

export type NarrativePackage = {
  quote: string;
  narrative: string;
  reflection: string;
  mood: NarrativeMood;
};

export type NarrativeTemplateInput = {
  title: string;
  eventType: string;
  description?: string | null;
};