import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useDataPersistence } from './useDataPersistence';
import { MOONJAB_PRO } from './useSubscription';
import { mapProfileRoleToAccessRole } from '@/lib/authRouting';
import type { User, AccessRole } from '@/types';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const accessRoleToPlan = (accessRole: AccessRole): User['plan'] => {
  switch (accessRole) {
    case 'premium_user':
      return 'premium';
    case 'trial_user':
      return 'trial';
    default:
      return 'free';
  }
};

const isActiveMoonjabPro = (data: { subscribed?: boolean; product_id?: string | null } | null | undefined) => {
  return Boolean(data?.subscribed && data?.product_id === MOONJAB_PRO.product_id);
};

const getSessionDisplayName = (sessionUser: SupabaseUser) => {
  const metadata = sessionUser.user_metadata;
  return metadata?.nombre || metadata?.name || 'Usuario';
};

const buildSessionFallbackUser = (sessionUser: SupabaseUser, accessRole: AccessRole): User => ({
  id: sessionUser.id,
  name: getSessionDisplayName(sessionUser),
  email: sessionUser.email || '',
  avatar:
    sessionUser.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${sessionUser.id}`,
  plan: accessRoleToPlan(accessRole),
  accessRole,
  createdAt: new Date(sessionUser.created_at),
  lastLogin: new Date(),
  lastActiveDate: new Date(),
  onboardingCompleted: false,
  streak: 1,
  applicationsSubmitted: 0,
});

export function useAuthSync() {
  const { setUser, setSession } = useAuthStore();
  const { setProfile } = useProfileStore();

  useDataPersistence();

  useEffect(() => {
    let isMounted = true;

    const syncAuthState = async (
      session: Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'],
    ) => {
      if (!isMounted) return;

      setSession(session);

      if (session?.user) {
        const state = useAuthStore.getState();
        if (state.isGuestMode) {
          useAuthStore.setState({ isGuestMode: false, guestData: null });
        }

        setUser(buildSessionFallbackUser(session.user, 'free_user'));
        setProfile(null);
        await fetchUserProfile(session.user.id, session.user);
        return;
      }

      const state = useAuthStore.getState();
      if (!state.isGuestMode) {
        setUser(null);
        setProfile(null);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncAuthState(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      void syncAuthState(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setProfile]);

  async function fetchUserProfile(userId: string, sessionUser: SupabaseUser) {
    try {
      const [
        { data: profile, error: profileError },
        { data: accessLevel, error: accessError },
        { data: subscriptionData, error: subscriptionError },
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('user_access_levels').select('access_level').eq('user_id', userId).maybeSingle(),
        supabase.functions.invoke('check-subscription'),
      ]);

      let accessRole =
        mapProfileRoleToAccessRole(profile?.user_role) ||
        ((accessLevel?.access_level || 'free_user') as AccessRole);

      const isPremiumSubscription = !subscriptionError && isActiveMoonjabPro(subscriptionData);

      if (isPremiumSubscription) {
        accessRole = 'premium_user';
      } else if (!subscriptionError && accessRole === 'premium_user') {
        accessRole = 'free_user';
      }

      if (!accessLevel && !isPremiumSubscription) {
        const { data: insertedAccess, error: insertAccessError } = await supabase
          .from('user_access_levels')
          .insert({ user_id: userId, access_level: 'free_user' })
          .select('access_level')
          .single();

        if (!insertAccessError && insertedAccess?.access_level) {
          accessRole = insertedAccess.access_level as AccessRole;
        }
      }

      if (accessError && accessError.code !== 'PGRST116') {
        console.warn('Error fetching user access level:', accessError.message);
      }

      if (subscriptionError) {
        console.warn('Error checking subscription status:', subscriptionError.message);
      }

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const { data: retryProfile, error: retryError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          if (!retryError && retryProfile) {
            applyProfile(retryProfile, accessRole, sessionUser);
            return;
          }

          const createdProfile = await ensureProfileRow(userId, sessionUser);
          if (createdProfile) {
            applyProfile(createdProfile, accessRole, sessionUser);
            return;
          }

          applySessionFallbackUser(sessionUser, accessRole);
          return;
        }

        throw profileError;
      }

      if (profile) {
        applyProfile(profile, accessRole, sessionUser);
        return;
      }

      const createdProfile = await ensureProfileRow(userId, sessionUser);
      if (createdProfile) {
        applyProfile(createdProfile, accessRole, sessionUser);
        return;
      }

      applySessionFallbackUser(sessionUser, accessRole);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      applySessionFallbackUser(sessionUser, 'free_user');
    }
  }

  async function ensureProfileRow(userId: string, sessionUser: SupabaseUser) {
    try {
      const displayName = getSessionDisplayName(sessionUser);
      const { data, error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: userId,
            nombre: displayName,
            email: sessionUser.email || '',
            avatar_url: sessionUser.user_metadata?.avatar_url || null,
          },
          { onConflict: 'id' },
        )
        .select('*')
        .maybeSingle();

      if (error) {
        console.warn('Error ensuring profile row:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.warn('Error ensuring profile row:', error);
      return null;
    }
  }

  function applySessionFallbackUser(sessionUser: SupabaseUser, accessRole: AccessRole) {
    setUser(buildSessionFallbackUser(sessionUser, accessRole));
    setProfile(null);
  }

  function applyProfile(profile: any, accessRole: AccessRole, sessionUser: SupabaseUser) {
    const user: User = {
      id: profile.id,
      name: profile.nombre || getSessionDisplayName(sessionUser),
      email: profile.email || sessionUser.email || '',
      avatar:
        profile.avatar_url ||
        sessionUser.user_metadata?.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`,
      plan: accessRoleToPlan(accessRole),
      accessRole,
      createdAt: new Date(profile.created_at),
      lastLogin: new Date(),
      lastActiveDate: new Date(),
      onboardingCompleted:
        !!(profile.progreso as any)?.onboarding_completado || !!profile.rol_profesional,
      streak: 1,
      applicationsSubmitted: 0,
    };

    setUser(user);

    setProfile({
      userId: profile.id,
      interests: [],
      values: [],
      workStyle: { modality: '', schedule: '', companySize: '' },
      skills: { technical: [], soft: [], languages: [], tools: [] },
      experience: 'student',
      situation: '',
      challenge: '',
      diagnosticResults: { topCareers: [], profileType: '', insights: [], radarData: [] },
      rolActual: (profile.rol_profesional || 'other') as any,
      rolesSugeridos: [],
      preferencias: { intereses: [], objetivos: [], herramientas: [], nivelExperiencia: 'junior' },
      historialRol: [],
    });
  }
}
