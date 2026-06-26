import { NextResponse } from "next/server";
import { executeCreateMemory } from "@/features/relationship/application/use-cases/createMemory";
import { audit } from "@/infrastructure/security/audit/audit";
import { rateLimit } from "@/infrastructure/security/rate-limit/rateLimiter";
import { requireUuid } from "@/infrastructure/security/validation/validation";
import { handleApiError } from "@/shared/errors/handleApiError";
import { RateLimitError, ValidationError } from "@/shared/errors/AppError";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const coupleId = requireUuid(body.coupleId, "coupleId");
    const userId = body.userId ? requireUuid(body.userId, "userId") : null;
    const ideaId = body.ideaId ? requireUuid(body.ideaId, "ideaId") : null;

    if (!body.title || typeof body.title !== "string") {
      throw new ValidationError("Título da memória é obrigatório.");
    }

    const rate = rateLimit(`memory:${coupleId}`, 20, 60_000);

    if (!rate.allowed) {
      throw new RateLimitError();
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
  } catch (error) {
    return handleApiError(error, "Erro ao criar memória.");
  }
}