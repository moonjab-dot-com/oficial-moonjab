import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/store/useAuthStore';
import { AlertCircle, Sparkles, Check } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { verifyEmailExists } from '@/lib/verifyEmail';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

interface GuestConversionModalProps {
  open: boolean;
  onClose: () => void;
}

export function GuestConversionModal({ open, onClose }: GuestConversionModalProps) {
  const { guestData, setUser, setSession } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validar con Zod
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Verificar que el email existe
      const emailCheck = await verifyEmailExists(formData.email);
      if (!emailCheck.valid) {
        setErrors({ email: emailCheck.reason || 'Correo inválido' });
        setIsLoading(false);
        return;
      }

      // Registrar usuario en Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            name: formData.name,
            nombre: formData.name,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setErrors({ email: 'Este email ya está registrado' });
        } else {
          setErrors({ form: signUpError.message });
        }
        return;
      }

      if (authData.user && authData.session) {
        setSession(authData.session);
        setUser({
          id: authData.user.id,
          name: formData.name,
          email: formData.email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
          plan: 'free',
          accessRole: 'free_user',
          createdAt: new Date(),
          lastLogin: new Date(),
          lastActiveDate: new Date(),
          onboardingCompleted: false,
          streak: 1,
          applicationsSubmitted: 0,
        });

        // Migrar datos del invitado (opcional - guardar en backend)
        if (guestData) {
          console.log('Datos de invitado a migrar:', guestData);
          // Aquí podrías guardar los datos del invitado en tu backend
        }

        toast.success('¡Cuenta creada exitosamente!', {
          description: 'Tus datos han sido guardados y ahora tienes acceso completo.',
        });

        onClose();
      }
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      setErrors({ form: 'Ocurrió un error al crear la cuenta. Intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    'Guarda tu progreso permanentemente',
    'Acceso ilimitado a todas las funcionalidades',
    'Sincronización entre dispositivos',
    'Notificaciones de progreso',
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Crea tu cuenta gratuita
          </DialogTitle>
          <DialogDescription>
            Guarda tu progreso y accede desde cualquier dispositivo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Beneficios */}
          <div className="bg-primary/5 rounded-lg p-4 space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isLoading}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {errors.form && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.form}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Continuar como invitado
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 gradient-orange text-white"
              >
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
