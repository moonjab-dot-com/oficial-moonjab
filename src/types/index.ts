export type AccessRole = 'trial_user' | 'free_user' | 'premium_user';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'trial' | 'free' | 'premium';
  accessRole: AccessRole;
  trialActive?: boolean;
  trialEndsAt?: Date;
  createdAt: Date;
  lastLogin: Date;
  lastActiveDate: Date;
  onboardingCompleted: boolean;
  streak: number;
  applicationsSubmitted: number;
}

export type ProfessionalRole = 
  // Design
  | 'ux_designer'
  | 'ui_designer'
  | 'product_designer'
  | 'graphic_designer'
  | 'industrial_designer'
  | 'fashion_designer'
  // Development
  | 'developer_frontend'
  | 'developer_backend'
  | 'developer_fullstack'
  | 'software_engineer'
  | 'mobile_developer'
  | 'devops'
  | 'qa_engineer'
  | 'ml_engineer'
  // Management
  | 'project_manager'
  | 'product_manager'
  | 'scrum_master'
  | 'business_analyst'
  // Data & Analytics
  | 'data_analyst'
  | 'data_scientist'
  | 'data_engineer'
  | 'business_intelligence'
  // Finance & Investment
  | 'investor'
  | 'hedge_fund'
  | 'trader'
  | 'financial_analyst'
  | 'economist'
  | 'financial_consultant'
  // Marketing & Content
  | 'marketing_manager'
  | 'growth_marketer'
  | 'digital_strategist'
  | 'community_manager'
  | 'content_creator'
  | 'copywriter'
  | 'seo_specialist'
  | 'social_media_manager'
  // Business & Strategy
  | 'entrepreneur'
  | 'business_consultant'
  | 'sales_specialist'
  | 'account_executive'
  // People & HR
  | 'hr_specialist'
  | 'talent_acquisition'
  | 'recruiter'
  | 'leadership_coach'
  | 'organizational_psychologist'
  | 'mentor'
  // Legal & Compliance
  | 'lawyer'
  | 'legal_advisor'
  | 'compliance_officer'
  // Engineering (Other)
  | 'civil_engineer'
  | 'mechanical_engineer'
  | 'electrical_engineer'
  | 'architect'
  | 'sustainability_consultant'
  // Healthcare & Research
  | 'healthcare_professional'
  | 'medical_doctor'
  | 'academic_researcher'
  | 'laboratory_scientist'
  // Creative & Media
  | 'photographer'
  | 'videographer'
  | 'audiovisual_producer'
  | 'artist'
  | 'illustrator'
  | 'animator'
  // Education & Training
  | 'educator'
  | 'edtech_specialist'
  | 'corporate_trainer'
  | 'instructional_designer'
  // Hospitality & Culinary
  | 'chef'
  | 'culinary_specialist'
  | 'hospitality_manager'
  // General
  | 'student'
  | 'freelancer'
  | 'corporate_executive'
  | 'independent_consultant'
  | 'career_changer'
  | 'other';

export interface RoleHistory {
  rol: ProfessionalRole;
  fecha: string;
  confidence: number;
}

export interface RolePreferences {
  intereses: string[];
  objetivos: string[];
  herramientas: string[];
  nivelExperiencia: 'junior' | 'mid' | 'senior';
}

export interface RIASECScores {
  R: number; // Realistic
  I: number; // Investigative
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

export interface Profile {
  userId: string;
  interests: string[];
  values: string[];
  workStyle: {
    modality: string;
    schedule: string;
    companySize: string;
  };
  skills: {
    technical: { name: string; level: 'Por explorar' | 'En desarrollo' | 'Fortaleza' | 'Experto' }[];
    soft: string[];
    languages: { name: string; level: string }[];
    tools: string[];
  };
  experience: 'student' | 'graduate' | 'junior' | 'mid' | 'senior' | 'transition';
  situation: string;
  challenge: string;
  diagnosticResults: {
    topCareers: { title: string; match: number }[];
    profileType: string;
    insights: string[];
    radarData: { skill: string; value: number }[];
  };
  rolActual: ProfessionalRole;
  rolesSugeridos: { role: ProfessionalRole; confidence: number; reasons: string[] }[];
  preferencias: RolePreferences;
  historialRol: RoleHistory[];
  // RIASEC vocational assessment data
  riasecCode?: string; // e.g., "AIS", "ESC"
  riasecScores?: RIASECScores;
}

export interface CV {
  userId: string;
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    linkedin?: string;
    portfolio?: string;
    location: string;
    availability: string;
  };
  summary: string;
  experience: {
    id: string;
    position: string;
    company: string;
    type: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
    honors?: string[];
  }[];
  skills: Profile['skills'];
  projects: {
    id: string;
    name: string;
    link?: string;
    description: string;
    technologies: string[];
    results: string;
  }[];
  optimizationScore: number;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  xpReward: number;
  duration: number;
  completed: boolean;
  dueDate: Date;
  category: 'daily' | 'weekly' | 'objective';
  time?: string;
}

export interface Progress {
  userId: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  streak: number;
  longestStreak: number;
  tasksCompleted: number;
  achievements: string[];
  coins: number;
  totalXP: number;
  weeklyProgress: number;
  applications: number;
  interviews: number;
}


export type GoalCategory = 'career' | 'learning' | 'wellbeing' | 'networking' | 'other';
export type GoalPriority = 'alta' | 'media' | 'baja';
export type GoalStatus = 'pending' | 'in_progress' | 'paused' | 'completed' | 'abandoned';
export type GoalVisibility = 'private' | 'circle' | 'public';

export interface Microaction {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: GoalPriority;
  xp?: number;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface HistoryEntry {
  action: string;
  by: string;
  at: string;
  payload?: any;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: GoalCategory;
  priority: GoalPriority;
  createdAt: string;
  dueDate?: string;
  visibility: GoalVisibility;
  status: GoalStatus;
  progress: number;
  progressTarget?: number;
  microactions: Microaction[];
  tags?: string[];
  relatedSkills?: string[];
  repeat?: 'none' | 'daily' | 'weekly' | 'monthly';
  ownerId: string;
  assignedByAdmin?: boolean;
  history: HistoryEntry[];
}

export type CVTemplate = 'harvard' | 'modern' | 'minimal' | 'creative' | 'executive' | 'tech' | 'elegant' | 'simple' | 'cascade' | 'ats' | 'professional' | 'bold' | 'classic';

export interface CVPersonalInfo {
  fullName: string;
  title?: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  avatarUrl?: string;
}

export interface CVEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
  thesis?: string;
}

export interface CVExperienceBullet {
  text: string;
  metric?: string;
}

export interface CVExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  bullets: CVExperienceBullet[];
  technologies?: string[];
}

export interface CVResearch {
  id: string;
  title: string;
  venue: string;
  year: string;
  link?: string;
  summary?: string;
  coauthors?: string;
}

export interface CVProject {
  id: string;
  title: string;
  role?: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface CVTeaching {
  id: string;
  course: string;
  institution: string;
  role: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface CVSkill {
  name: string;
  level: 'básico' | 'intermedio' | 'avanzado';
  category?: 'técnica' | 'blanda';
}

export interface CVCertification {
  id: string;
  name: string;
  institution: string;
  date: string;
  link?: string;
}

export interface CVLanguage {
  name: string;
  level: string; // A1-C2
}

export interface CVAward {
  id: string;
  title: string;
  institution: string;
  date: string;
  description?: string;
}

export interface CVReference {
  id: string;
  name: string;
  position: string;
  contact?: string;
}

export interface CVScore {
  overall: number;
  clarity: number;
  impact: number;
  keywords: number;
  format: number;
}

export interface CVVersion {
  versionId: string;
  snapshot: Partial<CVData>;
  createdAt: string;
  note?: string;
}

export interface CVData {
  id: string;
  userId: string;
  title: string;
  template: CVTemplate;
  language: 'es' | 'en';
  personal: CVPersonalInfo;
  summary: string;
  education: CVEducation[];
  experience: CVExperience[];
  research: CVResearch[];
  projects: CVProject[];
  teaching: CVTeaching[];
  skills: CVSkill[];
  certifications: CVCertification[];
  languages: CVLanguage[];
  awards: CVAward[];
  references: CVReference[];
  createdAt: string;
  updatedAt: string;
  versions: CVVersion[];
  score: CVScore;
  metadata: {
    industryTags: string[];
    targetKeywords: string[];
  };
}

// Interview types
export type InterviewLevel = 'junior' | 'mid' | 'senior';
export type InterviewTone = 'empatico' | 'directo' | 'exigente';
export type InterviewType = 'screening' | 'tecnica' | 'cultural' | 'caso' | 'roleplay';
export type QuestionType = 'apertura' | 'comportamiento' | 'tecnica' | 'caso' | 'cultura' | 'cierre';
export type QuestionDifficulty = 'facil' | 'medio' | 'dificil';

export interface InterviewQuestion {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  roles: string[];
  tags: string[];
  sampleAnswer?: string;
}

export interface ResponseScore {
  clarity: number; // 0-20
  structure: number; // 0-30
  evidence: number; // 0-25
  language: number; // 0-15
  culture: number; // 0-10
}

export interface InterviewResponse {
  id: string;
  questionId: string;
  questionText: string;
  answerText: string;
  answerAudioUrl?: string;
  timestamp: string;
  scores: ResponseScore;
  feedbackText: string;
}

export interface InterviewRecommendation {
  type: 'cv' | 'microaction' | 'course' | 'practice';
  text: string;
  payload?: any;
}

export interface InterviewSession {
  id: string;
  userId: string;
  role: string;
  level: InterviewLevel;
  interviewType: InterviewType;
  jobDescription?: string;
  cvVersionId?: string;
  tone: InterviewTone;
  startedAt: string;
  endedAt?: string;
  responses: InterviewResponse[];
  finalScore: number;
  breakdown: ResponseScore;
  recommendations: InterviewRecommendation[];
  saved: boolean;
  privacy: {
    saveTranscription: boolean;
    anonymize: boolean;
  };
}

export interface InterviewMetrics {
  interviewCount: number;
  bestScore: number;
  averageScore: number;
  streaks: number;
  xpAwarded: number;
}

// Circle types
export type CircleMemberRole = 'admin' | 'mentor' | 'member';
export type PostReactionType = 'like' | 'clap' | 'insight';
export type EventType = 'workshop' | 'mentoria' | 'charla' | 'networking';
export type ConnectionStatus = 'pending' | 'connected' | 'declined';

export interface Circle {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  tags: string[];
  category: string;
  memberCount: number;
  activityLevel: 'low' | 'medium' | 'high';
  createdAt: string;
  createdBy: string;
}

export interface CircleMember {
  userId: string;
  circleId: string;
  role: CircleMemberRole;
  joinedAt: string;
  reputation: number;
}

export interface Post {
  id: string;
  circleId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  reactions: Record<PostReactionType, number>;
  commentCount: number;
  saved: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  reactions: Record<PostReactionType, number>;
}

export interface UserConnection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: ConnectionStatus;
  requestedAt: string;
  connectedAt?: string;
  message?: string;
}

export interface CircleEvent {
  id: string;
  circleId: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  duration: number; // minutes
  hostId: string;
  hostName: string;
  attendees: string[];
  maxAttendees?: number;
  link?: string;
  location?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface NetworkSuggestion {
  userId: string;
  name: string;
  headline: string;
  avatar?: string;
  commonInterests: string[];
  mutualConnections: number;
  score: number;
}

