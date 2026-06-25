import { createTimelineEvent } from "../repositories/relationshipRepository";

type RegisterMatchInput = {
  coupleId: string;
  userId?: string | null;
  ideaId: string;
  title: string;
  matchType: "full" | "partial";
};

export async function registerMatchInTimeline(input: RegisterMatchInput) {
  return createTimelineEvent({
    coupleId: input.coupleId,
    userId: input.userId || null,
    ideaId: input.ideaId,
    eventType: "match_created",
    title: input.title,
    description:
      input.matchType === "full"
        ? "Vocês dois demonstraram interesse nessa experiência."
        : "Essa experiência pode fazer sentido para vocês.",
    visibility: "couple",
    metadata: {
      matchType: input.matchType,
    },
  });
}