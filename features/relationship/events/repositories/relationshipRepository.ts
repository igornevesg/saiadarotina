import { supabaseServer } from "@/lib/supabaseServer";

type CreateTimelineEventInput = {
  coupleId: string;
  userId?: string | null;
  ideaId?: string | null;
  productId?: string | null;
  eventType: string;
  title: string;
  description?: string | null;
  visibility?: "private" | "couple" | "admin_aggregate";
  metadata?: Record<string, unknown>;
};

export async function createTimelineEvent(input: CreateTimelineEventInput) {
  const { data, error } = await supabaseServer
    .from("relationship_timeline_events")
    .insert({
      couple_id: input.coupleId,
      user_id: input.userId || null,
      idea_id: input.ideaId || null,
      product_id: input.productId || null,
      event_type: input.eventType,
      title: input.title,
      description: input.description || null,
      visibility: input.visibility || "couple",
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getTimelineByCouple(coupleId: string) {
  const { data, error } = await supabaseServer
    .from("relationship_timeline_events")
    .select("*")
    .eq("couple_id", coupleId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}