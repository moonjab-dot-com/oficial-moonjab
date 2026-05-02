import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type FontSize = 'small' | 'normal' | 'large';
export type CoachTone = 'empathetic' | 'direct' | 'technical';
export type CheckInFrequency = 'daily' | 'weekly' | 'biweekly';

export interface NotificationChannel {
  microactions: boolean;
  recommendations: boolean;
  coachMessages: boolean;
  marketing: boolean;
}

export interface NotificationPreferences {
  email: NotificationChannel;
}

export interface CoachPreferences {
  tone: CoachTone;
  checkInFrequency: CheckInFrequency;
}

export interface UserSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface Settings {
  theme: ThemeMode;
  fontSize: FontSize;
  notifications: NotificationPreferences;
  coachPreferences: CoachPreferences;
}

interface SettingsState extends Settings {
  sessions: UserSession[];

  setTheme: (theme: ThemeMode) => void;
  setFontSize: (size: FontSize) => void;
  updateNotificationChannel: (channel: keyof NotificationPreferences, category: keyof NotificationChannel, value: boolean) => void;
  updateCoachPreferences: (updates: Partial<CoachPreferences>) => void;
  setSessions: (sessions: UserSession[]) => void;
  closeOtherSessions: () => void;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  fontSize: 'normal',
  notifications: {
    email: {
      microactions: true,
      recommendations: true,
      coachMessages: true,
      marketing: false,
    },
  },
  coachPreferences: {
    tone: 'empathetic',
    checkInFrequency: 'daily',
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      sessions: [],

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },

      setFontSize: (fontSize) => {
        set({ fontSize });
        const root = document.documentElement;
        root.classList.remove('text-sm', 'text-base', 'text-lg');
        if (fontSize === 'small') root.classList.add('text-sm');
        if (fontSize === 'large') root.classList.add('text-lg');
      },

      updateNotificationChannel: (channel, category, value) => {
        set((state) => ({
          notifications: {
            ...state.notifications,
            [channel]: { ...state.notifications[channel], [category]: value },
          },
        }));
      },

      updateCoachPreferences: (updates) => {
        set((state) => ({
          coachPreferences: { ...state.coachPreferences, ...updates },
        }));
      },

      setSessions: (sessions) => set({ sessions }),
      closeOtherSessions: () => {
        set((state) => ({ sessions: state.sessions.filter((s) => s.current) }));
      },
      resetToDefaults: () => set(DEFAULT_SETTINGS),
    }),
    { name: 'moonjab-settings' }
  )
);
