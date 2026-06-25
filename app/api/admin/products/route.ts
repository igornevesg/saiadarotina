import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("products")
    .select(`
      *,
      product_tags_relations (
        tag_id,
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos." },
      { status: 500 }
    );
  }

  const products = (data || []).map((product) => ({
    ...product,
    tagRelations: product.product_tags_relations || [],
  }));

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data: product, error } = await supabaseServer
    .from("products")
    .insert({
      shopify_id: body.shopify_id || `manual-${Date.now()}`,
      title: body.title,
      description: body.description,
      product_url: body.product_url,
      image_url: body.image_url,
      price: body.price || null,
      available: body.available ?? true,
      product_type: body.product_type,
      vendor: body.vendor || "Sex Shop da Blogueirinha",
    })
    .select()
    .single();

  if (error || !product) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar produto." },
      { status: 500 }
    );
  }

  if (Array.isArray(body.tagIds) && body.tagIds.length > 0) {
    await supabaseServer.from("product_tags_relations").insert(
      body.tagIds.map((tagId: string) => ({
        product_id: product.id,
        tag_id: tagId,
      }))
    );
  }

  return NextResponse.json({ product });
}