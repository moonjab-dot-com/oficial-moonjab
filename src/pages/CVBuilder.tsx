import { SEOHead } from '@/components/SEOHead';
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCVStore } from '@/store/useCVStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, Save, Sparkles, Download, History, Palette, GitCompare, MoreVertical, Layout } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CVEditorPanel from '@/components/cv/CVEditorPanel';
import CVPreviewPanel from '@/components/cv/CVPreviewPanel';
import TemplateSelector from '@/components/cv/TemplateSelector';
import AIAnalysisModal from '@/components/cv/AIAnalysisModal';
import VersionHistoryModal from '@/components/cv/VersionHistoryModal';
import VersionCompareModal from '@/components/cv/VersionCompareModal';

import TemplateCustomizer, { TemplateColors } from '@/components/cv/TemplateCustomizer';
import { cn } from '@/lib/utils';
import { useAI } from '@/hooks/useAI';
import { useIsMobile } from '@/hooks/use-mobile';
import html2pdf from 'html2pdf.js';

export default function CVBuilder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cvs, currentCV, loadCV, setCurrentCV, createCV, updateCV, saveVersion, analyzeCV, isAnalyzing } = useCVStore();
  const { improveText, analyzeCV: analyzeCVintense, isLoading: isAILoading } = useAI();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [isSaving, setIsSaving] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showVersionCompare, setShowVersionCompare] = useState(false);
  const [showTemplateCustomizer, setShowTemplateCustomizer] = useState(false);
  const [templateColors, setTemplateColors] = useState<TemplateColors>({
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    text: '#1f2937',
    background: '#ffffff',
  });
  const previewRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (id === 'new') {
      if (user) {
        const newCV = createCV(user.id, 'Nuevo CV');
        navigate(`/dashboard/cvs/${newCV.id}`, { replace: true });
      }
    } else if (id) {
      loadCV(id);
    }

    return () => {
      setCurrentCV(null);
    };
  }, [id, user, loadCV, createCV, setCurrentCV, navigate]);

  const handleSave = async () => {
    if (!currentCV) return;
    
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    updateCV(currentCV.id, { updatedAt: new Date().toISOString() });
    
    toast({
      title: 'CV guardado',
      description: 'Los cambios se han guardado correctamente',
    });
    
    setIsSaving(false);
  };

  const handleSaveVersion = () => {
    if (!currentCV) return;
    
    const note = prompt('Nota para esta versión (opcional):');
    saveVersion(currentCV.id, note || undefined);
    
    toast({
      title: 'Versión guardada',
      description: 'Se ha creado una nueva versión del CV',
    });
  };

  const handleAnalyze = async () => {
    if (!currentCV) return;
    
    if (isGuestMode || user?.plan !== 'premium') {
      toast({
        title: 'Función Premium',
        description: 'Suscríbete al plan Pro por $15/mes para analizar tu CV con IA.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const analysis = await analyzeCVintense(currentCV, currentCV.personal.title);
      setAnalysisData(analysis);
      setShowAnalysis(true);
      
      toast({
        title: 'Análisis completado',
        description: 'Revisa las sugerencias personalizadas para mejorar tu CV',
      });
    } catch (error) {
      console.error('Error analyzing CV:', error);
    }
  };

  const handleImproveText = async (
    text: string,
    type: 'summary' | 'experience' | 'education' | 'general',
    context?: string
  ) => {
    try {
      const improved = await improveText(text, type, context);
      return improved;
    } catch (error) {
      console.error('Error improving text:', error);
      throw error;
    }
  };

  const { isGuestMode } = useAuthStore();

  const handleExportPDF = () => {
    // Block export for guest mode / non-premium users
    if (isGuestMode || user?.plan !== 'premium') {
      toast({
        title: 'Función Premium',
        description: 'Suscríbete al plan Pro por $15/mes para descargar tus CVs en PDF.',
        variant: 'destructive',
      });
      return;
    }

    if (!previewRef.current || !currentCV) return;

    const element = previewRef.current;
    const fileName = `${currentCV.title || 'CV'}_${currentCV.personal.fullName || 'sin-nombre'}.pdf`;

    const defaultSettings = {
      format: 'a4',
      marginTop: 10,
      marginRight: 10,
      marginBottom: 10,
      marginLeft: 10,
      highQuality: true,
      includeColors: true,
    };

    const opt = {
      margin: [defaultSettings.marginTop, defaultSettings.marginRight, defaultSettings.marginBottom, defaultSettings.marginLeft] as [number, number, number, number],
      filename: fileName,
      image: { type: 'jpeg' as const, quality: defaultSettings.highQuality ? 0.98 : 0.85 },
      html2canvas: { 
        scale: defaultSettings.highQuality ? 2 : 1, 
        useCORS: true, 
        letterRendering: true,
        backgroundColor: defaultSettings.includeColors ? null : '#ffffff',
      },
      jsPDF: { 
        unit: 'mm', 
        format: defaultSettings.format, 
        orientation: 'portrait' as const
      },
    };

    toast({
      title: 'Generando PDF',
      description: 'Por favor espera un momento...',
    });

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        toast({
          title: 'PDF exportado',
          description: `Tu CV ha sido descargado como ${fileName}`,
        });
      })
      .catch((error: any) => {
        console.error('Error exporting PDF:', error);
        toast({
          title: 'Error al exportar',
          description: 'Hubo un problema al generar el PDF',
          variant: 'destructive',
        });
      });
  };

  if (!currentCV) {
    return (
      <div className="flex items-center justify-center h-screen">
      <SEOHead title="Editor de CV" description="Crea y edita tu CV profesional con el editor inteligente de MoonJab." path="/cv/edit" noindex />
        <div className="animate-pulse text-muted-foreground">Cargando CV...</div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card/80 backdrop-blur-md shadow-clovely-md sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/cvs')} className="min-h-[44px] min-w-[44px] flex-shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0 flex-1">
              <input
                type="text"
                value={currentCV.title}
                onChange={(e) => updateCV(currentCV.id, { title: e.target.value })}
                className="text-base sm:text-xl font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 w-full truncate"
              />
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {currentCV.personal.fullName || 'Sin nombre'}
              </p>
            </div>
          </div>

          {isMobile ? (
            /* Mobile: Dropdown Menu */
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="premium" onClick={handleSave} disabled={isSaving} size="sm" className="min-h-[44px]">
                <Save className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{isSaving ? 'Guardando...' : 'Guardar'}</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px]">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleAnalyze} disabled={isAILoading}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isAILoading ? 'Analizando...' : 'Analizar con IA'}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={handleExportPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="px-2 py-1.5">
                    <div className="flex items-center text-sm mb-1.5">
                      <Layout className="mr-2 h-4 w-4" />
                      <span>Template</span>
                    </div>
                    <TemplateSelector 
                      value={currentCV.template} 
                      onChange={(template) => updateCV(currentCV.id, { template })} 
                      compact
                    />
                  </div>
                  
                  <DropdownMenuItem onClick={() => setShowTemplateCustomizer(true)}>
                    <Palette className="mr-2 h-4 w-4" />
                    Personalizar colores
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => setShowVersionHistory(true)}>
                    <History className="mr-2 h-4 w-4" />
                    Ver historial
                  </DropdownMenuItem>
                  
                  {currentCV.versions.length > 0 && (
                    <DropdownMenuItem onClick={() => setShowVersionCompare(true)}>
                      <GitCompare className="mr-2 h-4 w-4" />
                      Comparar versiones
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem onClick={handleSaveVersion}>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar versión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* Desktop: All Buttons */
            <div className="flex items-center gap-3">
              <TemplateSelector
                value={currentCV.template}
                onChange={(template) => updateCV(currentCV.id, { template })}
              />
              
              <Button variant="outline" size="icon" onClick={() => setShowTemplateCustomizer(true)} title="Personalizar colores" className="shadow-clovely-sm min-h-[44px] min-w-[44px]">
                <Palette className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" onClick={() => setShowVersionHistory(true)} className="shadow-clovely-sm min-h-[44px]">
                <History className="mr-2 h-4 w-4" />
                Historial
              </Button>
              
              {currentCV.versions.length > 0 && (
                <Button variant="outline" onClick={() => setShowVersionCompare(true)} className="shadow-clovely-sm min-h-[44px]">
                  <GitCompare className="mr-2 h-4 w-4" />
                  Comparar
                </Button>
              )}
              
              <Button variant="outline" onClick={handleSaveVersion} className="shadow-clovely-sm min-h-[44px]">
                Guardar versión
              </Button>
              
              <Button variant="outline" onClick={handleAnalyze} disabled={isAILoading} className="shadow-clovely-sm min-h-[44px]">
                <Sparkles className="mr-2 h-4 w-4" />
                {isAILoading ? 'Analizando...' : 'Analizar'}
              </Button>
              
              <Button variant="outline" onClick={handleExportPDF} className="shadow-clovely-sm min-h-[44px]">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              
              <Button variant="premium" onClick={handleSave} disabled={isSaving} className="shadow-clovely-glow min-h-[44px]">
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View Switcher */}
      <div className="md:hidden border-b bg-card px-4 py-2">
        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)}>
          <TabsList className="w-full">
            <TabsTrigger value="editor" className="flex-1 min-h-[44px]">
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1 min-h-[44px]">
              Vista previa
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4 p-2 sm:p-4">
          {/* Editor Panel */}
          <div className={cn(
            "overflow-auto",
            activeView === 'preview' && "hidden md:block"
          )}>
            <CVEditorPanel 
              cv={currentCV} 
              onUpdate={(updates) => updateCV(currentCV.id, updates)}
              onImproveText={handleImproveText}
              isAILoading={isAILoading}
            />
          </div>

          {/* Preview Panel */}
          <div className={cn(
            "overflow-auto",
            activeView === 'editor' && "hidden md:block"
          )}>
            <CVPreviewPanel ref={previewRef} cv={currentCV} />
          </div>
        </div>
      </div>

      {/* AI Analysis Modal */}
      {showAnalysis && analysisData && (
        <AIAnalysisModal
          open={showAnalysis}
          onClose={() => setShowAnalysis(false)}
          analysisData={analysisData}
          onApplySuggestion={(suggestion) => {
            toast({ title: 'Sugerencia guardada', description: suggestion });
          }}
        />
      )}

      {/* Version History Modal */}
      {showVersionHistory && currentCV && (
        <VersionHistoryModal
          open={showVersionHistory}
          onClose={() => setShowVersionHistory(false)}
          versions={currentCV.versions}
          onRestore={(versionId) => {
            saveVersion(currentCV.id, 'Backup antes de restaurar');
            useCVStore.getState().restoreVersion(currentCV.id, versionId);
            toast({
              title: 'Versión restaurada',
              description: 'Se ha restaurado la versión seleccionada',
            });
          }}
          onDelete={(versionId) => {
            const updatedVersions = currentCV.versions.filter(v => v.versionId !== versionId);
            updateCV(currentCV.id, { versions: updatedVersions });
            toast({
              title: 'Versión eliminada',
              description: 'La versión ha sido eliminada',
            });
          }}
        />
      )}

      {/* Version Compare Modal */}
      {showVersionCompare && currentCV && (
        <VersionCompareModal
          open={showVersionCompare}
          onClose={() => setShowVersionCompare(false)}
          currentCV={currentCV}
          versions={currentCV.versions}
        />
      )}


      {/* Template Customizer Modal */}
      {showTemplateCustomizer && currentCV && (
        <TemplateCustomizer
          open={showTemplateCustomizer}
          onClose={() => setShowTemplateCustomizer(false)}
          currentColors={templateColors}
          onApply={(colors) => {
            setTemplateColors(colors);
            toast({
              title: 'Colores aplicados',
              description: 'El esquema de colores ha sido actualizado',
            });
          }}
          template={currentCV.template}
        />
      )}
    </div>
  );
}
