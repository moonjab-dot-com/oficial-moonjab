import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

type EventType = 
  | 'onboarding_started'
  | 'onboarding_completed'
  | 'role_detected'
  | 'cv_created'
  | 'cv_exported'
  | 'interview_started'
  | 'interview_completed'
  | 'profile_updated'
  | 'login'
  | 'signup';

export function useAnalytics() {
  const { user } = useAuthStore();

  const trackEvent = async (eventType: EventType, eventData?: any) => {
    if (!user || user.id.startsWith('guest_')) {
      // No trackear eventos de usuarios invitados
      return;
    }

    try {
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          user_id: user.id,
          event_type: eventType,
          event_data: eventData || {},
        });

      if (error) {
        console.error('Analytics tracking error:', error);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  const getEventStats = async (eventType?: EventType) => {
    if (!user || user.id.startsWith('guest_')) {
      return null;
    }

    try {
      let query = supabase
        .from('analytics_events')
        .select('*')
        .eq('user_id', user.id);

      if (eventType) {
        query = query.eq('event_type', eventType);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }
  };

  return {
    trackEvent,
    getEventStats,
  };
}