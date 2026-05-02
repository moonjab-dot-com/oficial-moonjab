export const FREE_LIMITS = {
  aiInteractionsPerMonth: 5,
  activeGoals: 1,
  weeklyMicroactions: 10,
  interviewsPerMonth: 3,
  circleMembers: 5,
  circles: 1,
};

export const PRICING = {
  premium: {
    monthly: 5,
    yearly: 50,
    currency: 'USD',
    trialDays: 7,
  },
};

export const VALIDATIONS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  name: /^.{2,}$/,
};

export const QUOTES = [
  'El éxito es la suma de pequeños esfuerzos repetidos',
  'Tu único límite es tu mente',
  'El futuro pertenece a quienes creen en sus sueños',
  'No esperes el momento perfecto, créalo',
  'El progreso comienza donde termina tu zona de confort',
];

export const INTERESTS = [
  { id: 'tech', label: 'Tecnología', icon: 'code' },
  { id: 'design', label: 'Diseño', icon: 'palette' },
  { id: 'business', label: 'Negocios', icon: 'bar-chart-3' },
  { id: 'science', label: 'Ciencias', icon: 'flask-conical' },
  { id: 'education', label: 'Educación', icon: 'book-open' },
  { id: 'marketing', label: 'Marketing', icon: 'megaphone' },
  { id: 'engineering', label: 'Ingeniería', icon: 'settings' },
  { id: 'art', label: 'Arte', icon: 'palette' },
  { id: 'environment', label: 'Ambiente', icon: 'globe' },
  { id: 'social', label: 'Social', icon: 'users' },
  { id: 'finance', label: 'Finanzas', icon: 'dollar-sign' },
  { id: 'law', label: 'Derecho', icon: 'scale' },
  { id: 'architecture', label: 'Arquitectura', icon: 'landmark' },
  { id: 'gastronomy', label: 'Gastronomía', icon: 'chef-hat' },
  { id: 'tourism', label: 'Turismo', icon: 'plane' },
];

export const VALUES = [
  { id: 'stability', label: 'Estabilidad económica', icon: 'dollar-sign' },
  { id: 'growth', label: 'Crecimiento profesional', icon: 'rocket' },
  { id: 'balance', label: 'Balance vida-trabajo', icon: 'scale' },
  { id: 'impact', label: 'Impacto social', icon: 'globe' },
  { id: 'autonomy', label: 'Autonomía', icon: 'target' },
  { id: 'team', label: 'Trabajo en equipo', icon: 'users' },
  { id: 'recognition', label: 'Reconocimiento', icon: 'trophy' },
  { id: 'innovation', label: 'Innovación', icon: 'lightbulb' },
];

export const WORK_MODALITIES = [
  { id: 'office', label: 'Oficina', icon: 'building-2' },
  { id: 'remote', label: 'Remoto', icon: 'home' },
  { id: 'hybrid', label: 'Híbrido', icon: 'refresh-cw' },
  { id: 'flexible', label: 'Flexible', icon: 'move' },
];

export const WORK_SCHEDULES = [
  { id: 'traditional', label: 'Tradicional (9-5)', icon: 'clock' },
  { id: 'flexible', label: 'Flexible', icon: 'clock' },
  { id: 'goals', label: 'Por objetivos', icon: 'calendar' },
  { id: 'night', label: 'Nocturno', icon: 'moon' },
];

export const COMPANY_SIZES = [
  { id: 'startup', label: 'Startup', icon: 'rocket' },
  { id: 'scaleup', label: 'Scale-up', icon: 'building-2' },
  { id: 'corporate', label: 'Corporación', icon: 'landmark' },
  { id: 'own', label: 'Propio negocio', icon: 'target' },
];

export const EXPERIENCE_LEVELS = [
  { id: 'student', label: 'Estudiante', icon: 'graduation-cap' },
  { id: 'graduate', label: 'Recién graduado', icon: 'award' },
  { id: 'junior', label: 'Junior (1-3 años)', icon: 'briefcase' },
  { id: 'mid', label: 'Mid-level (3-5 años)', icon: 'trending-up' },
  { id: 'senior', label: 'Senior (5+ años)', icon: 'target' },
  { id: 'transition', label: 'En transición', icon: 'refresh-cw' },
];

export const SITUATIONS = [
  'Empleado buscando crecimiento',
  'Empleado buscando cambio',
  'Desempleado',
  'Explorando opciones',
];

export const LEVEL_TIERS = [
  { level: 0, name: 'Explorador', icon: 'sprout', maxXP: 500 },
  { level: 1, name: 'Aprendiz', icon: 'compass', maxXP: 1500 },
  { level: 2, name: 'Creador', icon: 'rocket', maxXP: 3000 },
  { level: 3, name: 'Mentor', icon: 'lightbulb', maxXP: 6000 },
  { level: 4, name: 'Profesional', icon: 'sparkles', maxXP: 10000 },
  { level: 5, name: 'Embajador', icon: 'trophy', maxXP: 25000 },
  { level: 6, name: 'Leyenda', icon: 'target', maxXP: 50000 },
];

export const XP_REWARDS = {
  checkin: 10,
  task_easy: 15,
  task_medium: 30,
  task_hard: 50,
  cv_update: 30,
  interview_practice: 50,
  weekly_goal: 100,
  streak_7: 100,
  streak_30: 500,
};
