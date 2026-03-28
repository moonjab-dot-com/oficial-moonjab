import { SEOHead } from '@/components/SEOHead';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, Lock, Bell, Palette, CreditCard, Shield, 
  Link as LinkIcon, Download, Briefcase, Globe 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ProfileSection } from '@/components/settings/ProfileSection';
import { SecuritySection } from '@/components/settings/SecuritySection';
import { NotificationsSection } from '@/components/settings/NotificationsSection';
import { NotificationsSettings } from '@/components/settings/NotificationsSettings';
import { AppearanceSection } from '@/components/settings/AppearanceSection';
import { SubscriptionSection } from '@/components/settings/SubscriptionSection';
import { PrivacySection } from '@/components/settings/PrivacySection';
import { IntegrationsSection } from '@/components/settings/IntegrationsSection';
import { LanguageSection } from '@/components/settings/LanguageSection';
import { AccountSection } from '@/components/settings/AccountSection';
import { RoleSection } from '@/components/settings/RoleSection';
import { cn } from '@/lib/utils';

type SettingSection = 
  | 'profile' | 'role' | 'security' | 'notifications' 
  | 'appearance' | 'language' | 'subscription' | 'privacy' 
  | 'integrations' | 'account';

export default function Settings() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<SettingSection>('profile');
  const isMobile = useIsMobile();

  const navigation = [
    { id: 'profile', label: t('settings.profile.title'), icon: User },
    { id: 'role', label: t('settings.role.title'), icon: Briefcase },
    { id: 'security', label: t('settings.security.title'), icon: Lock },
    { id: 'notifications', label: t('settings.notifications.title'), icon: Bell },
    { id: 'appearance', label: t('settings.appearance.title'), icon: Palette },
    { id: 'language', label: t('settings.language.title'), icon: Globe },
    { id: 'subscription', label: t('settings.subscription.title'), icon: CreditCard },
    { id: 'privacy', label: t('settings.privacy.title'), icon: Shield },
    { id: 'integrations', label: t('settings.integrations.title'), icon: LinkIcon },
  ] as const;

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSection />;
      case 'role': return <RoleSection />;
      case 'security': return <SecuritySection />;
      case 'notifications': return (<>
      <SEOHead title="Configuración" description="Personaliza tu experiencia en MoonJab. Ajusta tu perfil, notificaciones y preferencias." path="/settings" noindex /><NotificationsSettings /><NotificationsSection /></>);
      case 'appearance': return <AppearanceSection />;
      case 'language': return <LanguageSection />;
      case 'subscription': return <SubscriptionSection />;
      case 'privacy': return <PrivacySection />;
      case 'integrations': return <IntegrationsSection />;
      case 'account': return <AccountSection />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">{t('settings.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      {isMobile ? (
        <div className="space-y-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as SettingSection)}>
              <TabsList className="inline-flex h-auto w-auto p-1 bg-muted/50">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <TabsTrigger
                      key={item.id}
                      value={item.id}
                      className="min-h-[40px] px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs"
                    >
                      <Icon className="h-3.5 w-3.5 mr-1.5" />
                      {item.label}
                    </TabsTrigger>
                  );
                })}
                <TabsTrigger value="account" className="min-h-[40px] px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  {t('settings.account.title')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <main className="min-w-0">{renderContent()}</main>
        </div>
      ) : (
        <div className="flex gap-8">
          <aside className="w-56 shrink-0">
            <nav className="sticky top-6 space-y-0.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SettingSection)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium shadow-clovely-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <Separator className="my-3" />
              <button
                onClick={() => setActiveSection('account')}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-200',
                  activeSection === 'account'
                    ? 'bg-muted text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                <Download className="h-4 w-4" />
                <span>{t('settings.account.title')}</span>
              </button>
            </nav>
          </aside>
          <main className="flex-1 min-w-0">{renderContent()}</main>
        </div>
      )}
    </div>
  );
}
