import { Meeting } from '@/types/meeting';
import { createServerSupabase } from './supabase';

export const getMeetingDetail = async (
  meetingKey: number,
): Promise<Meeting> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('meeting_key', meetingKey)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
