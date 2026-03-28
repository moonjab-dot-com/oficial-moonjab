import { SEOHead } from '@/components/SEOHead';
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Loader2, ChevronRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "@/store/useInterviewStore";
import { useToast } from "@/hooks/use-toast";
import { VideoRecorder } from "@/components/interview/VideoRecorder";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from 'react-i18next';

type ResponseMode = 'text' | 'video';

export default function InterviewSession() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentSession, getNextQuestion, submitResponse, isAnalyzing, endSession, questionBank } = useInterviewStore();
  
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(getNextQuestion());
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [responseMode, setResponseMode] = useState<ResponseMode>('text');

  useEffect(() => {
    const savedMode = localStorage.getItem('moonjab_interview_response_mode') as ResponseMode;
    if (savedMode && (savedMode === 'text' || savedMode === 'video')) {
      setResponseMode(savedMode);
    }
  }, []);

  useEffect(() => {
    if (!currentSession) {
      navigate('/dashboard/interviews');
      return;
    }
  }, [currentSession, navigate]);

  if (!currentSession) return null;

  const totalQuestions = questionBank.length || 10;
  const answeredCount = currentSession.responses.length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleSubmit = async () => {
    if (!answer.trim()) {
      toast({
        title: t('interviews.session.emptyAnswer'),
        description: t('interviews.session.emptyAnswerDesc'),
        variant: "destructive",
      });
      return;
    }

    await submitResponse(answer);
    setAnswer("");
    
    const nextQ = getNextQuestion();
    if (nextQ) {
      setCurrentQuestion(nextQ);
    } else {
      endSession();
      navigate('/dashboard/interviews/results');
    }
  };

  const handleVideoComplete = useCallback(async (blob: Blob) => {
    setIsTranscribing(true);
    
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
      });
      reader.readAsDataURL(blob);
      const base64Audio = await base64Promise;

      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { 
          audio: base64Audio,
          mimeType: blob.type || 'video/webm'
        }
      });

      if (error) throw error;

      if (data?.text) {
        setAnswer(data.text);
        toast({
          title: t('interviews.session.transcriptionComplete'),
          description: t('interviews.session.transcriptionCompleteDesc'),
        });
      } else if (data?.message) {
        toast({
          title: t('interviews.session.recordingSaved'),
          description: data.message,
        });
      }
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: t('interviews.session.transcriptionError'),
        description: t('interviews.session.transcriptionErrorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsTranscribing(false);
    }
  }, [toast, t]);

  const isLoading = isAnalyzing || isTranscribing;

  return (
    <div
      <SEOHead title="Sesión de Entrevista" description="Practica tu entrevista en tiempo real con feedback de IA." path="/interview-session" noindex /> className="container max-w-4xl py-6 sm:py-8 space-y-4 sm:space-y-6">
        <SEOHead title="Sesión de Entrevista" description="Practica tu entrevista en tiempo real con feedback de IA." path="/interview-session" noindex />
      {/* Progress */}
      <Card className="p-4 sm:p-6 space-y-3 rounded-2xl shadow-clovely-lg border-2 border-primary/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t('interviews.session.progress')}</span>
          <span className="font-medium">{answeredCount} / {totalQuestions} {t('interviews.session.questions')}</span>
        </div>
        <Progress value={progress} className="h-4 sm:h-5 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-primary-warm" />
      </Card>

      {/* Question */}
      <Card className="p-5 sm:p-8 space-y-5 sm:space-y-6 rounded-xl bg-gradient-to-br from-card to-primary/[0.02] shadow-clovely-md border-2">
        <div className="space-y-3">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary-warm/10 border-2 border-primary/20 text-primary text-sm font-medium">
            {t('interviews.session.question')} {answeredCount + 1}
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold leading-relaxed">
            {currentQuestion?.text}
          </h2>
          {currentQuestion?.sampleAnswer && (
            <details className="text-sm text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground transition-colors">
                {t('interviews.session.sampleAnswer')}
              </summary>
              <p className="mt-2 pl-4 border-l-2 border-primary/30 bg-muted/50 p-3 rounded-r-lg">
                {currentQuestion.sampleAnswer}
              </p>
            </details>
          )}
        </div>

        {/* Response Area */}
        <div className="space-y-3">
          {responseMode === 'video' ? (
            <div className="space-y-4">
              <VideoRecorder 
                onRecordingComplete={handleVideoComplete}
                disabled={isLoading}
              />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {answer ? t('interviews.session.transcription') : `${t('interviews.session.yourAnswer')}:`}
                </p>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={6}
                  disabled={isLoading}
                  className="resize-none rounded-xl shadow-clovely-sm"
                  placeholder={t('interviews.session.writeOrRecord')}
                />
                <p className="text-xs text-muted-foreground">
                  {t('interviews.session.writeOrEdit')}
                </p>
              </div>
              
              {isTranscribing && (
                <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('interviews.session.processingRecording')}</span>
                </div>
              )}
            </div>
          ) : (
            <>
              <Textarea
                placeholder={t('interviews.session.answerPlaceholder')}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={10}
                disabled={isLoading}
                className="resize-none min-h-[200px] sm:min-h-[240px] rounded-xl shadow-clovely-sm focus-visible:shadow-clovely-md focus-visible:ring-primary/20 transition-all duration-300"
              />
              <p className="text-sm text-muted-foreground bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                {t('interviews.session.starTip')}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => {
              if (confirm(t('interviews.session.exitConfirm'))) {
                navigate('/dashboard/interviews');
              }
            }}
            disabled={isLoading}
            className="min-h-[44px] w-full sm:w-auto shadow-clovely-sm"
          >
            {t('interviews.session.exit')}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !answer.trim()} 
            variant="premium" 
            className="min-h-[44px] flex-1 shadow-clovely-glow"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isTranscribing ? t('interviews.session.processing') : t('interviews.session.analyzing')}
              </>
            ) : answeredCount === totalQuestions - 1 ? (
              <>
                {t('interviews.session.finalize')} <CheckCircle2 className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                {t('interviews.session.next')} <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Recent feedback */}
      {currentSession.responses.length > 0 && (
        <Card className="p-4 sm:p-6 space-y-4 rounded-xl border-2 shadow-clovely-md">
          <h3 className="font-semibold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
            {t('interviews.session.lastFeedback')}
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground p-4 rounded-lg bg-muted/50">
              {currentSession.responses[currentSession.responses.length - 1].feedbackText}
            </p>
            
            {currentSession.responses[currentSession.responses.length - 1].scores && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 pt-3 border-t">
                {Object.entries(currentSession.responses[currentSession.responses.length - 1].scores).map(([key, value]) => (
                  <div key={key} className="text-center p-2 sm:p-3 rounded-xl bg-gradient-to-br from-primary/5 to-primary-warm/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground capitalize mb-1">{key}</p>
                    <p className="text-base sm:text-lg font-semibold text-primary">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}