import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useCVStore } from '@/store/useCVStore';
import { DailyJob } from '@/components/dashboard/DailyJob';
import { ProgressBar } from '@/components/dashboard/ProgressBar';
import { NotificationsBell } from '@/components/dashboard/NotificationsBell';
import { RecommendedResources } from '@/components/dashboard/RecommendedResources';
import { BillingStatusCard } from '@/components/dashboard/BillingStatusCard';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import { UpgradeModal } from '@/components/UpgradeModal';
import {
  Briefcase,
  FileText,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Compass,
  Mic,
  ChevronRight,
  Crown,
  Lock,
  Eye,
  Zap,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { getDashboardBasePath } from '@/lib/authRouting';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, isGuestMode } = useAuthStore();
  const { profile } = useProfileStore();
  const { cvs } = useCVStore();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [identityLoading, setIdentityLoading] = useState(!isGuestMode);
  const [identity, setIdentity] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadIdentity = async () => {
      if (isGuestMode) {
        setIdentity({ name: 'Usuario de Prueba', email: '' });
        setIdentityLoading(false);
        return;
      }

      setIdentityLoading(true);
      setIdentity(null);

      const { data, error } = await supabase.auth.getUser();
      const authUser = data.user;

      if (!isMounted) return;

      if (error || !authUser) {
        setIdentityLoading(false);
        return;
      }

      const fallbackName =
        authUser.user_metadata?.nombre ||
        authUser.user_metadata?.name ||
        authUser.email?.split('@')[0] ||
        'Usuario';

      const { data: profileData } = await supabase
        .from('profiles')
        .select('nombre, email')
        .eq('id', authUser.id)
        .maybeSingle();

      if (!isMounted) return;

      setIdentity({
        name: profileData?.nombre || fallbackName,
        email: profileData?.email || authUser.email || '',
      });
      setIdentityLoading(false);
    };

    void loadIdentity();

    return () => {
      isMounted = false;
    };
  }, [isGuestMode, user?.id]);

  const dashboardBasePath = getDashboardBasePath(
    user?.accessRole || (isGuestMode ? 'trial_user' : 'free_user'),
  );
  const userCV = cvs.find((cv) => cv.userId === user?.id);
  const cvCompletionScore = userCV?.score?.overall || 0;
  const interviewsPracticed = 0;
  const opportunitiesSaved = 0;

  const userPlan = isGuestMode ? 'trial' : user?.plan || 'free';
  const isTrial = userPlan === 'trial';
  const isFree = userPlan === 'free';
  const isPremium = userPlan === 'premium';

  const getRoleDisplayName = (role: string) => {
    const roleNames: Record<string, string> = {
      ux_designer: 'UX Designer',
      ui_designer: 'UI Designer',
      product_designer: 'Product Designer',
      developer_frontend: 'Frontend Developer',
      developer_backend: 'Backend Developer',
      developer_fullstack: 'Fullstack Developer',
      product_manager: 'Product Manager',
      data_analyst: 'Data Analyst',
      other: 'Sin definir',
    };
    return roleNames[role] || role;
  };

  const displayName = isTrial ? 'Usuario de Prueba' : identity?.name || user?.name || 'Usuario';
  const displayEmail = isTrial ? '' : identity?.email || user?.email || '';
  const firstName = displayName.split(' ')[0];
  const hasRole = !!profile?.rolActual && profile.rolActual !== 'other';
  const planLabel = isTrial ? 'Prueba' : isFree ? 'Free' : 'Pro';
  const planColor = isPremium
    ? 'bg-primary text-primary-foreground'
    : isTrial
      ? 'bg-primary/10 text-primary border-primary/20'
      : 'bg-muted text-muted-foreground';

  if (identityLoading && !isGuestMode) {
    return (
      <div
      <SEOHead title="Dashboard" description="Tu panel de control MoonJab. Gestiona tu CV, entrevistas y oportunidades laborales." path="/dashboard" noindex /> className="min-h-screen bg-background">
        <SEOHead title="Dashboard" description="Tu panel de control MoonJab. Gestiona CV, entrevistas y oportunidades." path="/dashboard" noindex />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm">Cargando tu dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pt-14 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight">{firstName}</h1>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 font-medium ${planColor}`}>
                  {isPremium && <Crown className="h-2.5 w-2.5 mr-0.5" />}
                  {planLabel}
                </Badge>
              </div>
              {!!displayEmail && <p className="text-xs text-muted-foreground mt-0.5">{displayEmail}</p>}
              <p className="text-xs text-muted-foreground mt-0.5">
                {isTrial
                  ? 'Entorno de prueba aislado'
                  : hasRole
                    ? getRoleDisplayName(profile.rolActual!)
                    : 'Completa tu diagnóstico para comenzar'}
              </p>
            </div>
          </div>
          <NotificationsBell />
        </motion.div>

        {isTrial && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.03 }}
            className="mb-6"
          >
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Estás en modo de prueba</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Explora la plataforma libremente. Tus datos son temporales y no afectan el sistema real.
                  </p>
                  <div className="flex gap-2 mt-2.5">
                    <Link to="/registro">
                      <Button size="sm" className="h-7 text-xs gap-1">
                        <Sparkles className="h-3 w-3" /> Crear cuenta gratis
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {isFree && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.03 }}
            className="mb-6"
          >
            <UpgradeBanner onUpgrade={() => setUpgradeModalOpen(true)} />
          </motion.div>
        )}

        {!hasRole && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mb-8"
          >
            <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Compass className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="font-semibold text-sm">
                    {isTrial ? 'Prueba el diagnóstico de carrera' : 'Descubre tu perfil profesional'}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Te recomendamos completar este diagnóstico para personalizar oportunidades, rutas de aprendizaje y
                    recomendaciones de carrera para ti.
                  </p>
                  <Link to="/onboarding">
                    <Button size="sm" variant={isTrial ? 'outline' : 'default'} className="h-8 text-xs mt-1 gap-1.5">
                      <Sparkles className="h-3 w-3" /> Iniciar diagnóstico
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-3 mb-8"
        >
          {[
            {
              icon: FileText,
              label: 'CV Builder',
              desc: isTrial ? 'Solo plantilla Harvard' : 'Crea tu CV',
              path: `${dashboardBasePath}/cvs`,
              locked: false,
            },
            {
              icon: Mic,
              label: 'Entrevistas',
              desc: isTrial ? 'No disponible en prueba' : 'Practica con IA',
              path: `${dashboardBasePath}/interviews`,
              locked: isTrial,
            },
            {
              icon: Briefcase,
              label: 'Oportunidades',
              desc: isTrial ? '5 vacantes de ejemplo' : isFree ? '5 por día' : 'Acceso completo',
              path: `${dashboardBasePath}/opportunities`,
              locked: false,
            },
          ].map((action) => (
            <Link key={action.path} to={action.locked ? '#' : action.path} className="group">
              <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                  action.locked
                    ? 'border-border/30 bg-muted/20 opacity-60 cursor-not-allowed'
                    : 'border-border/50 hover:border-primary/20 hover:bg-primary/[0.02]'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    action.locked ? 'bg-muted' : 'bg-primary/10 group-hover:bg-primary/15'
                  }`}
                >
                  {action.locked ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <action.icon className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${action.locked ? '' : 'group-hover:text-primary'} transition-colors`}>
                    {action.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{action.desc}</p>
                </div>
                {!action.locked && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                )}
              </div>
            </Link>
          ))}
        </motion.div>

        {isFree && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="mb-6"
          >
            <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium">Límites del plan Free</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    5 oportunidades/día · Plantillas limitadas · Sin análisis IA avanzado
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-primary"
                  onClick={() => setUpgradeModalOpen(true)}
                >
                  Ver Pro
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
              <DailyJob />
            </motion.div>
            {hasRole && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="rounded-xl border border-border/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <RotateCcw className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Actualizar diagnóstico</p>
                        <p className="text-[11px] text-muted-foreground">
                          Rol actual: {getRoleDisplayName(profile?.rolActual!)}
                        </p>
                      </div>
                    </div>
                    <Link to="/onboarding">
                      <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-primary hover:text-primary">
                        Rehacer <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
              <ProgressBar
                cvCompleted={cvCompletionScore}
                interviewsPracticed={interviewsPracticed}
                opportunitiesSaved={opportunitiesSaved}
              />
            </motion.div>
            {!isGuestMode && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.22 }}
              >
                <BillingStatusCard />
              </motion.div>
            )}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }}>
              <RecommendedResources role={profile?.rolActual} />
            </motion.div>
          </div>
        </div>

        <UpgradeModal open={upgradeModalOpen} onClose={() => setUpgradeModalOpen(false)} onStartTrial={async () => {}} />
      </div>
    </div>
  );
};

export default Dashboard;
