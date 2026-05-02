import { Card } from '@/components/ui/card';
import { FileText, Mic } from 'lucide-react';

interface ProgressBarProps {
  cvCompleted: number;
  interviewsPracticed: number;
}

export function ProgressBar({
  cvCompleted = 0,
  interviewsPracticed = 0,
}: ProgressBarProps) {
  const metrics = [
    { icon: FileText, label: 'CV Completado', value: cvCompleted, max: 100 },
    { icon: Mic, label: 'Entrevistas', value: interviewsPracticed, max: 10 },
  ];

  return (
    <Card className="p-5 border-border/50">
      <h3 className="font-semibold text-sm mb-4">Tu Progreso</h3>
      <div className="space-y-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const percentage = Math.min((metric.value / metric.max) * 100, 100);

          return (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium">{metric.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {metric.value}/{metric.max}
                </span>
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
