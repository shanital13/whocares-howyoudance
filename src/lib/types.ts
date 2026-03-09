export type ClassLevel = 'beginner' | 'intermediate' | 'advanced' | 'all' | string;

export interface DanceClass {
  id: string;
  name: string;
  level: ClassLevel;
  description: string;
  location: string;
  date: string; // ISO date
  time: string; // HH:mm
  is_recurring: boolean;
  recurring_day?: number; // 0-6 (Sunday-Saturday)
  max_participants?: number;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
}

export interface Registration {
  id: string;
  user_id: string;
  class_id: string;
  entry_type: 'single' | 'punch_card';
  created_at: string;
  profile?: Profile;
  dance_class?: DanceClass;
}

export interface PunchCard {
  id: string;
  user_id: string;
  entries_remaining: number;
  is_active: boolean;
  created_at: string;
  profile?: Profile;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number; // 500 or 1800
  payment_type: 'single' | 'punch_card';
  class_id?: string;
  created_at: string;
  profile?: Profile;
}

export interface Attendance {
  id: string;
  user_id: string;
  class_id: string;
  attended: boolean;
  marked_at?: string;
  profile?: Profile;
}

export const LEVEL_LABELS: Record<ClassLevel, string> = {
  beginner: 'מתחילות',
  intermediate: 'בינוני',
  advanced: 'מתקדמות',
  all: 'כל הרמות',
};

export const SINGLE_PRICE = 500;
export const PUNCH_CARD_PRICE = 1800;
export const PUNCH_CARD_ENTRIES = 4;
