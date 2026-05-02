import { SEOHead } from '@/components/SEOHead';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeStep } from '@/components/onboarding/WelcomeStep';
import { RIASECQuizStep } from '@/components/onboarding/RIASECQuizStep';
import { ResultsStep } from '@/components/onboarding/ResultsStep';
import { useAuthStore } from '@/store/useAuthStore';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnswerValue, analyzeRIASECResults, RIASECResult } from '@/lib/riasecScoring';
import { getDashboardBasePath } from '@/lib/authRouting';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const { trackEvent } = useAnalytics();
  const [currentStep, setCurrentStep] = useState(0);
  const [riasecAnswers, setRiasecAnswers] = useState<Record<string, AnswerValue>>({});
  const [riasecResult, setRiasecResult] = useState<RIASECResult | null>(null);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleRIASECComplete = async (answers: Record<string, AnswerValue>) => {
    setRiasecAnswers(answers);
    const result = analyzeRIASECResults(answers);
    setRiasecResult(result);
    
    await trackEvent('role_detected', {
      hollandCode: result.hollandCode,
      topTypes: result.topTypes.slice(0, 3).map(t => t.type),
    });
    
    setCurrentStep(2);
  };

  const handleComplete = () => {
    updateUser({ onboardingCompleted: true });
    navigate(getDashboardBasePath(user?.accessRole || 'free_user'));

    // Save to Supabase in background — only for real authenticated users (not guests)
    const isGuest = user?.id?.startsWith('guest_');
    if (user?.id && riasecResult && !isGuest) {
      (async () => {
        try {
          await trackEvent('onboarding_completed', {
            hollandCode: riasecResult.hollandCode,
            topRole: riasecResult.compatibleRoles[0]?.role,
            completedAt: new Date().toISOString()
          });

          await supabase
            .from('profiles')
            .update({
              rol_profesional: riasecResult.compatibleRoles[0]?.role || 'other',
              preferencias_laborales: {
                riasecScores: { ...riasecResult.percentages },
                hollandCode: riasecResult.hollandCode,
              },
              progreso: {
                cv_completado: false,
                entrevistas_realizadas: 0,
                
                onboarding_completado: true,
              }
            })
            .eq('id', user.id);
        } catch (error) {
          console.error('Error saving profile:', error);
        }
      })();
    }
  };

  const steps = [
    <WelcomeStep key="welcome" onStart={handleNext} userName={user?.name || 'Usuario'} />,
    <RIASECQuizStep
      key="riasec"
      onComplete={handleRIASECComplete}
      initialAnswers={riasecAnswers}
    />,
    <ResultsStep 
      key="results" 
      onComplete={handleComplete}
      riasecResult={riasecResult}
    />,
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title="Bienvenida" description="Configura tu perfil profesional en MoonJab para personalizar tu experiencia." path="/onboarding" noindex />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;