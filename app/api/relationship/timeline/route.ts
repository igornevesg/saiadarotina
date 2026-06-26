import { NextResponse } from "next/server";
import { executeGetTimeline } from "@/features/relationship/application/use-cases/getTimeline";
import { audit } from "@/infrastructure/security/audit/audit";
import { getTemporaryAuthContext } from "@/infrastructure/security/authentication/auth";
import { ensureSameCouple } from "@/infrastructure/security/authorization/authorization";
import { rateLimit } from "@/infrastructure/security/rate-limit/rateLimiter";
import { requireUuid } from "@/infrastructure/security/validation/validation";
import { handleApiError } from "@/shared/errors/handleApiError";
import { RateLimitError } from "@/shared/errors/AppError";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const coupleId = requireUuid(searchParams.get("coupleId"), "coupleId");

    const auth = getTemporaryAuthContext({ coupleId });

    ensureSameCouple({
      requestedCoupleId: coupleId,
      authCoupleId: auth.coupleId,
    });

    const rate = rateLimit(`timeline:${coupleId}`, 60, 60_000);

    if (!rate.allowed) {
      throw new RateLimitError();
    }

    audit({
      action: "timeline_viewed",
      coupleId,
      resource: "relationship_timeline_events",
    });

    const timeline = await executeGetTimeline({ coupleId });

    return NextResponse.json({ timeline });
  } catch (error) {
    return handleApiError(error, "Erro ao buscar timeline.");
  }
}