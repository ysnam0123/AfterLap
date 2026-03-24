import { fetchDriverDataFromAPI } from '../api/external/drivers';
import { createServerSupabase } from './supabase';

// ===== DB =====
export const getDriverDataFromDB = async (sessionKey: number) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('drivers')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) {
    console.error('슈퍼베이스 select error', error);
    throw error;
  }
  if (data) {
    console.log('DB에서 드라이버 불러옴!', data);
  }
  return data ?? [];
};

// 없으면 supabse에 저장
export const saveDriverData = async (sessionKey: number) => {
  const supabase = await createServerSupabase();
  const driverData = await fetchDriverDataFromAPI(sessionKey);
  if (!driverData || driverData.length === 0) return;

  const { data, error } = await supabase
    .from('drivers')
    .upsert(driverData, {
      onConflict: 'meeting_key,session_key,driver_number',
    })
    .select();
  if (error) {
    console.error('슈퍼베이스 upsert error', error);
    throw error;
  }
  if (data) {
    console.log('DB에 드라이버 저장!:', data);
  }
  return data ?? [];
};

// ===== Ensure =====
// export const ensureDriverData = async (sessionKey: number) => {
//   const existing = await getDriverDataFromDB(sessionKey);
//   console.log('existing 드라이버 불러옴:', existing);
//   if (existing.length >= 20) return;

//   await saveDriverData(sessionKey);
//   return existing;
// };
export const ensureDriverData = async (sessionKey: number) => {
  // 1. 일단 DB에서 가져와봄
  let data = await getDriverDataFromDB(sessionKey);

  // 2. 데이터가 없거나 부족하면 API에서 긁어와서 저장
  if (!data || data.length < 15) {
    // 20명 미만일 때 재시도
    console.log('데이터가 부족하여 API 호출 및 저장을 시작합니다...');
    await saveDriverData(sessionKey);

    // 3. 저장 후 다시 DB에서 최신 데이터를 가져옴
    data = await getDriverDataFromDB(sessionKey);
  }

  // 4. 🔥 무조건 데이터를 리턴! (undefined가 나가지 않도록 방어)
  console.log('최종 반환될 데이터 개수:', data?.length || 0);
  return data ?? [];
};
