export type AuthContext = {
  userId: string | null;
  coupleId: string | null;
  isAuthenticated: boolean;
};

/**
 * MVP guard.
 *
 * Este contexto NÃO deve autenticar usando dados enviados pelo próprio usuário,
 * como query params ou body.
 *
 * Antes de publicação/beta, substituir por Supabase Auth real.
 */
export function getTemporaryAuthContext(): AuthContext {
  return {
    userId: null,
    coupleId: null,
    isAuthenticated: false,
  };
}