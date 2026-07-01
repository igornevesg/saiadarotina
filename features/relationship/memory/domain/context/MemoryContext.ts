export type MemoryOrigin =
  | "connection"
  | "recommendation"
  | "story"
  | "achievement"
  | "challenge"
  | "spontaneous";

export type MemoryContext = {
  origin: MemoryOrigin;

  title: string;

  description?: string;

  referenceId?: string;

  createdAt: string;
};