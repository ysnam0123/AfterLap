import { useQuery } from '@tanstack/react-query';
import { MeetingWithStatusAndPodium } from '@/types/meeting';
import { fetchMeetingsWithPodium } from '@/lib/api/internal/season';

export function useMeetingStatusPodium(year: number) {
  return useQuery<MeetingWithStatusAndPodium[]>({
    queryKey: ['status_and_podium', year],
    staleTime: 1000 * 60 * 60,
    enabled: !!year,
    queryFn: () => fetchMeetingsWithPodium(year),
  });
}
