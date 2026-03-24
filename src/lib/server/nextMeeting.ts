import { createServerSupabase } from './supabase';

export const getNextMeeting = async () => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('meetings')
    .select(
      `
      *,
      circuits (
        circuit_img,
        circuit_long_name
      ),
      countries!meetings_meeting_code_fkey (
        flag,
        country_kr_name
      )
    `,
    )
    .gte('date_end', new Date().toISOString())
    .order('date_start', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};
