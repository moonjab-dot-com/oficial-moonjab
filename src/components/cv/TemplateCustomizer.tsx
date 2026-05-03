import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Palette, RotateCcw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

interface TemplateCustomizerProps {
  open: boolean;
  onClose: () => void;
  currentColors: TemplateColors;
  onApply: (colors: TemplateColors) => void;
  template: string;
}

const defaultColorSchemes: Record<string, TemplateColors> = {
  harvard: {
    primary: '#1e3a8a',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff',
  },
  modern: {
    primary: '#6366f1',
    secondary: '#818cf8',
    accent: '#e0e7ff',
    text: '#1f2937',
    background: '#f3f4f6',
  },
  minimal: {
    primary: '#374151',
    secondary: '#6b7280',
    accent: '#9ca3af',
    text: '#333333',
    background: '#ffffff',
  },
  creative: {
    primary: '#764ba2',
    secondary: '#667eea',
    accent: '#f093fb',
    text: '#1a1a1a',
    background: '#ffffff',
  },
  executive: {
    primary: '#0069a5',
    secondary: '#404040',
    accent: '#0088cc',
    text: '#000000',
    background: '#ffffff',
  },
  tech: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f3f0ff',
    text: '#1a1a2e',
    background: '#fafafa',
  },
  elegant: {
    primary: '#c9a962',
    secondary: '#2c2c2c',
    accent: '#e8d8a8',
    text: '#2c2c2c',
    background: '#ffffff',
  },
  simple: {
    primary: '#333333',
    secondary: '#555555',
    accent: '#dddddd',
    text: '#333333',
    background: '#ffffff',
  },
  cascade: {
    primary: '#2d3748',
    secondary: '#63b3ed',
    accent: '#e2e8f0',
    text: '#2d3748',
    background: '#ffffff',
  },
  ats: {
    primary: '#000000',
    secondary: '#333333',
    accent: '#666666',
    text: '#000000',
    background: '#ffffff',
  },
  professional: {
    primary: '#1a365d',
    secondary: '#2b6cb0',
    accent: '#bee3f8',
    text: '#1a365d',
    background: '#ffffff',
  },
  bold: {
    primary: '#1a1a1a',
    secondary: '#fbbf24',
    accent: '#f7f7f7',
    text: '#1a1a1a',
    background: '#ffffff',
  },
  classic: {
    primary: '#8b7355',
    secondary: '#d4c5b5',
    accent: '#ebe4d8',
    text: '#333333',
    background: '#ffffff',
  },
};

const presetSchemes = [
  { name: 'Profesional Azul', colors: { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa', text: '#1f2937', background: '#ffffff' } },
  { name: 'Tech Verde', colors: { primary: '#059669', secondary: '#10b981', accent: '#34d399', text: '#1f2937', background: '#f0fdf4' } },
  { name: 'Creativo Púrpura', colors: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa', text: '#1f2937', background: '#faf5ff' } },
  { name: 'Ejecutivo Gris', colors: { primary: '#374151', secondary: '#4b5563', accent: '#6b7280', text: '#111827', background: '#ffffff' } },
  { name: 'Marketing Rosa', colors: { primary: '#db2777', secondary: '#ec4899', accent: '#f472b6', text: '#1f2937', background: '#fdf2f8' } },
  { name: 'Finanzas Oro', colors: { primary: '#d97706', secondary: '#f59e0b', accent: '#fbbf24', text: '#1f2937', background: '#fffbeb' } },
  { name: 'Corporate Azul', colors: { primary: '#0069a5', secondary: '#404040', accent: '#0088cc', text: '#000000', background: '#ffffff' } },
  { name: 'Developer Dark', colors: { primary: '#667eea', secondary: '#764ba2', accent: '#f3f0ff', text: '#1a1a2e', background: '#fafafa' } },
  { name: 'Elegante Dorado', colors: { primary: '#c9a962', secondary: '#2c2c2c', accent: '#e8d8a8', text: '#2c2c2c', background: '#ffffff' } },
  { name: 'ATS Classic', colors: { primary: '#000000', secondary: '#333333', accent: '#666666', text: '#000000', background: '#ffffff' } },
  { name: 'Bold Negro', colors: { primary: '#1a1a1a', secondary: '#fbbf24', accent: '#f7f7f7', text: '#1a1a1a', background: '#ffffff' } },
  { name: 'Cascade Azul', colors: { primary: '#2d3748', secondary: '#63b3ed', accent: '#e2e8f0', text: '#2d3748', background: '#ffffff' } },
  { name: 'Simple Clean', colors: { primary: '#333333', secondary: '#555555', accent: '#dddddd', text: '#333333', background: '#ffffff' } },
  { name: 'Classic Marrón', colors: { primary: '#8b7355', secondary: '#d4c5b5', accent: '#ebe4d8', text: '#333333', background: '#ffffff' } },
  { name: 'Navy Premium', colors: { primary: '#1a365d', secondary: '#2b6cb0', accent: '#bee3f8', text: '#1a365d', background: '#ffffff' } },
];

export default function TemplateCustomizer({
  open,
  onClose,
  currentColors,
  onApply,
  template,
}: TemplateCustomizerProps) {
  const [colors, setColors] = useState<TemplateColors>(currentColors);

  const handleApply = () => {
    onApply(colors);
    onClose();
  };

  const handleReset = () => {
    setColors(defaultColorSchemes[template] || defaultColorSchemes.harvard);
  };

  const applyPreset = (preset: TemplateColors) => {
    setColors(preset);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Palette className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">Personalizar Colores del Template</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Ajusta los colores para crear un diseño único y profesional
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="custom" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="custom" className="min-h-[44px]">Personalizado</TabsTrigger>
            <TabsTrigger value="presets" className="min-h-[44px]">Predefinidos</TabsTrigger>
          </TabsList>

          <TabsContent value="custom" className="space-y-4">
            <ScrollArea className="h-[300px] sm:h-[400px] pr-2 sm:pr-4">
              <div className="space-y-4">
                {/* Primary Color */}
                <div className="space-y-2">
                  <Label className="text-sm">Color Principal</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colors.primary}
                      onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                      className="w-16 sm:w-20 h-12 cursor-pointer flex-shrink-0"
                    />
                    <Input
                      type="text"
                      value={colors.primary}
                      onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                      className="flex-1 font-mono text-sm min-h-[44px]"
                      placeholder="#1e40af"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Usado para encabezados y elementos destacados
                  </p>
                </div>

                {/* Secondary Color */}
                <div className="space-y-2">
                  <Label className="text-sm">Color Secundario</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colors.secondary}
                      onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                      className="w-16 sm:w-20 h-12 cursor-pointer flex-shrink-0"
                    />
                    <Input
                      type="text"
                      value={colors.secondary}
                      onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                      className="flex-1 font-mono text-sm min-h-[44px]"
                      placeholder="#3b82f6"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Para secciones y divisores
                  </p>
                </div>

                {/* Accent Color */}
                <div className="space-y-2">
                  <Label className="text-sm">Color de Acento</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colors.accent}
                      onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                      className="w-16 sm:w-20 h-12 cursor-pointer flex-shrink-0"
                    />
                    <Input
                      type="text"
                      value={colors.accent}
                      onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                      className="flex-1 font-mono text-sm min-h-[44px]"
                      placeholder="#60a5fa"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Para detalles y elementos interactivos
                  </p>
                </div>

                {/* Text Color */}
                <div className="space-y-2">
                  <Label className="text-sm">Color de Texto</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colors.text}
                      onChange={(e) => setColors({ ...colors, text: e.target.value })}
                      className="w-16 sm:w-20 h-12 cursor-pointer flex-shrink-0"
                    />
                    <Input
                      type="text"
                      value={colors.text}
                      onChange={(e) => setColors({ ...colors, text: e.target.value })}
                      className="flex-1 font-mono text-sm min-h-[44px]"
                      placeholder="#1f2937"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Color principal del texto
                  </p>
                </div>

                {/* Background Color */}
                <div className="space-y-2">
                  <Label className="text-sm">Color de Fondo</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colors.background}
                      onChange={(e) => setColors({ ...colors, background: e.target.value })}
                      className="w-16 sm:w-20 h-12 cursor-pointer flex-shrink-0"
                    />
                    <Input
                      type="text"
                      value={colors.background}
                      onChange={(e) => setColors({ ...colors, background: e.target.value })}
                      className="flex-1 font-mono text-sm min-h-[44px]"
                      placeholder="#ffffff"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Color de fondo del documento
                  </p>
                </div>

                {/* Preview */}
                <div className="border rounded-lg p-3 sm:p-4 space-y-2" style={{ backgroundColor: colors.background }}>
                  <h3 className="font-bold text-lg sm:text-xl" style={{ color: colors.primary }}>
                    Vista Previa
                  </h3>
                  <div className="h-px" style={{ backgroundColor: colors.secondary }} />
                  <p className="text-xs sm:text-sm" style={{ color: colors.text }}>
                    Este es un texto de ejemplo con el esquema de colores seleccionado.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 sm:px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: colors.accent, color: colors.background }}>
                      Elemento de acento
                    </span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="presets">
            <ScrollArea className="h-[300px] sm:h-[400px] pr-2 sm:pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {presetSchemes.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset.colors)}
                    className="p-3 sm:p-4 border rounded-lg hover:border-primary transition-all text-left group min-h-[44px]"
                  >
                    <div className="font-medium mb-2 group-hover:text-primary transition-colors text-sm">
                      {preset.name}
                    </div>
                    <div className="flex gap-1 h-6 sm:h-8">
                      <div className="flex-1 rounded" style={{ backgroundColor: preset.colors.primary }} />
                      <div className="flex-1 rounded" style={{ backgroundColor: preset.colors.secondary }} />
                      <div className="flex-1 rounded" style={{ backgroundColor: preset.colors.accent }} />
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleReset} className="min-h-[44px] w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Restablecer
          </Button>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={onClose} className="min-h-[44px] w-full sm:w-auto">
              Cancelar
            </Button>
            <Button onClick={handleApply} className="min-h-[44px] w-full sm:w-auto">
              Aplicar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
