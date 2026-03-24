import { createServerSupabase } from '@/lib/server/supabase';
import { fetchSessionFromAPI } from '@/lib/api/external/sessions';

export const getSessionsFromDB = async (meetingKey: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('meeting_key', meetingKey)
    .order('date_start', { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const syncSessionsFromAPI = async (meetingKey: number) => {
  const supabase = await createServerSupabase();

  try {
    const apiSessions = await fetchSessionFromAPI(meetingKey);
    if (!apiSessions || apiSessions.length === 0) return;

    await supabase.from('sessions').upsert(apiSessions, {
      onConflict: 'session_key',
    });
  } catch (e) {
    console.warn('Sessions API sync failed:', e);
  }
};

export const ensureSessions = async (meetingKey: number) => {
  const dbSessions = await getSessionsFromDB(meetingKey);

  if (dbSessions.length === 0) {
    await syncSessionsFromAPI(meetingKey);
    return await getSessionsFromDB(meetingKey);
  }

  return dbSessions;
};
