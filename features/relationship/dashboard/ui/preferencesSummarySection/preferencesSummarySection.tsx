"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  buildRelationshipProfile,
  presentRelationshipProfile,
} from "@/features/relationship/profile/public";
import { presentPreferenceCompatibility } from "@/features/relationship/preferences/public";

import { Card } from "@/shared/ui/components";
import { typography } from "@/shared/design";

type ProfilePresentation = ReturnType<typeof presentRelationshipProfile>;

export function PreferencesSummarySection() {
  const [presentation, setPresentation] =
    useState<ProfilePresentation | null>(null);

  useEffect(() => {
    const profile = buildRelationshipProfile();

    setPresentation(presentRelationshipProfile(profile));
  }, []);

  if (!presentation) {
    return null;
  }

  const selectedPreferenceIds = presentation.selectedPreferences.map(
    (preference) => preference.id
  );

  const compatibility = presentPreferenceCompatibility(selectedPreferenceIds);

  return (
    <Card className="border-pink-300/20 bg-pink-500/10">
      <div>
        <p className={typography.eyebrow}>❤️ O que gostamos</p>

        <h2 className={["mt-2", typography.sectionTitle].join(" ")}>
          {presentation.title}
        </h2>

        <p className={["mt-3", typography.body].join(" ")}>
          {presentation.narrative}
        </p>

        <p className={["mt-3", typography.small].join(" ")}>
          {presentation.summary}
        </p>

        {presentation.selectedPreferences.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {presentation.selectedPreferences.slice(0, 6).map((preference) => (
              <span
                key={preference.id}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85"
              >
                {preference.icon} {preference.title}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className={typography.eyebrow}>✨ {compatibility.title}</p>

          <p className={["mt-2", typography.body].join(" ")}>
            {compatibility.narrative}
          </p>

          {compatibility.commonPreferences.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {compatibility.commonPreferences.slice(0, 5).map((preference) => (
                <span
                  key={preference.id}
                  className="rounded-full border border-pink-300/30 bg-pink-500/10 px-4 py-2 text-sm font-semibold text-white/85"
                >
                  {preference.icon} {preference.title}
                </span>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/preferencias"
          className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
        >
          {presentation.selectedPreferences.length > 0
            ? "Editar o que gostamos"
            : "Escolher nossos interesses"}
        </Link>
      </div>
    </Card>
  );
}