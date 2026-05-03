import { CVTemplate } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout, Lock, Crown } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSubscription, MOONJAB_PRO } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface TemplateSelectorProps {
  value: CVTemplate;
  onChange: (template: CVTemplate) => void;
  compact?: boolean;
}

const GUEST_TEMPLATE: CVTemplate = 'creative';
const FREE_TEMPLATES: CVTemplate[] = ['creative', 'executive', 'tech'];

export default function TemplateSelector({ value, onChange, compact = false }: TemplateSelectorProps) {
  const { isGuestMode } = useAuthStore();
  const { subscribed, productId } = useSubscription();
  const navigate = useNavigate();
  const isPremium = subscribed && productId === MOONJAB_PRO.product_id;
  const allowedTemplates: CVTemplate[] = isPremium
    ? []
    : isGuestMode
    ? [GUEST_TEMPLATE]
    : FREE_TEMPLATES;
  const isLimited = !isPremium;

  const allTemplates: { value: CVTemplate; label: string; description: string }[] = [
    { value: 'creative', label: 'Creativo', description: 'Innovador' },
    { value: 'harvard', label: 'Harvard', description: 'Académico' },
    { value: 'modern', label: 'Moderno', description: 'Corporate' },
    { value: 'minimal', label: 'Minimal', description: 'Elegante' },
    { value: 'executive', label: 'Ejecutivo', description: 'Directivo' },
    { value: 'tech', label: 'Tech', description: 'IT' },
    { value: 'elegant', label: 'Elegante', description: 'Sofisticado' },
    { value: 'simple', label: 'Simple', description: 'Directo' },
    { value: 'cascade', label: 'Cascade', description: '2 columnas' },
    { value: 'ats', label: 'ATS', description: 'Optimizado' },
    { value: 'professional', label: 'Professional', description: 'Clásico' },
    { value: 'bold', label: 'Bold', description: 'Llamativo' },
    { value: 'classic', label: 'Classic', description: 'Tradicional' },
  ];

  const handleChange = (v: string) => {
    const template = v as CVTemplate;
    if (isLimited && template !== FREE_TEMPLATE) {
      toast({
        title: 'Plantilla Premium',
        description: 'Suscríbete para desbloquear todas las plantillas profesionales.',
      });
      navigate(isGuestMode ? '/pricing' : '/payment');
      return;
    }
    onChange(template);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className={compact ? "w-full h-9 text-sm" : "w-[220px]"}>
        {!compact && <Layout className="h-4 w-4 mr-2" />}
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {allTemplates.map((template) => {
          const locked = isLimited && template.value !== FREE_TEMPLATE;
          return (
            <SelectItem key={template.value} value={template.value}>
              {compact ? (
                <span className="flex items-center gap-2">
                  {template.label}
                  {locked && <Lock className="h-3 w-3 text-muted-foreground" />}
                </span>
              ) : (
                <div className="py-1 flex items-center justify-between gap-2 w-full">
                  <div>
                    <div className="font-semibold flex items-center gap-1.5">
                      {template.label}
                      {locked && <Crown className="h-3 w-3 text-amber-500" />}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {locked ? 'Premium' : template.description}
                    </div>
                  </div>
                  {locked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                </div>
              )}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
