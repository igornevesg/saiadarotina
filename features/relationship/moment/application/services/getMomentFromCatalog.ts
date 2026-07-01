import type { Moment } from "@/features/relationship/moment/public";

type GetMomentFromCatalogOptions = {
  preferredIndex?: number;
};

export function getMomentFromCatalog(
  catalog: Moment[],
  options: GetMomentFromCatalogOptions = {}
): Moment {
  if (catalog.length === 0) {
    throw new Error("Catálogo de momentos vazio.");
  }

  const preferredIndex = options.preferredIndex ?? 0;
  const safeIndex = Math.abs(preferredIndex) % catalog.length;

  return catalog[safeIndex];
}