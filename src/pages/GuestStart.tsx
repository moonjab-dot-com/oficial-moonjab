import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useCVStore } from '@/store/useCVStore';
import { useInterviewStore } from '@/store/useInterviewStore';
import { useOpportunitiesStore } from '@/store/useOpportunitiesStore';

export default function GuestStart() {
  const navigate = useNavigate();
  const startGuestMode = useAuthStore((state) => state.startGuestMode);

  useEffect(() => {
    useProfileStore.setState({ profile: null });
    useCVStore.setState({ cvs: [], currentCV: null });
    useInterviewStore.setState({ sessions: [], currentSession: null, questionBank: [], currentQuestionIndex: 0 });
    useOpportunitiesStore.setState({ opportunities: [], applications: [], savedOpportunities: [], cache: {}, hasMore: true, currentPage: 1 });
    startGuestMode();
    navigate('/test/dashboard', { replace: true });
  }, [startGuestMode, navigate]);

  return null;
}
