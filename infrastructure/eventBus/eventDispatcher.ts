type DomainEvent<T = unknown> = {
  type: string;
  payload: T;
  occurredAt: Date;
};

type EventHandler<T = unknown> = (event: DomainEvent<T>) => Promise<void> | void;

class EventDispatcher {
  private handlers = new Map<string, EventHandler[]>();

  subscribe(type: string, handler: EventHandler) {
    const list = this.handlers.get(type) ?? [];
    list.push(handler);
    this.handlers.set(type, list);
  }

  async dispatch<T>(type: string, payload: T) {
    const event: DomainEvent<T> = {
      type,
      payload,
      occurredAt: new Date(),
    };

    const handlers = this.handlers.get(type) ?? [];

    for (const handler of handlers) {
      await handler(event);
    }
  }
}

export const eventDispatcher = new EventDispatcher();