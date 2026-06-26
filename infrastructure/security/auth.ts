export type AuthContext = {
  userId: string | null;
  coupleId: string | null;
  isAuthenticated: boolean;
};

/**
 * Temporário para MVP.
 * Antes do beta, isso será substituído por Supabase Auth.
 */
export function getTemporaryAuthContext(input: {
  userId?: string | null;
  coupleId?: string | null;
}): AuthContext {
  return {
    userId: input.userId ?? null,
    coupleId: input.coupleId ?? null,
    isAuthenticated: Boolean(input.userId || input.coupleId),
  };
}