import { NextResponse } from "next/server";
import { getTimelineByCouple } from "@/features/relationship/repositories/relationshipRepository";
import { logger } from "@/infrastructure/logging/logger";
import { audit } from "@/infrastructure/security/audit/audit";
import { getTemporaryAuthContext } from "@/infrastructure/security/authentication/auth";
import { ensureSameCouple } from "@/infrastructure/security/authorization/authorization";
import { rateLimit } from "@/infrastructure/security/rate-limit/rateLimiter";
import { requireUuid } from "@/infrastructure/security/validation/validation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const coupleId = requireUuid(searchParams.get("coupleId"), "coupleId");

    const auth = getTemporaryAuthContext({
      coupleId,
    });

    ensureSameCouple({
      requestedCoupleId: coupleId,
      authCoupleId: auth.coupleId,
    });

    const rate = rateLimit(`timeline:${coupleId}`, 60, 60_000);

    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente novamente em instantes." },
        { status: 429 }
      );
    }

    audit({
      action: "timeline_viewed",
      coupleId,
      resource: "relationship_timeline_events",
    });

    const timeline = await getTimelineByCouple(coupleId);

    return NextResponse.json({ timeline });
  } catch (error: any) {
    logger.error("Erro ao buscar timeline", {
      message: error?.message,
      code: error?.code,
    });

    return NextResponse.json(
      {
        error: error?.message || "Erro ao buscar timeline.",
      },
      { status: error?.statusCode || 500 }
    );
  }
}