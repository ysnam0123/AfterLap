import { supabase } from '@/supabase/client';

// 안쓰고있음
export interface SessionDriverProfile {
  session_key: number;
  year: number;
  driver_number: number;
  full_name: string;
  kr_name: string;
  headshot_url: string | null;
  team_name: string | null;
  team_slug: string | null;
  team_kr_name: string | null;
  team_colour: string | null;
  main_logo: string | null;
  country_kr_name: string | null;
  flag: string | null;
}

export const findDriver = async (
  sessionKey: number,
  driverNum: number,
): Promise<SessionDriverProfile | null> => {
  const { data, error } = await supabase
    .from('v_session_driver_profile')
    .select('*')
    .eq('session_key', sessionKey)
    .eq('driver_number', driverNum)
    .single();
  if (error) {
    console.error('findDriver 실패', error);
    return null;
  }
  return data;
};
