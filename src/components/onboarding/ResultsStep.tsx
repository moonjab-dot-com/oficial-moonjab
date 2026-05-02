import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, TrendingUp, Target, Lightbulb, Award } from 'lucide-react';
import { DynamicIcon } from '@/components/DynamicIcon';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { RIASECResult, getHollandCodeInterpretation } from '@/lib/riasecScoring';
import { RIASEC_TYPE_INFO, RIASECType } from '@/lib/riasecQuestions';

interface ResultsStepProps {
  onComplete: () => void;
  riasecResult: RIASECResult | null;
  values?: string[];
  experience?: string;
}

const LOADING_MESSAGES = [
  'Analizando tu perfil RIASEC...',
  'Calculando tu código Holland...',
  'Identificando carreras compatibles...',
  'Preparando recomendaciones personalizadas...',
];

export const ResultsStep = ({ onComplete, riasecResult, values = [], experience = '' }: ResultsStepProps) => {
  const [loading, setLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Prepare radar data from RIASEC scores
  const radarData = riasecResult ? Object.entries(riasecResult.percentages).map(([type, value]) => ({
    skill: RIASEC_TYPE_INFO[type as RIASECType].name,
    value,
    fullMark: 100,
  })) : [];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 750);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setLoading(false);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center space-y-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <h2 className="text-2xl font-heading font-bold">
            {LOADING_MESSAGES[messageIndex]}
          </h2>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">{progress}% completado</p>
        </div>
      </div>
    );
  }

  if (!riasecResult) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Error al cargar resultados</h2>
        <Button onClick={onComplete}>Continuar al dashboard</Button>
      </div>
    );
  }

  const topType = riasecResult.topTypes[0];
  const typeInfo = RIASEC_TYPE_INFO[topType.type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Header with Holland Code */}
      <div className="text-center space-y-4">
        <div className="flex justify-center gap-2">
          {riasecResult.hollandCode.split('').map((letter, i) => (
            <Badge 
              key={i} 
              className="text-lg px-4 py-2 bg-primary text-primary-foreground"
            >
              <DynamicIcon name={RIASEC_TYPE_INFO[letter as RIASECType].icon} size={16} className="inline mr-1" /> {letter}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold">
          Tu código Holland: {riasecResult.hollandCode}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <DynamicIcon name={typeInfo.icon} size={18} className="inline mr-1" /> Perfil principal: <strong>{typeInfo.name}</strong> — {typeInfo.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* RIASEC Radar Chart */}
        <Card className="p-6">
          <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Perfil RIASEC
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
              />
              <Radar
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
          
          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {riasecResult.topTypes.map((item) => (
              <div key={item.type} className="flex items-center gap-2 text-sm">
                <span><DynamicIcon name={RIASEC_TYPE_INFO[item.type].icon} size={16} /></span>
                <span className="flex-1">{RIASEC_TYPE_INFO[item.type].name}</span>
                <span className="font-semibold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Compatible Careers */}
        <Card className="p-6">
          <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Carreras más compatibles
          </h3>
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
            {riasecResult.compatibleRoles.slice(0, 8).map((career, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{career.role}</span>
                  </div>
                  <Badge 
                    variant={career.compatibility >= 80 ? "default" : career.compatibility >= 60 ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {career.compatibility}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{career.description}</p>
                <Progress value={career.compatibility} className="h-1.5 mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Interpretation */}
      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Interpretación de tu perfil
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {getHollandCodeInterpretation(riasecResult.hollandCode)}
        </p>
        
        {values.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Tus valores:</strong> {values.join(', ')}
            </p>
          </div>
        )}
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-heading font-bold text-lg mb-3">
          🎯 Tus próximos pasos
        </h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary font-bold">1.</span>
            <span>Completa tu CV optimizado para <strong>{riasecResult.compatibleRoles[0]?.role}</strong></span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary font-bold">2.</span>
            <span>Practica entrevistas con nuestro simulador IA</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-primary font-bold">3.</span>
            <span>Mejora tu CV alineado a tu perfil {riasecResult.hollandCode}</span>
          </li>
        </ul>

        <Button
          size="lg"
          className="w-full"
          onClick={onComplete}
        >
          Ir a mi dashboard <Sparkles className="ml-2 h-5 w-5" />
        </Button>
      </Card>
    </motion.div>
  );
};
