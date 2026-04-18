import { fetchStintsDataFromAPI } from '@/lib/api/external/raceResult';
import { createServerSupabase } from '../supabase';
import { StintsWithDriver } from '@/types/raceResult';

/**
 * v_stints_with_driver 뷰에서 드라이버 정보가 JOIN된 stints 조회.
 * stints 원본 테이블에는 driver_number만 있어 이름/팀 정보가 없음.
 * Supabase View로 drivers 테이블과 JOIN해서 가져온다.
 *
 * SQL 마이그레이션: supabase/migrations/001_create_v_stints_with_driver.sql
 */
export const getStintsDataFromDB = async (
  sessionKey: number,
): Promise<StintsWithDriver[]> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_stints_with_driver')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) throw error;
  return (data ?? []) as StintsWithDriver[];
};

export const saveStintsData = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const stintsData = await fetchStintsDataFromAPI(sessionKey);
  if (!stintsData || stintsData.length === 0) return;

  await supabase
    .from('stints')
    .upsert(stintsData, {
      onConflict: 'meeting_key,session_key,driver_number,stint_number',
    })
    .select();
};

export const ensureStintsData = async (
  sessionKey: number,
): Promise<StintsWithDriver[]> => {
  const existing = await getStintsDataFromDB(sessionKey);

  if (existing.length === 0) {
    await saveStintsData(sessionKey);
    return await getStintsDataFromDB(sessionKey);
  }

  return existing;
};
