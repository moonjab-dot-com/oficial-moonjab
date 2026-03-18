import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/integrations/supabase/client';
import { mapDashboardPath } from '@/lib/authRouting';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export const ProtectedRoute = ({ children, requireOnboarding = false }: ProtectedRouteProps) => {
  const { user, session, isAuthenticated, isGuestMode } = useAuthStore();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [sessionExists, setSessionExists] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSessionExists(!!data.session);
      setChecking(false);
    };

    void checkAuth();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const hasSession = sessionExists || !!session;

  if (!isGuestMode && !hasSession && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isGuestMode && hasSession && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const accessRole = user?.accessRole || (isGuestMode ? 'trial_user' : 'free_user');
  const isTrialRoute =
    location.pathname.startsWith('/test/dashboard') ||
    location.pathname.startsWith('/usuariostest/dashboard');
  const shouldBeOnTrialRoute = accessRole === 'trial_user';

  if (location.pathname.startsWith('/dashboard') || isTrialRoute) {
    if (shouldBeOnTrialRoute !== isTrialRoute) {
      return <Navigate to={mapDashboardPath(location.pathname, accessRole)} replace />;
    }
  }

  if (requireOnboarding && user && !user.onboardingCompleted && !isGuestMode) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
