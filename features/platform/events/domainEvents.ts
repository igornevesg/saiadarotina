export const DomainEvents = {
  MatchCreated: "MatchCreated",
  ExperienceCompleted: "ExperienceCompleted",
  MemoryCreated: "MemoryCreated",
  ProductClicked: "ProductClicked",
  ProductPurchased: "ProductPurchased",
  RelationshipDNAUpdated: "RelationshipDNAUpdated",
  StoryGenerated: "StoryGenerated",
} as const;

export type DomainEventType =
  (typeof DomainEvents)[keyof typeof DomainEvents];

export type MatchCreatedPayload = {
  coupleId: string;
  userId?: string | null;
  ideaId: string;
  title: string;
  matchType: "full" | "partial";
};