import { NextResponse } from "next/server";
import { getRecommendationsByIdea } from "@/features/recommendations/recommendationService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ideaId = searchParams.get("ideaId");

  if (!ideaId) {
    return NextResponse.json({ recommendations: [] });
  }

  const result = await getRecommendationsByIdea(ideaId);

  return NextResponse.json({
    recommendations: result.recommendations.slice(0, 3),
  });
}