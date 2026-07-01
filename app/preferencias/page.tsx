"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  listRelationshipPreferences,
  relationshipPreferenceCatalog,
  saveRelationshipPreferences,
} from "@/features/relationship/preferences/public";

import { Card, PageContainer, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

export default function PreferencesPage() {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSelectedPreferences(listRelationshipPreferences());
  }, []);

  const selectedSummary = useMemo(() => {
    return relationshipPreferenceCatalog
      .filter((preference) => selectedPreferences.includes(preference.id))
      .map((preference) => preference.title)
      .join(" • ");
  }, [selectedPreferences]);

  function togglePreference(preferenceId: string) {
    setSaved(false);

    setSelectedPreferences((current) => {
      if (current.includes(preferenceId)) {
        return current.filter((id) => id !== preferenceId);
      }

      return [...current, preferenceId];
    });
  }

  function handleSave() {
    saveRelationshipPreferences(selectedPreferences);
    setSaved(true);
  }

  return (
    <PageContainer>
      <Stack size="lg">
        <div>
          <p className={typography.eyebrow}>❤️ O que gostamos</p>

          <h1 className={typography.pageTitle}>
            Vamos conhecer melhor vocês?
          </h1>

          <p className={["mt-4", typography.body].join(" ")}>
            Escolham tudo o que combina com vocês. Assim nossas sugestões ficam
            mais próximas do que realmente faz sentido para a relação.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {relationshipPreferenceCatalog.map((preference) => {
            const selected = selectedPreferences.includes(preference.id);

            return (
              <button
                key={preference.id}
                type="button"
                onClick={() => togglePreference(preference.id)}
                className={[
                  "rounded-3xl border p-5 text-left transition",
                  selected
                    ? "border-pink-300/60 bg-pink-500/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                ].join(" ")}
              >
                <div className="flex gap-4">
                  <span className="text-3xl">{preference.icon}</span>

                  <div>
                    <h2 className={typography.cardTitle}>
                      {preference.title}
                    </h2>

                    <p className={["mt-2", typography.small].join(" ")}>
                      {preference.description}
                    </p>

                    {selected && (
                      <p className={["mt-3", typography.eyebrow].join(" ")}>
                        Selecionado
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Card className="border-pink-300/20 bg-pink-500/10">
          <Stack>
            <div>
              <p className={typography.eyebrow}>Resumo</p>

              <h2 className={typography.sectionTitle}>
                {selectedPreferences.length > 0
                  ? "Estamos começando a entender vocês."
                  : "Escolham alguns interesses para começar."}
              </h2>

              {selectedPreferences.length > 0 && (
                <p className={["mt-3", typography.body].join(" ")}>
                  {selectedSummary}
                </p>
              )}
            </div>

            {saved && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className={typography.body}>
                  ❤️ Preferências salvas!
                  <br />
                  Vamos usar isso para sugerir experiências mais alinhadas com
                  vocês.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
              >
                Salvar o que gostamos
              </button>

              <Link
                href="/dashboard"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Voltar para o nosso momento
              </Link>
            </div>
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  );
}