import { Crown, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function BillingStatusCard() {
  const { user, isGuestMode } = useAuthStore();
  const { subscribed, subscriptionEnd, openPortal } = useSubscription();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (isGuestMode) return null;

  const isPremium = user?.plan === 'premium' && subscribed;

  const handleAction = async () => {
    if (!isPremium) {
      navigate('/payment');
      return;
    }
    setLoading(true);
    try {
      await openPortal();
    } catch {
      toast.error('Error al procesar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const renewalDate = subscriptionEnd
    ? new Date(subscriptionEnd).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <div className={`rounded-xl border p-4 transition-all ${isPremium ? 'border-primary/20 bg-primary/[0.03]' : 'border-border/50'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isPremium && <Crown className="h-4 w-4 text-primary" />}
          <p className="text-sm font-semibold">
            Plan {isPremium ? 'Pro' : 'Free'}
          </p>
        </div>
        <Badge variant={isPremium ? 'default' : 'secondary'} className="text-[10px] h-5">
          {isPremium ? 'Activo' : 'Básico'}
        </Badge>
      </div>

      {isPremium && renewalDate && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Calendar className="h-3 w-3" />
          <span>Próxima renovación: {renewalDate}</span>
        </div>
      )}

      <Button
        variant={isPremium ? 'outline' : 'default'}
        size="sm"
        className="w-full h-8 text-xs"
        onClick={handleAction}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-3 w-3 animate-spin mr-1" />
        ) : isPremium ? (
          <ExternalLink className="h-3 w-3 mr-1" />
        ) : (
          <Crown className="h-3 w-3 mr-1" />
        )}
        {isPremium ? 'Gestionar suscripción' : 'Upgrade a Pro — $5/mes'}
      </Button>
    </div>
  );
}
