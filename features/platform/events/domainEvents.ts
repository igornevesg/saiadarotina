export const DomainEvents = {
  ExperienceCompleted: "ExperienceCompleted",
  MatchCreated: "MatchCreated",
  MemoryCreated: "MemoryCreated",
  ProductClicked: "ProductClicked",
  ProductPurchased: "ProductPurchased",
  RelationshipDNAUpdated: "RelationshipDNAUpdated",
  StoryGenerated: "StoryGenerated",
} as const;

export type DomainEventType =
  (typeof DomainEvents)[keyof typeof DomainEvents];