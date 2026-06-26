import { NextResponse } from "next/server";
import { AppError } from "@/shared/errors/AppError";
import { logger } from "@/infrastructure/logging/logger";

export function handleApiError(error: unknown, fallbackMessage: string) {
  if (error instanceof AppError) {
    logger.warn("API error", {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    });

    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode }
    );
  }

  logger.error("Unexpected API error", {
    error,
  });

  return NextResponse.json(
    {
      error: fallbackMessage,
      code: "UNEXPECTED_ERROR",
    },
    { status: 500 }
  );
}