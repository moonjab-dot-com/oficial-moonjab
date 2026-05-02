import { Bell, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettingsStore, NotificationChannel } from '@/store/useSettingsStore';
import { toast } from '@/hooks/use-toast';

export function NotificationsSection() {
  const { notifications, updateNotificationChannel } = useSettingsStore();

  const channelData = notifications.email;
  const labels: Record<keyof NotificationChannel, { title: string; description: string }> = {
    microactions: { title: 'Recordatorios de tareas', description: 'Notificaciones sobre tareas pendientes' },
    recommendations: { title: 'Recomendaciones', description: 'Sugerencias personalizadas' },
    coachMessages: { title: 'Mensajes del Coach', description: 'Notificaciones del Career Coach' },
    marketing: { title: 'Marketing y promociones', description: 'Novedades y ofertas' },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Notificaciones por Email
        </CardTitle>
        <CardDescription>Controla qué emails recibes de MoonJab</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {(Object.keys(channelData) as Array<keyof NotificationChannel>).map((category) => (
          <div key={category} className="flex items-start justify-between">
            <div className="space-y-0.5 flex-1">
              <Label className="text-sm font-medium">{labels[category].title}</Label>
              <p className="text-xs text-muted-foreground">{labels[category].description}</p>
            </div>
            <Switch
              checked={channelData[category]}
              onCheckedChange={(checked) => {
                updateNotificationChannel('email', category, checked);
                toast({
                  title: checked ? 'Notificación activada' : 'Notificación desactivada',
                  description: labels[category].title,
                });
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
