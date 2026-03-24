import { fetchResultDataFromAPI } from '../api/external/sessionResult';
import { createServerSupabase } from './supabase';

export const getSessionResultDataFromDB = async (sessionKey: number) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('session_results')
    .select('*')
    .eq('session_key', sessionKey);
  if (data) {
    console.log('db에서 세션결과 불러옴:', data);
    return data;
  }
  if (error) throw error;
  return data ?? [];
};

export const saveResultData = async (sessionKey: number) => {
  const supabase = await createServerSupabase();
  const resultData = await fetchResultDataFromAPI(sessionKey);
  if (!resultData || resultData.length === 0) return;

  const { data, error } = await supabase
    .from('session_results')
    .upsert(resultData, {
      onConflict: 'meeting_key,session_key,driver_number',
    })
    .select();

  if (data) {
    return data;
  }

  console.log('data:', data);
  console.log('error:', error);
};

export const ensureResultData = async (sessionKey: number) => {
  const existing = await getSessionResultDataFromDB(sessionKey);
  console.log('existing데이터 불러옴:', existing);
  if (existing.length === 0) {
    await saveResultData(sessionKey);
    return await getSessionResultDataFromDB(sessionKey);
  }

  return existing;
};

export const getSessionResult = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_session_result')
    .select('*')
    .eq('session_key', sessionKey)
    .order('position', { ascending: true });

  if (data) {
    console.log('새로만든 세션 결과 뷰', data);
    return data;
  }
  if (error) throw error;
  return data ?? [];
};

// ===== View =====
export const getSortedResults = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const { data: sessionRanks, error } = await supabase
    .from('v_meeting_results')
    .select('*')
    .eq('session_key', sessionKey)
    .order('sort_order')
    .order('position_order');

  console.log('정제된 순위정보 뷰 호출:', sessionRanks);

  if (error) {
    throw error;
  }

  return sessionRanks ?? [];
};
