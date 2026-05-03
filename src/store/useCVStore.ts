import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CVData, CVTemplate, CVScore } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const generateId = () => crypto.randomUUID();

interface CVState {
  cvs: CVData[];
  currentCV: CVData | null;
  isAnalyzing: boolean;
  autoSave: boolean;
  
  // CRUD
  createCV: (userId: string, title: string) => CVData;
  updateCV: (id: string, updates: Partial<CVData>) => void;
  deleteCV: (id: string) => void;
  duplicateCV: (id: string) => CVData;
  setCurrentCV: (cv: CVData | null) => void;
  loadCV: (id: string) => void;
  
  // Versions
  saveVersion: (id: string, note?: string) => void;
  restoreVersion: (id: string, versionId: string) => void;
  
  // Template
  changeTemplate: (id: string, template: CVTemplate) => void;
  
  // AI Analysis
  analyzeCV: (id: string) => Promise<void>;
  optimizeForJob: (id: string, jobDescription: string) => Promise<{ score: number; suggestions: string[] }>;
  
  // Score
  calculateScore: (cv: CVData) => CVScore;
  
  // Settings
  setAutoSave: (value: boolean) => void;
  
  // Seed
  seedInitialData: (userId: string) => void;
}

const createEmptyCV = (userId: string, title: string): CVData => ({
  id: generateId(),
  userId,
  title,
  template: 'creative',
  language: 'es',
  personal: {
    fullName: '',
    email: '',
  },
  summary: '',
  education: [],
  experience: [],
  research: [],
  projects: [],
  teaching: [],
  skills: [],
  certifications: [],
  languages: [],
  awards: [],
  references: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  versions: [],
  score: {
    overall: 0,
    clarity: 0,
    impact: 0,
    keywords: 0,
    format: 0,
  },
  metadata: {
    industryTags: [],
    targetKeywords: [],
  },
});

export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      cvs: [],
      currentCV: null,
      isAnalyzing: false,
      autoSave: true,

      createCV: (userId, title) => {
        const newCV = createEmptyCV(userId, title);
        set((state) => ({
          cvs: [...state.cvs, newCV],
          currentCV: newCV,
        }));
        
        // Guardar en Supabase
        supabase.from('cvs').insert({
          user_id: userId,
          nombre_cv: title,
          template: newCV.template,
          info_personal: newCV.personal as any,
          resumen: newCV.summary,
          educacion: newCV.education as any,
          experiencia: newCV.experience as any,
          habilidades: newCV.skills as any,
          certificaciones: newCV.certifications as any,
          idiomas: newCV.languages as any,
          proyectos: newCV.projects as any,
        }).then(({ error }) => {
          if (error) {
            console.error('Error saving CV to Supabase:', error);
            toast.error('Error al guardar el CV');
          }
        });
        
        return newCV;
      },

      updateCV: (id, updates) => {
        set((state) => {
          const updatedCVs = state.cvs.map((cv) =>
            cv.id === id
              ? { ...cv, ...updates, updatedAt: new Date().toISOString() }
              : cv
          );
          const updatedCV = updatedCVs.find((cv) => cv.id === id);
          
          // Guardar en Supabase (solo si es un UUID válido — los CVs de muestra/demo usan IDs locales)
          const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
          if (updatedCV && isUuid) {
            supabase.from('cvs').update({
              nombre_cv: updatedCV.title,
              template: updatedCV.template,
              info_personal: updatedCV.personal as any,
              resumen: updatedCV.summary,
              educacion: updatedCV.education as any,
              experiencia: updatedCV.experience as any,
              habilidades: updatedCV.skills as any,
              certificaciones: updatedCV.certifications as any,
              idiomas: updatedCV.languages as any,
              proyectos: updatedCV.projects as any,
              updated_at: new Date().toISOString(),
            }).eq('id', id).then(({ error }) => {
              if (error) {
                console.error('Error updating CV in Supabase:', error);
                toast.error('Error al actualizar el CV');
              }
            });
          }
          
          return {
            cvs: updatedCVs,
            currentCV: state.currentCV?.id === id ? updatedCV : state.currentCV,
          };
        });
      },

      deleteCV: (id) => {
        set((state) => ({
          cvs: state.cvs.filter((cv) => cv.id !== id),
          currentCV: state.currentCV?.id === id ? null : state.currentCV,
        }));
        
        // Eliminar de Supabase
        supabase.from('cvs').delete().eq('id', id).then(({ error }) => {
          if (error) {
            console.error('Error deleting CV from Supabase:', error);
            toast.error('Error al eliminar el CV');
          }
        });
      },

      duplicateCV: (id) => {
        const cv = get().cvs.find((c) => c.id === id);
        if (!cv) throw new Error('CV not found');
        
        const newCV: CVData = {
          ...cv,
          id: `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: `${cv.title} (Copia)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          versions: [],
        };
        
        set((state) => ({
          cvs: [...state.cvs, newCV],
        }));
        return newCV;
      },

      setCurrentCV: (cv) => {
        set({ currentCV: cv });
      },

      loadCV: (id) => {
        const cv = get().cvs.find((c) => c.id === id);
        if (cv) {
          set({ currentCV: cv });
        }
      },

      saveVersion: (id, note) => {
        const cv = get().cvs.find((c) => c.id === id);
        if (!cv) return;

        const version = {
          versionId: `v_${Date.now()}`,
          snapshot: { ...cv },
          createdAt: new Date().toISOString(),
          note,
        };

        get().updateCV(id, {
          versions: [...cv.versions, version],
        });
      },

      restoreVersion: (id, versionId) => {
        const cv = get().cvs.find((c) => c.id === id);
        if (!cv) return;

        const version = cv.versions.find((v) => v.versionId === versionId);
        if (!version) return;

        get().updateCV(id, {
          ...version.snapshot,
          updatedAt: new Date().toISOString(),
        });
      },

      changeTemplate: (id, template) => {
        get().updateCV(id, { template });
      },

      analyzeCV: async (id) => {
        const cv = get().cvs.find((c) => c.id === id);
        if (!cv) return;

        set({ isAnalyzing: true });

        // Mock AI analysis with delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const score = get().calculateScore(cv);
        
        get().updateCV(id, { score });
        set({ isAnalyzing: false });
      },

      optimizeForJob: async (id, jobDescription) => {
        const cv = get().cvs.find((c) => c.id === id);
        if (!cv) throw new Error('CV not found');

        // Mock AI job optimization
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const keywords = ['liderazgo', 'análisis de datos', 'Python', 'SQL', 'comunicación'];
        const suggestions = [
          'Añade métricas cuantificables en tu experiencia laboral',
          'Incluye las siguientes keywords: ' + keywords.join(', '),
          'Enfatiza logros en lugar de responsabilidades',
          'Ajusta tu resumen profesional al puesto objetivo',
        ];

        return {
          score: Math.floor(Math.random() * 30) + 70, // 70-100
          suggestions,
        };
      },

      calculateScore: (cv) => {
        let clarity = 0;
        let impact = 0;
        let keywords = 0;
        let format = 0;

        // Clarity: based on summary and descriptions
        if (cv.summary.length >= 100) clarity += 10;
        if (cv.summary.length >= 200) clarity += 10;
        if (cv.experience.some((e) => e.bullets.length > 0)) clarity += 5;

        // Impact: based on metrics and achievements
        const hasMetrics = cv.experience.some((e) =>
          e.bullets.some((b) => b.metric)
        );
        if (hasMetrics) impact += 15;
        if (cv.experience.length > 0) impact += 5;
        if (cv.projects.length > 0) impact += 5;

        // Keywords: based on skills and technologies
        if (cv.skills.length >= 5) keywords += 10;
        if (cv.skills.length >= 10) keywords += 10;
        if (cv.languages.length > 0) keywords += 5;

        // Format: completeness
        if (cv.personal.fullName) format += 5;
        if (cv.personal.email) format += 5;
        if (cv.education.length > 0) format += 5;
        if (cv.experience.length > 0) format += 5;
        if (cv.summary.length > 0) format += 5;

        const overall = Math.min(100, clarity + impact + keywords + format);

        return {
          overall,
          clarity: Math.min(25, clarity),
          impact: Math.min(25, impact),
          keywords: Math.min(25, keywords),
          format: Math.min(25, format),
        };
      },

      setAutoSave: (value) => {
        set({ autoSave: value });
      },

      seedInitialData: (userId) => {
        const seeded = localStorage.getItem('moonjab_cv_seeded');
        if (seeded) return;

        const sampleCV: CVData = {
          id: `cv_${Date.now()}_sample`,
          userId,
          title: 'CV - Analista de Datos',
          template: 'creative',
          language: 'es',
          personal: {
            fullName: 'María González',
            title: 'Analista de Datos',
            email: 'maria.gonzalez@email.com',
            phone: '+34 600 123 456',
            location: 'Madrid, España',
            linkedin: 'linkedin.com/in/mariagonzalez',
            github: 'github.com/mariagonzalez',
          },
          summary: 'Analista de datos con 3 años de experiencia en transformación digital y optimización de procesos. Especializada en Python, SQL y visualización de datos. Apasionada por convertir datos en insights accionables.',
          education: [
            {
              id: 'edu1',
              institution: 'Universidad Complutense de Madrid',
              degree: 'Máster',
              field: 'Ciencia de Datos',
              startDate: '2019-09',
              endDate: '2021-06',
              gpa: '8.5',
              description: 'Especialización en machine learning y big data',
            },
            {
              id: 'edu2',
              institution: 'Universidad Autónoma de Madrid',
              degree: 'Grado',
              field: 'Matemáticas',
              startDate: '2015-09',
              endDate: '2019-06',
              gpa: '7.8',
            },
          ],
          experience: [
            {
              id: 'exp1',
              company: 'Tech Solutions SA',
              role: 'Analista de Datos Senior',
              startDate: '2022-01',
              current: true,
              location: 'Madrid, España',
              bullets: [
                {
                  text: 'Desarrollé dashboards interactivos que redujeron el tiempo de toma de decisiones',
                  metric: '40%',
                },
                {
                  text: 'Lideré equipo de 3 analistas en proyecto de migración a cloud',
                },
                {
                  text: 'Implementé modelos predictivos que incrementaron revenue',
                  metric: '€250K',
                },
              ],
              technologies: ['Python', 'SQL', 'Tableau', 'AWS'],
            },
          ],
          research: [],
          projects: [
            {
              id: 'proj1',
              title: 'Sistema de Recomendación E-commerce',
              role: 'Data Scientist',
              description: 'Modelo de ML para personalizar recomendaciones de productos',
              technologies: ['Python', 'TensorFlow', 'Docker'],
              link: 'github.com/mariagonzalez/recommender',
            },
          ],
          teaching: [],
          skills: [
            { name: 'Python', level: 'avanzado', category: 'técnica' },
            { name: 'SQL', level: 'avanzado', category: 'técnica' },
            { name: 'Tableau', level: 'intermedio', category: 'técnica' },
            { name: 'Comunicación', level: 'avanzado', category: 'blanda' },
            { name: 'Trabajo en equipo', level: 'avanzado', category: 'blanda' },
          ],
          certifications: [
            {
              id: 'cert1',
              name: 'AWS Certified Data Analytics',
              institution: 'Amazon Web Services',
              date: '2023-03',
            },
          ],
          languages: [
            { name: 'Español', level: 'C2' },
            { name: 'Inglés', level: 'C1' },
          ],
          awards: [],
          references: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          versions: [],
          score: {
            overall: 75,
            clarity: 20,
            impact: 18,
            keywords: 20,
            format: 17,
          },
          metadata: {
            industryTags: ['tecnología', 'datos', 'analytics'],
            targetKeywords: ['Python', 'SQL', 'machine learning', 'datos'],
          },
        };

        set({ cvs: [sampleCV] });
        localStorage.setItem('moonjab_cv_seeded', 'true');
      },
    }),
    {
      name: 'moonjab-cvs',
    }
  )
);
