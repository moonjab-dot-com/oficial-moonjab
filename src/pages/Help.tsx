import { SEOHead } from '@/components/SEOHead';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { OfficialLogo } from '@/components/OfficialLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, Mail, FileText, Target, Sparkles, HelpCircle, ArrowRight, BookOpen, Video, Users } from 'lucide-react';
import { ElevenLabsWidget } from '@/components/help/ElevenLabsWidget';

const Help = () => {
  const { t } = useTranslation();

  const categories = [
    { icon: Target, titleKey: 'help.categories.careerDiagnosis', descKey: 'help.categories.careerDiagnosisDesc', articles: 5 },
    { icon: FileText, titleKey: 'help.categories.cvCreation', descKey: 'help.categories.cvCreationDesc', articles: 8 },
    { icon: Sparkles, titleKey: 'help.categories.interviewSim', descKey: 'help.categories.interviewSimDesc', articles: 6 },
    { icon: Users, titleKey: 'help.categories.accountBilling', descKey: 'help.categories.accountBillingDesc', articles: 10 },
  ];

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

  const resources = [
    { icon: BookOpen, titleKey: 'help.resources.guides', descKey: 'help.resources.guidesDesc', href: '/blog' },
    { icon: Video, titleKey: 'help.resources.videos', descKey: 'help.resources.videosDesc', href: '#' },
    { icon: Users, titleKey: 'help.resources.community', descKey: 'help.resources.communityDesc', href: '#' },
  ];

  const openElevenLabsWidget = () => {
    const widget = document.querySelector('elevenlabs-convai');
    if (widget?.shadowRoot) {
      const button = widget.shadowRoot.querySelector('button');
      if (button) button.click();
    }
  };

  return (
    <div
      <SEOHead title="Centro de Ayuda" description="¿Necesitas ayuda con MoonJab? Encuentra respuestas a preguntas frecuentes y contacta a nuestro equipo de soporte." path="/help" /> className="min-h-screen bg-background">
        <SEOHead title="Centro de Ayuda" description="¿Necesitas ayuda con MoonJab? Preguntas frecuentes y soporte." path="/help" />
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <OfficialLogo size="lg" to="/" />
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              {t('help.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-10">{t('help.subtitle')}</p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder={t('help.searchPlaceholder')} className="h-14 pl-14 pr-6 text-lg rounded-2xl border-2 focus:border-primary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('help.browseByCategory')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <cat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{t(cat.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t(cat.descKey)}</p>
                  <p className="text-xs text-primary font-medium">{cat.articles} {t('common.articles')}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">{t('help.faqTitle')}</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqKeys.map((key, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <AccordionItem value={`item-${i}`} className="bg-background rounded-xl px-6 border shadow-sm">
                  <AccordionTrigger className="text-left font-medium py-5 hover:no-underline">
                    {t(`help.faqs.${key}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {t(`help.faqs.a${key.slice(1)}`)}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">{t('help.moreResources')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((res, i) => (
              <Link key={i} to={res.href}>
                <Card className="p-6 hover:shadow-lg hover:border-primary/50 transition-all group h-full text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <res.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{t(res.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(res.descKey)}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('help.notFound')}</h2>
            <p className="text-muted-foreground">{t('help.notFoundDesc')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('help.contact.liveChat')}</h3>
              <p className="text-muted-foreground mb-6">{t('help.contact.liveChatDesc')}</p>
              <Button className="w-full" onClick={openElevenLabsWidget}>
                {t('help.contact.startChat')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('help.contact.email')}</h3>
              <p className="text-muted-foreground mb-6">{t('help.contact.emailDesc')}</p>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:moonjab.com@gmail.com">moonjab.com@gmail.com</a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-6 text-center">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('common.backToHome')}
          </Link>
        </div>
      </footer>
      
      <ElevenLabsWidget />
    </div>
  );
};

export default Help;