import { SEOHead } from '@/components/SEOHead';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { OfficialLogo } from '@/components/OfficialLogo';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { verifyEmailExists } from '@/lib/verifyEmail';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').regex(/[A-Z]/, 'Debe contener al menos una mayúscula').regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden", path: ["confirmPassword"]
});

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', acceptTerms: false, newsletter: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});


  const getPasswordStrength = () => {
    const p = formData.password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^a-zA-Z\d]/.test(p)) s++;
    return s;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!formData.acceptTerms) {toast.error('Debes aceptar los términos');return;}
    try {registerSchema.parse(formData);} catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {if (err.path[0]) newErrors[err.path[0].toString()] = err.message;});
        setErrors(newErrors);toast.error(error.errors[0].message);return;
      }
    }
    setLoading(true);
    try {
      const emailCheck = await verifyEmailExists(formData.email);
      if (!emailCheck.valid) {
        toast.error(emailCheck.reason || 'El correo ingresado no es válido');
        setErrors({ email: emailCheck.reason || 'Correo inválido' });
        setLoading(false);
        return;
      }
      await register(formData.name, formData.email, formData.password);
      toast.success('Cuenta creada. Revisa tu correo para verificarla.');
      navigate('/verify-email', { state: { email: formData.email } });
    } catch (error: any) {
      if (error.message?.includes('already registered')) toast.error('Este email ya está registrado.');else
      toast.error(error.message || 'Error al crear la cuenta');
    } finally {setLoading(false);}
  };

  const strength = getPasswordStrength();
  const strengthColors = ['bg-destructive', 'bg-destructive', 'bg-primary/50', 'bg-primary'];
  const strengthLabels = ['Débil', 'Regular', 'Buena', 'Fuerte'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <SEOHead title="Crear Cuenta" description="Regístrate gratis en MoonJab. Crea tu CV y practica entrevistas con IA en LATAM." path="/registro" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm">
        
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> Volver
          </Link>
          <OfficialLogo size="md" />
        </div>
        <h1 className="text-xl font-bold mb-1 tracking-tight">Crea tu cuenta</h1>
        

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs">Nombre completo</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ana García" className={`h-10 ${errors.name ? 'border-destructive' : ''}`} />
            {errors.name && <p className="text-[11px] text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ana@ejemplo.com" className={`h-10 ${errors.email ? 'border-destructive' : ''}`} />
            {errors.email && <p className="text-[11px] text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs">Contraseña</Label>
            <Input id="password" type="password" value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••" className={`h-10 ${errors.password ? 'border-destructive' : ''}`} />
            {formData.password &&
            <div className="space-y-1 mt-1">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) =>
                <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors ${i < strength ? strengthColors[strength - 1] : 'bg-muted'}`} />
                )}
                </div>
                {strength > 0 && <p className="text-[10px] text-muted-foreground">{strengthLabels[strength - 1]}</p>}
              </div>
            }
            {errors.password && <p className="text-[11px] text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-xs">Confirmar contraseña</Label>
            <Input id="confirmPassword" type="password" value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="••••••••" className={`h-10 ${errors.confirmPassword ? 'border-destructive' : ''}`} />
            {errors.confirmPassword && <p className="text-[11px] text-destructive">{errors.confirmPassword}</p>}
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })} />
              <label htmlFor="terms" className="text-[11px] leading-tight text-muted-foreground">
                Acepto los <Link to="/terms" className="text-primary hover:underline">términos</Link> y la <Link to="/privacy" className="text-primary hover:underline">política de privacidad</Link>
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full h-10 text-sm" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>

          <div className="flex items-center gap-3 my-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">o</span>
            <Separator className="flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-10 text-sm gap-2"
            disabled={loading}
            onClick={async () => {
              try {
                await useAuthStore.getState().signInWithGoogle();
              } catch {
                toast.error('Error al conectar con Google');
              }
            }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </Button>

          <p className="text-center text-xs text-muted-foreground pt-2">
            ¿Ya tienes cuenta? <Link to="/login" className="text-primary hover:underline font-medium">Inicia sesión</Link>
          </p>
        </form>
      </motion.div>
    </div>);

};

export default Register;