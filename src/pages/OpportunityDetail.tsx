import { SEOHead } from '@/components/SEOHead';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useOpportunitiesStore } from '@/store/useOpportunitiesStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useCVStore } from '@/store/useCVStore';
import { useProgressStore } from '@/store/useProgressStore';
import MatchScore from '@/components/opportunities/MatchScore';
import PostularModal from '@/components/opportunities/PostularModal';
import OpportunityCard from '@/components/opportunities/OpportunityCard';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  Send,
  Building2,
  Calendar,
  Eye,
  Users,
  CheckCircle2,
  ExternalLink,
  Globe,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { profile } = useProfileStore();
  const { cvs } = useCVStore();
  const { addXP, addCoins } = useProgressStore();

  const {
    opportunities,
    saveOpportunity,
    unsaveOpportunity,
    isSaved,
    createApplication,
    hasApplied,
    calculateMatch,
  } = useOpportunitiesStore();

  const [showPostularModal, setShowPostularModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const opportunity = opportunities.find((opp) => opp.id === id);
  const applied = user ? hasApplied(user.id, id!) : false;
  const saved = user ? isSaved(user.id, id!) : false;

  const userCV = user ? cvs.find((cv) => cv.userId === user.id) : undefined;
  const matchResult = opportunity && profile ? calculateMatch(opportunity, profile, userCV) : null;

  // Check if this is an external job
  const isExternalJob = opportunity?.applyUrl && opportunity.source !== 'MoonJab';

  useEffect(() => {
    if (!opportunity) {
      toast({
        title: 'Oportunidad no encontrada',
        variant: 'destructive',
      });
      navigate('/dashboard/opportunities');
    }
  }, [opportunity, navigate]);

  if (!opportunity) return null;

  const modalityLabels: Record<string, string> = {
    remote: 'Remoto',
    hybrid: 'Híbrido',
    onsite: 'Presencial',
  };

  const contractLabels: Record<string, string> = {
    internship: 'Práctica',
    'part-time': 'Medio tiempo',
    'full-time': 'Tiempo completo',
    contract: 'Contrato',
    FULLTIME: 'Tiempo completo',
    PARTTIME: 'Medio tiempo',
    INTERN: 'Práctica',
    CONTRACTOR: 'Contrato',
  };

  const handleSaveToggle = () => {
    if (!user) return;

    if (saved) {
      unsaveOpportunity(user.id, opportunity.id);
      toast({
        title: 'Oferta eliminada',
        description: 'Se ha eliminado de tus guardados',
      });
    } else {
      saveOpportunity(user.id, opportunity.id);
      addXP(5);
      toast({
        title: 'Oferta guardada',
        description: 'Puedes verla en tu lista de guardadas',
      });
    }
  };

  const handleExternalApply = () => {
    if (opportunity.applyUrl) {
      window.open(opportunity.applyUrl, '_blank', 'noopener,noreferrer');
      addXP(10);
      toast({
        title: 'Redirigiendo al portal de empleo',
        description: 'Has ganado 10 XP por explorar esta oportunidad',
      });
    }
  };

  const handlePostular = async (data: { cvVersionId: string; coverLetter?: string }) => {
    if (!user) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    createApplication({
      userId: user.id,
      opportunityId: opportunity.id,
      cvVersionId: data.cvVersionId,
      coverLetter: data.coverLetter,
      status: 'sent',
      matchScore: matchResult?.overall,
    });

    addXP(50);
    addCoins(10);

    setIsSubmitting(false);
    setShowPostularModal(false);
    setShowConfetti(true);

    toast({
      title: 'Postulación enviada',
      description: 'Has ganado 50 XP y 10 MoonJab Coins',
    });

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  // Related opportunities (same category)
  const relatedOpportunities = opportunities
    .filter((opp) => opp.id !== opportunity.id && opp.category === opportunity.category)
    .slice(0, 3);

  return (
    <>
      <SEOHead title="Detalle de Oportunidad" description="Información detallada sobre esta oportunidad laboral." path="/opportunities/detail" noindex />
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="min-h-screen bg-background">
        <SEOHead title="Detalle de Oportunidad" description="Información detallada sobre esta oportunidad laboral." path="/opportunities/detail" noindex />
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {opportunity.companyLogo && (
                    <img 
                      src={opportunity.companyLogo} 
                      alt={opportunity.company}
                      className="h-12 w-12 object-contain rounded-lg bg-muted p-1"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{opportunity.title}</h1>
                    {isExternalJob && (
                      <Badge variant="outline" className="mt-1 gap-1">
                        <Globe className="h-3 w-3" />
                        {opportunity.source}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm md:text-base">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {opportunity.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {opportunity.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDistanceToNow(new Date(opportunity.publishedAt), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" onClick={handleSaveToggle} className="min-h-[44px]">
                  {saved ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" />
                      Guardado
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Guardar
                    </>
                  )}
                </Button>
                
                {isExternalJob ? (
                  <Button onClick={handleExternalApply} className="min-h-[44px]">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Aplicar en {opportunity.source}
                  </Button>
                ) : applied ? (
                  <Button disabled className="min-h-[44px]">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Ya postulaste
                  </Button>
                ) : (
                  <Button onClick={() => setShowPostularModal(true)} className="min-h-[44px]">
                    <Send className="h-4 w-4 mr-2" />
                    Postular
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick info */}
              <Card className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Modalidad</p>
                    <Badge variant="secondary" className="gap-1">
                      <Briefcase className="h-3 w-3" />
                      {modalityLabels[opportunity.modality] || opportunity.modality}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tipo</p>
                    <Badge variant="secondary">
                      {contractLabels[opportunity.contractType] || opportunity.contractType}
                    </Badge>
                  </div>
                  {opportunity.salaryRange && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Salario</p>
                      <Badge variant="secondary" className="gap-1">
                        <DollarSign className="h-3 w-3" />
                        {opportunity.salaryRange.min.toLocaleString()}-{opportunity.salaryRange.max.toLocaleString()}{' '}
                        {opportunity.salaryRange.currency}
                      </Badge>
                    </div>
                  )}
                  {opportunity.expiresAt && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Cierra</p>
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(opportunity.expiresAt), 'dd MMM', { locale: es })}
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {opportunity.views} vistas
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {opportunity.applicantsCount} postulantes
                  </span>
                  {opportunity.source && opportunity.source !== 'MoonJab' && (
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      Fuente: {opportunity.source}
                    </span>
                  )}
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <div 
                  className="text-muted-foreground prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(opportunity.description.replace(/\n/g, '<br/>')) 
                  }}
                />
              </Card>

              {/* Requirements */}
              {opportunity.requirements && opportunity.requirements.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Requisitos</h2>
                  <ul className="space-y-2">
                    {opportunity.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Benefits */}
              {opportunity.benefits && opportunity.benefits.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Beneficios</h2>
                  <ul className="space-y-2">
                    {opportunity.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Tags */}
              {opportunity.tags && opportunity.tags.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Tecnologías y habilidades</h2>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* External Apply CTA */}
              {isExternalJob && (
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">¿Listo para aplicar?</h3>
                      <p className="text-muted-foreground text-sm">
                        Esta oferta está publicada en {opportunity.source}. Serás redirigido para completar tu aplicación.
                      </p>
                    </div>
                    <Button size="lg" onClick={handleExternalApply} className="min-h-[48px] px-8">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Aplicar ahora
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Match Score */}
              {matchResult && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <MatchScore matchResult={matchResult} showRiasec={!!profile?.riasecCode} />
                </motion.div>
              )}

              {/* Company Info */}
              {opportunity.companyLogo && (
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Sobre la empresa</h3>
                  <div className="flex items-center gap-3">
                    <img 
                      src={opportunity.companyLogo} 
                      alt={opportunity.company}
                      className="h-16 w-16 object-contain rounded-lg bg-muted p-2"
                    />
                    <div>
                      <p className="font-medium">{opportunity.company}</p>
                      <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Actions */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Acciones rápidas</h3>
                <div className="space-y-2">
                  {isExternalJob ? (
                    <Button className="w-full min-h-[44px]" onClick={handleExternalApply}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Aplicar en {opportunity.source}
                    </Button>
                  ) : !applied && (
                    <Button className="w-full min-h-[44px]" onClick={() => setShowPostularModal(true)}>
                      <Send className="h-4 w-4 mr-2" />
                      Postular ahora
                    </Button>
                  )}
                  {cvs.length > 0 && (
                    <Link to={`/dashboard/cvs/${cvs[0].id}`}>
                      <Button variant="outline" className="w-full min-h-[44px]">
                        Optimizar CV para esta oferta
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full min-h-[44px]">
                    Simular entrevista
                  </Button>
                </div>
              </Card>

              {/* Related opportunities */}
              {relatedOpportunities.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Ofertas similares</h3>
                  <div className="space-y-3">
                    {relatedOpportunities.map((opp) => (
                      <Link key={opp.id} to={`/dashboard/opportunities/${opp.id}`}>
                        <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2 mb-1">
                            {opp.companyLogo && (
                              <img 
                                src={opp.companyLogo} 
                                alt={opp.company}
                                className="h-6 w-6 object-contain rounded"
                              />
                            )}
                            <h4 className="font-medium text-sm line-clamp-1">{opp.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{opp.company}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Postular Modal - only for internal jobs */}
      {!isExternalJob && (
        <PostularModal
          open={showPostularModal}
          onClose={() => setShowPostularModal(false)}
          opportunity={opportunity}
          cvs={cvs.filter((cv) => user && cv.userId === user.id)}
          onSubmit={handlePostular}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
