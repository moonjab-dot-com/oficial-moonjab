import { SEOHead } from '@/components/SEOHead';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCVStore } from '@/store/useCVStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, Plus, MoreVertical, Download, Copy, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function CVList() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cvs, seedInitialData, deleteCV, duplicateCV } = useCVStore();
  const [userCVs, setUserCVs] = useState(cvs.filter((cv) => cv.userId === user?.id));

  useEffect(() => {
    if (user) seedInitialData(user.id);
  }, [user, seedInitialData]);

  useEffect(() => {
    setUserCVs(cvs.filter((cv) => cv.userId === user?.id));
  }, [cvs, user]);

  const handleDelete = (id: string) => {
    deleteCV(id);
    toast({ title: 'CV eliminado', description: 'El CV ha sido eliminado correctamente' });
  };

  const handleDuplicate = (id: string) => {
    const newCV = duplicateCV(id);
    toast({ title: 'CV duplicado', description: 'Se ha creado una copia del CV' });
    navigate(`/dashboard/cvs/${newCV.id}`);
  };

  const getTemplateLabel = (template: string) => {
    const labels: Record<string, string> = { harvard: 'Profesional', modern: 'Moderno', minimal: 'Minimal', creative: 'Creativo' };
    return labels[template] || template;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <SEOHead title="Mis CVs" description="Gestiona todos tus currículums en un solo lugar." path="/cv" noindex />
      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tus CVs</h1>
          <p className="text-sm text-muted-foreground mt-1">Crea y gestiona tus currículums profesionales</p>
        </div>
        <Button onClick={() => navigate('/dashboard/cvs/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo CV
        </Button>
      </motion.div>

      {userCVs.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-12 text-center border-border/40 border-dashed">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Aún no tienes CVs</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              Crea tu primer CV profesional y comienza a destacar
            </p>
            <Button onClick={() => navigate('/dashboard/cvs/new')} className="gap-2">
              <Plus className="h-4 w-4" />
              Crear mi primer CV
            </Button>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userCVs.map((cv, i) => (
            <motion.div
              key={cv.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="p-5 border-border/40 hover:border-primary/20 hover:shadow-clovely-md transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/dashboard/cvs/${cv.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/8">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/cvs/${cv.id}`); }}>
                        <FileText className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDuplicate(cv.id); }}>
                        <Copy className="mr-2 h-4 w-4" /> Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast({ title: 'Exportar PDF', description: 'Próximamente' }); }}>
                        <Download className="mr-2 h-4 w-4" /> Descargar PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDelete(cv.id); }} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">{cv.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                  {cv.personal.fullName || 'Sin nombre'} · {cv.personal.title || 'Sin título'}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">{getTemplateLabel(cv.template)}</Badge>
                  <Badge
                    variant={cv.score.overall >= 75 ? 'default' : 'secondary'}
                    className="ml-auto text-xs"
                  >
                    {cv.score.overall}%
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground">
                  Actualizado {new Date(cv.updatedAt).toLocaleDateString('es-ES')}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
