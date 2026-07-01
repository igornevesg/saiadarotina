const storageKey = "saiadarotina.relationship.preferences";

export function saveRelationshipPreferences(preferenceIds: string[]) {
  localStorage.setItem(storageKey, JSON.stringify(preferenceIds));
}

export function listRelationshipPreferences(): string[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(storageKey);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}