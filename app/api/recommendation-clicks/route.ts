import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  const body = await request.json();

  const { error } = await supabaseServer
    .from("recommendation_clicks")
    .insert({
      idea_id: body.ideaId,
      product_id: body.productId,
      couple_id: body.coupleId || null,
    });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao registrar clique." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}