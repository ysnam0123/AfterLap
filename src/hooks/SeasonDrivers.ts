import { supabase } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';

export interface SeasonDriver {
  country_kr_name: string;
  driver_number: number;
  driver_profile_id: number;
  flag: string;
  full_name: string;
  headshot_url: string;
  id: number;
  is_main: boolean;
  kr_name: string;
  main_logo: string;
  team_colour: string;
  team_kr_name: string;
  team_name: string;
  team_slug: string;
  year: number;
}

export function useSeasonDrivers(year: number) {
  return useQuery<SeasonDriver[]>({
    queryKey: ['drivers', year],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('drivers_main_season_view')
        .select('*')
        .eq('year', year)
        .order('team_slug')
        .order('driver_number');
      if (error) {
        console.error('년도별 드라이버 불러오기 실패:', error);
      }

      return data ?? [];
    },
  });
}
