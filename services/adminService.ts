import { supabaseServer } from "@/lib/supabaseServer";

export async function getAdminDashboardData() {
  const [
    couplesResult,
    usersResult,
    responsesResult,
    ideasResult,
    clicksResult,
    productsResult,
  ] = await Promise.all([
    supabaseServer.from("couples").select("id", { count: "exact", head: true }),
    supabaseServer.from("users").select("id", { count: "exact", head: true }),
    supabaseServer.from("responses").select("*"),
    supabaseServer.from("ideas").select("*"),
    supabaseServer.from("recommendation_clicks").select("*"),
    supabaseServer.from("products").select("*"),
  ]);

  const responses = responsesResult.data || [];
  const ideas = ideasResult.data || [];
  const clicks = clicksResult.data || [];
  const products = productsResult.data || [];

  const positiveResponses = responses.filter(
    (item) => item.response === "topo" || item.response === "talvez"
  );

  const mostAnsweredIdeas = ideas
    .map((idea) => ({
      id: idea.id,
      title: idea.title,
      total: responses.filter((r) => r.idea_id === idea.id).length,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const mostClickedProducts = products
    .map((product) => ({
      id: product.id,
      title: product.title,
      total: clicks.filter((click) => click.product_id === product.id).length,
    }))
    .filter((product) => product.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return {
    couples: couplesResult.count || 0,
    users: usersResult.count || 0,
    responses: responses.length,
    positiveResponses: positiveResponses.length,
    ideas: ideas.length,
    productClicks: clicks.length,
    mostAnsweredIdeas,
    mostClickedProducts,
  };
}