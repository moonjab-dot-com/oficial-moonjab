import { SEOHead } from '@/components/SEOHead';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { OfficialLogo } from '@/components/OfficialLogo';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Email inválido'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { emailSchema.parse({ email }); } catch (error) {
      if (error instanceof z.ZodError) { toast.error(error.errors[0].message); return; }
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setEmailSent(true);
      toast.success('Correo de recuperación enviado');
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast.error('Error al enviar correo de recuperación');
    } finally { setLoading(false); }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <SEOHead title="Recuperar Contraseña" description="Recupera el acceso a tu cuenta MoonJab. Te enviaremos un enlace para restablecer tu contraseña." path="/forgot-password" noindex />
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
          <Card className="p-8 border-primary/20">
            <div className="text-center space-y-5">
              <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1.5">Correo Enviado</h2>
                <p className="text-sm text-muted-foreground">
                  Hemos enviado un enlace de recuperación a <strong className="text-foreground">{email}</strong>
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio de sesión
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-8">
          <Link to="/">
            <OfficialLogo size="md" className="mb-6" />
          </Link>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Recuperar Contraseña</h2>
              <p className="text-sm text-muted-foreground">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Correo Electrónico</Label>
                <Input
                  id="email" type="email" placeholder="tu@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required autoComplete="email" className="h-11"
                />
              </div>

              <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
              </Button>
            </form>

            <div className="text-center">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Volver al inicio de sesión
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
