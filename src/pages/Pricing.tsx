import { SEOHead } from '@/components/SEOHead';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OfficialLogo } from '@/components/OfficialLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Zap, Sparkles, Loader2, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { useSubscription, MOONJAB_PRO } from '@/hooks/useSubscription';

const Pricing = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { subscribed, productId, openPortal } = useSubscription();

  const isProActive = subscribed && productId === MOONJAB_PRO.product_id;

  const handleSubscribe = () => {
    if (isProActive) return;
    navigate('/payment');
  };

  const handleManage = async () => {
    setLoading(true);
    try {
      await openPortal();
    } catch {
      toast.error(t('pricing.portalError'));
    } finally {
      setLoading(false);
    }
  };

  const guestFeatures = t('pricing.guestFeatures', { returnObjects: true }) as string[];
  const proFeatures = t('pricing.proFeatures', { returnObjects: true }) as string[];

  const plans = [
    {
      name: t('pricing.guestMode'),
      icon: Zap,
      price: '$0',
      period: '',
      description: t('pricing.guestDesc'),
      features: guestFeatures,
      cta: t('pricing.tryFree'),
      action: () => { window.location.href = '/guest-start'; },
      popular: false,
    },
    {
      name: t('pricing.proName'),
      icon: Sparkles,
      price: '$15',
      period: t('pricing.perMonth'),
      description: t('pricing.proDesc'),
      features: proFeatures,
      cta: isProActive ? t('pricing.currentPlan') : t('pricing.proSubscribe'),
      action: isProActive ? handleManage : handleSubscribe,
      popular: true,
    },
  ];

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-5xl">
          <OfficialLogo size="md" to="/" />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {isProActive ? (
              <Button size="sm" variant="outline" className="h-8 text-sm gap-1" onClick={handleManage} disabled={loading}>
                <Crown className="h-3.5 w-3.5" /> {t('pricing.managePlan')}
              </Button>
            ) : (
              <Button size="sm" className="h-8 text-sm" onClick={handleSubscribe} disabled={loading}>
                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : t('pricing.subscribe')}
              </Button>
            )}
          </div>
        </div>
      </nav>

      <SEOHead title="Planes y Precios" description="Compara los planes de MoonJab. Modo invitado gratuito o Plan Pro a $15/mes con CV ilimitados, entrevistas con IA y oportunidades exclusivas." path="/pricing" />
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{t('pricing.title')}</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">{t('pricing.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className={plan.popular ? 'lg:-mt-3' : ''}>
                <div className={`p-6 h-full rounded-xl border transition-all duration-200 flex flex-col ${
                  plan.popular ? 'border-primary/30 bg-primary/[0.02] shadow-clovely-md' : 'border-border/50 hover:border-primary/15'
                }`}>
                  {plan.popular && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium mb-4 w-fit">
                      {isProActive ? <Crown className="h-2.5 w-2.5" /> : <Sparkles className="h-2.5 w-2.5" />}
                      {isProActive ? t('pricing.yourCurrentPlan') : t('pricing.recommended')}
                    </div>
                  )}
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center mb-4">
                    <plan.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-0.5">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-0.5 mb-5">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full h-9 text-sm" variant={plan.popular && !isProActive ? 'default' : 'outline'}
                    onClick={plan.action} disabled={plan.popular && loading}>
                    {plan.popular && loading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> :
                      plan.popular && isProActive ? <Crown className="h-3.5 w-3.5 mr-2" /> : null}
                    {plan.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-border/40">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-xl font-semibold text-center mb-8">{t('pricing.faqTitle')}</h2>
          <div className="space-y-3">
            {faqKeys.map((key, i) => (
              <div key={i} className="p-4 rounded-lg border border-border/40 hover:border-primary/10 transition-colors">
                <h3 className="font-medium text-sm mb-1">{t(`pricing.faqs.${key}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`pricing.faqs.a${key.slice(1)}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isProActive && (
        <section className="py-16">
          <div className="container mx-auto px-6 text-center max-w-lg">
            <h2 className="text-2xl font-bold mb-3 tracking-tight">{t('pricing.ctaTitle')}</h2>
            <p className="text-muted-foreground mb-5">{t('pricing.ctaDesc')}</p>
            <Button className="h-10 px-6 text-sm gap-2" onClick={handleSubscribe} disabled={loading}>
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <>{t('pricing.subscribe')} <ArrowRight className="h-3.5 w-3.5" /></>}
            </Button>
          </div>
        </section>
      )}

      <footer className="py-6 border-t border-border/40">
        <div className="container mx-auto px-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> {t('pricing.backToHome')}
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;