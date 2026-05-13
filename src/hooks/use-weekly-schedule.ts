import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { DanceClass, ClassLevel } from '@/lib/types';

export interface WeeklyScheduleItem {
  id: string;
  name: string;
  level: ClassLevel;
  time: string; // HH:mm
  date: Date;
  dayLabel: string;
  danceClass: DanceClass;
}

const HEBREW_DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const COPENHAGEN_LOCATIONS = ['קופנהגן', 'קו פנגן', 'copenhagen', 'Copenhagen'];

function startOfWeekSunday(d: Date) {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  out.setDate(out.getDate() - out.getDay()); // Sunday
  return out;
}

export function useWeeklySchedule() {
  return useQuery({
    queryKey: ['weekly-schedule-copenhagen'],
    queryFn: async (): Promise<WeeklyScheduleItem[]> => {
      const { data, error } = await supabase
        .from('dance_classes')
        .select('*')
        .eq('is_recurring', true);
      if (error) throw error;

      const now = new Date();
      const weekStart = startOfWeekSunday(now);

      const items: WeeklyScheduleItem[] = [];
      for (const row of data ?? []) {
        if (row.recurring_day == null) continue;
        if (!COPENHAGEN_LOCATIONS.some((l) => (row.location || '').toLowerCase().includes(l.toLowerCase()))) {
          continue;
        }
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + row.recurring_day);
        const [h, m] = (row.time || '00:00').split(':').map(Number);
        date.setHours(h, m || 0, 0, 0);
        if (date.getTime() < now.getTime()) continue; // already passed

        items.push({
          id: row.id,
          name: row.name,
          level: row.level as ClassLevel,
          time: `${String(h).padStart(2, '0')}:${String(m || 0).padStart(2, '0')}`,
          date,
          dayLabel: `יום ${HEBREW_DAYS[date.getDay()]}`,
          danceClass: {
            ...(row as any),
            date: date.toISOString().slice(0, 10),
          } as DanceClass,
        });
      }

      items.sort((a, b) => a.date.getTime() - b.date.getTime());
      return items;
    },
    staleTime: 5 * 60 * 1000,
  });
}
