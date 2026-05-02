import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  feature?: string;
  onStartTrial?: () => void;
}

export const UpgradeModal = ({ open, onClose, feature }: UpgradeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Desbloquea todo el potencial de MoonJab
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {feature && (
            <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
              <p className="text-sm">
                Has alcanzado el límite de <strong>{feature}</strong> en el modo invitado.
                Suscríbete a Pro para acceso completo.
              </p>
            </div>
          )}
          {!feature && (
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">Accede a todas las herramientas por <span className="text-primary">$5/mes</span></p>
              <p className="text-sm text-muted-foreground">Cancela cuando quieras. Sin permanencia.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-heading font-bold text-lg mb-1">Modo invitado</h3>
                <p className="text-3xl font-heading font-bold">$0<span className="text-sm text-muted-foreground">/mes</span></p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Plantilla de CV "Creativo"</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Diagnóstico básico</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Plantilla Harvard CV</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Entrevistas ilimitadas con IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Coach IA 24/7</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-primary rounded-lg p-6 space-y-4 relative overflow-hidden">
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                Recomendado
              </Badge>
              <div>
                <h3 className="font-heading font-bold text-lg mb-1">Pro</h3>
                <p className="text-3xl font-heading font-bold text-primary">
                  $5<span className="text-sm text-muted-foreground">/mes</span>
                </p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">Plantilla Harvard CV (exclusiva)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">Todas las plantillas premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">Entrevistas ilimitadas con IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">Coach IA 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">Diagnóstico completo RIASEC</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Exportación PDF ilimitada</span>
                </li>
              </ul>
              <Link to="/payment">
                <Button className="w-full font-semibold">
                  Suscribirse por $5/mes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
