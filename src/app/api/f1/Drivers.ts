import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';
import { supabase } from '@/supabase/client';

interface Driver {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  headshot_url: string;
  country_code: string;
}

// ===== API =====
export const fetchDriverDataFromAPI = async (
  sessionKey: number,
): Promise<Driver[]> => {
  const response = await axiosInstance.get('/drivers', {
    params: { session_key: sessionKey },
  });
  console.log('API에서 드라이버 불러옴!', response.data);
  return response.data;
};

// ===== DB =====
export const getDriverDataFromDB = async (sessionKey: number) => {
  const { data, error } = await supabase
    .from('drivers')
    .select('*')
    .eq('session_key', sessionKey);

  if (error) throw error;
  if (data) {
    console.log('DB에서 드라이버 불러옴!', data);
  }
  return data ?? [];
};

// 없으면 supabse에 저장
export const saveDriverData = async (sessionKey: number) => {
  const driverData = await fetchDriverDataFromAPI(sessionKey);
  if (!driverData || driverData.length === 0) return;

  const { data, error } = await supabase
    .from('drivers')
    .upsert(driverData, {
      onConflict: 'meeting_key,session_key,driver_number',
    })
    .select();
  if (error) throw error;
  if (data) {
    console.log('DB에 드라이버 저장!:', data);
  }
  return data ?? [];
};

// ===== Ensure =====
const ensureDriverData = async (sessionKey: number) => {
  const existing = await getDriverDataFromDB(sessionKey);
  console.log('existing 드라이버 불러옴:', existing);
  if (existing.length >= 20) return;

  await saveDriverData(sessionKey);
};

// ===== React Query =====
export function useDriverData(sessionKey: number | null, isFetchable: boolean) {
  return useQuery<Driver[]>({
    queryKey: ['drivers', sessionKey],
    staleTime: 1000 * 60 * 60,
    enabled: isFetchable,

    queryFn: async () => {
      await ensureDriverData(sessionKey!);
      return getDriverDataFromDB(sessionKey!);
    },
  });
}
