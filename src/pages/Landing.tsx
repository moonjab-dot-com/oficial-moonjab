import { SEOHead } from '@/components/SEOHead';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link, Navigate } from 'react-router-dom';
import {
  ArrowRight, Star, Instagram, CheckCircle, Compass, BarChart3,
  FileText, MessageSquare, Target, TrendingUp, Shield,
  Users, ChevronRight, Zap, ArrowUpRight, Layers, Award,
  GraduationCap, Sparkles, LineChart, Rocket,
  Eye, BookOpen, Check, Mic, Menu, X } from
'lucide-react';
import { OfficialLogo } from '@/components/OfficialLogo';
import { useRef, useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/LanguageToggle';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease }
  })
};

const MobileNavMenu = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const handler = () => setOpen(prev => !prev);
    document.addEventListener('toggle-mobile-nav', handler);
    return () => document.removeEventListener('toggle-mobile-nav', handler);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[280px] p-6 pt-12">
        <nav className="flex flex-col gap-4">
          <a href="#features" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2">{t('nav.features')}</a>
          <a href="#how" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2">{t('nav.howItWorks')}</a>
          <a href="#pricing" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2">{t('nav.pricing')}</a>
          <div className="border-t border-border/40 pt-4 mt-2 space-y-3">
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full h-10 text-sm">{t('nav.login')}</Button>
            </Link>
            <Link to="/registro" onClick={() => setOpen(false)}>
              <Button className="w-full h-10 text-sm">{t('nav.start')}</Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const Landing = () => {
  return <LandingContent />;
};

const LandingContent = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const stats = [
    { value: '10K+', label: t('landing.stats.professionals'), icon: Users },
    { value: '87%', label: t('landing.stats.getJobs'), icon: TrendingUp },
    { value: '4.9', label: t('landing.stats.satisfaction'), icon: Star },
    { value: '15+', label: t('landing.stats.countries'), icon: Compass },
  ];

  const steps = [
    { num: '01', icon: Compass, title: t('landing.how.step1Title'), desc: t('landing.how.step1Desc') },
    { num: '02', icon: FileText, title: t('landing.how.step2Title'), desc: t('landing.how.step2Desc') },
    { num: '03', icon: Target, title: t('landing.how.step3Title'), desc: t('landing.how.step3Desc') },
  ];

  const testimonials = [
    { name: t('landing.testimonials.t1Name'), role: t('landing.testimonials.t1Role'), text: t('landing.testimonials.t1Text') },
    { name: t('landing.testimonials.t2Name'), role: t('landing.testimonials.t2Role'), text: t('landing.testimonials.t2Text') },
    { name: t('landing.testimonials.t3Name'), role: t('landing.testimonials.t3Role'), text: t('landing.testimonials.t3Text') },
  ];

  const cvTags = t('landing.features.cv.tags', { returnObjects: true }) as string[];
  
  const cvPoints = t('landing.deepDive.cvPoints', { returnObjects: true }) as string[];
  const interviewPoints = t('landing.deepDive.interviewPoints', { returnObjects: true }) as string[];
  const guestFeatures = t('landing.pricing.guestFeatures', { returnObjects: true }) as string[];
  const proFeatures = t('landing.pricing.proFeatures', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title="MoonJab — Plataforma de Empleabilidad con IA | CV, Entrevistas y Oportunidades"
        description="Crea tu CV optimizado para ATS, practica entrevistas con IA y encuentra oportunidades laborales en LATAM. La plataforma #1 de empleabilidad con inteligencia artificial."
        path="/"
      />
      {/* ── Navbar ── */}
      <MobileNavMenu />
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <OfficialLogo size="md" to="/" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{t('nav.features')}</a>
            <a href="#how" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{t('nav.howItWorks')}</a>
            <a href="#pricing" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{t('nav.pricing')}</a>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link to="/login" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="text-[13px] h-8">{t('nav.login')}</Button>
            </Link>
            <Link to="/registro" className="hidden sm:inline-flex">
              <Button size="sm" className="text-[13px] h-8 px-4">{t('nav.start')}</Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={() => document.dispatchEvent(new CustomEvent('toggle-mobile-nav'))}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] text-xs font-medium text-primary mb-8">
              <Sparkles className="h-3 w-3" />
              {t('landing.badge')}
            </div>
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-[clamp(2rem,5.5vw,3.5rem)] font-bold leading-[1.08] tracking-tight mb-6">
            {t('landing.heroTitle1')}
            <span className="relative">
              <span className="gradient-text">{t('landing.heroHighlight')}</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
            {t('landing.heroSubtitle')}
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/registro">
              <Button size="lg" className="h-12 px-7 text-sm font-semibold gap-2 shadow-clovely-md">
                {t('landing.ctaStart')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/guest-start">
              <Button variant="outline" size="lg" className="h-12 px-7 text-sm font-medium gap-2">
                <Eye className="h-4 w-4" />
                {t('landing.ctaTry')}
              </Button>
            </Link>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="flex items-center justify-center gap-5 text-xs text-muted-foreground mt-8">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> {t('landing.checkGuest')}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> {t('landing.checkCancel')}
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Product Preview ── */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent blur-2xl opacity-60 pointer-events-none" />
            <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-clovely-xl bg-card">
              <div className="bg-muted/40 px-4 py-2.5 border-b border-border/30 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-0.5 rounded-md bg-muted/60 text-[10px] text-muted-foreground font-mono">moonjab.com</div>
                </div>
              </div>
              <video autoPlay loop muted playsInline className="w-full h-auto">
                <source src="/moonjab-hero-video.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Social Proof Strip ── */}
      <section className="py-12 border-y border-border/30">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="flex flex-col items-center gap-1">
                <stat.icon className="h-4 w-4 text-primary/60 mb-1" />
                <p className="text-2xl sm:text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Features Bento ── */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">{t('landing.features.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Large card — CV */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 hover:shadow-clovely-lg transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t('landing.features.cv.title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">{t('landing.features.cv.description')}</p>
                <div className="flex flex-wrap gap-2">
                  {cvTags.map((tag) =>
                    <span key={tag} className="px-2.5 py-1 text-[11px] rounded-md bg-primary/[0.06] text-primary font-medium">{tag}</span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Small card — Diagnostic */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 hover:shadow-clovely-lg transition-all duration-500">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('landing.features.diagnostic.title')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('landing.features.diagnostic.description')}</p>
            </motion.div>

            {/* Small card — Interview */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 hover:shadow-clovely-lg transition-all duration-500">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <Mic className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('landing.features.interview.title')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('landing.features.interview.description')}</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="py-24 sm:py-32 bg-muted/30 border-y border-border/30">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">{t('landing.how.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t('landing.how.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            {steps.map((step, i) =>
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="relative text-center">
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-card border border-border/50 shadow-clovely-sm flex items-center justify-center mx-auto mb-5">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">{step.num}</span>
                <h3 className="font-bold text-lg mt-1.5 mb-2.5">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Feature Deep Dives ── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 space-y-28">
          {/* CV Deep Dive */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-[0.15em]">
                <FileText className="h-3.5 w-3.5" />
                {t('landing.deepDive.cvLabel')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">{t('landing.deepDive.cvTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('landing.deepDive.cvDesc')}</p>
              <ul className="space-y-3 pt-1">
                {cvPoints.map((point, j) =>
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {point}
                  </li>
                )}
              </ul>
            </div>
            <div>
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-card to-muted/50 border border-border/40 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-3 w-32 rounded bg-primary/15" />
                  <div className="h-2.5 w-full rounded bg-muted" />
                  <div className="h-2.5 w-4/5 rounded bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-20 rounded bg-primary/20" />
                  <div className="h-2 w-full rounded bg-muted/80" />
                  <div className="h-2 w-3/4 rounded bg-muted/80" />
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 rounded-md bg-primary/10 text-[10px] text-primary font-medium">ATS Score: 92%</div>
                  <div className="px-3 py-1.5 rounded-md bg-muted text-[10px] text-muted-foreground">PDF Ready</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interview Deep Dive */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-5 md:order-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-[0.15em]">
                <MessageSquare className="h-3.5 w-3.5" />
                {t('landing.deepDive.interviewLabel')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">{t('landing.deepDive.interviewTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('landing.deepDive.interviewDesc')}</p>
              <ul className="space-y-3 pt-1">
                {interviewPoints.map((point, j) =>
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {point}
                  </li>
                )}
              </ul>
            </div>
            <div className="md:order-1">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-card to-muted/50 border border-border/40 p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                    <Mic className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-[11px] font-medium text-foreground/70">{t('landing.deepDive.interviewerAI')}</div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="bg-muted/60 rounded-lg p-3 max-w-[80%]">
                    <div className="h-2 w-full rounded bg-foreground/10" />
                    <div className="h-2 w-3/4 rounded bg-foreground/10 mt-1.5" />
                  </div>
                  <div className="bg-primary/[0.08] rounded-lg p-3 max-w-[75%] ml-auto">
                    <div className="h-2 w-full rounded bg-primary/20" />
                    <div className="h-2 w-2/3 rounded bg-primary/20 mt-1.5" />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-primary/40" />
                  </div>
                  <span className="text-[10px] text-primary font-medium">75%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 sm:py-32 bg-muted/30 border-y border-border/30">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">{t('landing.testimonials.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t('landing.testimonials.title')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((tt, i) =>
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="p-6 rounded-2xl border border-border/40 bg-card hover:shadow-clovely-md transition-all duration-300 group">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) =>
                    <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                  )}
                </div>
                <p className="text-sm leading-relaxed text-foreground/80 mb-6">&ldquo;{tt.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{tt.name[0]}</div>
                  <div>
                    <p className="font-medium text-sm">{tt.name}</p>
                    <p className="text-xs text-muted-foreground">{tt.role}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">{t('landing.pricing.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t('landing.pricing.title')}</h2>
            <p className="text-muted-foreground max-w-md mx-auto">{t('landing.pricing.subtitle')}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {/* Free / Guest */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="rounded-2xl border border-border/40 bg-card p-7">
              <p className="text-sm font-semibold mb-1">{t('landing.pricing.guestMode')}</p>
              <p className="text-xs text-muted-foreground mb-5">{t('landing.pricing.guestDesc')}</p>
              <p className="text-3xl font-bold mb-1">$0</p>
              <p className="text-xs text-muted-foreground mb-6">{t('landing.pricing.forever')}</p>
              <ul className="space-y-2.5 mb-7">
                {guestFeatures.map((f) =>
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-muted-foreground/60 flex-shrink-0" />
                    {f}
                  </li>
                )}
              </ul>
              <Link to="/guest-start" className="block">
                <Button variant="outline" className="w-full h-10 text-sm">{t('landing.pricing.tryFree')}</Button>
              </Link>
            </motion.div>

            {/* Pro */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="rounded-2xl border-2 border-primary/30 bg-card p-7 relative shadow-clovely-md">
              <div className="absolute -top-3 left-7 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                {t('landing.pricing.recommended')}
              </div>
              <p className="text-sm font-semibold mb-1">Pro</p>
              <p className="text-xs text-muted-foreground mb-5">{t('landing.pricing.proDesc')}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <p className="text-3xl font-bold">$5</p>
                <span className="text-sm text-muted-foreground">/mes</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">{t('landing.pricing.billedMonthly')}</p>
              <ul className="space-y-2.5 mb-7">
                {proFeatures.map((f) =>
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    {f}
                  </li>
                )}
              </ul>
              <Link to="/registro" className="block">
                <Button className="w-full h-10 text-sm font-semibold gap-2 shadow-clovely-sm">
                  {t('landing.pricing.startNow')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 sm:py-32 bg-muted/30 border-t border-border/30">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t('landing.cta.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">{t('landing.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link to="/registro">
                <Button size="lg" className="h-12 px-8 text-sm font-semibold gap-2 shadow-clovely-md">
                  {t('landing.cta.createAccount')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/guest-start">
                <Button variant="outline" size="lg" className="h-12 px-8 text-sm gap-2">
                  {t('landing.cta.tryAndPass')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 border-t border-border/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <OfficialLogo size="md" animated={false} />
              <p className="text-xs text-muted-foreground">{t('landing.footer.tagline')}</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <Link to="/pricing" className="hover:text-foreground transition-colors">{t('landing.footer.pricing')}</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">{t('landing.footer.about')}</Link>
              <Link to="/blog" className="hover:text-foreground transition-colors">{t('landing.footer.blog')}</Link>
              <Link to="/help" className="hover:text-foreground transition-colors">{t('landing.footer.help')}</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">{t('landing.footer.privacy')}</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">{t('landing.footer.terms')}</Link>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/20">
            <p className="text-[11px] text-muted-foreground">{t('landing.footer.rights')}</p>
            <a href="https://www.instagram.com/trymoonjab" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
