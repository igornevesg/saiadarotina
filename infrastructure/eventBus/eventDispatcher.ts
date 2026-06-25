import { randomUUID } from "crypto";
import { logger } from "@/infrastructure/logging/logger";

export type DomainEvent<T = unknown> = {
  id: string;
  type: string;
  version: number;
  payload: T;
  occurredAt: string;
  correlationId: string;
  causationId?: string | null;
  source: string;
};

type EventHandler<T = unknown> = (event: DomainEvent<T>) => Promise<void> | void;

type DispatchOptions = {
  version?: number;
  correlationId?: string;
  causationId?: string | null;
  source?: string;
};

class EventDispatcher {
  private handlers = new Map<string, EventHandler[]>();

  subscribe(type: string, handler: EventHandler) {
    const list = this.handlers.get(type) ?? [];
    list.push(handler);
    this.handlers.set(type, list);
  }

  async dispatch<T>(
    type: string,
    payload: T,
    options: DispatchOptions = {}
  ): Promise<DomainEvent<T>> {
    const event: DomainEvent<T> = {
      id: randomUUID(),
      type,
      version: options.version ?? 1,
      payload,
      occurredAt: new Date().toISOString(),
      correlationId: options.correlationId ?? randomUUID(),
      causationId: options.causationId ?? null,
      source: options.source ?? "saiadarotina",
    };

    logger.audit("Domain event dispatched", {
      id: event.id,
      type: event.type,
      version: event.version,
      correlationId: event.correlationId,
      source: event.source,
    });

    const handlers = this.handlers.get(type) ?? [];

    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (error) {
        logger.error("Domain event handler failed", {
          eventId: event.id,
          type: event.type,
          error,
        });
      }
    }

    return event;
  }
}

export const eventDispatcher = new EventDispatcher();