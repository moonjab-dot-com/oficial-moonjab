import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getDashboardBasePath, mapDashboardPath, mapProfileRoleToAccessRole } from '@/lib/authRouting';
import type { AccessRole } from '@/types';

const PUBLIC_ENTRY_ROUTES = new Set(['/', '/login', '/registro', '/auth']);

const isDashboardRoute = (pathname: string) =>
  pathname.startsWith('/dashboard') ||
  pathname.startsWith('/test/dashboard') ||
  pathname.startsWith('/usuariostest/dashboard');

async function resolveAccessRole(userId: string): Promise<AccessRole> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('user_role')
    .eq('id', userId)
    .maybeSingle();

  const roleFromProfile = mapProfileRoleToAccessRole(profile?.user_role);
  if (roleFromProfile) return roleFromProfile;

  const { data: accessLevel } = await supabase
    .from('user_access_levels')
    .select('access_level')
    .eq('user_id', userId)
    .maybeSingle();

  return (accessLevel?.access_level || 'free_user') as AccessRole;
}

export function useAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const redirectAuthenticatedUser = async (
      session: Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'],
    ) => {
      if (!isMounted || !session?.user) return;

      const pathname = location.pathname;
      if (!PUBLIC_ENTRY_ROUTES.has(pathname) && !isDashboardRoute(pathname)) return;

      const accessRole = await resolveAccessRole(session.user.id);
      if (!isMounted) return;

      const targetPath = isDashboardRoute(pathname)
        ? mapDashboardPath(pathname, accessRole)
        : getDashboardBasePath(accessRole);

      if (targetPath !== pathname) {
        navigate(targetPath, { replace: true });
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      void redirectAuthenticatedUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void redirectAuthenticatedUser(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [location.pathname, navigate]);
}
