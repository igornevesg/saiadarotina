import { NextResponse } from "next/server";
import { executeCreateMemory } from "@/features/relationship/application/use-cases/createMemory";
import { logger } from "@/infrastructure/logging/logger";
import { audit } from "@/infrastructure/security/audit/audit";
import { rateLimit } from "@/infrastructure/security/rate-limit/rateLimiter";
import { requireUuid } from "@/infrastructure/security/validation/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const coupleId = requireUuid(body.coupleId, "coupleId");
    const userId = body.userId ? requireUuid(body.userId, "userId") : null;
    const ideaId = body.ideaId ? requireUuid(body.ideaId, "ideaId") : null;

    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Título da memória é obrigatório." },
        { status: 400 }
      );
    }

    const rate = rateLimit(`memory:${coupleId}`, 20, 60_000);

    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente novamente em instantes." },
        { status: 429 }
      );
    }

    await executeCreateMemory({
      coupleId,
      userId,
      ideaId,
      title: body.title,
      content: body.content || null,
      rating: body.rating || null,
      mood: body.mood || null,
    });

    audit({
      action: "memory_created",
      actorId: userId,
      coupleId,
      resource: "relationship_memories",
      metadata: {
        ideaId,
        hasContent: Boolean(body.content),
        hasRating: Boolean(body.rating),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    logger.error("Erro ao criar memória", {
      message: error?.message,
      code: error?.code,
    });

    return NextResponse.json(
      { error: error?.message || "Erro ao criar memória." },
      { status: error?.statusCode || 500 }
    );
  }
}