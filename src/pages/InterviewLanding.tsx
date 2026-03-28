import { SEOHead } from '@/components/SEOHead';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, TrendingUp, Target, Clock, Bot, Sparkles, Lock, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "@/store/useInterviewStore";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { useState } from "react";
import { UpgradeModal } from "@/components/UpgradeModal";
import { useTranslation } from 'react-i18next';

export default function InterviewLanding() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { sessions, metrics } = useInterviewStore();
  const { isGuestMode, user } = useAuthStore();
  const isPremium = user?.plan === 'premium';
  const isLocked = isGuestMode || !isPremium;
  const [showUpgrade, setShowUpgrade] = useState(false);
  const recentSessions = sessions.slice(-3).reverse();

  const locale = i18n.language?.startsWith('es') ? 'es-ES' : 'en-US';

  const stats = [
    { icon: Target, label: t('interviews.landing.statsInterviews'), value: metrics.interviewCount },
    { icon: TrendingUp, label: t('interviews.landing.statsBestScore'), value: metrics.bestScore },
    { icon: TrendingUp, label: t('interviews.landing.statsAverage'), value: Math.round(metrics.averageScore) },
    { icon: Clock, label: t('interviews.landing.statsStreak'), value: `${metrics.streaks}d` },
  ];

  const benefits = [
    { icon: Mic, title: t('interviews.landing.benefitRealistic'), description: t('interviews.landing.benefitRealisticDesc') },
    { icon: TrendingUp, title: t('interviews.landing.benefitFeedback'), description: t('interviews.landing.benefitFeedbackDesc') },
    { icon: Target, title: t('interviews.landing.benefitImprovement'), description: t('interviews.landing.benefitImprovementDesc') },
  ];

  const handleStartInterview = (path: string) => {
    if (isLocked) {
      setShowUpgrade(true);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <SEOHead title="Entrevistas con IA" description="Practica entrevistas laborales con inteligencia artificial. Recibe feedback en tiempo real y mejora tus respuestas." path="/interview" />
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="space-y-5"
      >
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t('interviews.landing.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t('interviews.landing.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            size="lg" 
            onClick={() => handleStartInterview('/dashboard/interviews/ai')} 
            className="h-12 gap-2 font-semibold"
            variant={isLocked ? "outline" : "default"}
          >
            {isLocked && <Lock className="w-4 h-4" />}
            <Bot className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            {t('interviews.landing.voiceBtn')}
            {!isLocked && <Sparkles className="w-4 h-4" />}
          </Button>
          <Button 
            size="lg" 
            onClick={() => handleStartInterview('/dashboard/interviews/setup')} 
            variant="outline"
            className="h-12 gap-2"
          >
            {isLocked && <Lock className="w-4 h-4" />}
            <Mic className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            {t('interviews.landing.textBtn')}
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {stats.map((stat, i) => (
          <Card key={i} className="p-4 border-border/40 hover:border-primary/20 transition-all duration-200">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <div className="p-1.5 rounded-lg bg-primary/8">
                <stat.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-xs font-medium">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </Card>
        ))}
      </motion.div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 8 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('interviews.landing.recentSessions')}</h2>
          <div className="space-y-2">
            {recentSessions.map((session) => (
              <Card key={session.id} className="p-4 border-border/40 hover:border-primary/20 hover:shadow-clovely-sm transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-sm">{session.role}</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(session.startedAt).toLocaleDateString(locale, {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{session.finalScore}</p>
                    <p className="text-xs text-muted-foreground">{t('interviews.landing.score')}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Benefits */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.15 }}
        className="grid md:grid-cols-3 gap-4"
      >
        {benefits.map((benefit, i) => (
          <Card key={i} className="p-6 border-border/40 hover:border-primary/20 hover:shadow-clovely-md transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
              <benefit.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-base mb-1.5 group-hover:text-primary transition-colors">{benefit.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
          </Card>
        ))}
      </motion.div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} feature={t('interviews.landing.aiInterviews')} />
    </div>
  );
}