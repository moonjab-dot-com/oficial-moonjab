import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, FileText, Crown, Rocket, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NextActionCardProps {
  hasCV: boolean;
  cvId?: string;
  cvScore: number;
  isPremium: boolean;
  isTrial: boolean;
  dashboardBasePath: string;
  onUpgrade: () => void;
}

/**
 * Single high-conversion "what to do next" CTA.
 * Always answers: "What should the user do RIGHT NOW?"
 */
export const NextActionCard = ({
  hasCV,
  cvId,
  cvScore,
  isPremium,
  isTrial,
  dashboardBasePath,
  onUpgrade,
}: NextActionCardProps) => {
  // Decision tree → exactly ONE next action
  let icon = Rocket;
  let title = 'Crea tu CV en 2 minutos';
  let subtitle = 'El primer paso para destacar frente a recruiters.';
  let ctaLabel = 'Empezar ahora';
  let ctaHref: string | null = `${dashboardBasePath}/cvs/new`;
  let onClick: (() => void) | undefined;
  let badge = 'Paso 1 · 2 min';
  let progress: number | null = null;

  if (hasCV && cvScore < 70) {
    icon = FileText;
    title = `Completa tu CV (${cvScore}% listo)`;
    subtitle = 'Estás a unos campos de tener un CV profesional.';
    ctaLabel = 'Continuar mi CV';
    ctaHref = cvId ? `${dashboardBasePath}/cvs/${cvId}` : `${dashboardBasePath}/cvs`;
    badge = `${100 - cvScore}% restante`;
    progress = cvScore;
  } else if (hasCV && cvScore >= 70 && !isPremium && !isTrial) {
    icon = Crown;
    title = '¡Tu CV está listo! Hazlo destacar';
    subtitle = 'Desbloquea la plantilla Harvard exclusiva por $5/mes.';
    ctaLabel = 'Desbloquear Premium';
    ctaHref = null;
    onClick = onUpgrade;
    badge = 'Recomendado';
    progress = cvScore;
  } else if (hasCV && isPremium) {
    icon = CheckCircle2;
    title = 'Sigue mejorando tu CV';
    subtitle = 'Practica entrevistas con IA y prepárate para tu próxima oferta.';
    ctaLabel = 'Practicar entrevista';
    ctaHref = `${dashboardBasePath}/interviews`;
    badge = 'Premium';
    progress = cvScore;
  }

  const Icon = icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-5 sm:p-6 shadow-lg"
    >
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-md">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
              {subtitle}
            </p>
            {progress !== null && (
              <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 sm:self-center">
          {ctaHref ? (
            <Link to={ctaHref}>
              <Button size="lg" className="w-full sm:w-auto gap-2 font-semibold shadow-md">
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button size="lg" onClick={onClick} className="w-full sm:w-auto gap-2 font-semibold shadow-md">
              <Sparkles className="h-4 w-4" /> {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
