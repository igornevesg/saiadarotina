import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("analytics_events")
    .select(`
      *,
      ideas (
        title
      ),
      products (
        title
      )
    `)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar eventos." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    events: data || [],
  });
}