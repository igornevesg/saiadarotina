import { getTimelineByCouple } from "@/features/relationship/infrastructure/repositories/timelineRepository";
import { executeBuildStory } from "@/features/relationship/story/application/use-cases/buildStory";

type GetRelationshipStoryInput = {
  coupleId: string;
};

export async function executeGetRelationshipStory(
  input: GetRelationshipStoryInput
) {
  const timeline = await getTimelineByCouple(input.coupleId);

  return executeBuildStory({
    coupleId: input.coupleId,
    events: timeline,
  });
}