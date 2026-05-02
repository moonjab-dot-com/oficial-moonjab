import { useState, useMemo, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import { OfficialLogo } from '@/components/OfficialLogo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UpgradeModal } from '@/components/UpgradeModal';
import { GuestBanner } from '@/components/GuestBanner';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { getDashboardBasePath } from '@/lib/authRouting';
import { Home, FileText, Settings, Mic, Shield, Menu, ArrowUpRight, Layout, Crown } from 'lucide-react';
import { useSubscription, MOONJAB_PRO } from '@/hooks/useSubscription';

export default function DashboardLayout() {
  const { t } = useTranslation();
  const { user, updateUser, startPremiumTrial } = useAuthStore();
  const { setSidebarCollapsed } = useUIStore();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Auto-check subscription status and sync with user store
  const { subscribed, productId, checkSubscription } = useSubscription();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('subscription') !== 'success') return;

    void checkSubscription();
    toast.success('Suscripción verificada');

    params.delete('subscription');
    const nextSearch = params.toString();
    window.history.replaceState({}, '', `${location.pathname}${nextSearch ? `?${nextSearch}` : ''}`);
  }, [location.pathname, location.search, checkSubscription]);

  useEffect(() => {
    if (!user || user.id.startsWith('guest_')) return;
    const isPro = subscribed && productId === MOONJAB_PRO.product_id;
    if (isPro && user.plan !== 'premium') {
      updateUser({ plan: 'premium', accessRole: 'premium_user' });
    } else if (!isPro && user.plan === 'premium') {
      updateUser({ plan: 'free', accessRole: 'free_user' });
    }
  }, [subscribed, productId, user?.id, user?.plan, updateUser]);

  const dashboardBasePath = getDashboardBasePath(user?.accessRole || 'free_user');
  const isPremium = user?.plan === 'premium';
  const isTrial = user?.accessRole === 'trial_user';

  useEffect(() => {
    void checkAdminStatus();
  }, [user?.id, user?.accessRole]);

  const checkAdminStatus = async () => {
    if (!user || user.id.startsWith('guest_') || isTrial) {
      setIsAdmin(false);
      return;
    }
    try {
      const { data, error } = await supabase.from('user_roles').select('role').eq('user_id', user.id).single();
      setIsAdmin(!error && data?.role === 'admin');
    } catch {
      setIsAdmin(false);
    }
  };

  const handleStartTrial = async () => {
    try {
      await startPremiumTrial();
      toast.success(t('common.success'), { description: 'Disfruta 7 días gratis.' });
    } catch {
      toast.error(t('common.error'));
    }
  };

  const mainNav = useMemo(() => {
    const items = [
      { icon: Home, label: t('nav.dashboard'), path: dashboardBasePath },
      { icon: FileText, label: 'CV Builder', path: `${dashboardBasePath}/cvs` },
      { icon: Layout, label: 'Templates', path: `${dashboardBasePath}/cvs` },
      { icon: Mic, label: t('nav.interviews'), path: `${dashboardBasePath}/interviews` },
      { icon: Crown, label: 'Suscripción', path: '/pricing' },
    ];
    if (isAdmin && !isTrial) items.push({ icon: Shield, label: 'Admin', path: `${dashboardBasePath}/admin` });
    return items;
  }, [dashboardBasePath, isAdmin, isTrial, t]);

  const bottomNav = useMemo(() => [{ icon: Settings, label: t('nav.settings'), path: `${dashboardBasePath}/settings` }], [dashboardBasePath, t]);

  const isActive = (path: string) => location.pathname === path || (path !== dashboardBasePath && location.pathname.startsWith(path));

  const NavLink = ({ item, showLabel = true }: { item: { icon: any; label: string; path: string }; showLabel?: boolean }) => {
    const active = isActive(item.path);
    const Icon = item.icon;
    return (
      <Link to={item.path} onClick={() => setDrawerOpen(false)} className={cn('flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150', active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50')}>
        <Icon className="flex-shrink-0 h-[18px] w-[18px]" />
        {showLabel && <span className="truncate">{item.label}</span>}
      </Link>
    );
  };

  const FullSidebar = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 h-14 border-b border-border/40">
        <OfficialLogo size="md" to={dashboardBasePath} asMotion={true} animated={false} />
      </div>
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5">{mainNav.map(item => <NavLink key={item.path} item={item} />)}</nav>
      <div className="p-2.5 border-t border-border/40 space-y-0.5">
        {bottomNav.map(item => <NavLink key={item.path} item={item} />)}
        <div className="px-1 pt-1 flex items-center gap-1"><LanguageToggle /><ThemeToggle /></div>
        {!isPremium && !isTrial && <Button className="w-full text-xs h-8 mt-1" size="sm" onClick={() => { setUpgradeModalOpen(true); setDrawerOpen(false); }}><ArrowUpRight className="mr-1 h-3 w-3" /> Upgrade</Button>}
      </div>
    </div>
  );

  const MiniSidebar = () => (
    <aside className="border-r border-border/40 bg-card flex flex-col fixed h-screen z-40 w-[52px]">
      <div className="h-14 flex items-center justify-center border-b border-border/40">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDrawerOpen(true)}><Menu className="h-4 w-4" /></Button>
      </div>
      <nav className="flex-1 overflow-y-auto py-2 px-1.5 space-y-1">
        {mainNav.map(item => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return <Tooltip key={item.path}><TooltipTrigger asChild><Link to={item.path} className={cn('flex items-center justify-center p-2 rounded-lg transition-all duration-150', active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50')}><Icon className="h-[18px] w-[18px]" /></Link></TooltipTrigger><TooltipContent side="right" className="text-xs">{item.label}</TooltipContent></Tooltip>;
        })}
      </nav>
      <div className="px-1.5 py-2 border-t border-border/40 space-y-1">
        {bottomNav.map(item => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return <Tooltip key={item.path}><TooltipTrigger asChild><Link to={item.path} className={cn('flex items-center justify-center p-2 rounded-lg transition-all', active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50')}><Icon className="h-[18px] w-[18px]" /></Link></TooltipTrigger><TooltipContent side="right" className="text-xs">{item.label}</TooltipContent></Tooltip>;
        })}
        <div className="flex justify-center gap-1 pt-0.5"><LanguageToggle /><ThemeToggle /></div>
      </div>
    </aside>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen flex w-full overflow-x-hidden bg-background">
        {isMobile && <Button variant="ghost" size="icon" className="fixed top-3 left-3 z-50 h-9 w-9 md:hidden bg-card border border-border/40 shadow-clovely-sm" onClick={() => setDrawerOpen(true)}><Menu className="h-4 w-4" /></Button>}
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}><SheetContent side="left" className="w-[240px] p-0" showCloseButton={true}><FullSidebar /></SheetContent></Sheet>
        {!isMobile && <MiniSidebar />}
        <main className={cn('flex-1 w-full', isMobile ? 'ml-0' : 'ml-[52px]')}>
          <GuestBanner />
          <Outlet />
        </main>
        <UpgradeModal open={upgradeModalOpen} onClose={() => setUpgradeModalOpen(false)} onStartTrial={handleStartTrial} />
      </div>
    </TooltipProvider>
  );
}
