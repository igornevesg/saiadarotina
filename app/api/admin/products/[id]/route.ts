import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const { data, error } = await supabaseServer
    .from("products")
    .update({
      title: body.title,
      description: body.description,
      product_url: body.product_url,
      image_url: body.image_url,
      price: body.price || null,
      available: body.available,
      product_type: body.product_type,
      vendor: body.vendor,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar produto." },
      { status: 500 }
    );
  }

  if (Array.isArray(body.tagIds)) {
    await supabaseServer
      .from("product_tags_relations")
      .delete()
      .eq("product_id", id);

    if (body.tagIds.length > 0) {
      await supabaseServer.from("product_tags_relations").insert(
        body.tagIds.map((tagId: string) => ({
          product_id: id,
          tag_id: tagId,
        }))
      );
    }
  }

  return NextResponse.json({ product: data });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabaseServer
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao excluir produto." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}