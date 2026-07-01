import type { buildRelationshipProfile } from "@/features/relationship/profile/application/buildRelationshipProfile";

type RelationshipProfile = ReturnType<typeof buildRelationshipProfile>;

export function presentRelationshipProfile(profile: RelationshipProfile) {
  const hasPreferences = profile.totalSelectedPreferences > 0;

  return {
    title: hasPreferences
      ? "Estamos conhecendo melhor vocês"
      : "Vamos conhecer melhor vocês?",
    narrative: hasPreferences
      ? "Esses interesses ajudam nossas sugestões a ficarem mais próximas do que combina com a relação de vocês."
      : "Selecionem alguns interesses para receber experiências mais alinhadas com o que vocês querem viver juntos.",
    selectedPreferences: profile.selectedPreferences,
    summary: hasPreferences
      ? `${profile.totalSelectedPreferences} interesses escolhidos`
      : "Nenhum interesse escolhido ainda",
  };
}