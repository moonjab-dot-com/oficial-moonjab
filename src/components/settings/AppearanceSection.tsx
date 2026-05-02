import { Palette, Sun, Moon, Type } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSettingsStore, ThemeMode, FontSize } from '@/store/useSettingsStore';
import { toast } from '@/hooks/use-toast';

export function AppearanceSection() {
  const { theme, fontSize, setTheme, setFontSize } = useSettingsStore();

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    toast({
      title: 'Tema actualizado',
      description: `Has cambiado al modo ${newTheme === 'light' ? 'claro' : 'oscuro'}.`,
    });
  };

  const handleFontSizeChange = (newSize: FontSize) => {
    setFontSize(newSize);
    toast({
      title: 'Tamaño de fuente actualizado',
      description: `Fuente configurada a tamaño ${newSize === 'small' ? 'pequeño' : newSize === 'normal' ? 'normal' : 'grande'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>
            <Palette className="h-5 w-5 inline mr-2" />
            Apariencia
          </CardTitle>
          <CardDescription>Personaliza cómo se ve MoonJab para ti</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tema</CardTitle>
          <CardDescription>Selecciona tu tema preferido</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={(value) => handleThemeChange(value as ThemeMode)}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors min-h-[44px]">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center gap-2 flex-1 cursor-pointer">
                <Sun className="h-4 w-4" />
                <p className="text-sm font-medium">Claro</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors min-h-[44px]">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center gap-2 flex-1 cursor-pointer">
                <Moon className="h-4 w-4" />
                <p className="text-sm font-medium">Oscuro</p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            <Type className="h-4 w-4 inline mr-2" />
            Tamaño de Fuente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={fontSize} onValueChange={(value) => handleFontSizeChange(value as FontSize)}>
            {(['small', 'normal', 'large'] as FontSize[]).map((size) => (
              <div key={size} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors min-h-[44px]">
                <RadioGroupItem value={size} id={size} />
                <Label htmlFor={size} className="flex-1 cursor-pointer">
                  <p className="text-sm font-medium capitalize">{size === 'small' ? 'Pequeño' : size === 'normal' ? 'Normal' : 'Grande'}</p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
