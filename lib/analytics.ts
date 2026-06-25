type TrackEventParams = {
  eventName: string;
  ideaId?: string;
  productId?: string;
  metadata?: Record<string, unknown>;
};

export async function trackEvent({
  eventName,
  ideaId,
  productId,
  metadata = {},
}: TrackEventParams) {
  const coupleId = localStorage.getItem("saiadarotina_couple_id");
  const userId = localStorage.getItem("saiadarotina_user_id");

  await fetch("/api/analytics", {
    method: "POST",
    body: JSON.stringify({
      eventName,
      coupleId,
      userId,
      ideaId,
      productId,
      metadata,
    }),
  });
}