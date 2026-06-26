import { ForbiddenError } from "@/shared/errors/AppError";

export function ensureSameCouple(params: {
  requestedCoupleId: string;
  authCoupleId: string | null;
}) {
  if (!params.authCoupleId) {
    throw new ForbiddenError("Contexto do casal ausente.");
  }

  if (params.requestedCoupleId !== params.authCoupleId) {
    throw new ForbiddenError("Acesso negado ao casal solicitado.");
  }
}