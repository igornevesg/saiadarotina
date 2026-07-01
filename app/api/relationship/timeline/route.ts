import { executeGetTimeline } from "@/features/relationship/application/use-cases/getTimeline";
import { protectedGetRoute } from "@/shared/api/protectedRoute";

export const GET = protectedGetRoute(
  {
    rateLimitKey: "relationship-timeline",
    auditAction: "timeline_viewed",
    auditResource: "relationship_timeline_events",
  },
  async ({ coupleId }) => {
    const timeline = await executeGetTimeline({ coupleId });

    return timeline;
  }
);