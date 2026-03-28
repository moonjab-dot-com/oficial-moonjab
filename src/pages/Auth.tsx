import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { OfficialLogo } from '@/components/OfficialLogo';
import { Loader2, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { getDashboardBasePath } from '@/lib/authRouting';
import type { AccessRole } from '@/types';
import { SEOHead } from '@/components/SEOHead';

const signupSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ nombre: '', email: '', password: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) void resolveDestination(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') void resolveDestination(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const resolveDestination = async (userId: string) => {
    try {
      const [{ data: profile }, { data: accessLevel }] = await Promise.all([
        supabase.from('profiles').select('rol_profesional').eq('id', userId).maybeSingle(),
        supabase.from('user_access_levels').select('access_level').eq('user_id', userId).maybeSingle(),
      ]);

      const accessRole = (accessLevel?.access_level || 'free_user') as AccessRole;
      navigate(profile?.rol_profesional ? getDashboardBasePath(accessRole) : '/onboarding', { replace: true });
    } catch {
      navigate('/onboarding', { replace: true });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try { loginSchema.parse(loginData); } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: 'Error de validación', description: error.errors[0].message, variant: 'destructive' });
        return;
      }
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: loginData.email, password: loginData.password });
      if (error) {
        toast({ title: 'Error al iniciar sesión', description: error.message.includes('Invalid login') ? 'Email o contraseña incorrectos' : error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Bienvenido de vuelta', description: 'Has iniciado sesión exitosamente' });
      }
    } catch { toast({ title: 'Error', description: 'Ocurrió un error inesperado', variant: 'destructive' }); }
    finally { setIsLoading(false); }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try { signupSchema.parse(signupData); } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: 'Error de validación', description: error.errors[0].message, variant: 'destructive' });
        return;
      }
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: signupData.email, password: signupData.password,
        options: { emailRedirectTo: `${window.location.origin}/auth`, data: { nombre: signupData.nombre, name: signupData.nombre } },
      });
      if (error) {
        toast({ title: 'Error al registrarse', description: error.message.includes('already registered') ? 'Este email ya está registrado.' : error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Cuenta creada', description: 'Revisa tu correo para verificar tu cuenta.' });
        navigate('/verify-email', { state: { email: signupData.email } });
      }
    } catch { toast({ title: 'Error', description: 'Ocurrió un error inesperado', variant: 'destructive' }); }
    finally { setIsLoading(false); }
  };

  return (
    <div
      <SEOHead title="Autenticación" description="Inicia sesión o regístrate en MoonJab." path="/auth" noindex /> className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <OfficialLogo size="md" className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2 tracking-tight">Impulsa tu carrera</h1>
          <p className="text-muted-foreground text-sm">Descubre tu camino profesional ideal</p>
        </div>

        <Card className="p-6 border-border/50 shadow-clovely-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="login-email" className="text-sm">Email</Label>
                  <Input id="login-email" type="email" placeholder="tu@email.com" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} disabled={isLoading} required className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="login-password" className="text-sm">Contraseña</Label>
                  <Input id="login-password" type="password" placeholder="Mínimo 6 caracteres" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} disabled={isLoading} required className="h-10" />
                </div>
                <Button type="submit" className="w-full h-10 font-medium" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Iniciando...</> : 'Iniciar Sesión'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-nombre" className="text-sm">Nombre completo</Label>
                  <Input id="signup-nombre" type="text" placeholder="Tu nombre" value={signupData.nombre} onChange={(e) => setSignupData({ ...signupData, nombre: e.target.value })} disabled={isLoading} required className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email" className="text-sm">Email</Label>
                  <Input id="signup-email" type="email" placeholder="tu@email.com" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} disabled={isLoading} required className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-password" className="text-sm">Contraseña</Label>
                  <Input id="signup-password" type="password" placeholder="Mínimo 6 caracteres" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} disabled={isLoading} required className="h-10" />
                </div>
                <Button type="submit" className="w-full h-10 font-medium" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creando cuenta...</> : 'Crear Cuenta'}
                </Button>
                <p className="text-xs text-center text-muted-foreground">Al registrarte, comenzarás tu diagnóstico profesional personalizado</p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-5 pt-5 border-t border-border/40">
            <div className="bg-primary/8 rounded-lg p-3.5 text-center">
              <p className="text-sm font-medium text-primary flex items-center justify-center gap-1.5 mb-0.5"><Sparkles className="h-3.5 w-3.5" />7 días gratis de Premium</p>
              <p className="text-xs text-muted-foreground">Acceso completo a todas las funcionalidades</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
