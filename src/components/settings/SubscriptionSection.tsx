import { useState } from 'react';
import { CreditCard, Download, Calendar, TrendingUp, Crown, ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { toast as sonnerToast } from 'sonner';

interface PaymentHistory {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: 'paid' | 'pending' | 'failed';
}

const MOCK_PAYMENT_HISTORY: PaymentHistory[] = [
{
  id: 'inv_001',
  date: '2025-01-01',
  amount: '$5.00',
  method: 'Visa ****1234',
  status: 'paid'
},
{
  id: 'inv_002',
  date: '2024-12-01',
  amount: '$5.00',
  method: 'Visa ****1234',
  status: 'paid'
}];


const PLAN_FEATURES = {
  free: [
  'Diagnóstico de carrera',
  'Hasta 3 CVs',
  '5 simulaciones de entrevista/mes',
  'Acceso a oportunidades',
  'Coach IA básico'],

  premium: [
  'Todo lo de Free',
  'CVs ilimitados',
  'Simulaciones ilimitadas',
  'Optimización IA avanzada',
  'Análisis de compatibilidad detallado',
  'Mentoría personalizada',
  'Sin anuncios',
  'Soporte prioritario']

};

export function SubscriptionSection() {
  const { user, updateUser } = useAuthStore();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const isPremium = user?.plan === 'premium';

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      sonnerToast.error('Error al iniciar el pago: ' + (err.message || 'Intenta de nuevo'));
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsManaging(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      sonnerToast.error('Error al abrir el portal: ' + (err.message || 'Intenta de nuevo'));
    } finally {
      setIsManaging(false);
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: 'Descargando factura',
      description: `Factura ${invoiceId} se descargará en breve. (Mock)`
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className={isPremium ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20' : ''}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {isPremium && <Crown className="h-5 w-5 text-primary" />}
                Plan {isPremium ? 'Premium' : 'Free'}
              </CardTitle>
              <CardDescription>
                {isPremium ?
                'Acceso completo a todas las funcionalidades' :
                'Plan gratuito con funcionalidades básicas'
                }
              </CardDescription>
            </div>
            <Badge variant={isPremium ? 'default' : 'secondary'} className="text-sm">
              {isPremium ? 'Activo' : 'Básico'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Features List */}
          <div>
            <p className="text-sm font-medium mb-3">Incluye:</p>
            <ul className="space-y-2">
              {PLAN_FEATURES[isPremium ? 'premium' : 'free'].map((feature, index) =>
              <li key={index} className="text-sm flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {feature}
                </li>
              )}
            </ul>
          </div>

          {/* Upgrade CTA */}
          {!isPremium &&
          <div className="pt-4 border-t">
              


            
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-lg font-bold">$5/mes</p>
                  <p className="text-xs text-muted-foreground">​</p>
                </div>
              </div>
              <Button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="w-full"
              size="lg">
              
                <Crown className="h-4 w-4 mr-2" />
                {isUpgrading ? 'Procesando...' : 'Actualizar a Premium'}
              </Button>
            </div>
          }

          {/* Premium Info & Manage */}
          {isPremium &&
          <div className="pt-4 border-t space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Próxima facturación</span>
                <span className="font-medium">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleManageSubscription}
                disabled={isManaging}
              >
                {isManaging ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Gestionar suscripción
              </Button>
            </div>
          }
        </CardContent>
      </Card>

      {/* Payment History */}
      {isPremium &&
      <Card>
          <CardHeader>
            <CardTitle>
              <TrendingUp className="h-5 w-5 inline mr-2" />
              Historial de Pagos
            </CardTitle>
            <CardDescription>
              Revisa tus facturas y descargas comprobantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_PAYMENT_HISTORY.map((payment) =>
            <div
              key={payment.id}
              className="flex items-center justify-between p-3 border rounded-lg">
              
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {new Date(payment.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                    </p>
                    <p className="text-xs text-muted-foreground">{payment.method}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{payment.amount}</p>
                      <Badge
                    variant={
                    payment.status === 'paid' ?
                    'default' :
                    payment.status === 'pending' ?
                    'secondary' :
                    'destructive'
                    }
                    className="text-xs">
                    
                        {payment.status === 'paid' ?
                    'Pagado' :
                    payment.status === 'pending' ?
                    'Pendiente' :
                    'Fallido'}
                      </Badge>
                    </div>
                    <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadInvoice(payment.id)}>
                  
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
            )}
            </div>
          </CardContent>
        </Card>
      }

      {/* Premium Benefits */}
      {!isPremium &&
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle>¿Por qué Premium?</CardTitle>
            <CardDescription>
              Lleva tu desarrollo profesional al siguiente nivel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex gap-3">
                <div className="p-2 bg-primary/10 rounded-lg h-fit">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Optimización IA ilimitada</p>
                  <p className="text-sm text-muted-foreground">
                    Mejora tus CVs y respuestas de entrevista sin límites
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 bg-primary/10 rounded-lg h-fit">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Análisis avanzado</p>
                  <p className="text-sm text-muted-foreground">
                    Obtén insights detallados sobre tu compatibilidad con ofertas
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 bg-primary/10 rounded-lg h-fit">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Soporte prioritario</p>
                  <p className="text-sm text-muted-foreground">
                    Respuestas rápidas y asistencia personalizada
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    </div>);

}