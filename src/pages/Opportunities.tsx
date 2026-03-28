import { SEOHead } from '@/components/SEOHead';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useOpportunitiesStore } from '@/store/useOpportunitiesStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useCVStore } from '@/store/useCVStore';
import { useProgressStore } from '@/store/useProgressStore';
import OpportunityCard from '@/components/opportunities/OpportunityCard';
import FilterPanel from '@/components/opportunities/FilterPanel';
import { SkeletonOpportunityCard } from '@/components/ui/skeleton-loader';
import { Search, RefreshCw, Briefcase, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import { UpgradeModal } from '@/components/UpgradeModal';

export default function Opportunities() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { profile } = useProfileStore();
  const { cvs } = useCVStore();
  const { addXP } = useProgressStore();
  const {
    opportunities, filters, isLoading, error, hasMore,
    loadOpportunities, loadMoreOpportunities, setFilters, clearFilters,
    saveOpportunity, unsaveOpportunity, isSaved, calculateMatch,
  } = useOpportunitiesStore();

  const [localSearch, setLocalSearch] = useState(filters.search);
  const [locationSearch, setLocationSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const isMobile = useIsMobile();
  const isGuest = useAuthStore((s) => s.isGuestMode);
  const isPremium = user?.plan === 'premium';

  useEffect(() => {
    loadOpportunities({ query: 'developer', location: '' });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setFilters({ search: localSearch }); }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, setFilters]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadOpportunities({ query: localSearch || 'developer', location: locationSearch });
    setIsRefreshing(false);
    toast({ title: t('opportunities.refreshed'), description: t('opportunities.refreshedDesc') });
  };

  const handleSearch = async () => {
    await loadOpportunities({ query: localSearch || 'developer', location: locationSearch });
  };

  const handleSaveToggle = (opportunityId: string) => {
    if (!user) return;
    const saved = isSaved(user.id, opportunityId);
    if (saved) {
      unsaveOpportunity(user.id, opportunityId);
      toast({ title: t('opportunities.removedToast'), description: t('opportunities.removedToastDesc') });
    } else {
      saveOpportunity(user.id, opportunityId);
      addXP(5);
      toast({ title: t('opportunities.savedToast'), description: t('opportunities.savedToastDesc') });
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    if (filters.category.length > 0 && !filters.category.includes(opp.category)) return false;
    if (filters.modality.length > 0 && !filters.modality.includes(opp.modality)) return false;
    if (filters.contractType.length > 0 && !filters.contractType.includes(opp.contractType)) return false;
    if (filters.location && !opp.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      return opp.title.toLowerCase().includes(s) || opp.company.toLowerCase().includes(s) ||
        opp.description.toLowerCase().includes(s) || opp.tags.some((tag) => tag.toLowerCase().includes(s));
    }
    return true;
  });

  const opportunitiesWithMatch = filteredOpportunities.map((opp) => {
    if (!user || !profile) return { ...opp, matchScore: undefined };
    const userCV = cvs.find((cv) => cv.userId === user.id);
    const match = calculateMatch(opp, profile, userCV);
    return { ...opp, matchScore: match.overall };
  });

  const sortedOpportunities = [...opportunitiesWithMatch].sort((a, b) => {
    if (a.matchScore !== undefined && b.matchScore !== undefined) return b.matchScore - a.matchScore;
    if (a.matchScore !== undefined) return -1;
    if (b.matchScore !== undefined) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Oportunidades Laborales" description="Explora ofertas de empleo que se alinean con tu perfil. Oportunidades en tecnología, marketing, diseño y más." path="/opportunities" />
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">{t('opportunities.title')}</h1>
              <p className="text-sm sm:text-base text-muted-foreground">{t('opportunities.subtitle')}</p>
            </div>
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing || isLoading} className="min-h-[44px] w-full sm:w-auto">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {t('opportunities.refresh')}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('opportunities.search')} className="pl-10 min-h-[44px]" value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
            </div>
            <Input placeholder={t('opportunities.searchLocation')} className="min-h-[44px] sm:w-48" value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
            <Button onClick={handleSearch} disabled={isLoading} className="min-h-[44px]">
              <Search className="h-4 w-4 mr-2" />
              {t('opportunities.searchBtn')}
            </Button>
            
            {isMobile && (
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px]">
                    <SlidersHorizontal className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0">
                  <SheetHeader className="p-6 pb-4">
                    <SheetTitle>{t('opportunities.filters')}</SheetTitle>
                  </SheetHeader>
                  <div className="px-6 pb-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <FilterPanel filters={filters} onFilterChange={(f) => setFilters(f)} onClearFilters={clearFilters} inDrawer />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {error && (
          <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              {error.includes('Rate limit') ? t('opportunities.rateLimited') : t('opportunities.loadError')}
            </AlertDescription>
          </Alert>
        )}

        {!isPremium && !isGuest && (
          <div className="mb-6"><UpgradeBanner onUpgrade={() => setShowUpgradeModal(true)} /></div>
        )}

        <UpgradeModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} feature={t('opportunities.unlimitedFeature')} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {!isMobile && (
            <aside className="lg:col-span-1">
              <FilterPanel filters={filters} onFilterChange={(f) => setFilters(f)} onClearFilters={clearFilters} />
            </aside>
          )}

          <main className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {isLoading ? t('opportunities.searching') : t('opportunities.resultsCount', { count: sortedOpportunities.length })}
              </p>
            </div>

            {isLoading && opportunities.length === 0 ? (
              <div className="space-y-4">{[1, 2, 3, 4].map((i) => <SkeletonOpportunityCard key={i} />)}</div>
            ) : sortedOpportunities.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t('opportunities.noResults')}</h3>
                <p className="text-muted-foreground mb-4">{t('opportunities.noResultsDesc')}</p>
                <Button variant="outline" onClick={clearFilters}>{t('opportunities.clearFilters')}</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedOpportunities.map((opportunity, index) => (
                  <motion.div key={opportunity.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <OpportunityCard opportunity={opportunity} matchScore={opportunity.matchScore}
                      isSaved={user ? isSaved(user.id, opportunity.id) : false} onSave={() => handleSaveToggle(opportunity.id)} />
                  </motion.div>
                ))}
                {hasMore && !isLoading && (
                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={loadMoreOpportunities} className="min-h-[44px]">{t('opportunities.loadMore')}</Button>
                  </div>
                )}
                {isLoading && opportunities.length > 0 && (
                  <div className="space-y-4"><SkeletonOpportunityCard /><SkeletonOpportunityCard /></div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}