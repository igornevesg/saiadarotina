export type NarrativeTone = "romantic" | "light" | "emotional";

export type NarrativeTemplateInput = {
  title: string;
  eventType: string;
  description?: string | null;
};

export type NarrativeResult = {
  title: string;
  subtitle: string;
  narrative: string;
  tone: NarrativeTone;
};