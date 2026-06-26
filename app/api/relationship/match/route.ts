import { NextResponse } from "next/server";
import { executeRegisterMatch } from "@/features/relationship/application/use-cases/registerMatch";
import { logger } from "@/infrastructure/logging/logger";
import { audit } from "@/infrastructure/security/audit/audit";
import { rateLimit } from "@/infrastructure/security/rate-limit/rateLimiter";
import { requireUuid } from "@/infrastructure/security/validation/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const coupleId = requireUuid(body.coupleId, "coupleId");
    const userId = body.userId ? requireUuid(body.userId, "userId") : null;
    const ideaId = requireUuid(body.ideaId, "ideaId");

    if (!body.title || !body.matchType) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const rate = rateLimit(`match:${coupleId}`, 30, 60_000);

    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente novamente em instantes." },
        { status: 429 }
      );
    }

    await executeRegisterMatch({
      coupleId,
      userId,
      ideaId,
      title: body.title,
      matchType: body.matchType,
    });

    audit({
      action: "match_created",
      actorId: userId,
      coupleId,
      resource: "relationship_timeline_events",
      metadata: {
        ideaId,
        matchType: body.matchType,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    logger.error("Erro ao registrar match na timeline", {
      message: error?.message,
      code: error?.code,
    });

    return NextResponse.json(
      { error: error?.message || "Erro ao registrar match na timeline." },
      { status: error?.statusCode || 500 }
    );
  }
}