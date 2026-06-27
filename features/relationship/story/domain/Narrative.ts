export type NarrativeMood =
  | "romantic"
  | "happy"
  | "nostalgic"
  | "adventure"
  | "neutral";

export type NarrativePackage = {
  title: string;
  quote: string;
  narrative: string;
  reflection: string;
  mood: NarrativeMood;
};