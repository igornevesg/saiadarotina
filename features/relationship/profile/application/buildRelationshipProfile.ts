import {
  listRelationshipPreferences,
  relationshipPreferenceCatalog,
} from "@/features/relationship/preferences/public";

export function buildRelationshipProfile() {
  const selectedPreferenceIds = listRelationshipPreferences();

  const selectedPreferences = relationshipPreferenceCatalog.filter(
    (preference) => selectedPreferenceIds.includes(preference.id)
  );

  return {
    selectedPreferences,
    totalSelectedPreferences: selectedPreferences.length,
  };
}