import { describe, expect, it } from "vitest";
import { buildDashboardEngine } from "@/features/relationship/dashboard/public";
import { mapDashboardToViewModel } from "@/features/relationship/dashboard/presentation/mappers/dashboardViewModelMapper";
import type { StoryEvent } from "@/features/relationship/story/public";

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

describe("dashboardViewModelMapper", () => {
  it("mapeia o dashboard para um view model seguro para UI", () => {
    const dashboard = buildDashboardEngine({
      coupleId: "couple-1",
      events,
    });

    const viewModel = mapDashboardToViewModel(dashboard);

    expect(viewModel.score.value).toBeGreaterThanOrEqual(0);
    expect(viewModel.score.percentage).toContain("%");
    expect(viewModel.score.description.length).toBeGreaterThan(20);

    expect(viewModel.latestChapter).toBeTruthy();

    expect(
      viewModel.strengths.length +
        viewModel.opportunities.length +
        viewModel.highlights.length
    ).toBeGreaterThan(0);
  });
});