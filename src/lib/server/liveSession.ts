import { createServerSupabase } from '@/lib/server/supabase';

export const getLiveSession = async () => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('live_session')
    .select('*')
    .maybeSingle();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
};
