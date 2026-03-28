import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Target, TrendingUp, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
import { SEOHead } from '@/components/SEOHead';
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

interface AnalyticsData {
  totalUsers: number;
  onboardingCompleted: number;
  totalEvents: number;
  rolesDistribution: { role: string; count: number }[];
  eventsOverTime: { date: string; count: number }[];
  topEvents: { event_type: string; count: number }[];
}

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    onboardingCompleted: 0,
    totalEvents: 0,
    rolesDistribution: [],
    eventsOverTime: [],
    topEvents: [],
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Total de usuarios
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Usuarios con onboarding completado
      const { count: onboardingCompleted } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .not('rol_profesional', 'is', null);

      // Total de eventos
      const { count: totalEvents } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true });

      // Distribución de roles
      const { data: rolesData } = await supabase
        .from('profiles')
        .select('rol_profesional')
        .not('rol_profesional', 'is', null);

      const rolesCount = rolesData?.reduce((acc: any, curr) => {
        const role = curr.rol_profesional || 'Sin definir';
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {});

      const rolesDistribution = Object.entries(rolesCount || {})
        .map(([role, count]) => ({ role, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

      // Eventos más frecuentes
      const { data: eventsData } = await supabase
        .from('analytics_events')
        .select('event_type');

      const eventsCount = eventsData?.reduce((acc: any, curr) => {
        const type = curr.event_type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      const topEvents = Object.entries(eventsCount || {})
        .map(([event_type, count]) => ({ event_type, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Eventos en los últimos 7 días
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: recentEvents } = await supabase
        .from('analytics_events')
        .select('created_at')
        .gte('created_at', sevenDaysAgo.toISOString());

      const eventsOverTime = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dateStr = date.toISOString().split('T')[0];
        
        const count = recentEvents?.filter(e => 
          e.created_at.split('T')[0] === dateStr
        ).length || 0;

        return {
          date: date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
          count
        };
      });

      setAnalytics({
        totalUsers: totalUsers || 0,
        onboardingCompleted: onboardingCompleted || 0,
        totalEvents: totalEvents || 0,
        rolesDistribution,
        eventsOverTime,
        topEvents,
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error('Error al cargar analytics');
    } finally {
      setLoading(false);
    }
  };

  const completionRate = analytics.totalUsers > 0 
    ? Math.round((analytics.onboardingCompleted / analytics.totalUsers) * 100)
    : 0;

  if (loading) {
    return (
      <div
      <SEOHead title="Panel de Administración" description="Panel de administración de MoonJab." path="/admin" noindex /> className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <Activity className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Cargando analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-heading font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">
          Analytics y estadísticas de uso de la plataforma
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usuarios Totales</p>
                <h3 className="text-3xl font-bold mt-2">{analytics.totalUsers}</h3>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Onboarding Completado</p>
                <h3 className="text-3xl font-bold mt-2">{analytics.onboardingCompleted}</h3>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Completación</p>
                <h3 className="text-3xl font-bold mt-2">{completionRate}%</h3>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Eventos Totales</p>
                <h3 className="text-3xl font-bold mt-2">{analytics.totalEvents}</h3>
              </div>
              <div className="h-12 w-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles">Roles Detectados</TabsTrigger>
          <TabsTrigger value="events">Eventos Populares</TabsTrigger>
          <TabsTrigger value="timeline">Actividad Reciente</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-heading font-bold mb-6">Distribución de Roles Profesionales</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={analytics.rolesDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, count }) => `${role}: ${count}`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.rolesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analytics.rolesDistribution.map((item, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="font-medium">{item.role}</span>
                  </div>
                  <span className="text-2xl font-bold">{item.count}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-heading font-bold mb-6">Eventos Más Frecuentes</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={analytics.topEvents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event_type" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-heading font-bold mb-6">Actividad de los Últimos 7 Días</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analytics.eventsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Eventos"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;