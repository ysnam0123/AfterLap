import { fetchStintsDataFromAPI } from '@/lib/api/external/raceResult';
import { createServerSupabase } from '../supabase';
import { Stints } from '@/types/raceResult';

export const getStintsDataFromDB = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('stints')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) throw error;
  return data ?? [];
};

export const saveStintsData = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const stintsData = await fetchStintsDataFromAPI(sessionKey);
  if (!stintsData || stintsData.length === 0) return;

  const { data, error } = await supabase
    .from('stints')
    .upsert(stintsData, {
      onConflict: 'meeting_key,session_key,driver_number,stint_number',
    })
    .select();

  console.log('data:', data);
  console.log('error:', error);
};

export const ensureStintsData = async (
  sessionKey: number,
): Promise<Stints[]> => {
  const existing = await getStintsDataFromDB(sessionKey);

  if (existing.length === 0) {
    await saveStintsData(sessionKey);
    return await getStintsDataFromDB(sessionKey);
  }

  return existing;
};
