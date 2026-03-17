import { supabase } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';

export function useTeams(year: number) {
  return useQuery({
    queryKey: ['teams', year],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('year', year)
        .order('team_slug');

      if (error) {
        console.error('팀 불러오기 실패:', error);
        return [];
      }

      return data ?? [];
    },
  });
}
