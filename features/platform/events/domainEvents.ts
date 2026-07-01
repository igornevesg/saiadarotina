export const DomainEvents = {
  MatchCreated: "MatchCreated",
  ExperienceCompleted: "ExperienceCompleted",
  MemoryCreated: "MemoryCreated",
  ProductClicked: "ProductClicked",
  ProductPurchased: "ProductPurchased",
  RelationshipDNAUpdated: "RelationshipDNAUpdated",
  StoryGenerated: "StoryGenerated",
  RecommendationFeedback: "RecommendationFeedback",
} as const;

export type DomainEventType =
  (typeof DomainEvents)[keyof typeof DomainEvents];

  export type MemoryCreatedPayload = {
  coupleId: string;
  userId?: string | null;
  ideaId?: string | null;
  title: string;
  content?: string | null;
  rating?: number | null;
  mood?: string | null;
};

export type MatchCreatedPayload = {
  coupleId: string;
  userId?: string | null;
  ideaId: string;
  title: string;
  matchType: "full" | "partial";
};

export type RecommendationFeedbackPayload = {
  coupleId: string;
  momentId: string;
  action: "liked" | "anotherSuggestion";
};