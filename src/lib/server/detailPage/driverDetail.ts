import { createServerSupabase } from '../supabase';

export const fetchDriverData = async (driverId: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_driver_season_detail')
    .select('*')
    .eq('driver_id', driverId)
    .single();
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};
