import { ProfessionalRole, RolePreferences } from '@/types';

export interface RoleDefinition {
  id: ProfessionalRole;
  label: string;
  icon: string;
  description: string;
  keywords: string[];
  toolKeywords: string[];
  skillKeywords: string[];
  category: 'design' | 'development' | 'management' | 'business' | 'data' | 'finance' | 'marketing' | 'people' | 'legal' | 'engineering' | 'healthcare' | 'creative' | 'education' | 'hospitality' | 'general' | 'other';
}

export const PROFESSIONAL_ROLES: RoleDefinition[] = [
  // Design
  {
    id: 'ux_designer',
    label: 'Diseñador UX',
    icon: 'palette',
    description: 'Especializado en experiencia de usuario, investigación y usabilidad',
    keywords: ['ux', 'experiencia', 'usuario', 'usabilidad', 'research', 'investigación', 'wireframes', 'prototipos'],
    toolKeywords: ['figma', 'sketch', 'adobe xd', 'miro', 'optimal workshop', 'useberry'],
    skillKeywords: ['user research', 'usability testing', 'wireframing', 'prototyping', 'user flows'],
    category: 'design'
  },
  {
    id: 'ui_designer',
    label: 'Diseñador UI',
    icon: 'layout-template',
    description: 'Enfocado en diseño visual, interfaces y sistemas de diseño',
    keywords: ['ui', 'visual', 'interfaz', 'diseño gráfico', 'branding', 'componentes', 'design system'],
    toolKeywords: ['figma', 'sketch', 'adobe illustrator', 'photoshop', 'principle'],
    skillKeywords: ['visual design', 'typography', 'color theory', 'design systems', 'iconography'],
    category: 'design'
  },
  {
    id: 'product_designer',
    label: 'Product Designer',
    icon: 'rocket',
    description: 'Combina UX, UI y visión de producto para diseñar experiencias completas',
    keywords: ['product design', 'producto', 'end-to-end', 'estrategia', 'mvp', 'iteración'],
    toolKeywords: ['figma', 'sketch', 'framer', 'principle', 'notion', 'jira'],
    skillKeywords: ['product thinking', 'user research', 'visual design', 'prototyping', 'a/b testing'],
    category: 'design'
  },
  {
    id: 'graphic_designer',
    label: 'Diseñador Gráfico',
    icon: 'image',
    description: 'Crea diseños visuales para branding, publicidad y medios',
    keywords: ['gráfico', 'branding', 'identidad', 'publicidad', 'ilustración', 'composición'],
    toolKeywords: ['adobe illustrator', 'photoshop', 'indesign', 'canva', 'coreldraw'],
    skillKeywords: ['branding', 'typography', 'layout design', 'print design', 'visual identity'],
    category: 'design'
  },
  {
    id: 'industrial_designer',
    label: 'Diseñador Industrial',
    icon: 'factory',
    description: 'Diseña productos físicos y objetos manufacturados',
    keywords: ['industrial', 'producto físico', 'manufactura', 'prototipado', '3d', 'ergonomía'],
    toolKeywords: ['solidworks', 'rhino', 'autocad', 'fusion 360', 'keyshot'],
    skillKeywords: ['3d modeling', 'prototyping', 'ergonomics', 'manufacturing', 'materials'],
    category: 'design'
  },
  {
    id: 'fashion_designer',
    label: 'Diseñador de Moda',
    icon: 'scissors',
    description: 'Crea diseños de vestuario y tendencias de moda',
    keywords: ['moda', 'vestuario', 'textil', 'tendencias', 'colecciones', 'patronaje'],
    toolKeywords: ['adobe illustrator', 'clo3d', 'photoshop', 'marvelous designer'],
    skillKeywords: ['fashion illustration', 'pattern making', 'textile design', 'trend forecasting'],
    category: 'design'
  },

  // Development
  {
    id: 'developer_frontend',
    label: 'Desarrollador Frontend',
    icon: 'code',
    description: 'Especializado en desarrollo de interfaces web y mobile',
    keywords: ['frontend', 'web', 'desarrollo', 'código', 'interfaces', 'responsive', 'componentes'],
    toolKeywords: ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'tailwind'],
    skillKeywords: ['javascript', 'react', 'css', 'html', 'responsive design', 'web performance'],
    category: 'development'
  },
  {
    id: 'developer_backend',
    label: 'Desarrollador Backend',
    icon: 'server',
    description: 'Enfocado en APIs, bases de datos y lógica del servidor',
    keywords: ['backend', 'servidor', 'api', 'base de datos', 'arquitectura', 'microservicios'],
    toolKeywords: ['node', 'python', 'java', 'postgresql', 'mongodb', 'redis', 'docker', 'kubernetes'],
    skillKeywords: ['api design', 'databases', 'system design', 'security', 'scalability'],
    category: 'development'
  },
  {
    id: 'developer_fullstack',
    label: 'Desarrollador Fullstack',
    icon: 'wrench',
    description: 'Maneja tanto frontend como backend',
    keywords: ['fullstack', 'full stack', 'completo', 'frontend', 'backend', 'end-to-end'],
    toolKeywords: ['react', 'node', 'typescript', 'postgresql', 'mongodb', 'docker'],
    skillKeywords: ['javascript', 'databases', 'api design', 'react', 'system design'],
    category: 'development'
  },
  {
    id: 'software_engineer',
    label: 'Ingeniero de Software',
    icon: 'terminal',
    description: 'Desarrolla sistemas de software complejos y escalables',
    keywords: ['software', 'ingeniería', 'arquitectura', 'sistemas', 'código', 'desarrollo'],
    toolKeywords: ['java', 'python', 'c++', 'git', 'kubernetes', 'aws', 'microservices'],
    skillKeywords: ['system design', 'algorithms', 'software architecture', 'clean code', 'testing'],
    category: 'development'
  },
  {
    id: 'mobile_developer',
    label: 'Desarrollador Mobile',
    icon: 'smartphone',
    description: 'Especializado en aplicaciones móviles iOS y Android',
    keywords: ['mobile', 'móvil', 'ios', 'android', 'app', 'nativo', 'híbrido'],
    toolKeywords: ['react native', 'flutter', 'swift', 'kotlin', 'xcode', 'android studio'],
    skillKeywords: ['mobile development', 'ios', 'android', 'app architecture', 'mobile ui'],
    category: 'development'
  },
  {
    id: 'devops',
    label: 'DevOps Engineer',
    icon: 'refresh-cw',
    description: 'Gestiona infraestructura, CI/CD y automatización',
    keywords: ['devops', 'infraestructura', 'deployment', 'automatización', 'cloud', 'containers'],
    toolKeywords: ['docker', 'kubernetes', 'jenkins', 'terraform', 'aws', 'azure', 'github actions'],
    skillKeywords: ['ci/cd', 'docker', 'kubernetes', 'cloud platforms', 'infrastructure as code'],
    category: 'development'
  },
  {
    id: 'qa_engineer',
    label: 'QA Engineer',
    icon: 'search',
    description: 'Asegura la calidad mediante testing y automatización',
    keywords: ['qa', 'testing', 'calidad', 'automatización', 'bugs', 'pruebas'],
    toolKeywords: ['selenium', 'cypress', 'jira', 'postman', 'jest', 'pytest'],
    skillKeywords: ['test automation', 'manual testing', 'bug tracking', 'test planning', 'qa methodologies'],
    category: 'development'
  },
  {
    id: 'ml_engineer',
    label: 'Ingeniero de Machine Learning',
    icon: 'bot',
    description: 'Implementa y despliega modelos de ML en producción',
    keywords: ['machine learning', 'ml', 'ai', 'modelos', 'deep learning', 'mlops'],
    toolKeywords: ['tensorflow', 'pytorch', 'python', 'kubernetes', 'mlflow', 'sagemaker'],
    skillKeywords: ['machine learning', 'deep learning', 'model deployment', 'mlops', 'python'],
    category: 'development'
  },

  // Management
  {
    id: 'project_manager',
    label: 'Project Manager',
    icon: 'bar-chart-3',
    description: 'Gestiona proyectos, equipos y entregables',
    keywords: ['gestión', 'proyectos', 'coordinación', 'planificación', 'stakeholders', 'deadlines'],
    toolKeywords: ['jira', 'asana', 'trello', 'microsoft project', 'notion', 'slack'],
    skillKeywords: ['project management', 'agile', 'scrum', 'stakeholder management', 'risk management'],
    category: 'management'
  },
  {
    id: 'product_manager',
    label: 'Product Manager',
    icon: 'target',
    description: 'Define la visión y estrategia del producto',
    keywords: ['producto', 'estrategia', 'roadmap', 'priorización', 'métricas', 'kpis', 'mvp'],
    toolKeywords: ['jira', 'productboard', 'amplitude', 'mixpanel', 'figma', 'miro'],
    skillKeywords: ['product strategy', 'roadmap', 'prioritization', 'analytics', 'user stories'],
    category: 'management'
  },
  {
    id: 'scrum_master',
    label: 'Scrum Master',
    icon: 'zap',
    description: 'Facilita procesos ágiles y mejora continua del equipo',
    keywords: ['scrum', 'agile', 'facilitación', 'retrospectivas', 'sprints', 'ceremonies'],
    toolKeywords: ['jira', 'miro', 'confluence', 'slack', 'zoom'],
    skillKeywords: ['scrum', 'agile methodologies', 'facilitation', 'team coaching', 'impediment removal'],
    category: 'management'
  },
  {
    id: 'business_analyst',
    label: 'Business Analyst',
    icon: 'clipboard-list',
    description: 'Analiza procesos y requisitos de negocio',
    keywords: ['análisis', 'negocio', 'procesos', 'requisitos', 'optimización', 'stakeholders'],
    toolKeywords: ['excel', 'visio', 'jira', 'confluence', 'tableau', 'sql'],
    skillKeywords: ['business analysis', 'requirements gathering', 'process mapping', 'stakeholder management'],
    category: 'management'
  },

  // Data & Analytics
  {
    id: 'data_analyst',
    label: 'Analista de Datos',
    icon: 'trending-up',
    description: 'Analiza datos y genera insights para decisiones de negocio',
    keywords: ['datos', 'análisis', 'métricas', 'insights', 'reportes', 'visualización', 'bi'],
    toolKeywords: ['excel', 'sql', 'tableau', 'power bi', 'python', 'r', 'google analytics'],
    skillKeywords: ['sql', 'data visualization', 'statistics', 'excel', 'business intelligence'],
    category: 'data'
  },
  {
    id: 'data_scientist',
    label: 'Data Scientist',
    icon: 'microscope',
    description: 'Especializado en machine learning, modelado predictivo y análisis avanzado',
    keywords: ['ciencia de datos', 'machine learning', 'ml', 'ai', 'modelos', 'predicción', 'algoritmos'],
    toolKeywords: ['python', 'r', 'tensorflow', 'pytorch', 'jupyter', 'spark', 'scikit-learn'],
    skillKeywords: ['machine learning', 'python', 'statistics', 'data modeling', 'deep learning'],
    category: 'data'
  },
  {
    id: 'data_engineer',
    label: 'Ingeniero de Datos',
    icon: 'database',
    description: 'Construye pipelines y arquitecturas de datos',
    keywords: ['datos', 'pipelines', 'etl', 'data warehouse', 'big data', 'arquitectura'],
    toolKeywords: ['spark', 'kafka', 'airflow', 'sql', 'python', 'aws', 'snowflake'],
    skillKeywords: ['data pipelines', 'etl', 'sql', 'big data', 'data architecture'],
    category: 'data'
  },
  {
    id: 'business_intelligence',
    label: 'Especialista BI',
    icon: 'lightbulb',
    description: 'Transforma datos en insights de negocio mediante dashboards',
    keywords: ['bi', 'business intelligence', 'dashboards', 'reportes', 'kpis', 'métricas'],
    toolKeywords: ['tableau', 'power bi', 'looker', 'sql', 'excel'],
    skillKeywords: ['data visualization', 'sql', 'dashboard design', 'business analysis', 'kpi tracking'],
    category: 'data'
  },

  // Finance & Investment
  {
    id: 'investor',
    label: 'Inversionista',
    icon: 'dollar-sign',
    description: 'Gestiona inversiones y análisis financiero',
    keywords: ['inversión', 'finanzas', 'portafolio', 'análisis financiero', 'mercados', 'activos'],
    toolKeywords: ['bloomberg', 'excel', 'python', 'tableau', 'powerpoint'],
    skillKeywords: ['financial analysis', 'portfolio management', 'valuation', 'market research'],
    category: 'finance'
  },
  {
    id: 'hedge_fund',
    label: 'Hedge Fund Manager',
    icon: 'line-chart',
    description: 'Gestiona fondos de inversión con estrategias avanzadas',
    keywords: ['hedge fund', 'trading', 'derivados', 'riesgo', 'estrategias', 'arbitraje'],
    toolKeywords: ['bloomberg', 'python', 'matlab', 'excel', 'risk systems'],
    skillKeywords: ['quantitative analysis', 'risk management', 'trading strategies', 'derivatives'],
    category: 'finance'
  },
  {
    id: 'trader',
    label: 'Trader',
    icon: 'candlestick-chart',
    description: 'Ejecuta operaciones de compra y venta en mercados financieros',
    keywords: ['trading', 'mercados', 'acciones', 'forex', 'criptomonedas', 'análisis técnico'],
    toolKeywords: ['metatrader', 'thinkorswim', 'tradingview', 'bloomberg', 'python'],
    skillKeywords: ['technical analysis', 'risk management', 'market timing', 'trading psychology'],
    category: 'finance'
  },
  {
    id: 'financial_analyst',
    label: 'Analista Financiero',
    icon: 'bar-chart-3',
    description: 'Analiza estados financieros y evalúa inversiones',
    keywords: ['análisis', 'finanzas', 'estados financieros', 'valuación', 'presupuesto'],
    toolKeywords: ['excel', 'bloomberg', 'capital iq', 'python', 'tableau'],
    skillKeywords: ['financial modeling', 'valuation', 'financial statements', 'forecasting'],
    category: 'finance'
  },
  {
    id: 'economist',
    label: 'Economista',
    icon: 'line-chart',
    description: 'Analiza fenómenos económicos y genera pronósticos',
    keywords: ['economía', 'macroeconomía', 'política económica', 'pronósticos', 'investigación'],
    toolKeywords: ['stata', 'r', 'python', 'excel', 'eviews'],
    skillKeywords: ['economic analysis', 'econometrics', 'forecasting', 'policy analysis'],
    category: 'finance'
  },
  {
    id: 'financial_consultant',
    label: 'Consultor Financiero',
    icon: 'briefcase',
    description: 'Asesora en planificación financiera y estrategias de inversión',
    keywords: ['consultoría', 'finanzas', 'asesoría', 'planificación', 'patrimonial'],
    toolKeywords: ['excel', 'powerpoint', 'financial planning software'],
    skillKeywords: ['financial planning', 'client advisory', 'investment strategies', 'wealth management'],
    category: 'finance'
  },

  // Marketing & Content
  {
    id: 'marketing_manager',
    label: 'Marketing Manager',
    icon: 'megaphone',
    description: 'Gestiona estrategias de marketing y campañas',
    keywords: ['marketing', 'campañas', 'branding', 'digital', 'contenido', 'redes sociales', 'seo'],
    toolKeywords: ['google analytics', 'hubspot', 'mailchimp', 'canva', 'hootsuite', 'semrush'],
    skillKeywords: ['digital marketing', 'content strategy', 'seo', 'social media', 'analytics'],
    category: 'marketing'
  },
  {
    id: 'growth_marketer',
    label: 'Growth Marketer',
    icon: 'rocket',
    description: 'Optimiza el crecimiento mediante experimentos y métricas',
    keywords: ['growth', 'crecimiento', 'hacking', 'experimentos', 'optimización', 'conversión'],
    toolKeywords: ['google analytics', 'mixpanel', 'optimizely', 'sql', 'python'],
    skillKeywords: ['growth hacking', 'a/b testing', 'analytics', 'conversion optimization', 'experimentation'],
    category: 'marketing'
  },
  {
    id: 'digital_strategist',
    label: 'Estratega Digital',
    icon: 'target',
    description: 'Define estrategias digitales y de transformación',
    keywords: ['estrategia', 'digital', 'transformación', 'innovación', 'omnicanal'],
    toolKeywords: ['google analytics', 'semrush', 'ahrefs', 'tableau', 'miro'],
    skillKeywords: ['digital strategy', 'transformation', 'innovation', 'analytics', 'market research'],
    category: 'marketing'
  },
  {
    id: 'community_manager',
    label: 'Community Manager',
    icon: 'users',
    description: 'Gestiona comunidades y presencia en redes sociales',
    keywords: ['comunidad', 'redes sociales', 'engagement', 'contenido', 'moderación'],
    toolKeywords: ['hootsuite', 'buffer', 'sprout social', 'canva', 'meta business suite'],
    skillKeywords: ['social media management', 'community building', 'content creation', 'engagement'],
    category: 'marketing'
  },
  {
    id: 'content_creator',
    label: 'Creador de Contenido',
    icon: 'pen-tool',
    description: 'Crea contenido para múltiples plataformas',
    keywords: ['contenido', 'escritura', 'creación', 'storytelling', 'copywriting', 'social media'],
    toolKeywords: ['notion', 'canva', 'adobe premiere', 'final cut', 'wordpress', 'medium'],
    skillKeywords: ['copywriting', 'storytelling', 'content strategy', 'seo writing', 'social media'],
    category: 'marketing'
  },
  {
    id: 'copywriter',
    label: 'Copywriter',
    icon: 'pencil',
    description: 'Redacta textos persuasivos para marketing y publicidad',
    keywords: ['copywriting', 'redacción', 'persuasión', 'publicidad', 'contenido'],
    toolKeywords: ['google docs', 'grammarly', 'hemingway', 'wordpress'],
    skillKeywords: ['copywriting', 'persuasive writing', 'storytelling', 'seo writing', 'content strategy'],
    category: 'marketing'
  },
  {
    id: 'seo_specialist',
    label: 'Especialista SEO',
    icon: 'search',
    description: 'Optimiza sitios web para motores de búsqueda',
    keywords: ['seo', 'posicionamiento', 'búsqueda', 'keywords', 'optimización', 'google'],
    toolKeywords: ['semrush', 'ahrefs', 'google analytics', 'google search console', 'screaming frog'],
    skillKeywords: ['seo', 'keyword research', 'technical seo', 'link building', 'analytics'],
    category: 'marketing'
  },
  {
    id: 'social_media_manager',
    label: 'Social Media Manager',
    icon: 'smartphone',
    description: 'Gestiona estrategia y contenido en redes sociales',
    keywords: ['social media', 'redes sociales', 'contenido', 'campañas', 'ads', 'influencers'],
    toolKeywords: ['meta business suite', 'hootsuite', 'canva', 'capcut', 'later'],
    skillKeywords: ['social media strategy', 'content planning', 'paid social', 'analytics', 'community management'],
    category: 'marketing'
  },

  // Business & Strategy
  {
    id: 'entrepreneur',
    label: 'Emprendedor',
    icon: 'sparkles',
    description: 'Crea y gestiona negocios propios',
    keywords: ['emprendimiento', 'startup', 'negocio', 'innovación', 'pitch', 'mvp'],
    toolKeywords: ['notion', 'figma', 'canva', 'stripe', 'google workspace'],
    skillKeywords: ['business development', 'innovation', 'pitch', 'lean startup', 'networking'],
    category: 'business'
  },
  {
    id: 'business_consultant',
    label: 'Consultor de Negocios',
    icon: 'briefcase',
    description: 'Asesora en estrategia y optimización de negocios',
    keywords: ['consultoría', 'estrategia', 'negocios', 'optimización', 'transformación'],
    toolKeywords: ['powerpoint', 'excel', 'miro', 'tableau'],
    skillKeywords: ['business strategy', 'consulting', 'problem solving', 'presentation', 'analysis'],
    category: 'business'
  },
  {
    id: 'sales_specialist',
    label: 'Especialista en Ventas',
    icon: 'briefcase',
    description: 'Gestiona procesos de ventas y relaciones con clientes',
    keywords: ['ventas', 'sales', 'negociación', 'cierre', 'pipeline', 'clientes'],
    toolKeywords: ['salesforce', 'hubspot', 'pipedrive', 'linkedin sales navigator'],
    skillKeywords: ['sales', 'negotiation', 'crm', 'prospecting', 'closing'],
    category: 'business'
  },
  {
    id: 'account_executive',
    label: 'Account Executive',
    icon: 'handshake',
    description: 'Gestiona cuentas clave y relaciones comerciales',
    keywords: ['cuentas', 'clientes', 'ventas', 'relaciones', 'b2b', 'enterprise'],
    toolKeywords: ['salesforce', 'hubspot', 'linkedin', 'zoom'],
    skillKeywords: ['account management', 'sales', 'client relations', 'negotiation', 'upselling'],
    category: 'business'
  },

  // People & HR
  {
    id: 'hr_specialist',
    label: 'Especialista en RRHH',
    icon: 'user-check',
    description: 'Gestiona recursos humanos y desarrollo del talento',
    keywords: ['recursos humanos', 'rrhh', 'talento', 'cultura', 'compensación', 'beneficios'],
    toolKeywords: ['workday', 'bamboohr', 'excel', 'linkedin'],
    skillKeywords: ['hr management', 'talent development', 'compensation', 'employee relations'],
    category: 'people'
  },
  {
    id: 'talent_acquisition',
    label: 'Talent Acquisition',
    icon: 'target',
    description: 'Atrae y selecciona talento estratégico',
    keywords: ['reclutamiento', 'talento', 'selección', 'sourcing', 'headhunting'],
    toolKeywords: ['linkedin recruiter', 'greenhouse', 'lever', 'workable'],
    skillKeywords: ['recruiting', 'sourcing', 'interviewing', 'employer branding', 'ats'],
    category: 'people'
  },
  {
    id: 'recruiter',
    label: 'Reclutador',
    icon: 'search',
    description: 'Busca y selecciona candidatos para vacantes',
    keywords: ['reclutamiento', 'selección', 'entrevistas', 'vacantes', 'candidatos'],
    toolKeywords: ['linkedin', 'indeed', 'ats', 'zoom'],
    skillKeywords: ['recruiting', 'interviewing', 'candidate screening', 'job posting', 'sourcing'],
    category: 'people'
  },
  {
    id: 'leadership_coach',
    label: 'Coach de Liderazgo',
    icon: 'sprout',
    description: 'Desarrolla líderes y equipos de alto rendimiento',
    keywords: ['coaching', 'liderazgo', 'desarrollo', 'equipos', 'mentoring'],
    toolKeywords: ['zoom', 'miro', 'notion', 'assessment tools'],
    skillKeywords: ['leadership coaching', 'team development', 'feedback', 'goal setting', 'mentoring'],
    category: 'people'
  },
  {
    id: 'organizational_psychologist',
    label: 'Psicólogo Organizacional',
    icon: 'brain',
    description: 'Aplica psicología al desarrollo organizacional',
    keywords: ['psicología', 'organizacional', 'cultura', 'bienestar', 'evaluación'],
    toolKeywords: ['assessment tools', 'spss', 'r', 'qualtrics'],
    skillKeywords: ['organizational psychology', 'assessment', 'workplace wellbeing', 'change management'],
    category: 'people'
  },
  {
    id: 'mentor',
    label: 'Mentor',
    icon: 'graduation-cap',
    description: 'Guía y desarrolla profesionales en sus carreras',
    keywords: ['mentoría', 'guía', 'desarrollo', 'carrera', 'consejos'],
    toolKeywords: ['zoom', 'notion', 'calendly'],
    skillKeywords: ['mentoring', 'career guidance', 'knowledge sharing', 'feedback', 'coaching'],
    category: 'people'
  },

  // Legal & Compliance
  {
    id: 'lawyer',
    label: 'Abogado',
    icon: 'scale',
    description: 'Provee asesoría legal y representación',
    keywords: ['derecho', 'legal', 'litigio', 'contratos', 'asesoría jurídica'],
    toolKeywords: ['lexisnexis', 'westlaw', 'case management software'],
    skillKeywords: ['legal research', 'contract law', 'litigation', 'legal writing', 'advisory'],
    category: 'legal'
  },
  {
    id: 'legal_advisor',
    label: 'Asesor Legal',
    icon: 'scroll',
    description: 'Asesora en temas legales corporativos y contratos',
    keywords: ['asesoría', 'legal', 'contratos', 'corporativo', 'compliance'],
    toolKeywords: ['docusign', 'legal templates', 'document management'],
    skillKeywords: ['legal advisory', 'contract review', 'corporate law', 'compliance', 'risk assessment'],
    category: 'legal'
  },
  {
    id: 'compliance_officer',
    label: 'Oficial de Cumplimiento',
    icon: 'shield',
    description: 'Asegura el cumplimiento de normativas y regulaciones',
    keywords: ['compliance', 'cumplimiento', 'regulación', 'auditoría', 'riesgos'],
    toolKeywords: ['compliance software', 'risk management tools', 'audit software'],
    skillKeywords: ['compliance', 'risk management', 'regulatory knowledge', 'audit', 'policy development'],
    category: 'legal'
  },

  // Engineering (Other)
  {
    id: 'civil_engineer',
    label: 'Ingeniero Civil',
    icon: 'hard-hat',
    description: 'Diseña y supervisa proyectos de infraestructura',
    keywords: ['civil', 'construcción', 'infraestructura', 'estructuras', 'obras'],
    toolKeywords: ['autocad', 'civil 3d', 'revit', 'sap2000', 'etabs'],
    skillKeywords: ['structural design', 'construction management', 'cad', 'project planning'],
    category: 'engineering'
  },
  {
    id: 'mechanical_engineer',
    label: 'Ingeniero Mecánico',
    icon: 'settings',
    description: 'Diseña sistemas mecánicos y maquinaria',
    keywords: ['mecánico', 'maquinaria', 'sistemas', 'manufactura', 'diseño mecánico'],
    toolKeywords: ['solidworks', 'autocad', 'ansys', 'matlab', 'catia'],
    skillKeywords: ['mechanical design', 'cad', 'thermodynamics', 'manufacturing', 'analysis'],
    category: 'engineering'
  },
  {
    id: 'electrical_engineer',
    label: 'Ingeniero Eléctrico',
    icon: 'zap',
    description: 'Diseña sistemas eléctricos y electrónicos',
    keywords: ['eléctrico', 'electrónico', 'circuitos', 'energía', 'automatización'],
    toolKeywords: ['matlab', 'pspice', 'autocad electrical', 'labview'],
    skillKeywords: ['electrical design', 'circuit analysis', 'power systems', 'automation', 'control systems'],
    category: 'engineering'
  },
  {
    id: 'architect',
    label: 'Arquitecto',
    icon: 'landmark',
    description: 'Diseña espacios arquitectónicos y edificaciones',
    keywords: ['arquitectura', 'diseño', 'espacios', 'edificios', 'construcción'],
    toolKeywords: ['revit', 'autocad', 'sketchup', 'rhino', 'lumion'],
    skillKeywords: ['architectural design', 'bim', 'spatial planning', 'rendering', 'construction documents'],
    category: 'engineering'
  },
  {
    id: 'sustainability_consultant',
    label: 'Consultor de Sostenibilidad',
    icon: 'leaf',
    description: 'Asesora en prácticas sostenibles y medio ambiente',
    keywords: ['sostenibilidad', 'medio ambiente', 'esg', 'carbono', 'energía renovable'],
    toolKeywords: ['gis', 'lca software', 'energy modeling tools'],
    skillKeywords: ['sustainability', 'environmental assessment', 'carbon accounting', 'esg', 'renewable energy'],
    category: 'engineering'
  },

  // Healthcare & Research
  {
    id: 'healthcare_professional',
    label: 'Profesional de la Salud',
    icon: 'heart-pulse',
    description: 'Provee atención y servicios de salud',
    keywords: ['salud', 'atención', 'pacientes', 'clínica', 'tratamiento'],
    toolKeywords: ['emr systems', 'medical software'],
    skillKeywords: ['patient care', 'clinical skills', 'healthcare', 'diagnosis', 'treatment'],
    category: 'healthcare'
  },
  {
    id: 'medical_doctor',
    label: 'Médico',
    icon: 'stethoscope',
    description: 'Diagnostica y trata enfermedades',
    keywords: ['medicina', 'diagnóstico', 'tratamiento', 'pacientes', 'clínica'],
    toolKeywords: ['emr', 'medical imaging', 'diagnostic tools'],
    skillKeywords: ['clinical diagnosis', 'patient care', 'medical knowledge', 'treatment planning'],
    category: 'healthcare'
  },
  {
    id: 'academic_researcher',
    label: 'Investigador Académico',
    icon: 'microscope',
    description: 'Realiza investigación científica y publica hallazgos',
    keywords: ['investigación', 'ciencia', 'academia', 'publicaciones', 'papers'],
    toolKeywords: ['latex', 'r', 'python', 'spss', 'mendeley', 'zotero'],
    skillKeywords: ['research', 'data analysis', 'academic writing', 'methodology', 'publishing'],
    category: 'healthcare'
  },
  {
    id: 'laboratory_scientist',
    label: 'Científico de Laboratorio',
    icon: 'flask-conical',
    description: 'Realiza experimentos y análisis de laboratorio',
    keywords: ['laboratorio', 'experimentos', 'análisis', 'investigación', 'ciencia'],
    toolKeywords: ['lab equipment', 'data analysis software', 'lims'],
    skillKeywords: ['laboratory techniques', 'data analysis', 'experimentation', 'quality control'],
    category: 'healthcare'
  },

  // Creative & Media
  {
    id: 'photographer',
    label: 'Fotógrafo',
    icon: 'camera',
    description: 'Captura y edita imágenes profesionales',
    keywords: ['fotografía', 'imágenes', 'retrato', 'edición', 'producto'],
    toolKeywords: ['lightroom', 'photoshop', 'capture one', 'camera equipment'],
    skillKeywords: ['photography', 'photo editing', 'composition', 'lighting', 'retouching'],
    category: 'creative'
  },
  {
    id: 'videographer',
    label: 'Videógrafo',
    icon: 'video',
    description: 'Graba y edita videos profesionales',
    keywords: ['video', 'filmación', 'edición', 'producción', 'cinematografía'],
    toolKeywords: ['premiere pro', 'final cut', 'davinci resolve', 'after effects'],
    skillKeywords: ['videography', 'video editing', 'cinematography', 'storytelling', 'color grading'],
    category: 'creative'
  },
  {
    id: 'audiovisual_producer',
    label: 'Productor Audiovisual',
    icon: 'clapperboard',
    description: 'Produce contenido audiovisual completo',
    keywords: ['producción', 'audiovisual', 'multimedia', 'dirección', 'post-producción'],
    toolKeywords: ['premiere pro', 'after effects', 'audition', 'pro tools'],
    skillKeywords: ['production', 'post-production', 'project management', 'creative direction'],
    category: 'creative'
  },
  {
    id: 'artist',
    label: 'Artista',
    icon: 'palette',
    description: 'Crea obras de arte y expresión creativa',
    keywords: ['arte', 'creación', 'expresión', 'obras', 'exposición'],
    toolKeywords: ['procreate', 'photoshop', 'illustrator', 'traditional media'],
    skillKeywords: ['artistic creation', 'creative expression', 'composition', 'color theory', 'technique'],
    category: 'creative'
  },
  {
    id: 'illustrator',
    label: 'Ilustrador',
    icon: 'pencil',
    description: 'Crea ilustraciones digitales y tradicionales',
    keywords: ['ilustración', 'dibujo', 'arte digital', 'concepto', 'narrativa visual'],
    toolKeywords: ['procreate', 'adobe illustrator', 'photoshop', 'clip studio paint'],
    skillKeywords: ['illustration', 'digital art', 'drawing', 'concept art', 'visual storytelling'],
    category: 'creative'
  },
  {
    id: 'animator',
    label: 'Animador',
    icon: 'film',
    description: 'Crea animaciones 2D y 3D',
    keywords: ['animación', '2d', '3d', 'motion graphics', 'efectos'],
    toolKeywords: ['after effects', 'blender', 'maya', 'cinema 4d', 'toon boom'],
    skillKeywords: ['animation', '3d modeling', 'motion graphics', 'rigging', 'storytelling'],
    category: 'creative'
  },

  // Education & Training
  {
    id: 'educator',
    label: 'Educador',
    icon: 'book-open',
    description: 'Enseña y facilita el aprendizaje',
    keywords: ['educación', 'enseñanza', 'docente', 'profesor', 'aprendizaje'],
    toolKeywords: ['google classroom', 'zoom', 'canvas', 'moodle'],
    skillKeywords: ['teaching', 'curriculum development', 'classroom management', 'assessment', 'pedagogy'],
    category: 'education'
  },
  {
    id: 'edtech_specialist',
    label: 'Especialista en EdTech',
    icon: 'monitor',
    description: 'Implementa tecnología educativa',
    keywords: ['tecnología educativa', 'edtech', 'e-learning', 'plataformas', 'innovación'],
    toolKeywords: ['lms', 'articulate', 'canvas', 'moodle', 'zoom'],
    skillKeywords: ['educational technology', 'lms', 'instructional design', 'e-learning', 'digital pedagogy'],
    category: 'education'
  },
  {
    id: 'corporate_trainer',
    label: 'Capacitador Corporativo',
    icon: 'presentation',
    description: 'Diseña y facilita entrenamientos empresariales',
    keywords: ['capacitación', 'training', 'desarrollo', 'empresarial', 'talleres'],
    toolKeywords: ['powerpoint', 'articulate', 'zoom', 'miro'],
    skillKeywords: ['corporate training', 'facilitation', 'presentation', 'training development', 'coaching'],
    category: 'education'
  },
  {
    id: 'instructional_designer',
    label: 'Diseñador Instruccional',
    icon: 'book-open',
    description: 'Diseña experiencias de aprendizaje efectivas',
    keywords: ['diseño instruccional', 'e-learning', 'cursos', 'aprendizaje', 'pedagogía'],
    toolKeywords: ['articulate', 'rise', 'camtasia', 'captivate', 'lms'],
    skillKeywords: ['instructional design', 'e-learning development', 'learning theory', 'assessment design'],
    category: 'education'
  },

  // Hospitality & Culinary
  {
    id: 'chef',
    label: 'Chef',
    icon: 'chef-hat',
    description: 'Crea y dirige operaciones culinarias',
    keywords: ['cocina', 'gastronomía', 'chef', 'menú', 'culinario'],
    toolKeywords: ['kitchen equipment', 'pos systems', 'menu planning software'],
    skillKeywords: ['culinary arts', 'menu development', 'kitchen management', 'food safety', 'creativity'],
    category: 'hospitality'
  },
  {
    id: 'culinary_specialist',
    label: 'Especialista Gastronómico',
    icon: 'utensils',
    description: 'Especializado en técnicas culinarias avanzadas',
    keywords: ['gastronomía', 'cocina', 'técnicas', 'innovación', 'alta cocina'],
    toolKeywords: ['professional kitchen equipment', 'food lab tools'],
    skillKeywords: ['culinary techniques', 'food innovation', 'molecular gastronomy', 'flavor pairing'],
    category: 'hospitality'
  },
  {
    id: 'hospitality_manager',
    label: 'Gerente de Hospitalidad',
    icon: 'hotel',
    description: 'Gestiona operaciones de hoteles y servicios',
    keywords: ['hospitalidad', 'hotel', 'servicios', 'gestión', 'experiencia del cliente'],
    toolKeywords: ['pms', 'booking systems', 'crm', 'excel'],
    skillKeywords: ['hospitality management', 'customer service', 'operations', 'team leadership'],
    category: 'hospitality'
  },

  // General
  {
    id: 'student',
    label: 'Estudiante',
    icon: 'graduation-cap',
    description: 'En formación académica y desarrollo profesional',
    keywords: ['estudiante', 'aprendizaje', 'universidad', 'carrera', 'formación'],
    toolKeywords: ['notion', 'google workspace', 'zoom'],
    skillKeywords: ['learning', 'time management', 'research', 'collaboration'],
    category: 'general'
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    icon: 'briefcase',
    description: 'Trabaja de forma independiente en proyectos diversos',
    keywords: ['freelance', 'independiente', 'proyectos', 'remoto', 'autónomo'],
    toolKeywords: ['notion', 'figma', 'slack', 'zoom', 'invoicing software'],
    skillKeywords: ['project management', 'client communication', 'time management', 'self-motivation'],
    category: 'general'
  },
  {
    id: 'corporate_executive',
    label: 'Ejecutivo Corporativo',
    icon: 'user-check',
    description: 'Lidera estrategia y operaciones a nivel ejecutivo',
    keywords: ['ejecutivo', 'liderazgo', 'estrategia', 'corporativo', 'dirección'],
    toolKeywords: ['powerpoint', 'excel', 'tableau', 'salesforce'],
    skillKeywords: ['strategic leadership', 'business strategy', 'decision making', 'stakeholder management'],
    category: 'general'
  },
  {
    id: 'independent_consultant',
    label: 'Consultor Independiente',
    icon: 'target',
    description: 'Provee consultoría especializada de forma independiente',
    keywords: ['consultor', 'independiente', 'asesoría', 'especialista', 'freelance'],
    toolKeywords: ['powerpoint', 'excel', 'miro', 'zoom'],
    skillKeywords: ['consulting', 'expertise', 'client management', 'problem solving', 'presentation'],
    category: 'general'
  },
  {
    id: 'career_changer',
    label: 'En Transición de Carrera',
    icon: 'refresh-cw',
    description: 'Explorando nuevos caminos profesionales',
    keywords: ['transición', 'cambio', 'carrera', 'reinvención', 'pivot'],
    toolKeywords: ['linkedin', 'notion', 'coursera', 'udemy'],
    skillKeywords: ['adaptability', 'learning agility', 'transferable skills', 'networking'],
    category: 'general'
  },
  {
    id: 'other',
    label: 'Otro',
    icon: 'graduation-cap',
    description: 'Rol profesional no especificado',
    keywords: [],
    toolKeywords: [],
    skillKeywords: [],
    category: 'other'
  }
];

export interface RoleSuggestion {
  role: ProfessionalRole;
  confidence: number;
  reasons: string[];
}

export function detectRole(preferences: RolePreferences): RoleSuggestion[] {
  const scores: Map<ProfessionalRole, { score: number; reasons: string[] }> = new Map();

  // Inicializar scores
  PROFESSIONAL_ROLES.forEach(role => {
    scores.set(role.id, { score: 0, reasons: [] });
  });

  // Analizar intereses
  preferences.intereses.forEach(interes => {
    const interesLower = interes.toLowerCase();
    PROFESSIONAL_ROLES.forEach(role => {
      const matchingKeywords = role.keywords.filter(keyword => 
        interesLower.includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(interesLower)
      );
      
      if (matchingKeywords.length > 0) {
        const current = scores.get(role.id)!;
        current.score += matchingKeywords.length * 15;
        current.reasons.push(`Interés en ${interes} coincide con ${role.label}`);
      }
    });
  });

  // Analizar objetivos
  preferences.objetivos.forEach(objetivo => {
    const objetivoLower = objetivo.toLowerCase();
    PROFESSIONAL_ROLES.forEach(role => {
      const matchingKeywords = role.keywords.filter(keyword => 
        objetivoLower.includes(keyword.toLowerCase())
      );
      
      if (matchingKeywords.length > 0) {
        const current = scores.get(role.id)!;
        current.score += matchingKeywords.length * 10;
        current.reasons.push(`Objetivo "${objetivo}" alineado con ${role.label}`);
      }
    });
  });

  // Analizar herramientas (muy importante)
  preferences.herramientas.forEach(herramienta => {
    const herramientaLower = herramienta.toLowerCase();
    PROFESSIONAL_ROLES.forEach(role => {
      const matchingTools = role.toolKeywords.filter(tool => 
        herramientaLower.includes(tool.toLowerCase()) || 
        tool.toLowerCase().includes(herramientaLower)
      );
      
      if (matchingTools.length > 0) {
        const current = scores.get(role.id)!;
        current.score += matchingTools.length * 25; // Las herramientas tienen más peso
        current.reasons.push(`Usa ${herramienta}, herramienta clave para ${role.label}`);
      }
    });
  });

  // Convertir a array y ordenar
  const suggestions = Array.from(scores.entries())
    .map(([role, data]) => ({
      role,
      confidence: Math.min(100, Math.round(data.score)),
      reasons: data.reasons.slice(0, 3) // Máximo 3 razones
    }))
    .filter(s => s.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);

  // Si no hay sugerencias claras, agregar roles genéricos basados en experiencia
  if (suggestions.length === 0 || suggestions[0].confidence < 30) {
    const defaultRoles: ProfessionalRole[] = 
      preferences.nivelExperiencia === 'junior' 
        ? ['ux_designer', 'developer_frontend', 'marketing_manager']
        : preferences.nivelExperiencia === 'mid'
        ? ['product_designer', 'developer_fullstack', 'product_manager']
        : ['product_manager', 'data_scientist', 'project_manager'];

    return defaultRoles.map(role => ({
      role,
      confidence: 50,
      reasons: ['Recomendación basada en tu nivel de experiencia']
    }));
  }

  return suggestions.slice(0, 5);
}

export function getRoleDefinition(role: ProfessionalRole): RoleDefinition | undefined {
  return PROFESSIONAL_ROLES.find(r => r.id === role);
}

export function getRolesByCategory(category: string): RoleDefinition[] {
  return PROFESSIONAL_ROLES.filter(r => r.category === category);
}