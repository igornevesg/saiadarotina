import { executeGetRelationshipStory } from "@/features/relationship/story/application/use-cases/getRelationshipStory";
import { protectedGetRoute } from "@/shared/api/protectedRoute";

export const GET = protectedGetRoute(
  {
    rateLimitKey: "relationship-story",
    auditAction: "relationship_story_viewed",
    auditResource: "relationship_story",
  },
  async ({ coupleId }) => {
    const story = await executeGetRelationshipStory({ coupleId });

    return { story };
  }
);