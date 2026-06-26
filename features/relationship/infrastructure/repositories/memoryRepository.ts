import { supabaseServer } from "@/lib/supabaseServer";

type CreateMemoryInput = {
  coupleId: string;
  userId?: string | null;
  ideaId?: string | null;
  title: string;
  content?: string | null;
  rating?: number | null;
  mood?: string | null;
  metadata?: Record<string, unknown>;
};

export async function createMemory(input: CreateMemoryInput) {
  const { data, error } = await supabaseServer
    .from("relationship_memories")
    .insert({
      couple_id: input.coupleId,
      user_id: input.userId || null,
      idea_id: input.ideaId || null,
      title: input.title,
      content: input.content || null,
      rating: input.rating || null,
      mood: input.mood || null,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}