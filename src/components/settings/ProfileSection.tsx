import { useState } from 'react';
import { User, Mail, Phone, Linkedin, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(50, 'Máximo 50 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  linkedin: z.string().url('URL inválida').optional().or(z.literal('')),
});

export function ProfileSection() {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    linkedin: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    try {
      profileSchema.parse(formData);
      setErrors({});
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      updateUser({ name: formData.name, email: formData.email });
      toast({ title: 'Perfil actualizado', description: 'Tus cambios han sido guardados.' });
      setIsEditing(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil Personal</CardTitle>
        <CardDescription>Administra tu información personal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="h-20 w-20 flex-shrink-0">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-lg">{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Button variant="outline" size="sm" disabled className="min-h-[44px] w-full sm:w-auto">
              <Camera className="h-4 w-4 mr-2" /> Cambiar foto
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name"><User className="h-4 w-4 inline mr-2" />Nombre completo</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} disabled={!isEditing} className={`min-h-[44px] ${errors.name ? 'border-destructive' : ''}`} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email"><Mail className="h-4 w-4 inline mr-2" />Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} disabled={!isEditing} className={`min-h-[44px] ${errors.email ? 'border-destructive' : ''}`} />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone"><Phone className="h-4 w-4 inline mr-2" />Teléfono (opcional)</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} disabled={!isEditing} placeholder="+51 999 999 999" className="min-h-[44px]" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="linkedin"><Linkedin className="h-4 w-4 inline mr-2" />LinkedIn (opcional)</Label>
            <Input id="linkedin" type="url" value={formData.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} disabled={!isEditing} placeholder="https://linkedin.com/in/tu-perfil" className={`min-h-[44px] ${errors.linkedin ? 'border-destructive' : ''}`} />
            {errors.linkedin && <p className="text-xs text-destructive">{errors.linkedin}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} disabled={isSaving} className="min-h-[44px] w-full sm:w-auto">{isSaving ? 'Guardando...' : 'Guardar cambios'}</Button>
              <Button variant="outline" onClick={() => { setIsEditing(false); setErrors({}); setFormData({ name: user?.name || '', email: user?.email || '', phone: '', linkedin: '' }); }} disabled={isSaving} className="min-h-[44px] w-full sm:w-auto">Cancelar</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="min-h-[44px] w-full sm:w-auto">Editar perfil</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
