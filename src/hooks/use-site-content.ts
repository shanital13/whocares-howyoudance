import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteContentRow {
  key: string;
  value: string;
  updated_at: string;
}

export const useSiteContent = () =>
  useQuery({
    queryKey: ['site_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*');
      if (error) throw error;
      // Convert to a key-value map
      const map: Record<string, string> = {};
      (data as SiteContentRow[]).forEach((row) => {
        map[row.key] = row.value;
      });
      return map;
    },
  });

export const useUpdateSiteContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (items: { key: string; value: string }[]) => {
      for (const item of items) {
        const { error } = await supabase
          .from('site_content')
          .upsert(
            { key: item.key, value: item.value, updated_at: new Date().toISOString() },
            { onConflict: 'key' }
          );
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['site_content'] }),
  });
};
