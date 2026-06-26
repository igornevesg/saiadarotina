import { createTimelineEvent } from "@/features/relationship/infrastructure/repositories/timelineRepository";
import type { MatchCreatedPayload } from "@/features/platform/events/domainEvents";

export async function onMatchCreated(payload: MatchCreatedPayload) {
  return createTimelineEvent({
    coupleId: payload.coupleId,
    userId: payload.userId || null,
    ideaId: payload.ideaId || null,
    eventType: "match_created",
    title: payload.title,
    description:
      payload.matchType === "full"
        ? "Vocês dois demonstraram interesse nessa experiência."
        : "Essa experiência pode fazer sentido para vocês.",
    visibility: "couple",
    metadata: {
      matchType: payload.matchType,
    },
  });
}