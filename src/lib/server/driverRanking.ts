import { DriverSeasonRankingView } from '@/types/Ranking';
import { createServerSupabase } from './supabase';

export const getDriverRanking = async (
  year: number,
): Promise<DriverSeasonRankingView[]> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_driver_season_ranking')
    .select('*')
    .eq('year', year)
    .order('rank', { ascending: true });

  if (error) throw error;
  return data;
};
