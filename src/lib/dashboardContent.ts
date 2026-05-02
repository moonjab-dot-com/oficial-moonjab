import { ProfessionalRole } from '@/types';
import { 
  Palette, Code, Briefcase, BarChart3, TrendingUp, 
  Users, Megaphone, FileText, Shield, GitBranch, 
  Bug, DollarSign, Lightbulb, Target, Zap, Award,
  BookOpen, Camera, Video, Mic, Heart, Building
} from 'lucide-react';

export interface RoleDashboardConfig {
  welcomeMessage: string;
  metrics: {
    id: string;
    label: string;
    icon: any;
    description: string;
  }[];
  suggestedTasks: {
    title: string;
    xp: number;
    category: string;
    action?: string;
  }[];
  resources: {
    type: string;
    title: string;
    duration: string;
    icon: string;
  }[];
}

// Helper function to create default config for roles without specific config
function getDefaultConfig(roleName: string): RoleDashboardConfig {
  return {
    welcomeMessage: `Impulsa tu carrera como ${roleName}`,
    metrics: [
      { id: 'projects', label: 'Proyectos', icon: Briefcase, description: 'Proyectos completados' },
      { id: 'skills', label: 'Habilidades', icon: Target, description: 'Habilidades desarrolladas' },
      { id: 'networking', label: 'Networking', icon: Users, description: 'Conexiones profesionales' },
      { id: 'growth', label: 'Crecimiento', icon: TrendingUp, description: 'Progreso profesional' },
    ],
    suggestedTasks: [
      { title: 'Completar proyecto clave', xp: 120, category: 'work', action: '/dashboard/goals' },
      { title: 'Desarrollar nueva habilidad', xp: 100, category: 'learning', action: '/dashboard/coach' },
      { title: 'Conectar con profesionales', xp: 80, category: 'networking', action: '/dashboard/circles' },
      { title: 'Actualizar portafolio', xp: 90, category: 'career', action: '/dashboard/cvs' },
    ],
    resources: [
      { type: 'Curso', title: 'Desarrollo profesional avanzado', duration: '4h', icon: 'book-open' },
      { type: 'Artículo', title: 'Mejores prácticas en la industria', duration: '20min', icon: 'newspaper' },
      { type: 'Video', title: 'Tendencias y futuro del sector', duration: '30min', icon: 'video' },
    ]
  };
}

export function getDashboardConfig(role: ProfessionalRole): RoleDashboardConfig {
  const configs: Record<ProfessionalRole, RoleDashboardConfig> = {
    // Design Roles
    ux_designer: {
      welcomeMessage: 'Diseña experiencias que impacten',
      metrics: [
        { id: 'research', label: 'User Research', icon: Users, description: 'Entrevistas y tests completados' },
        { id: 'prototypes', label: 'Prototipos', icon: Palette, description: 'Wireframes y prototipos creados' },
        { id: 'feedback', label: 'Feedback', icon: TrendingUp, description: 'Sesiones de validación' },
        { id: 'portfolio', label: 'Portfolio', icon: Briefcase, description: 'Proyectos documentados' },
      ],
      suggestedTasks: [
        { title: 'Realizar entrevista de usuario', xp: 100, category: 'research', action: '/dashboard/coach' },
        { title: 'Crear wireframes de nueva funcionalidad', xp: 80, category: 'design', action: '/dashboard/goals' },
        { title: 'Test de usabilidad con 5 usuarios', xp: 150, category: 'testing', action: '/dashboard/goals' },
      ],
      resources: [
        { type: 'Curso', title: 'Advanced User Research Methods', duration: '3h', icon: 'search' },
        { type: 'Artículo', title: 'Mejores prácticas en diseño', duration: '15min', icon: 'book-open' },
      ]
    },
    ui_designer: {
      welcomeMessage: 'Crea interfaces visuales impactantes',
      metrics: [
        { id: 'designs', label: 'Diseños', icon: Palette, description: 'Interfaces diseñadas' },
        { id: 'system', label: 'Design System', icon: GitBranch, description: 'Componentes en sistema' },
        { id: 'mockups', label: 'Mockups', icon: FileText, description: 'Mockups de alta fidelidad' },
        { id: 'icons', label: 'Iconografía', icon: Palette, description: 'Sets de iconos creados' },
      ],
      suggestedTasks: [
        { title: 'Diseñar componentes de UI', xp: 90, category: 'design' },
        { title: 'Crear guía de estilos visual', xp: 110, category: 'system' },
        { title: 'Diseñar set de iconos', xp: 100, category: 'icons' },
      ],
      resources: [
        { type: 'Curso', title: 'Design Systems Fundamentals', duration: '4h', icon: 'palette' },
        { type: 'Artículo', title: 'Teoría del color en UI', duration: '12min', icon: 'palette' },
      ]
    },
    product_designer: {
      welcomeMessage: 'Diseña productos de extremo a extremo',
      metrics: [
        { id: 'features', label: 'Features', icon: Briefcase, description: 'Features diseñadas' },
        { id: 'mvp', label: 'MVP', icon: TrendingUp, description: 'Validaciones de producto' },
        { id: 'metrics', label: 'Métricas', icon: BarChart3, description: 'A/B tests y análisis' },
        { id: 'strategy', label: 'Estrategia', icon: Target, description: 'Documentos estratégicos' },
      ],
      suggestedTasks: [
        { title: 'Definir MVP de nueva funcionalidad', xp: 130, category: 'strategy' },
        { title: 'Diseñar flujo completo de onboarding', xp: 140, category: 'design' },
        { title: 'Analizar métricas de conversión', xp: 90, category: 'analytics' },
      ],
      resources: [
        { type: 'Curso', title: 'Product Thinking', duration: '5h', icon: 'rocket' },
        { type: 'Artículo', title: 'Cómo priorizar features', duration: '20min', icon: 'bar-chart-3' },
      ]
    },
    graphic_designer: {
      welcomeMessage: 'Crea identidades visuales memorables',
      metrics: [
        { id: 'branding', label: 'Branding', icon: Palette, description: 'Identidades creadas' },
        { id: 'campaigns', label: 'Campañas', icon: Megaphone, description: 'Campañas diseñadas' },
        { id: 'print', label: 'Print', icon: FileText, description: 'Diseños impresos' },
        { id: 'digital', label: 'Digital', icon: Code, description: 'Assets digitales' },
      ],
      suggestedTasks: [
        { title: 'Crear identidad de marca completa', xp: 150, category: 'branding' },
        { title: 'Diseñar campaña publicitaria', xp: 120, category: 'advertising' },
        { title: 'Producir assets para redes sociales', xp: 80, category: 'digital' },
      ],
      resources: [
        { type: 'Curso', title: 'Branding Essentials', duration: '4h', icon: 'palette' },
        { type: 'Video', title: 'Typography Masterclass', duration: '35min', icon: 'video' },
      ]
    },
    industrial_designer: getDefaultConfig('Diseñador Industrial'),
    fashion_designer: getDefaultConfig('Diseñador de Moda'),

    // Development Roles
    developer_frontend: {
      welcomeMessage: 'Construye interfaces web increíbles',
      metrics: [
        { id: 'components', label: 'Componentes', icon: Code, description: 'Componentes reutilizables' },
        { id: 'features', label: 'Features', icon: GitBranch, description: 'Features implementadas' },
        { id: 'performance', label: 'Performance', icon: TrendingUp, description: 'Score de optimización' },
        { id: 'tests', label: 'Tests', icon: Bug, description: 'Cobertura de testing' },
      ],
      suggestedTasks: [
        { title: 'Implementar componente reutilizable', xp: 100, category: 'development', action: '/dashboard/goals' },
        { title: 'Optimizar rendimiento', xp: 120, category: 'performance', action: '/dashboard/coach' },
        { title: 'Agregar tests unitarios', xp: 80, category: 'testing', action: '/dashboard/goals' },
      ],
      resources: [
        { type: 'Curso', title: 'React Performance', duration: '4h', icon: 'zap' },
        { type: 'Artículo', title: 'Clean Code en JavaScript', duration: '18min', icon: 'code' },
      ]
    },
    developer_backend: {
      welcomeMessage: 'Construye APIs robustas y escalables',
      metrics: [
        { id: 'apis', label: 'APIs', icon: Code, description: 'Endpoints creados' },
        { id: 'database', label: 'Database', icon: BarChart3, description: 'Optimizaciones de BD' },
        { id: 'security', label: 'Seguridad', icon: Shield, description: 'Vulnerabilidades resueltas' },
        { id: 'scale', label: 'Escalabilidad', icon: TrendingUp, description: 'Mejoras de performance' },
      ],
      suggestedTasks: [
        { title: 'Diseñar API RESTful', xp: 120, category: 'api' },
        { title: 'Optimizar queries de BD', xp: 100, category: 'database' },
        { title: 'Implementar autenticación JWT', xp: 130, category: 'security' },
      ],
      resources: [
        { type: 'Curso', title: 'Microservices Architecture', duration: '6h', icon: 'server' },
        { type: 'Artículo', title: 'Database Best Practices', duration: '25min', icon: 'database' },
      ]
    },
    developer_fullstack: {
      welcomeMessage: 'Domina el desarrollo completo',
      metrics: [
        { id: 'frontend', label: 'Frontend', icon: Code, description: 'Features de interfaz' },
        { id: 'backend', label: 'Backend', icon: GitBranch, description: 'Servicios y APIs' },
        { id: 'integration', label: 'Integración', icon: TrendingUp, description: 'Integraciones completas' },
        { id: 'deployment', label: 'Deployment', icon: Shield, description: 'Deploys exitosos' },
      ],
      suggestedTasks: [
        { title: 'Implementar feature end-to-end', xp: 150, category: 'fullstack' },
        { title: 'Configurar CI/CD pipeline', xp: 120, category: 'devops' },
        { title: 'Optimizar aplicación completa', xp: 140, category: 'performance' },
      ],
      resources: [
        { type: 'Curso', title: 'Full-Stack Masterclass', duration: '8h', icon: 'wrench' },
        { type: 'Video', title: 'DevOps for Developers', duration: '45min', icon: 'settings' },
      ]
    },
    software_engineer: getDefaultConfig('Ingeniero de Software'),
    mobile_developer: getDefaultConfig('Desarrollador Mobile'),
    devops: {
      welcomeMessage: 'Automatiza y escala la infraestructura',
      metrics: [
        { id: 'deployments', label: 'Deploys', icon: GitBranch, description: 'Deploys exitosos' },
        { id: 'uptime', label: 'Uptime', icon: TrendingUp, description: 'Disponibilidad' },
        { id: 'automation', label: 'Automatización', icon: Code, description: 'Procesos automatizados' },
        { id: 'monitoring', label: 'Monitoring', icon: BarChart3, description: 'Alertas configuradas' },
      ],
      suggestedTasks: [
        { title: 'Configurar CI/CD pipeline', xp: 140, category: 'automation' },
        { title: 'Implementar monitoring', xp: 120, category: 'monitoring' },
        { title: 'Migrar a Kubernetes', xp: 150, category: 'infrastructure' },
      ],
      resources: [
        { type: 'Curso', title: 'DevOps Engineering', duration: '8h', icon: 'settings' },
        { type: 'Video', title: 'Kubernetes Fundamentals', duration: '50min', icon: 'container' },
      ]
    },
    qa_engineer: {
      welcomeMessage: 'Asegura la calidad del software',
      metrics: [
        { id: 'tests', label: 'Tests', icon: Bug, description: 'Tests automatizados' },
        { id: 'coverage', label: 'Cobertura', icon: TrendingUp, description: 'Cobertura de testing' },
        { id: 'bugs', label: 'Bugs', icon: Shield, description: 'Bugs encontrados' },
        { id: 'quality', label: 'Calidad', icon: BarChart3, description: 'Score de calidad' },
      ],
      suggestedTasks: [
        { title: 'Crear suite de tests E2E', xp: 130, category: 'automation' },
        { title: 'Realizar testing exploratorio', xp: 90, category: 'manual' },
        { title: 'Performance testing', xp: 120, category: 'performance' },
      ],
      resources: [
        { type: 'Curso', title: 'Test Automation', duration: '5h', icon: 'search' },
        { type: 'Artículo', title: 'QA Best Practices', duration: '18min', icon: 'check-circle' },
      ]
    },
    ml_engineer: getDefaultConfig('Ingeniero de ML'),

    // Management Roles
    project_manager: {
      welcomeMessage: 'Lidera proyectos al éxito',
      metrics: [
        { id: 'projects', label: 'Proyectos', icon: Briefcase, description: 'Proyectos completados' },
        { id: 'teams', label: 'Equipos', icon: Users, description: 'Miembros gestionados' },
        { id: 'deadlines', label: 'Entregas', icon: TrendingUp, description: 'On-time delivery' },
        { id: 'stakeholders', label: 'Stakeholders', icon: Users, description: 'Reuniones efectivas' },
      ],
      suggestedTasks: [
        { title: 'Crear roadmap trimestral', xp: 120, category: 'planning' },
        { title: 'Facilitar retrospectiva', xp: 80, category: 'team' },
        { title: 'Presentación a stakeholders', xp: 100, category: 'communication' },
      ],
      resources: [
        { type: 'Curso', title: 'Agile Project Management', duration: '5h', icon: 'bar-chart-3' },
        { type: 'Artículo', title: 'Stakeholder Management', duration: '20min', icon: 'users' },
      ]
    },
    product_manager: {
      welcomeMessage: 'Define la visión del producto',
      metrics: [
        { id: 'roadmap', label: 'Roadmap', icon: Target, description: 'Features planeadas' },
        { id: 'metrics', label: 'Métricas', icon: BarChart3, description: 'KPIs monitoreados' },
        { id: 'mvp', label: 'MVP', icon: TrendingUp, description: 'Validaciones lanzadas' },
        { id: 'insights', label: 'Insights', icon: Users, description: 'Research completado' },
      ],
      suggestedTasks: [
        { title: 'Definir OKRs del trimestre', xp: 140, category: 'strategy' },
        { title: 'Priorizar backlog con RICE', xp: 100, category: 'prioritization' },
        { title: 'Presentar roadmap', xp: 120, category: 'communication' },
      ],
      resources: [
        { type: 'Curso', title: 'Product Management', duration: '6h', icon: 'target' },
        { type: 'Artículo', title: 'Frameworks de priorización', duration: '22min', icon: 'bar-chart-3' },
      ]
    },
    scrum_master: {
      welcomeMessage: 'Facilita la agilidad del equipo',
      metrics: [
        { id: 'sprints', label: 'Sprints', icon: Briefcase, description: 'Sprints completados' },
        { id: 'velocity', label: 'Velocity', icon: TrendingUp, description: 'Velocidad del equipo' },
        { id: 'ceremonies', label: 'Ceremonias', icon: Users, description: 'Ceremonias facilitadas' },
        { id: 'impediments', label: 'Impedimentos', icon: Shield, description: 'Resueltos' },
      ],
      suggestedTasks: [
        { title: 'Facilitar sprint planning', xp: 90, category: 'facilitation' },
        { title: 'Realizar retrospectiva', xp: 80, category: 'improvement' },
        { title: 'Coaching de prácticas ágiles', xp: 110, category: 'coaching' },
      ],
      resources: [
        { type: 'Curso', title: 'Scrum Master Certification', duration: '6h', icon: 'zap' },
        { type: 'Video', title: 'Agile Coaching Skills', duration: '30min', icon: 'target' },
      ]
    },
    business_analyst: {
      welcomeMessage: 'Optimiza procesos de negocio',
      metrics: [
        { id: 'analysis', label: 'Análisis', icon: BarChart3, description: 'Análisis completados' },
        { id: 'requirements', label: 'Requisitos', icon: FileText, description: 'Documentos' },
        { id: 'processes', label: 'Procesos', icon: GitBranch, description: 'Procesos mapeados' },
        { id: 'improvements', label: 'Mejoras', icon: TrendingUp, description: 'Implementadas' },
      ],
      suggestedTasks: [
        { title: 'Análisis de proceso actual', xp: 110, category: 'analysis' },
        { title: 'Documentar requisitos', xp: 100, category: 'documentation' },
        { title: 'Crear diagrama de flujo', xp: 80, category: 'mapping' },
      ],
      resources: [
        { type: 'Curso', title: 'Business Analysis', duration: '5h', icon: 'bar-chart-3' },
        { type: 'Artículo', title: 'Requirements Gathering', duration: '18min', icon: 'file-text' },
      ]
    },

    // Data & Analytics Roles
    data_analyst: {
      welcomeMessage: 'Transforma datos en insights',
      metrics: [
        { id: 'reports', label: 'Reportes', icon: BarChart3, description: 'Reportes generados' },
        { id: 'dashboards', label: 'Dashboards', icon: TrendingUp, description: 'Dashboards activos' },
        { id: 'insights', label: 'Insights', icon: Lightbulb, description: 'Insights accionables' },
        { id: 'queries', label: 'Queries', icon: Code, description: 'Queries optimizadas' },
      ],
      suggestedTasks: [
        { title: 'Crear dashboard ejecutivo', xp: 120, category: 'visualization' },
        { title: 'Análisis de tendencias', xp: 100, category: 'analysis' },
        { title: 'Optimizar queries SQL', xp: 90, category: 'technical' },
      ],
      resources: [
        { type: 'Curso', title: 'Data Analysis with SQL', duration: '4h', icon: 'bar-chart-3' },
        { type: 'Video', title: 'Tableau Basics', duration: '30min', icon: 'palette' },
      ]
    },
    data_scientist: {
      welcomeMessage: 'Construye modelos que predicen el futuro',
      metrics: [
        { id: 'models', label: 'Modelos', icon: BarChart3, description: 'Modelos en producción' },
        { id: 'accuracy', label: 'Precisión', icon: TrendingUp, description: 'Accuracy promedio' },
        { id: 'experiments', label: 'Experimentos', icon: Code, description: 'Completados' },
        { id: 'pipelines', label: 'Pipelines', icon: GitBranch, description: 'Pipelines activos' },
      ],
      suggestedTasks: [
        { title: 'Entrenar modelo de ML', xp: 150, category: 'modeling' },
        { title: 'Feature engineering', xp: 120, category: 'preprocessing' },
        { title: 'Deploy modelo a producción', xp: 140, category: 'deployment' },
      ],
      resources: [
        { type: 'Curso', title: 'Machine Learning', duration: '8h', icon: 'bot' },
        { type: 'Artículo', title: 'Feature Engineering', duration: '25min', icon: 'settings' },
      ]
    },
    data_engineer: getDefaultConfig('Ingeniero de Datos'),
    business_intelligence: getDefaultConfig('Especialista BI'),

    // Finance & Investment Roles
    investor: {
      welcomeMessage: 'Gestiona inversiones inteligentes',
      metrics: [
        { id: 'portfolio', label: 'Portfolio', icon: BarChart3, description: 'Activos en portafolio' },
        { id: 'returns', label: 'Retornos', icon: TrendingUp, description: 'ROI promedio' },
        { id: 'analysis', label: 'Análisis', icon: Briefcase, description: 'Completados' },
        { id: 'diversification', label: 'Diversificación', icon: Target, description: 'Score' },
      ],
      suggestedTasks: [
        { title: 'Análisis fundamental de empresa', xp: 130, category: 'analysis' },
        { title: 'Rebalancear portafolio', xp: 100, category: 'portfolio' },
        { title: 'Research de mercado laboral', xp: 120, category: 'research' },
      ],
      resources: [
        { type: 'Curso', title: 'Investment Analysis', duration: '6h', icon: 'briefcase' },
        { type: 'Video', title: 'Financial Modeling', duration: '35min', icon: 'dollar-sign' },
      ]
    },
    hedge_fund: {
      welcomeMessage: 'Estrategias de inversión avanzadas',
      metrics: [
        { id: 'strategies', label: 'Estrategias', icon: Briefcase, description: 'Activas' },
        { id: 'returns', label: 'Alpha', icon: TrendingUp, description: 'Generado' },
        { id: 'risk', label: 'Riesgo', icon: Shield, description: 'Sharpe ratio' },
        { id: 'trades', label: 'Trades', icon: DollarSign, description: 'Ejecutados' },
      ],
      suggestedTasks: [
        { title: 'Backtesting de estrategia', xp: 150, category: 'strategy' },
        { title: 'Análisis de riesgo', xp: 140, category: 'risk' },
        { title: 'Implementar trading algorithm', xp: 160, category: 'quantitative' },
      ],
      resources: [
        { type: 'Curso', title: 'Quantitative Trading', duration: '10h', icon: 'trending-up' },
        { type: 'Artículo', title: 'Risk Management', duration: '30min', icon: 'shield' },
      ]
    },
    trader: getDefaultConfig('Trader'),
    financial_analyst: getDefaultConfig('Analista Financiero'),
    economist: getDefaultConfig('Economista'),
    financial_consultant: getDefaultConfig('Consultor Financiero'),

    // Marketing & Content Roles
    marketing_manager: {
      welcomeMessage: 'Impulsa el crecimiento con marketing',
      metrics: [
        { id: 'campaigns', label: 'Campañas', icon: Megaphone, description: 'Lanzadas' },
        { id: 'reach', label: 'Alcance', icon: Users, description: 'Personas alcanzadas' },
        { id: 'conversion', label: 'Conversión', icon: TrendingUp, description: 'Tasa' },
        { id: 'roi', label: 'ROI', icon: DollarSign, description: 'Retorno' },
      ],
      suggestedTasks: [
        { title: 'Planificar campaña trimestral', xp: 120, category: 'strategy' },
        { title: 'Analizar métricas de campañas', xp: 90, category: 'analytics' },
        { title: 'A/B testing de anuncios', xp: 100, category: 'optimization' },
      ],
      resources: [
        { type: 'Curso', title: 'Digital Marketing', duration: '5h', icon: 'megaphone' },
        { type: 'Video', title: 'Social Media Marketing', duration: '30min', icon: 'smartphone' },
      ]
    },
    growth_marketer: getDefaultConfig('Growth Marketer'),
    digital_strategist: getDefaultConfig('Estratega Digital'),
    community_manager: getDefaultConfig('Community Manager'),
    content_creator: {
      welcomeMessage: 'Crea contenido que inspira',
      metrics: [
        { id: 'content', label: 'Contenido', icon: FileText, description: 'Piezas publicadas' },
        { id: 'engagement', label: 'Engagement', icon: Users, description: 'Interacciones' },
        { id: 'reach', label: 'Alcance', icon: Megaphone, description: 'Impresiones' },
        { id: 'quality', label: 'Calidad', icon: Award, description: 'Score de calidad' },
      ],
      suggestedTasks: [
        { title: 'Escribir artículo de blog', xp: 100, category: 'writing' },
        { title: 'Grabar video tutorial', xp: 120, category: 'video' },
        { title: 'Crear calendario de contenido', xp: 80, category: 'planning' },
      ],
      resources: [
        { type: 'Curso', title: 'Content Marketing', duration: '4h', icon: 'pen-tool' },
        { type: 'Video', title: 'Video Production', duration: '35min', icon: 'clapperboard' },
      ]
    },
    copywriter: getDefaultConfig('Copywriter'),
    seo_specialist: getDefaultConfig('Especialista SEO'),
    social_media_manager: getDefaultConfig('Social Media Manager'),

    // Business & Strategy Roles
    entrepreneur: {
      welcomeMessage: 'Construye tu visión empresarial',
      metrics: [
        { id: 'mvp', label: 'MVP', icon: Zap, description: 'Productos lanzados' },
        { id: 'customers', label: 'Clientes', icon: Users, description: 'Clientes activos' },
        { id: 'revenue', label: 'Revenue', icon: DollarSign, description: 'Ingresos' },
        { id: 'growth', label: 'Crecimiento', icon: TrendingUp, description: 'Tasa de crecimiento' },
      ],
      suggestedTasks: [
        { title: 'Validar idea con usuarios', xp: 120, category: 'validation' },
        { title: 'Crear pitch deck', xp: 110, category: 'fundraising' },
        { title: 'Desarrollar MVP', xp: 150, category: 'product' },
      ],
      resources: [
        { type: 'Curso', title: 'Lean Startup', duration: '5h', icon: 'rocket' },
        { type: 'Artículo', title: 'Fundraising Basics', duration: '20min', icon: 'dollar-sign' },
      ]
    },
    business_consultant: getDefaultConfig('Consultor de Negocios'),
    sales_specialist: getDefaultConfig('Especialista en Ventas'),
    account_executive: getDefaultConfig('Account Executive'),

    // People & HR Roles
    hr_specialist: getDefaultConfig('Especialista en RRHH'),
    talent_acquisition: getDefaultConfig('Talent Acquisition'),
    recruiter: getDefaultConfig('Reclutador'),
    leadership_coach: getDefaultConfig('Coach de Liderazgo'),
    organizational_psychologist: getDefaultConfig('Psicólogo Organizacional'),
    mentor: getDefaultConfig('Mentor'),

    // Legal & Compliance Roles
    lawyer: getDefaultConfig('Abogado'),
    legal_advisor: getDefaultConfig('Asesor Legal'),
    compliance_officer: getDefaultConfig('Oficial de Cumplimiento'),

    // Engineering (Other) Roles
    civil_engineer: getDefaultConfig('Ingeniero Civil'),
    mechanical_engineer: getDefaultConfig('Ingeniero Mecánico'),
    electrical_engineer: getDefaultConfig('Ingeniero Eléctrico'),
    architect: getDefaultConfig('Arquitecto'),
    sustainability_consultant: getDefaultConfig('Consultor de Sostenibilidad'),

    // Healthcare & Research Roles
    healthcare_professional: getDefaultConfig('Profesional de la Salud'),
    medical_doctor: getDefaultConfig('Médico'),
    academic_researcher: getDefaultConfig('Investigador Académico'),
    laboratory_scientist: getDefaultConfig('Científico de Laboratorio'),

    // Creative & Media Roles
    photographer: {
      welcomeMessage: 'Captura momentos que cuentan historias',
      metrics: [
        { id: 'shoots', label: 'Sesiones', icon: Camera, description: 'Sesiones realizadas' },
        { id: 'portfolio', label: 'Portfolio', icon: Briefcase, description: 'Fotos en portfolio' },
        { id: 'clients', label: 'Clientes', icon: Users, description: 'Clientes activos' },
        { id: 'revenue', label: 'Revenue', icon: DollarSign, description: 'Ingresos' },
      ],
      suggestedTasks: [
        { title: 'Realizar sesión de retratos', xp: 100, category: 'photography' },
        { title: 'Editar serie de imágenes', xp: 80, category: 'editing' },
        { title: 'Actualizar portfolio online', xp: 90, category: 'portfolio' },
      ],
      resources: [
        { type: 'Curso', title: 'Photography Masterclass', duration: '6h', icon: 'camera' },
        { type: 'Video', title: 'Lightroom Editing', duration: '40min', icon: 'palette' },
      ]
    },
    videographer: getDefaultConfig('Videógrafo'),
    audiovisual_producer: getDefaultConfig('Productor Audiovisual'),
    artist: getDefaultConfig('Artista'),
    illustrator: getDefaultConfig('Ilustrador'),
    animator: getDefaultConfig('Animador'),

    // Education & Training Roles
    educator: getDefaultConfig('Educador'),
    edtech_specialist: getDefaultConfig('Especialista EdTech'),
    corporate_trainer: getDefaultConfig('Capacitador Corporativo'),
    instructional_designer: getDefaultConfig('Diseñador Instruccional'),

    // Hospitality & Culinary Roles
    chef: getDefaultConfig('Chef'),
    culinary_specialist: getDefaultConfig('Especialista Gastronómico'),
    hospitality_manager: getDefaultConfig('Gerente de Hospitalidad'),

    // General Roles
    student: {
      welcomeMessage: 'Construye tu futuro profesional',
      metrics: [
        { id: 'learning', label: 'Aprendizaje', icon: BookOpen, description: 'Cursos completados' },
        { id: 'projects', label: 'Proyectos', icon: Briefcase, description: 'Proyectos realizados' },
        { id: 'networking', label: 'Networking', icon: Users, description: 'Conexiones' },
        { id: 'skills', label: 'Habilidades', icon: Target, description: 'Desarrolladas' },
      ],
      suggestedTasks: [
        { title: 'Completar curso online', xp: 100, category: 'learning' },
        { title: 'Iniciar proyecto personal', xp: 120, category: 'portfolio' },
        { title: 'Conectar con profesionales', xp: 80, category: 'networking' },
      ],
      resources: [
        { type: 'Guía', title: 'Guía de Inicio Profesional', duration: '30min', icon: 'graduation-cap' },
        { type: 'Artículo', title: 'Construye tu Portfolio', duration: '15min', icon: 'briefcase' },
      ]
    },
    freelancer: getDefaultConfig('Freelancer'),
    corporate_executive: getDefaultConfig('Ejecutivo Corporativo'),
    independent_consultant: getDefaultConfig('Consultor Independiente'),
    career_changer: {
      welcomeMessage: 'Reinventa tu carrera profesional',
      metrics: [
        { id: 'exploration', label: 'Exploración', icon: Target, description: 'Áreas exploradas' },
        { id: 'skills', label: 'Nuevas Skills', icon: Zap, description: 'Desarrolladas' },
        { id: 'networking', label: 'Networking', icon: Users, description: 'Nuevas conexiones' },
        { id: 'progress', label: 'Progreso', icon: TrendingUp, description: 'Avance general' },
      ],
      suggestedTasks: [
        { title: 'Explorar nueva área de interés', xp: 100, category: 'exploration', action: '/dashboard/coach' },
        { title: 'Desarrollar habilidad transferible', xp: 120, category: 'skills', action: '/dashboard/goals' },
        { title: 'Conectar con mentores', xp: 90, category: 'networking', action: '/dashboard/circles' },
      ],
      resources: [
        { type: 'Guía', title: 'Guía de Transición de Carrera', duration: '40min', icon: 'refresh-cw' },
        { type: 'Curso', title: 'Finding Your New Path', duration: '3h', icon: 'target' },
      ]
    },
    other: {
      welcomeMessage: 'Descubre tu camino profesional',
      metrics: [
        { id: 'learning', label: 'Aprendizaje', icon: BookOpen, description: 'Cursos completados' },
        { id: 'networking', label: 'Networking', icon: Users, description: 'Conexiones' },
        { id: 'projects', label: 'Proyectos', icon: Briefcase, description: 'Personales' },
        { id: 'goals', label: 'Objetivos', icon: Target, description: 'Alcanzados' },
      ],
      suggestedTasks: [
        { title: 'Completar curso introductorio', xp: 100, category: 'learning' },
        { title: 'Conectar con 3 profesionales', xp: 80, category: 'networking' },
        { title: 'Actualizar CV y LinkedIn', xp: 90, category: 'career' },
      ],
      resources: [
        { type: 'Guía', title: 'Descubre tu rol profesional', duration: '30min', icon: 'compass' },
        { type: 'Video', title: 'Construyendo tu marca', duration: '25min', icon: 'target' },
      ]
    }
  };

  return configs[role] || configs.other;
}