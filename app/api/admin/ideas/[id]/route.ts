import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const { data, error } = await supabaseServer
    .from("ideas")
    .update({
      title: body.title,
      description: body.description,
      category: body.category,
      level: body.level,
      active: body.active,
      tags: body.tags || [],
      estimated_time: body.estimated_time,
      environment: body.environment,
      objective: body.objective,
      instructions: body.instructions,
      image_url: body.image_url,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Erro ao atualizar experiência." }, { status: 500 });
  }

  return NextResponse.json({ idea: data });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabaseServer.from("ideas").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Erro ao excluir experiência." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}