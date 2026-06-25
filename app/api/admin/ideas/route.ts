import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("ideas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar experiências." }, { status: 500 });
  }

  return NextResponse.json({ ideas: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabaseServer
    .from("ideas")
    .insert({
      title: body.title,
      description: body.description,
      category: body.category,
      level: body.level,
      active: true,
      tags: body.tags || [],
      estimated_time: body.estimated_time,
      environment: body.environment,
      objective: body.objective,
      instructions: body.instructions,
      image_url: body.image_url,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Erro ao criar experiência." }, { status: 500 });
  }

  return NextResponse.json({ idea: data });
}