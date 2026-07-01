export {
  relationshipPreferenceCatalog,
  type RelationshipPreference,
} from "@/features/relationship/preferences/domain/preferenceCatalog";

export {
  listRelationshipPreferences,
  saveRelationshipPreferences,
} from "@/features/relationship/preferences/application/store/preferenceStore";

export { presentPreferenceCompatibility } from "@/features/relationship/preferences/presentation/presenters/preferenceCompatibilityPresenter";
export type { PreferenceCompatibilityPresentation } from "@/features/relationship/preferences/presentation/presenters/preferenceCompatibilityPresenter";