import {
  relationshipPreferenceCatalog,
  type RelationshipPreference,
} from "@/features/relationship/preferences/public";

export type PreferenceCompatibilityPresentation = {
  title: string;
  narrative: string;
  commonPreferences: RelationshipPreference[];
};

export function presentPreferenceCompatibility(
  selectedPreferenceIds: string[]
): PreferenceCompatibilityPresentation {
  const commonPreferences = relationshipPreferenceCatalog.filter((preference) =>
    selectedPreferenceIds.includes(preference.id)
  );

  return {
    title:
      commonPreferences.length > 0
        ? "Descobrimos algo em comum"
        : "Ainda estamos conhecendo vocês",
    narrative:
      commonPreferences.length > 0
        ? "Esses interesses ajudam a revelar experiências que podem fazer sentido para a relação de vocês."
        : "Quando vocês selecionarem interesses, vamos destacar aqui o que combina com o casal.",
    commonPreferences,
  };
}