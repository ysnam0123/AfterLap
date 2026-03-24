import { fetchPositionDataFromAPI } from '@/lib/api/external/raceResult';
import { createServerSupabase } from '../supabase';
import { DriverPositionGain } from '@/types/raceResult';

export const getPositionDataFromDB = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('position')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) throw error;
  return data ?? [];
};

// 없으면 supabase에 저장
export const savePositionData = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const positionData = await fetchPositionDataFromAPI(sessionKey);
  if (!positionData || positionData.length === 0) return;
  const { error } = await supabase.from('position').upsert(positionData, {
    onConflict: 'session_key,driver_number,date',
  });
  if (error) throw error;
};

// ===== Ensure =====
export const ensurePositionData = async (sessionKey: number) => {
  const existing = await getPositionDataFromDB(sessionKey);
  if (existing.length > 0) return existing;
  await savePositionData(sessionKey);
};

// ===== View =====
export const getPosition = async (
  sessionKey: number,
): Promise<DriverPositionGain[]> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_race_position_gain')
    .select('*')
    .eq('session_key', sessionKey)
    .order('position_gain', { ascending: false });

  if (error) throw error;
  return data;
};
