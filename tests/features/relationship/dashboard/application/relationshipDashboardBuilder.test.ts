import { describe, expect, it } from "vitest";
import { buildRelationshipDashboard } from "@/features/relationship/dashboard/application/builders/relationshipDashboardBuilder";
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
    occurredAt: "2025-01-02T10:00:00Z",
    type: "memory_created",
    title: "Memória",
    description: "",
  },
  {
    id: "3",
    occurredAt: "2025-01-03T10:00:00Z",
    type: "experience_completed",
    title: "Experiência",
    description: "",
  },
];

describe("relationshipDashboardBuilder", () => {
  it("deve construir story e insights a partir da timeline", () => {
    const dashboard = buildRelationshipDashboard({
      coupleId: "couple-1",
      events,
    });

    expect(dashboard.story.chapters.length).toBeGreaterThan(0);
    expect(dashboard.story.epilogue).toBeTruthy();

    expect(dashboard.insights.metrics.totalEvents).toBe(3);
    expect(dashboard.insights.score.connection.value).toBeGreaterThan(0);
    expect(dashboard.insights.profile.primaryStrength).toBeTruthy();
    expect(dashboard.insights.cards.length).toBeGreaterThan(0);
  });
});