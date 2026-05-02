import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useCVStore } from '@/store/useCVStore';
import { useInterviewStore } from '@/store/useInterviewStore';
import type { CVData, InterviewSession } from '@/types';

function clearUserScopedStores() {
  useCVStore.setState({ cvs: [], currentCV: null });
  useInterviewStore.setState({ sessions: [], currentSession: null, questionBank: [], currentQuestionIndex: 0 });
}

export function useDataPersistence() {
  const { session } = useAuthStore();

  useEffect(() => {
    if (!session?.user) {
      clearUserScopedStores();
      return;
    }

    clearUserScopedStores();
    void loadUserData(session.user.id);
  }, [session?.user?.id]);

  async function loadUserData(userId: string) {
    try {
      const [cvsResult, sessionsResult] = await Promise.all([
        supabase.from('cvs').select('*').eq('user_id', userId),
        supabase.from('interview_sessions').select('*').eq('user_id', userId),
      ]);

      const { data: cvs, error: cvsError } = cvsResult;
      const { data: sessions, error: sessionsError } = sessionsResult;

      if (!cvsError) {
        const transformedCVs: CVData[] = (cvs || []).map((cv) => ({
          id: cv.id,
          userId: cv.user_id,
          title: cv.nombre_cv,
          template: (cv.template as any) || 'creative',
          language: 'es',
          personal: (cv.info_personal as any) || {},
          summary: cv.resumen || '',
          education: (cv.educacion as any) || [],
          experience: (cv.experiencia as any) || [],
          research: [],
          projects: (cv.proyectos as any) || [],
          teaching: [],
          skills: (cv.habilidades as any) || [],
          certifications: (cv.certificaciones as any) || [],
          languages: (cv.idiomas as any) || [],
          awards: [],
          references: [],
          createdAt: cv.created_at,
          updatedAt: cv.updated_at,
          versions: [],
          score: { overall: 0, clarity: 0, impact: 0, keywords: 0, format: 0 },
          metadata: { industryTags: [], targetKeywords: [] },
        }));

        useCVStore.setState({ cvs: transformedCVs, currentCV: null });
      }

      if (!sessionsError) {
        const transformedSessions: InterviewSession[] = (sessions || []).map((s) => ({
          id: s.id,
          userId: s.user_id,
          role: s.rol,
          level: 'junior' as any,
          interviewType: 'behavioral' as any,
          tone: 'balanced' as any,
          jobDescription: s.industria || undefined,
          responses: (s.respuestas as any) || [],
          feedback: (s.feedback as any) || {},
          finalScore: s.puntuacion || 0,
          breakdown: { clarity: 0, structure: 0, evidence: 0, language: 0, culture: 0 },
          recommendations: [],
          startedAt: s.created_at,
          completedAt: s.created_at,
          saved: true,
          privacy: 'private' as any,
        }));

        useInterviewStore.setState({ sessions: transformedSessions, currentSession: null });
      }
    } catch (error) {
      // silent fail
    }
  }

  return { loadUserData };
}
