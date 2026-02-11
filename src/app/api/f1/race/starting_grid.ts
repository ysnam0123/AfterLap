import { supabase } from '@/supabase/client';
import { axiosInstance } from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { StartingGridWithDriver } from '@/types/meeting';

interface StartingGrid {
  position: number;
  meeting_key: number;
  session_key: number;
  lap_duration: number;
  driver_number: number;
}

// ===== API =====
export const fetchStartingGridDataFromAPI = async (
  sessionKey: number,
): Promise<StartingGrid[]> => {
  const response = await axiosInstance.get('/starting_grid', {
    params: { session_key: sessionKey },
  });
  console.log('API에서 스타팅 그리드 불러옴!');
  return response.data;
};

// ===== DB =====
export const getStartingGridDataFromDB = async (sessionKey: number) => {
  const { data, error } = await supabase
    .from('starting_grid')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) throw error;
  return data ?? [];
};

// 없으면 supabase에 저장
export const saveStartingGridData = async (sessionKey: number) => {
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

// ===== Ensure =====
const ensureStartingGridData = async (sessionKey: number) => {
  const existing = await getStartingGrid(sessionKey);
  if (existing && existing.length > 0) return existing;

  await saveStartingGridData(sessionKey);

  const after = await getStartingGrid(sessionKey);
  if (!after || after.length === 0) {
    throw new Error('Starting grid view not ready yet');
  }

  return after;
};

// ===== View =====
export const getStartingGrid = async (sessionKey: number) => {
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

// ===== React Query =====
export function useStartingGridData(
  sessionKey: number,
  startingGridFetchable: boolean,
) {
  return useQuery<StartingGridWithDriver[]>({
    queryKey: ['starting_grid_with_driver', sessionKey],
    retry: 3,
    enabled: !!sessionKey,
    staleTime: 1000 * 60 * 60,

    queryFn: async () => {
      if (!startingGridFetchable) {
        return getStartingGrid(sessionKey!);
      }
      await ensureStartingGridData(sessionKey);
      return getStartingGrid(sessionKey);
    },
  });
}
