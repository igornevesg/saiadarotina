import { supabaseServer } from "@/lib/supabaseServer";

export async function getRecommendationsByIdea(ideaId: string) {
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
    return {
      idea: null,
      recommendations: [],
      error: "Experiência não encontrada.",
    };
  }

  const ideaTagIds =
    idea.idea_tags_relations?.map((relation: any) => relation.tag_id) || [];

  if (ideaTagIds.length === 0) {
    return {
      idea,
      recommendations: [],
      error: null,
    };
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
    return {
      idea,
      recommendations: [],
      error: "Erro ao buscar produtos.",
    };
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

  return {
    idea,
    recommendations,
    error: null,
  };
}