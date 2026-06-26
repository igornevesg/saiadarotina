import { NextResponse } from "next/server";
import { audit } from "@/infrastructure/security/audit/audit";
import { getTemporaryAuthContext } from "@/infrastructure/security/authentication/auth";
import { ensureSameCouple } from "@/infrastructure/security/authorization/authorization";
import { rateLimit } from "@/infrastructure/security/rate-limit/rateLimiter";
import { requireUuid } from "@/infrastructure/security/validation/validation";
import { handleApiError } from "@/shared/errors/handleApiError";
import { RateLimitError } from "@/shared/errors/AppError";

type ProtectedRouteContext = {
  request: Request;
  coupleId: string;
};

type ProtectedRouteOptions = {
  rateLimitKey: string;
  auditAction: string;
  auditResource: string;
  rateLimitMax?: number;
  rateLimitWindowMs?: number;
};

type ProtectedRouteHandler<T> = (
  context: ProtectedRouteContext
) => Promise<T>;

export function protectedGetRoute<T>(
  options: ProtectedRouteOptions,
  handler: ProtectedRouteHandler<T>
) {
  return async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);

      const coupleId = requireUuid(searchParams.get("coupleId"), "coupleId");

      const auth = getTemporaryAuthContext({ coupleId });

      ensureSameCouple({
        requestedCoupleId: coupleId,
        authCoupleId: auth.coupleId,
      });

      const rate = rateLimit(
        `${options.rateLimitKey}:${coupleId}`,
        options.rateLimitMax ?? 60,
        options.rateLimitWindowMs ?? 60_000
      );

      if (!rate.allowed) {
        throw new RateLimitError();
      }

      audit({
        action: options.auditAction,
        coupleId,
        resource: options.auditResource,
      });

      const result = await handler({
        request,
        coupleId,
      });

      return NextResponse.json(result);
    } catch (error) {
      return handleApiError(error, "Erro ao processar requisição.");
    }
  };
}