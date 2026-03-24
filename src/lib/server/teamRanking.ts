import { TeamSeasonRankingRow } from '@/types/Ranking';
import { createServerSupabase } from './supabase';

export const getTeamSeasonRanking = async (
  year: number,
): Promise<TeamSeasonRankingRow[]> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_team_season_ranking')
    .select('*')
    .eq('year', year)
    .order('rank', { ascending: true })
    .order('driver_number', { ascending: true });

  if (error) throw error;
  return data;
};
