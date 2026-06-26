import { logger } from "@/infrastructure/logging/logger";

type AuditEvent = {
  action: string;
  actorId?: string | null;
  coupleId?: string | null;
  resource?: string;
  metadata?: Record<string, unknown>;
};

export function audit(event: AuditEvent) {
  logger.audit(event.action, {
    actorId: event.actorId ?? null,
    coupleId: event.coupleId ?? null,
    resource: event.resource ?? null,
    metadata: event.metadata ?? {},
    occurredAt: new Date().toISOString(),
  });
}