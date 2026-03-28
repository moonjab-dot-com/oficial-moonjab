import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic } from "lucide-react";
import { SEOHead } from '@/components/SEOHead';

// ElevenLabs ConvAI widget declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'agent-id': string },
        HTMLElement
      >;
    }
  }
}

const INTERVIEWER_AGENT_ID = 'agent_3401kkqgpk2henytrnm4tay22xje';

export default function InterviewAI() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      <SEOHead title="Entrevista IA" description="Sesión de entrevista con inteligencia artificial en MoonJab." path="/interview-ai" noindex /> className="container max-w-4xl py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/dashboard/interviews')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{t('interview.ai.title', 'Entrevista con IA')}</h1>
          <p className="text-muted-foreground">
            {t('interview.ai.subtitle', 'Practica con nuestro entrevistador de voz')}
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card className="p-8 rounded-2xl shadow-lg border">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Mic className="w-10 h-10 text-primary" />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              {t('interview.ai.ready', 'Tu entrevistador está listo')}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t('interview.ai.instructions', 'Haz clic en el botón de abajo para iniciar la llamada. El entrevistador te guiará durante toda la sesión.')}
            </p>
          </div>

          {/* ElevenLabs Widget - Always visible */}
          <div className="py-6">
            <elevenlabs-convai agent-id={INTERVIEWER_AGENT_ID} />
          </div>

          {/* Tips */}
          <div className="bg-muted/50 rounded-xl p-4 text-left max-w-md mx-auto">
            <p className="text-sm font-medium mb-2">💡 {t('interview.ai.tips', 'Tips')}:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {t('interview.ai.tip1', 'Habla con claridad y naturalidad')}</li>
              <li>• {t('interview.ai.tip2', 'Responde como en una entrevista real')}</li>
              <li>• {t('interview.ai.tip3', 'El entrevistador te hará todas las preguntas')}</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
