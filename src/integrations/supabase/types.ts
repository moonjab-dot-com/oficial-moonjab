export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          cv_id: string | null
          id: string
          job_id: string | null
          notes: string | null
          opportunity_id: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          cv_id?: string | null
          id?: string
          job_id?: string | null
          notes?: string | null
          opportunity_id?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          cv_id?: string | null
          id?: string
          job_id?: string | null
          notes?: string | null
          opportunity_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      cvs: {
        Row: {
          certificaciones: Json | null
          created_at: string
          educacion: Json | null
          experiencia: Json | null
          habilidades: Json | null
          id: string
          idiomas: Json | null
          info_personal: Json | null
          is_active: boolean | null
          nombre_cv: string
          proyectos: Json | null
          resumen: string | null
          template: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          certificaciones?: Json | null
          created_at?: string
          educacion?: Json | null
          experiencia?: Json | null
          habilidades?: Json | null
          id?: string
          idiomas?: Json | null
          info_personal?: Json | null
          is_active?: boolean | null
          nombre_cv?: string
          proyectos?: Json | null
          resumen?: string | null
          template?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          certificaciones?: Json | null
          created_at?: string
          educacion?: Json | null
          experiencia?: Json | null
          habilidades?: Json | null
          id?: string
          idiomas?: Json | null
          info_personal?: Json | null
          is_active?: boolean | null
          nombre_cv?: string
          proyectos?: Json | null
          resumen?: string | null
          template?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      interview_sessions: {
        Row: {
          completada: boolean | null
          created_at: string
          duracion_minutos: number | null
          feedback: Json | null
          id: string
          industria: string | null
          puntuacion: number | null
          respuestas: Json | null
          rol: string
          user_id: string
        }
        Insert: {
          completada?: boolean | null
          created_at?: string
          duracion_minutos?: number | null
          feedback?: Json | null
          id?: string
          industria?: string | null
          puntuacion?: number | null
          respuestas?: Json | null
          rol: string
          user_id: string
        }
        Update: {
          completada?: boolean | null
          created_at?: string
          duracion_minutos?: number | null
          feedback?: Json | null
          id?: string
          industria?: string | null
          puntuacion?: number | null
          respuestas?: Json | null
          rol?: string
          user_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          applicants_count: number | null
          benefits: string[] | null
          category: string | null
          company: string
          contract_type: string | null
          created_at: string
          description: string | null
          expires_at: string | null
          external_url: string | null
          id: string
          is_active: boolean | null
          location: string | null
          modality: string | null
          published_at: string | null
          requirements: string[] | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          source: string | null
          tags: string[] | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          applicants_count?: number | null
          benefits?: string[] | null
          category?: string | null
          company: string
          contract_type?: string | null
          created_at?: string
          description?: string | null
          expires_at?: string | null
          external_url?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          modality?: string | null
          published_at?: string | null
          requirements?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          source?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          applicants_count?: number | null
          benefits?: string[] | null
          category?: string | null
          company?: string
          contract_type?: string | null
          created_at?: string
          description?: string | null
          expires_at?: string | null
          external_url?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          modality?: string | null
          published_at?: string | null
          requirements?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          source?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      microactions: {
        Row: {
          category: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          title: string
          user_id: string
          xp_reward: number | null
        }
        Insert: {
          category?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          title: string
          user_id: string
          xp_reward?: number | null
        }
        Update: {
          category?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          title?: string
          user_id?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          experiencia: Database["public"]["Enums"]["experience_level"] | null
          id: string
          industria: string | null
          nombre: string
          pais: string | null
          preferencias_laborales: Json | null
          progreso: Json | null
          rol_profesional: string | null
          updated_at: string
          user_role: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          experiencia?: Database["public"]["Enums"]["experience_level"] | null
          id: string
          industria?: string | null
          nombre: string
          pais?: string | null
          preferencias_laborales?: Json | null
          progreso?: Json | null
          rol_profesional?: string | null
          updated_at?: string
          user_role?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          experiencia?: Database["public"]["Enums"]["experience_level"] | null
          id?: string
          industria?: string | null
          nombre?: string
          pais?: string | null
          preferencias_laborales?: Json | null
          progreso?: Json | null
          rol_profesional?: string | null
          updated_at?: string
          user_role?: string | null
        }
        Relationships: []
      }
      saved_opportunities: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          opportunity_data: Json
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          opportunity_data: Json
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          opportunity_data?: Json
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_profiles: {
        Row: {
          career_goal: string | null
          created_at: string
          diagnostic_results: Json | null
          id: string
          interests: string[] | null
          lifestyle: string | null
          riasec_code: string | null
          riasec_scores: Json | null
          skills: string[] | null
          updated_at: string
          user_id: string
          values: string[] | null
          work_style: Json | null
        }
        Insert: {
          career_goal?: string | null
          created_at?: string
          diagnostic_results?: Json | null
          id?: string
          interests?: string[] | null
          lifestyle?: string | null
          riasec_code?: string | null
          riasec_scores?: Json | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
          values?: string[] | null
          work_style?: Json | null
        }
        Update: {
          career_goal?: string | null
          created_at?: string
          diagnostic_results?: Json | null
          id?: string
          interests?: string[] | null
          lifestyle?: string | null
          riasec_code?: string | null
          riasec_scores?: Json | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
          values?: string[] | null
          work_style?: Json | null
        }
        Relationships: []
      }
      universities: {
        Row: {
          created_at: string
          domain: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      university_admins: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          role: string
          university_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          role?: string
          university_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string
          university_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "university_admins_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      university_students: {
        Row: {
          career: string | null
          cohort: string | null
          enrolled_at: string
          id: string
          student_user_id: string
          university_id: string
        }
        Insert: {
          career?: string | null
          cohort?: string | null
          enrolled_at?: string
          id?: string
          student_user_id: string
          university_id: string
        }
        Update: {
          career?: string | null
          cohort?: string | null
          enrolled_at?: string
          id?: string
          student_user_id?: string
          university_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "university_students_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_access_levels: {
        Row: {
          access_level: Database["public"]["Enums"]["access_tier"]
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["access_tier"]
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["access_tier"]
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          used: boolean
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
          used?: boolean
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          used?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { user_id_param: string }; Returns: boolean }
    }
    Enums: {
      access_tier: "trial_user" | "free_user" | "premium_user"
      app_role: "admin" | "user" | "university_admin"
      experience_level:
        | "sin_experiencia"
        | "junior"
        | "semi_senior"
        | "senior"
        | "experto"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      access_tier: ["trial_user", "free_user", "premium_user"],
      app_role: ["admin", "user", "university_admin"],
      experience_level: [
        "sin_experiencia",
        "junior",
        "semi_senior",
        "senior",
        "experto",
      ],
    },
  },
} as const
