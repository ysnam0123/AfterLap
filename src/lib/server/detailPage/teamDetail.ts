import { TeamSeasonDetail } from '@/types/detailPage';
import { createServerSupabase } from '../supabase';

export const fetchTeamData = async (
  teamSlug: string,
): Promise<TeamSeasonDetail> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('v_team_season_detail')
    .select('*')
    .eq('team_slug', teamSlug)
    .single();
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};
