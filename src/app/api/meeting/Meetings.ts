import { ApiMeeting, Meeting } from '@/types/meeting';
import { axiosInstance } from '../f1/axiosInstance';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/supabase/client';

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
const queryClient = new QueryClient();
// ===== API =====
export const fetchMeetingsFromAPI = async (
  year: number,
): Promise<ApiMeeting[]> => {
  const response = await axiosInstance.get('/meetings', {
    params: { year: year },
  });
  console.log(response.data);
  return response.data ?? [];
};

// ===== DB =====
export const getMeetingsFromDB = async (selectedYear: number) => {
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
  const apiMeetings = await fetchMeetingsFromAPI(year);
  if (!apiMeetings?.length) return;

  const meetingsForUpsert = apiMeetings.map((m) => ({
    ...mapApiMeetingToDB(m),
    year, // ✅ 여기서 강제 주입
  }));

  const { error } = await supabase.from('meetings').upsert(meetingsForUpsert, {
    onConflict: 'meeting_key',
  });

  if (error) throw error;
};

// ===== Ensure =====
export const ensureMeetings = async (year: number) => {
  const dbMeetings = await getMeetingsFromDB(year);

  // 1) DB에 없으면 API로 동기화 후 다시 조회
  if (!dbMeetings || dbMeetings.length === 0) {
    await syncMeetingsFromAPI(year);
    return getMeetingsFromDB(year);
  }

  // 2) 이미 데이터가 있으면, API 동기화는 백그라운드로
  syncMeetingsFromAPI(year);

  return dbMeetings;
};

// ===== React Query (년도를 기준으로 미팅을 불러옴) =====
export function useMeetings(year: number | null) {
  return useQuery<Meeting[]>({
    queryKey: ['meetings', year],
    enabled: !!year,
    staleTime: 1000 * 60 * 60 * 6, // 일정은 거의 안 바뀜

    queryFn: async () => {
      return ensureMeetings(year!);
    },
  });
}
export function useMeetingData(meetingKey: number) {
  return useQuery<Meeting>({
    queryKey: ['meeting', meetingKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('meeting_key', meetingKey)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    enabled: !!meetingKey,
  });
}
// 3️⃣ “이번 주 레이스” selector
// getCurrentMeeting(year, today)
