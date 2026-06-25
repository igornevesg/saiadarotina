import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ideaId = searchParams.get("ideaId");

  if (!ideaId) {
    return NextResponse.json(
      { error: "ideaId é obrigatório." },
      { status: 400 }
    );
  }

  const { data: idea, error: ideaError } = await supabaseServer
    .from("ideas")
    .select(`
      *,
      idea_tags_relations (
        tag_id,
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq("id", ideaId)
    .single();

  if (ideaError || !idea) {
    return NextResponse.json(
      { error: "Experiência não encontrada." },
      { status: 404 }
    );
  }

  const ideaTagIds =
    idea.idea_tags_relations?.map((relation: any) => relation.tag_id) || [];

  if (ideaTagIds.length === 0) {
    return NextResponse.json({
      idea,
      recommendations: [],
    });
  }

  const { data: products, error: productsError } = await supabaseServer
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
    .eq("available", true);

  if (productsError) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos." },
      { status: 500 }
    );
  }

  const recommendations = (products || [])
    .map((product: any) => {
      const productTagIds =
        product.product_tags_relations?.map((relation: any) => relation.tag_id) ||
        [];

      const score = productTagIds.filter((tagId: string) =>
        ideaTagIds.includes(tagId)
      ).length;

      return {
        ...product,
        score,
        tagRelations: product.product_tags_relations || [],
      };
    })
    .filter((product: any) => product.score > 0)
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 6);

  return NextResponse.json({
    idea,
    recommendations,
  });
}