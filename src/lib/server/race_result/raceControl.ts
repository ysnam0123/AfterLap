import { fetchRaceControlDataFromAPI } from '@/lib/api/external/raceResult';
import { createServerSupabase } from '../supabase';
import { RaceControl } from '@/types/raceResult';

export const getRaceControlDataFromDB = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('race_control')
    .select('*')
    .eq('session_key', sessionKey);
  if (error) throw error;
  return data ?? [];
};

export const saveRaceControlData = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const raceControlData = await fetchRaceControlDataFromAPI(sessionKey);
  if (!raceControlData || raceControlData.length === 0) return;

  const { data } = await supabase
    .from('race_control')
    .upsert(raceControlData, {
      onConflict: 'meeting_key,session_key,date,message',
    })
    .select();

  if (data) {
    return data;
  }

  console.log('data:', data);
};

export const ensureRaceControlData = async (
  sessionKey: number,
): Promise<RaceControl[]> => {
  const existing = await getRaceControlDataFromDB(sessionKey);
  if (existing.length === 0) {
    await saveRaceControlData(sessionKey);
    return await getRaceControlDataFromDB(sessionKey);
  }
  return existing;
};
