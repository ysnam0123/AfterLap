import { supabase } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';

export interface RacePodiumItem {
  position: 1 | 2 | 3;
  driver_code: string;
  driver_season_profile_id: number;
  team_colour: string;
  team_white_logo: string;
}

export interface MeetingWithStatusAndPodium {
  meeting_key: number;
  circuit_key: number;
  circuit_short_name: string;
  meeting_problem: string;

  meeting_code: string;
  location: string;

  country_key: number;
  country_code: string;
  country_name: string;
  country_kr_name: string | null;

  meeting_name: string;
  meeting_official_name: string;
  gmt_offset: string;
  date_start: string;
  date_end: string;
  year: number;
  round: number;
  status: 'scheduled' | 'ongoing' | 'finished';
  race_podium: RacePodiumItem[] | null;
  circuit_img: string;
}

export interface CardProps {
  meetingInfo: MeetingWithStatusAndPodium;
}

export const getMeetingsWithStatusAndPodium = async (
  year: number,
): Promise<MeetingWithStatusAndPodium[]> => {
  const { data, error } = await supabase
    .from('v_meetings_with_status_and_podium')
    .select('*')
    .eq('year', year)
    .order('date_start', { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export function useMeetingsWithStatusAndPodium(year: number | null) {
  return useQuery<MeetingWithStatusAndPodium[]>({
    queryKey: ['meetings-with-podium', year],
    enabled: !!year,
    staleTime: 1000 * 60 * 10, // 10분 (레이스 데이터 특성상 충분)
    queryFn: () => getMeetingsWithStatusAndPodium(year!),
  });
}
