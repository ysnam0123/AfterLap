import { PitView, TeamPitStopRow } from '@/types/raceResult';
import { fetchPitDataFromAPI } from '../../api/external/raceResult';
import { createServerSupabase } from '../supabase';

export const getPitDataFromDB = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('pit_stops')
    .select('*')
    .eq('session_key', sessionKey)
    .order('pit_duration', { ascending: true });

  if (data) {
    console.log('db에서 피트스탑 불러옴:', data);
    return data;
  }

  if (error) throw error;
  return data ?? [];
};

// 없으면 supabse에 저장
export const syncPitDataFromAPI = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const apiPit = await fetchPitDataFromAPI(sessionKey);
  if (!apiPit || apiPit.length === 0) return;

  const { data, error } = await supabase
    .from('pit_stops')
    .upsert(apiPit, {
      onConflict: 'meeting_key,session_key,driver_number,lap_number',
    })
    .select();

  console.log('피트스탑 슈퍼베이스에 저장:', data);
  console.log('피트스탑 슈퍼베이스에 저장실패:', error);

  if (data) {
    return data;
  }
};

// ===== Ensure =====
export const ensurePitData = async (sessionKey: number) => {
  const existing = await getPitstopView(sessionKey);
  console.log('존재하는 피트스탑 호출:', existing);

  if (existing.length === 0) {
    await syncPitDataFromAPI(sessionKey);
    return getPitstopView(sessionKey);
  }
  return existing;
};

export const ensureTeamPitData = async (sessionKey: number) => {
  const existing = await getTeamPitstopView(sessionKey);
  console.log('존재하는 팀 피트스탑 호출:', existing);

  if (existing.length === 0) {
    await syncPitDataFromAPI(sessionKey);
    return getTeamPitstopView(sessionKey);
  }
  return existing;
};

// ===== 드라이버 별 피트스탑 View =====
export const getPitstopView = async (
  sessionKey: number,
): Promise<PitView[]> => {
  const supabase = await createServerSupabase();

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
export const getTeamPitstopView = async (
  sessionKey: number,
): Promise<TeamPitStopRow[]> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_pit_stops_by_team')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) throw error;
  return data;
};
