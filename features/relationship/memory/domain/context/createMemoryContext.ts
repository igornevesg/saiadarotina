import type { MemoryContext, MemoryOrigin } from "./MemoryContext";

type Input = {
  origin: MemoryOrigin;
  title: string;
  description?: string;
  referenceId?: string;
};

export function createMemoryContext({
  origin,
  title,
  description,
  referenceId,
}: Input): MemoryContext {
  return {
    origin,
    title,
    description,
    referenceId,
    createdAt: new Date().toISOString(),
  };
}