import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  const body = await request.json();

  const { error } = await supabaseServer.from("analytics_events").insert({
    event_name: body.eventName,
    couple_id: body.coupleId || null,
    user_id: body.userId || null,
    idea_id: body.ideaId || null,
    product_id: body.productId || null,
    metadata: body.metadata || {},
  });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao registrar evento." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}