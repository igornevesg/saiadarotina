import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const { data, error } = await supabaseServer
    .from("tags")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar tags." }, { status: 500 });
  }

  return NextResponse.json({ tags: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || "").trim();

  if (!name) {
    return NextResponse.json({ error: "Nome obrigatório." }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("tags")
    .insert({
      name,
      slug: slugify(name),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Erro ao criar tag." }, { status: 500 });
  }

  return NextResponse.json({ tag: data });
}