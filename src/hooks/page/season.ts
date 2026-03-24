import { fetchMeetingsWithPodium } from '@/lib/api/internal/season';
import { MeetingWithStatusAndPodium } from '@/types/meeting';
import { useQuery } from '@tanstack/react-query';

export function useSeasonData(year: number) {
  return useQuery<MeetingWithStatusAndPodium[]>({
    queryKey: ['season', year],
    queryFn: () => fetchMeetingsWithPodium(year),
    refetchInterval: 1000 * 30, // live 포함이면 여기서 관리
  });
}
