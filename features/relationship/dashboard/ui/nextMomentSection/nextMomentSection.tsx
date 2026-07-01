"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  getMomentFromCatalog,
  romanceMomentCatalog,
} from "@/features/relationship/moment/public";

import {
  advanceMomentIndex,
  getCurrentMomentIndex,
} from "@/features/relationship/recommendation/public";

import type { RecommendationViewModel } from "@/features/relationship/recommendation/presentation/viewModels/recommendationViewModel";

import {
  buildRelationshipProfile,
  presentRelationshipProfile,
} from "@/features/relationship/profile/public";

import { relationshipPreferenceCatalog } from "@/features/relationship/preferences/public";

import { Badge, Card, Section, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

type ExperienceStatus = "suggested" | "interested" | "lived";

type Props = {
  recommendation: RecommendationViewModel;
};

function getStatusCopy(status: ExperienceStatus) {
  if (status === "lived") {
    return {
      icon: "📖",
      title: "Momento vivido",
      description: "Pronto para virar memória.",
    };
  }

  if (status === "interested") {
    return {
      icon: "❤️",
      title: "Queremos viver",
      description: "Essa ideia ficou salva para vocês.",
    };
  }

  return {
    icon: "✨",
    title: "Sugestão",
    description: "Uma possibilidade para sair da rotina.",
  };
}

export function NextMomentSection({ recommendation }: Props) {
  const [currentMoment, setCurrentMoment] = useState(recommendation.moment);
  const [status, setStatus] = useState<ExperienceStatus>("suggested");
  const [selectedPreferenceIds, setSelectedPreferenceIds] = useState<string[]>(
    []
  );

  useEffect(() => {
    const profile = buildRelationshipProfile();
    const presentation = presentRelationshipProfile(profile);

    setSelectedPreferenceIds(
      presentation.selectedPreferences.map((preference) => preference.id)
    );
  }, []);

  const selectedPreferenceMatches = useMemo(() => {
    const matchingIds = currentMoment.tags.filter((tag) =>
      selectedPreferenceIds.includes(tag)
    );

    return relationshipPreferenceCatalog.filter((preference) =>
      matchingIds.includes(preference.id)
    );
  }, [currentMoment.tags, selectedPreferenceIds]);

  const statusCopy = getStatusCopy(status);

  function handleSuggestAnotherMoment() {
    advanceMomentIndex();

    const nextMoment = getMomentFromCatalog(romanceMomentCatalog, {
      preferredIndex: getCurrentMomentIndex(),
    });

    setStatus("suggested");
    setCurrentMoment(nextMoment);
  }

  function handleLike() {
    setStatus("interested");
  }

  function handleLivedMoment() {
    setStatus("lived");
  }

  return (
    <Section title="Nosso próximo momento">
      <Card className="border-pink-300/20 bg-pink-500/10">
        <Stack size="md">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              {currentMoment.icon}
            </div>

            <div className="min-w-0">
              <div className="mb-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
                {statusCopy.icon} {statusCopy.title}
              </div>

              <h3 className={typography.sectionTitle}>
                {currentMoment.title}
              </h3>

              <p className={["mt-2", typography.small].join(" ")}>
                {statusCopy.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>{currentMoment.estimatedDurationMinutes} min</Badge>
            <Badge>Intensidade {currentMoment.intensity}</Badge>
          </div>

          {selectedPreferenceIds.length > 0 && (
            <div className="rounded-2xl border border-pink-300/30 bg-pink-500/10 p-4">
              <p className={typography.eyebrow}>❤️ Combina com vocês</p>

              {selectedPreferenceMatches.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedPreferenceMatches.map((preference) => (
                    <span
                      key={preference.id}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85"
                    >
                      {preference.icon} {preference.title}
                    </span>
                  ))}
                </div>
              ) : (
                <p className={["mt-2", typography.small].join(" ")}>
                  Ainda estamos cruzando essa ideia com o que vocês escolheram.
                </p>
              )}

              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-white/75">
                  Ver por quê
                </summary>

                <p className={["mt-3", typography.body].join(" ")}>
                  {recommendation.presentation.why}
                </p>

                <Link
                  href="/preferencias"
                  className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Editar interesses
                </Link>
              </details>
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className={typography.eyebrow}>✨ Como viver</p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {recommendation.presentation.journey.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className={typography.small}>#{index + 1}</p>

                  <h4 className={["mt-1", typography.cardTitle].join(" ")}>
                    {chapter.icon} {chapter.title}
                  </h4>

                  <p className={["mt-3", typography.small].join(" ")}>
                    {chapter.items[0]}
                  </p>

                  {chapter.items.length > 1 && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-semibold text-white/70">
                        Ver mais
                      </summary>

                      <ul className="mt-3 space-y-2">
                        {chapter.items.slice(1).map((item) => (
                          <li key={item} className={typography.small}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className={typography.eyebrow}>❤️ Aprendizado</p>

              <h4 className={["mt-2", typography.cardTitle].join(" ")}>
                {recommendation.presentation.confidence.title}
              </h4>

              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-semibold text-white/70">
                  Ver detalhes
                </summary>

                <p className={["mt-3", typography.body].join(" ")}>
                  {recommendation.presentation.confidence.description}
                </p>
              </details>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className={typography.eyebrow}>🌹 Toque especial</p>

              <h4 className={["mt-2", typography.cardTitle].join(" ")}>
                {recommendation.presentation.complement.title}
              </h4>

              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-semibold text-white/70">
                  Ver detalhes
                </summary>

                <p className={["mt-3", typography.body].join(" ")}>
                  {recommendation.presentation.complement.description}
                </p>
              </details>
            </div>
          </div>

          {status === "lived" && (
            <div className="rounded-2xl border border-pink-300/30 bg-pink-500/10 p-4">
              <h4 className={typography.cardTitle}>❤️ Que incrível!</h4>

              <p className={["mt-2", typography.small].join(" ")}>
                Esse momento pode virar capítulo da história de vocês.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/memory/create?origin=recommendation"
                  className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
                >
                  📖 Registrar memória
                </Link>

                <Link
                  href="/story"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Ver história
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleLivedMoment}
              disabled={status === "lived"}
              className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400 disabled:cursor-default disabled:bg-pink-500/60"
            >
              {status === "lived" ? "❤️ Vivido" : "❤️ Vivemos"}
            </button>

            <button
              type="button"
              onClick={handleLike}
              disabled={status !== "suggested"}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 disabled:cursor-default disabled:bg-white/5 disabled:text-white/50"
            >
              {status === "interested" ? "❤️ Salvo" : "❤️ Gostei"}
            </button>

            <button
              type="button"
              onClick={handleSuggestAnotherMoment}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              🔄 Outra ideia
            </button>
          </div>
        </Stack>
      </Card>
    </Section>
  );
}