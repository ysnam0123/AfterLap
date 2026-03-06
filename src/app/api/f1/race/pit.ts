import { supabase } from '@/supabase/client';
import { axiosInstance } from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Pit {
  date: string;
  session_key: number;
  pit_duration: number;
  lane_duration: number;
  stop_duration: number;
  lap_number: number;
  meeting_key: number;
  driver_number: number;
}

export interface PitView {
  date: string;
  session_key: number;
  pit_duration: number;
  lane_duration: number;
  stop_duration: number;
  lap_number: number;
  meeting_key: number;

  driver_id: number;
  driver_number: number;
  country_code: string;
  country_kr_name: string;
  full_name: string;
  kr_name: string;
  flag: string;
  headshot_url: string;

  team_colour: string;
  team_kr_name: string;
  team_name: string;
  team_slug: string;
  main_logo: string;
  white_logo: string;
}

interface TeamPitStopRow {
  // race context
  date: string; // YYYY-MM-DD
  meeting_key: number;
  session_key: number;
  year: number;

  // team
  team_slug: string | null;
  team_name: string | null;
  team_kr_name: string | null;
  team_colour: string | null;
  main_logo: string | null;
  white_logo: string | null;

  // driver
  driver_id: number;
  driver_number: number;
  full_name: string;
  kr_name: string | null;

  // pit stop
  lap_number: number;
  stop_duration: number | null; // ⭐ 핵심 기준
  lane_duration: number | null;
  pit_duration: number | null;
}

// ===== API =====
export const fetchPitDataFromAPI = async (
  sessionKey: number,
): Promise<Pit[]> => {
  const response = await axiosInstance.get('/pit', {
    params: { session_key: sessionKey },
  });
  return response.data;
};

// ===== DB =====
export const getPitDataFromDB = async (sessionKey: number) => {
  const { data, error } = await supabase
    .from('pit_stops')
    .select('*')
    .eq('session_key', sessionKey)
    .order('pit_duration', { ascending: true });

  if (error) throw error;
  return data ?? [];
};

// 없으면 supabse에 저장
export const syncPitDataFromAPI = async (sessionKey: number) => {
  try {
    const apiPit = await fetchPitDataFromAPI(sessionKey);
    if (!apiPit || apiPit.length === 0) return;

    await supabase.from('pit_stops').upsert(apiPit, {
      onConflict: 'meeting_key,session_key,driver_number,lap_number',
    });
  } catch (e) {
    console.warn('Sessions API sync failed:', e);
  }
};

// ===== Ensure =====
const ensurePitData = async (sessionKey: number) => {
  const existing = await getPitstopView(sessionKey);

  if (existing.length === 0) {
    await syncPitDataFromAPI(sessionKey);
    return getPitstopView(sessionKey);
  }
  return existing;
};

const ensureTeamPitData = async (sessionKey: number) => {
  const existing = await getTeamPitstopView(sessionKey);

  if (existing.length === 0) {
    await syncPitDataFromAPI(sessionKey);
    return getTeamPitstopView(sessionKey);
  }
  return existing;
};

// ===== 드라이버 별 피트스탑 View =====
export const getPitstopView = async (sessionKey: number) => {
  const { data, error } = await supabase
    .from('v_pit_stops_with_driver')
    .select('*')
    .eq('session_key', sessionKey)
    .order('stop_duration', { ascending: true });
  if (data) {
    console.log('드라이버 별 피트스탑 뷰', data);
  }
  if (error) throw error;
  return data;
};

// ===== 팀 별 피트스탑 View =====
export const getTeamPitstopView = async (sessionKey: number) => {
  const { data, error } = await supabase
    .from('v_pit_stops_by_team')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) throw error;
  return data;
};

// ===== React Query =====
export function usePitData(sessionKey: number | null) {
  return useQuery<PitView[]>({
    queryKey: ['pit_stops', sessionKey],
    staleTime: 1000 * 60 * 60,
    enabled: !!sessionKey,

    queryFn: async () => {
      await ensurePitData(sessionKey!);
      return getPitstopView(sessionKey!);
    },
  });
}

export function useTeamPitData(sessionKey: number | null) {
  return useQuery<TeamPitStopRow[]>({
    queryKey: ['pit_stops', sessionKey],
    staleTime: 1000 * 60 * 60,
    enabled: !!sessionKey,

    queryFn: async () => {
      await ensureTeamPitData(sessionKey!);
      return getTeamPitstopView(sessionKey!);
    },
  });
}
