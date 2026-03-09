import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Types matching DB schema (UUID-based)
export interface DbDanceClass {
  id: string;
  name: string;
  level: string;
  description: string;
  location: string;
  date: string;
  time: string;
  is_recurring: boolean;
  recurring_day: number | null;
  max_participants: number | null;
  arrival_instructions: string;
  created_at: string;
}

export interface DbProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
}

export interface DbRegistration {
  id: string;
  user_id: string;
  class_id: string;
  entry_type: string;
  created_at: string;
}

export interface DbPunchCard {
  id: string;
  user_id: string;
  entries_remaining: number;
  is_active: boolean;
  created_at: string;
}

export interface DbPayment {
  id: string;
  user_id: string;
  amount: number;
  payment_type: string;
  class_id: string | null;
  created_at: string;
}

export interface DbAttendance {
  id: string;
  user_id: string;
  class_id: string;
  attended: boolean;
  marked_at: string | null;
  created_at: string;
}

// ─── Dance Classes ───
export const useClasses = () =>
  useQuery({
    queryKey: ['dance_classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dance_classes')
        .select('*')
        .order('date', { ascending: true });
      if (error) throw error;
      return data as DbDanceClass[];
    },
  });

export const useCreateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cls: Omit<DbDanceClass, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('dance_classes').insert(cls).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dance_classes'] }),
  });
};

export const useUpdateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DbDanceClass> & { id: string }) => {
      const { data, error } = await supabase.from('dance_classes').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dance_classes'] }),
  });
};

export const useDeleteClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('dance_classes').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dance_classes'] }),
  });
};

// ─── Profiles ───
export const useProfiles = () =>
  useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as DbProfile[];
    },
  });

// ─── Registrations ───
export const useRegistrations = (classId?: string) =>
  useQuery({
    queryKey: ['registrations', classId],
    queryFn: async () => {
      let query = supabase.from('registrations').select('*');
      if (classId) query = query.eq('class_id', classId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data as DbRegistration[];
    },
  });

// ─── Punch Cards ───
export const usePunchCards = () =>
  useQuery({
    queryKey: ['punch_cards'],
    queryFn: async () => {
      const { data, error } = await supabase.from('punch_cards').select('*');
      if (error) throw error;
      return data as DbPunchCard[];
    },
  });

// ─── Payments ───
export const usePayments = () =>
  useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as DbPayment[];
    },
  });

// ─── Attendance ───
export const useAttendance = (classId?: string) =>
  useQuery({
    queryKey: ['attendance', classId],
    queryFn: async () => {
      let query = supabase.from('attendance').select('*');
      if (classId) query = query.eq('class_id', classId);
      const { data, error } = await query;
      if (error) throw error;
      return data as DbAttendance[];
    },
  });

export const useUpsertAttendance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (att: { user_id: string; class_id: string; attended: boolean }) => {
      const { data, error } = await supabase
        .from('attendance')
        .upsert(
          { ...att, marked_at: new Date().toISOString() },
          { onConflict: 'user_id,class_id' }
        )
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['attendance'] }),
  });
};

export const useCreatePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payment: { user_id: string; amount: number; payment_type: string; class_id?: string }) => {
      const { data, error } = await supabase.from('payments').insert(payment).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['payments'] }),
  });
};

export const useCreateRegistration = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reg: { user_id: string; class_id: string; entry_type: string }) => {
      const { data, error } = await supabase.from('registrations').insert(reg).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['registrations'] }),
  });
};
