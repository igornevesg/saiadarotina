import { NextResponse } from "next/server";
import { audit } from "@/infrastructure/security/audit/audit";
import { getTemporaryAuthContext } from "@/infrastructure/security/authentication/auth";
import { ensureSameCouple } from "@/infrastructure/security/authorization/authorization";
import { rateLimit } from "@/infrastructure/security/rate-limit/rateLimiter";
import { requireUuid } from "@/infrastructure/security/validation/validation";
import { handleApiError } from "@/shared/errors/handleApiError";
import { RateLimitError, ValidationError } from "@/shared/errors/AppError";

type ProtectedRouteContext = {
  request: Request;
  coupleId: string;
};

type ProtectedPostRouteContext<TBody> = ProtectedRouteContext & {
  body: TBody;
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

type ProtectedPostRouteHandler<TBody, TResult> = (
  context: ProtectedPostRouteContext<TBody>
) => Promise<TResult>;

function jsonResponse<T>(result: T) {
  return NextResponse.json(result, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function assertAuthenticatedCouple(coupleId: string) {
  const auth = getTemporaryAuthContext();

  ensureSameCouple({
    requestedCoupleId: coupleId,
    authCoupleId: auth.coupleId,
  });
}

function applyRateLimit(options: ProtectedRouteOptions, coupleId: string) {
  const rate = rateLimit(
    `${options.rateLimitKey}:${coupleId}`,
    options.rateLimitMax ?? 60,
    options.rateLimitWindowMs ?? 60_000
  );

  if (!rate.allowed) {
    throw new RateLimitError();
  }
}

export function protectedGetRoute<T>(
  options: ProtectedRouteOptions,
  handler: ProtectedRouteHandler<T>
) {
  return async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const coupleId = requireUuid(searchParams.get("coupleId"), "coupleId");

      assertAuthenticatedCouple(coupleId);
      applyRateLimit(options, coupleId);

      audit({
        action: options.auditAction,
        coupleId,
        resource: options.auditResource,
      });

      const result = await handler({
        request,
        coupleId,
      });

      return jsonResponse(result);
    } catch (error) {
      return handleApiError(error, "Erro ao processar requisição.");
    }
  };
}

export function protectedPostRoute<TBody, TResult>(
  options: ProtectedRouteOptions,
  handler: ProtectedPostRouteHandler<TBody, TResult>
) {
  return async function POST(request: Request) {
    try {
      const body = (await request.json()) as TBody & {
        coupleId?: unknown;
      };

      const coupleId = requireUuid(body.coupleId, "coupleId");

      assertAuthenticatedCouple(coupleId);
      applyRateLimit(options, coupleId);

      audit({
        action: options.auditAction,
        coupleId,
        resource: options.auditResource,
      });

      const result = await handler({
        request,
        coupleId,
        body,
      });

      return jsonResponse(result);
    } catch (error) {
      if (error instanceof SyntaxError) {
        return handleApiError(
          new ValidationError("JSON inválido."),
          "Erro ao processar requisição."
        );
      }

      return handleApiError(error, "Erro ao processar requisição.");
    }
  };
}