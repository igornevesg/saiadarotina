"use client";

import Link from "next/link";
import { useState } from "react";

import {
  saveMemoryStoryEvent,
  type CreateMemoryPresentation,
} from "@/features/relationship/memory/public";

import { Card, PageContainer, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

type Props = {
  presentation: CreateMemoryPresentation;
};

export function CreateMemoryPage({ presentation }: Props) {
  const [title, setTitle] = useState(presentation.suggestedTitle);
  const [narrative, setNarrative] = useState("");
  const [feeling, setFeeling] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSubmit() {
    const feelingLabel =
      presentation.feelingOptions.find((option) => option.id === feeling)
        ?.label ?? "❤️ Momento especial";

    saveMemoryStoryEvent({
      id: `memory-${Date.now()}`,
      type: "memory",
      title,
      description: `${feelingLabel}\n\n${narrative}`,
      occurredAt: new Date().toISOString(),
    });

    setSaved(true);
  }

  return (
    <PageContainer>
      <Stack size="lg">
        <div>
          <p className={typography.eyebrow}>Saia da Rotina</p>

          <h1 className={typography.pageTitle}>
            Vamos guardar essa lembrança?
          </h1>

          <p className={["mt-4", typography.body].join(" ")}>
            Este momento pode virar mais um capítulo da nossa história.
          </p>
        </div>

        <Card className="border-pink-300/20 bg-pink-500/10">
          <Stack>
            <div>
              <p className={typography.eyebrow}>Esta lembrança nasceu de</p>

              <h2 className={["mt-2", typography.sectionTitle].join(" ")}>
                {presentation.sourceTitle}
              </h2>

              <p className={["mt-3", typography.body].join(" ")}>
                {presentation.sourceNarrative}
              </p>
            </div>
          </Stack>
        </Card>

        <Card>
          <Stack>
            <label>
              <p className={typography.eyebrow}>
                Qual será o título desta lembrança?
              </p>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={saved}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-pink-300/50 disabled:opacity-60"
              />
            </label>

            <label>
              <p className={typography.eyebrow}>
                {presentation.narrativeLabel}
              </p>

              <textarea
                value={narrative}
                onChange={(event) => setNarrative(event.target.value)}
                disabled={saved}
                rows={5}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-pink-300/50 disabled:opacity-60"
                placeholder="Conte um detalhe, uma sensação ou algo que vocês querem lembrar..."
              />
            </label>

            <div>
              <p className={typography.eyebrow}>Como nos sentimos?</p>

              <div className="mt-3 flex flex-wrap gap-3">
                {presentation.feelingOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={saved}
                    onClick={() => setFeeling(option.id)}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      feeling === option.id
                        ? "border-pink-300/60 bg-pink-500/30 text-white"
                        : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                      saved ? "cursor-default opacity-70" : "",
                    ].join(" ")}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {saved && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className={typography.body}>
                  📖 Lembrança guardada!
                  <br />
                  Esse momento agora pode ser visto como parte da nossa história.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/story"
                    className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
                  >
                    📖 Abrir nossa história
                  </Link>

                  <Link
                    href="/dashboard"
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    ✨ Ver próximo momento
                  </Link>
                </div>
              </div>
            )}

            {!saved && (
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
              >
                {presentation.saveLabel}
              </button>
            )}
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  );
}