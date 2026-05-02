import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

interface UpgradeBannerProps {
  onUpgrade?: () => void;
}

export const UpgradeBanner = ({ onUpgrade }: UpgradeBannerProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('upgrade-banner-dismissed');
    if (wasDismissed) {
      setDismissed(true);
    }
  }, []);
  
  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('upgrade-banner-dismissed', 'true');
  };
  
  if (user?.plan === 'premium' || dismissed) {
    return null;
  }
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          rounded-2xl border-2 border-primary/20 
          bg-primary/5 dark:bg-primary/10
          p-4 relative overflow-hidden
          shadow-mj-md hover:shadow-mj-lg hover:-translate-y-0.5 transition-all duration-300
        "
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-full blur-2xl" />
        </div>
        
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-full bg-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground mb-0.5">
                Desbloquea MoonJab Pro por <span className="text-primary">$5/mes</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Plantilla Harvard CV, todas las plantillas premium, entrevistas IA y más
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/payment')}
              variant="premium"
              size="sm"
              className="shadow-mj-glow hover:shadow-mj-glow-lg"
            >
              Suscribirse
            </Button>
            <button
              onClick={handleDismiss}
              className="
                p-1.5 rounded-lg hover:bg-accent/50
                transition-colors text-muted-foreground hover:text-foreground
              "
              aria-label="Cerrar banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
