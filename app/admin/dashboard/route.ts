import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const [
    couplesResult,
    usersResult,
    responsesResult,
    ideasResult,
  ] = await Promise.all([
    supabase.from("couples").select("id", { count: "exact", head: true }),
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase.from("responses").select("*"),
    supabase.from("ideas").select("*"),
  ]);

  const responses = responsesResult.data || [];
  const ideas = ideasResult.data || [];

  const positiveResponses = responses.filter(
    (item) => item.response === "topo" || item.response === "talvez"
  );

  const mostAnsweredIdeas = ideas
    .map((idea) => {
      const total = responses.filter((r) => r.idea_id === idea.id).length;

      return {
        id: idea.id,
        title: idea.title,
        total,
      };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return NextResponse.json({
    couples: couplesResult.count || 0,
    users: usersResult.count || 0,
    responses: responses.length,
    positiveResponses: positiveResponses.length,
    ideas: ideas.length,
    mostAnsweredIdeas,
  });
}