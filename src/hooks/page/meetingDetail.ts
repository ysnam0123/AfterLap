import { useQuery } from '@tanstack/react-query';
import { fetchMeetingDetail } from '@/lib/api/internal/meetingDeatail';
import { MeetingDetailResponse } from '@/types/meeting';

export function useMeetingDetailData(meetingKey: number) {
  return useQuery<MeetingDetailResponse>({
    queryKey: ['meetingKey', meetingKey],
    queryFn: () => fetchMeetingDetail(meetingKey),
    enabled: !!meetingKey,
    refetchInterval: 1000 * 30,
  });
}
