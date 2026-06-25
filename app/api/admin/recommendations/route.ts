import { NextResponse } from "next/server";
import { getRecommendationsByIdea } from "@/features/recommendations/recommendationService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ideaId = searchParams.get("ideaId");

  if (!ideaId) {
    return NextResponse.json(
      { error: "ideaId é obrigatório." },
      { status: 400 }
    );
  }

  const result = await getRecommendationsByIdea(ideaId);

  if (result.error && !result.idea) {
    return NextResponse.json(
      { error: result.error },
      { status: 404 }
    );
  }

  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: 500 }
    );
  }

  return NextResponse.json({
    idea: result.idea,
    recommendations: result.recommendations,
  });
}