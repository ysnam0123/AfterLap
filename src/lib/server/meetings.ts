import { ApiMeeting, Meeting } from '@/types/meeting';
import { createServerSupabase } from './supabase';
import { fetchMeetingsFromAPI } from '../api/external/meeting';

const mapApiMeetingToDB = (m: ApiMeeting): Partial<Meeting> => ({
  meeting_key: m.meeting_key,
  meeting_name: m.meeting_name,
  meeting_official_name: m.meeting_official_name,
  location: m.location,
  country_key: m.country_key,
  country_code: m.country_code,
  country_name: m.country_name,
  circuit_key: m.circuit_key,
  circuit_short_name: m.circuit_short_name,
  gmt_offset: m.gmt_offset,
  date_start: m.date_start,
  date_end: m.date_end,
});

export const getMeetingsFromDB = async (selectedYear: number) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('v_meetings_with_status')
    .select('*')
    .eq('year', selectedYear)
    .order('date_start', { ascending: true });

  if (error) throw error;
  console.log('미팅 상태:', data);
  return data ?? [];
};

// ===== Sync (핵심) =====
export const syncMeetingsFromAPI = async (year: number) => {
  const supabase = await createServerSupabase();

  const apiMeetings = await fetchMeetingsFromAPI(year);
  if (!apiMeetings?.length) return;

  const meetingsForUpsert = apiMeetings.map((m) => ({
    ...mapApiMeetingToDB(m),
    year,
  }));

  const { error } = await supabase.from('meetings').upsert(meetingsForUpsert, {
    onConflict: 'meeting_key',
  });

  if (error) throw error;
};

export const ensureMeetings = async (year: number) => {
  const dbMeetings = await getMeetingsFromDB(year);

  if (!dbMeetings || dbMeetings.length === 0) {
    await syncMeetingsFromAPI(year);
    return getMeetingsFromDB(year);
  }

  syncMeetingsFromAPI(year);

  return dbMeetings;
};
