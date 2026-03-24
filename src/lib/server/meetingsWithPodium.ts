import { MeetingWithStatusAndPodium } from '@/types/meeting';
import { createServerSupabase } from './supabase';

export const getMeetingsWithStatusAndPodium = async (
  year: number,
): Promise<MeetingWithStatusAndPodium[]> => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('v_meetings_with_status_and_podium')
    .select('*')
    .eq('year', year)
    .order('date_start', { ascending: true });

  if (error) throw error;
  return data ?? [];
};
