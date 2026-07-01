import { getMomentFromCatalog, romanceMomentCatalog } from "@/features/relationship/moment/public";
import {
  connectionPromptCatalog,
} from "@/features/relationship/connection/public";
import { createMemoryContext } from "@/features/relationship/memory/public";
import type { MemoryContext, MemoryOrigin } from "@/features/relationship/memory/public";

type ParamValue = string | string[] | undefined;

type Input = {
  origin?: ParamValue;
  id?: ParamValue;
};

function getSingleParam(value: ParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveSafeOrigin(origin: string | undefined): MemoryOrigin {
  if (origin === "connection") return "connection";
  if (origin === "recommendation") return "recommendation";
  if (origin === "story") return "story";
  if (origin === "achievement") return "achievement";
  if (origin === "challenge") return "challenge";

  return "spontaneous";
}

function resolveMemoryContext(input: Input): MemoryContext {
  const origin = resolveSafeOrigin(getSingleParam(input.origin));
  const id = getSingleParam(input.id);

  if (origin === "connection" && id) {
    const prompt = connectionPromptCatalog.find((item) => item.id === id);

    if (prompt) {
      return createMemoryContext({
        origin: "connection",
        title: prompt.title,
        description: prompt.question,
        referenceId: prompt.id,
      });
    }
  }

  return createMemoryContext({
    origin: "spontaneous",
    title: "Momento espontâneo",
    description: "Uma lembrança criada livremente pelo casal.",
  });
}

export function getCreateMemoryInitialData(input: Input = {}) {
  const sourceMoment = getMomentFromCatalog(romanceMomentCatalog);
  const memoryContext = resolveMemoryContext(input);

  return {
    sourceMoment,
    memoryContext,
  };
}