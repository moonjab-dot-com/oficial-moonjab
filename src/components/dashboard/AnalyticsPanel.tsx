import { useEffect, useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  FileText, Download, Sparkles, Mic, TrendingUp, CheckCircle2,
  Plus, ArrowRight, Target, Activity,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useCVStore } from '@/store/useCVStore';
import { useInterviewStore } from '@/store/useInterviewStore';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnalyticsEvent {
  id: string;
  event_type: string;
  created_at: string;
  event_data?: any;
}

const EVENT_LABELS: Record<string, { label: string; icon: any; color: string }> = {
  cv_created: { label: 'CV creado', icon: Plus, color: 'text-emerald-600' },
  cv_exported: { label: 'CV descargado', icon: Download, color: 'text-blue-600' },
  cv_improved: { label: 'CV mejorado con IA', icon: Sparkles, color: 'text-violet-600' },
  interview_completed: { label: 'Entrevista completada', icon: Mic, color: 'text-amber-600' },
  interview_started: { label: 'Entrevista iniciada', icon: Mic, color: 'text-amber-500' },
  onboarding_completed: { label: 'Diagnóstico completado', icon: CheckCircle2, color: 'text-emerald-600' },
  role_detected: { label: 'Rol detectado', icon: Target, color: 'text-primary' },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es', { day: '2-digit', month: 'short' });
}

function getDayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function AnalyticsPanel({ dashboardBasePath }: { dashboardBasePath: string }) {
  const { user, isGuestMode } = useAuthStore();
  const { cvs } = useCVStore();
  const { sessions } = useInterviewStore();
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const userCVs = useMemo(() => cvs.filter((cv) => cv.userId === user?.id), [cvs, user?.id]);
  const userSessions = useMemo(() => sessions.filter((s) => s.userId === user?.id), [sessions, user?.id]);
  const primaryCV = userCVs[0];
  const cvScore = primaryCV?.score?.overall || 0;

  useEffect(() => {
    if (!user || isGuestMode || user.id.startsWith('guest_')) {
      setLoading(false);
      return;
    }
    let mounted = true;
    (async () => {
      const since = new Date();
      since.setDate(since.getDate() - 30);
      const { data } = await supabase
        .from('analytics_events')
        .select('id, event_type, created_at, event_data')
        .eq('user_id', user.id)
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: false })
        .limit(100);
      if (mounted) {
        setEvents((data || []) as AnalyticsEvent[]);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user?.id, isGuestMode]);

  // KPIs
  const cvImprovements = events.filter((e) => e.event_type === 'cv_improved').length;
  const cvExports = events.filter((e) => e.event_type === 'cv_exported').length;
  const goalProgress = Math.min(
    Math.round(
      (cvScore * 0.5 +
        Math.min(userCVs.length, 3) * 10 +
        Math.min(userSessions.length, 5) * 4),
    ),
    100,
  );

  const kpis = [
    {
      label: 'CV completado',
      value: `${cvScore}%`,
      icon: TrendingUp,
      tone: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      label: 'CVs creados',
      value: userCVs.length,
      icon: FileText,
      tone: 'bg-blue-500/10 text-blue-600',
    },
    {
      label: 'Mejoras realizadas',
      value: cvImprovements + cvExports,
      icon: Sparkles,
      tone: 'bg-violet-500/10 text-violet-600',
    },
    {
      label: 'Progreso meta',
      value: `${goalProgress}%`,
      icon: Target,
      tone: 'bg-amber-500/10 text-amber-600',
    },
  ];

  // Activity chart — 7 days
  const chartData = useMemo(() => {
    const days: { date: string; label: string; ediciones: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = getDayKey(d);
      days.push({
        date: key,
        label: d.toLocaleDateString('es', { weekday: 'short' }),
        ediciones: 0,
      });
    }
    events.forEach((e) => {
      const key = e.created_at.slice(0, 10);
      const day = days.find((x) => x.date === key);
      if (day) day.ediciones += 1;
    });
    return days;
  }, [events]);

  const recent = events.slice(0, 5);

  // Recommended actions based on real progress
  const recommendations = [
    {
      done: !!primaryCV?.experience?.length,
      label: 'Completar experiencia',
      to: primaryCV ? `${dashboardBasePath}/cvs/${primaryCV.id}` : `${dashboardBasePath}/cvs`,
    },
    {
      done: (primaryCV?.skills?.length || 0) >= 3,
      label: 'Añadir al menos 3 habilidades',
      to: primaryCV ? `${dashboardBasePath}/cvs/${primaryCV.id}` : `${dashboardBasePath}/cvs`,
    },
    {
      done: cvImprovements > 0,
      label: 'Mejorar tu CV con IA',
      to: primaryCV ? `${dashboardBasePath}/cvs/${primaryCV.id}` : `${dashboardBasePath}/cvs`,
    },
    {
      done: userSessions.length > 0,
      label: 'Practicar tu primera entrevista',
      to: `${dashboardBasePath}/interviews`,
    },
  ];

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-3.5 border-border/50">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2', kpi.tone)}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-[11px] text-muted-foreground leading-tight">{kpi.label}</p>
              <p className="text-xl font-semibold tracking-tight mt-0.5">{kpi.value}</p>
            </Card>
          );
        })}
      </motion.div>

      {/* Activity chart */}
      <Card className="p-4 sm:p-5 border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Actividad (últimos 7 días)</h3>
          </div>
          <Badge variant="outline" className="text-[10px] h-5 px-1.5">
            {events.length} eventos
          </Badge>
        </div>
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line
                type="monotone"
                dataKey="ediciones"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent actions */}
        <Card className="p-4 sm:p-5 border-border/50">
          <h3 className="text-sm font-semibold mb-3">Últimas acciones</h3>
          {loading ? (
            <p className="text-xs text-muted-foreground">Cargando...</p>
          ) : recent.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-muted-foreground mb-3">Aún no hay acciones registradas</p>
              <Link to={`${dashboardBasePath}/cvs`}>
                <Button size="sm" className="h-8 text-xs gap-1">
                  <Plus className="h-3 w-3" /> Crear mi CV
                </Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {recent.map((e) => {
                const meta = EVENT_LABELS[e.event_type] || {
                  label: e.event_type.replace(/_/g, ' '),
                  icon: Activity,
                  color: 'text-muted-foreground',
                };
                const Icon = meta.icon;
                return (
                  <li key={e.id} className="flex items-center justify-between gap-2 py-1.5 border-b border-border/40 last:border-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={cn('h-3.5 w-3.5 flex-shrink-0', meta.color)} />
                      <span className="text-xs font-medium truncate">{meta.label}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground">{formatDate(e.created_at)}</span>
                      <Badge variant="outline" className="text-[9px] h-4 px-1 bg-emerald-500/5 text-emerald-700 border-emerald-200">
                        OK
                      </Badge>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* Recommended actions */}
        <Card className="p-4 sm:p-5 border-border/50">
          <h3 className="text-sm font-semibold mb-3">Próximos pasos</h3>
          <ul className="space-y-1.5">
            {recommendations.map((r) => (
              <li key={r.label}>
                <Link
                  to={r.to}
                  className={cn(
                    'flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg transition-colors',
                    r.done ? 'bg-muted/30' : 'hover:bg-primary/5',
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {r.done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                    )}
                    <span className={cn('text-xs', r.done ? 'text-muted-foreground line-through' : 'font-medium')}>
                      {r.label}
                    </span>
                  </div>
                  {!r.done && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
