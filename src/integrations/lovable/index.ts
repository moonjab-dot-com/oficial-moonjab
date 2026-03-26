// Lovable auth disabled — all authentication uses Supabase directly.
// This file is kept as a stub to prevent import errors.

export const lovable = {
  auth: {
    signInWithOAuth: async () => {
      throw new Error('Lovable auth is disabled. Use supabase.auth.signInWithOAuth() instead.');
    },
  },
};
