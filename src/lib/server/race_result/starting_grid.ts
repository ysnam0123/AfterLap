import { fetchStartingGridDataFromAPI } from '@/lib/api/external/startingGrid';
import { createServerSupabase } from '../supabase';
import { StartingGridWithDriver } from '@/types/meeting';

export const getStartingGridDataFromDB = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('starting_grid')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) throw error;
  return data ?? [];
};

export const saveStartingGridData = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const startingGridData = await fetchStartingGridDataFromAPI(sessionKey);
  if (!startingGridData || startingGridData.length === 0) return;

  const { data, error } = await supabase
    .from('starting_grid')
    .upsert(startingGridData, {
      onConflict: 'meeting_key, session_key,driver_number',
    })
    .select();

  if (data) {
    console.log('DB에 스타팅 그리드 결과 저장!');
  }

  if (error) throw error;
};

export const ensureStartingGridData = async (sessionKey: number) => {
  const existing = await getStartingGrid(sessionKey);
  if (existing && existing.length > 0) return existing;

  await saveStartingGridData(sessionKey);

  const after = await getStartingGrid(sessionKey);
  if (!after || after.length === 0) {
    throw new Error('Starting grid view not ready yet');
  }

  return after;
};

export const getStartingGrid = async (
  sessionKey: number,
): Promise<StartingGridWithDriver[]> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_starting_grid_with_driver')
    .select('*')
    .eq('session_key', sessionKey)
    .order('position');

  if (data) {
    console.log('스타팅 그리드 뷰 호출!');
  }

  if (error) throw error;
  return data;
};
