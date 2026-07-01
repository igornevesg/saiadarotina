import { describe, expect, it } from "vitest";

import { buildRelationshipInsights } from "@/features/relationship/insights/application/builders/relationshipInsightsBuilder";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

const events: StoryEvent[] = [
  {
    id: "1",
    occurredAt: "2025-01-01T10:00:00Z",
    type: "match_created",
    title: "Match",
    description: "",
  },
  {
    id: "2",
    occurredAt: "2025-01-05T10:00:00Z",
    type: "memory_created",
    title: "Memória",
    description: "",
  },
  {
    id: "3",
    occurredAt: "2025-01-10T10:00:00Z",
    type: "experience_completed",
    title: "Experiência",
    description: "",
  },
];

describe("RelationshipInsightsBuilder", () => {
  it("deve construir todos os insights da relação", () => {
    const result = buildRelationshipInsights({
      events,
      totalChapters: 2,
    });

    expect(result.metrics.totalEvents).toBe(3);

    expect(result.metrics.totalChapters).toBe(2);

    expect(result.score.connection.value).toBeGreaterThan(0);

    expect(result.profile.primaryStrength).toBeTruthy();

    expect(result.cards.length).toBeGreaterThan(0);
  });
});