import { getTimelineByCouple } from "@/features/relationship/infrastructure/repositories/timelineRepository";
import { executeBuildStory } from "@/features/relationship/story/application/use-cases/buildStory";

type GetTimelineInput = {
  coupleId: string;
};

export async function executeGetTimeline(input: GetTimelineInput) {
  const timeline = await getTimelineByCouple(input.coupleId);

  const story = await executeBuildStory({
    coupleId: input.coupleId,
    events: timeline,
  });

  return {
    timeline,
    story,
  };
}