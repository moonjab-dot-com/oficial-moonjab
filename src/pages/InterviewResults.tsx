import { SEOHead } from '@/components/SEOHead';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, TrendingUp, Target, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "@/store/useInterviewStore";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function InterviewResults() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentSession, saveSession } = useInterviewStore();

  useEffect(() => {
    if (!currentSession) {
      navigate('/dashboard/interviews');
    }
  }, [currentSession, navigate]);

  if (!currentSession) return null;

  const { finalScore, breakdown, recommendations, responses } = currentSession;

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return t('interviews.results.excellent');
    if (score >= 50) return t('interviews.results.good');
    return t('interviews.results.needsImprovement');
  };

  const handleSave = () => {
    saveSession();
    navigate('/dashboard/interviews');
  };

  return (
    <div
      <SEOHead title="Resultados de Entrevista" description="Revisa tu desempeño y feedback detallado de tu entrevista con IA." path="/interview-results" noindex /> className="container max-w-4xl py-8 space-y-6">
        <SEOHead title="Resultados de Entrevista" description="Revisa tu desempeño y feedback de tu entrevista con IA." path="/interview-results" noindex />
      {/* Success header */}
      <Card className="p-8 text-center space-y-4 rounded-3xl shadow-clovely-xl border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/30">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 shadow-clovely-md mb-2">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{t('interviews.results.completed')}</h1>
        <p className="text-muted-foreground">{t('interviews.results.answeredQuestions', { count: responses.length })}</p>
      </Card>

      {/* Score */}
      <Card className="p-8 space-y-6 rounded-2xl shadow-clovely-lg border-2 border-primary/10">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">{t('interviews.results.finalScore')}</p>
          <p className={`text-6xl font-bold ${getScoreColor(finalScore)}`}>
            {finalScore}
          </p>
          <p className="text-lg font-medium">{getScoreLabel(finalScore)}</p>
        </div>

        {/* Breakdown */}
        <div className="space-y-4 pt-6 border-t">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {t('interviews.results.categoryBreakdown')}
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{t('interviews.results.clarity')}</span>
                <span className="font-medium">{breakdown.clarity}/25</span>
              </div>
              <Progress value={(breakdown.clarity / 25) * 100} className="h-3 sm:h-4" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{t('interviews.results.structure')}</span>
                <span className="font-medium">{breakdown.structure}/25</span>
              </div>
              <Progress value={(breakdown.structure / 25) * 100} className="h-3 sm:h-4" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{t('interviews.results.evidence')}</span>
                <span className="font-medium">{breakdown.evidence}/25</span>
              </div>
              <Progress value={(breakdown.evidence / 25) * 100} className="h-3 sm:h-4" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{t('interviews.results.language')}</span>
                <span className="font-medium">{breakdown.language}/15</span>
              </div>
              <Progress value={(breakdown.language / 15) * 100} className="h-3 sm:h-4" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{t('interviews.results.culture')}</span>
                <span className="font-medium">{breakdown.culture}/10</span>
              </div>
              <Progress value={(breakdown.culture / 10) * 100} className="h-3 sm:h-4" />
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="p-6 space-y-4 rounded-xl border-2 shadow-clovely-md">
          <h3 className="font-semibold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/10 to-yellow-500/10">
              <Lightbulb className="w-4 h-4 text-amber-600" />
            </div>
            {t('interviews.results.recommendations')}
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-cyan-50/30 border border-blue-200/50">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm">{rec.text}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={() => navigate('/dashboard/interviews')} className="min-h-[44px] flex-1 shadow-clovely-sm">
          {t('interviews.results.backToInterviews')}
        </Button>
        <Button onClick={handleSave} variant="premium" className="min-h-[44px] flex-1 shadow-clovely-glow">
          {t('interviews.results.saveAndContinue')}
        </Button>
      </div>
    </div>
  );
}