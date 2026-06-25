import { NextResponse } from "next/server";
import { registerMatchInTimeline } from "@/features/relationship/services/relationshipService";
import { logger } from "@/infrastructure/logging/logger";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.coupleId || !body.ideaId || !body.title || !body.matchType) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const timelineEvent = await registerMatchInTimeline({
      coupleId: body.coupleId,
      userId: body.userId || null,
      ideaId: body.ideaId,
      title: body.title,
      matchType: body.matchType,
    });

    logger.audit("Match registrado na timeline", {
      coupleId: body.coupleId,
      ideaId: body.ideaId,
      matchType: body.matchType,
    });

    return NextResponse.json({
      ok: true,
      timelineEvent,
    });
  } catch (error) {
    logger.error("Erro ao registrar match na timeline", error);

    return NextResponse.json(
      { error: "Erro ao registrar match na timeline." },
      { status: 500 }
    );
  }
}