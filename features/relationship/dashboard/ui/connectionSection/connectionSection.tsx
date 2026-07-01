"use client";

import Link from "next/link";
import { useState } from "react";

import {
  buildDailyConnection,
  connectionPromptCatalog,
  presentConnection,
} from "@/features/relationship/connection/public";

import { Card, Section, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

export function ConnectionSection() {
  const initialPrompt = buildDailyConnection();

  const [prompt, setPrompt] = useState(initialPrompt);
  const [completed, setCompleted] = useState(false);

  const presentation = presentConnection(prompt);

  function handleAnotherQuestion() {
    const currentIndex = connectionPromptCatalog.findIndex(
      (item) => item.id === prompt.id
    );

    const nextIndex = (currentIndex + 1) % connectionPromptCatalog.length;

    setPrompt(connectionPromptCatalog[nextIndex]);
    setCompleted(false);
  }

  function handleCompleted() {
    setCompleted(true);
  }

  return (
    <Section title={`${presentation.icon} ${presentation.title}`}>
      <Card className="border-pink-300/20 bg-pink-500/10">
        <Stack size="md">
          <div>
            <p className={typography.eyebrow}>{prompt.title}</p>

            <h2 className={["mt-2", typography.sectionTitle].join(" ")}>
              {prompt.question}
            </h2>

            <p className={["mt-4", typography.body].join(" ")}>
              {presentation.introduction}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85">
              {prompt.estimatedMinutes} minutos
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85">
              Conexão afetiva
            </span>
          </div>

          {completed && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className={typography.body}>
                ❤️ Que lindo!
                <br />
                Pequenas conversas como essa também ajudam a fortalecer a
                história de vocês.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
  href={`/memory/create?origin=connection&id=${prompt.id}`}
  className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
>
  📖 Registrar essa conversa
</Link>

                <Link
                  href="/story"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Ver nossa história
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCompleted}
              disabled={completed}
              className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400 disabled:cursor-default disabled:bg-pink-500/60"
            >
              {completed ? "❤️ Conexão vivida" : presentation.actionLabel}
            </button>

            <button
              type="button"
              onClick={handleAnotherQuestion}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              {presentation.secondaryActionLabel}
            </button>
          </div>
        </Stack>
      </Card>
    </Section>
  );
}