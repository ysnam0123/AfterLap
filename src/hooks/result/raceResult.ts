import { useQuery } from '@tanstack/react-query';
import { fetchRaceResultData } from '@/lib/api/internal/raceResult';
import { RaceResultResponse } from '@/app/api/race-result/[session_key]/route';

export function useRaceResultData(sessionKey: number, isFinished: boolean) {
  return useQuery<RaceResultResponse>({
    queryKey: ['raceResult', sessionKey],
    queryFn: () => fetchRaceResultData(sessionKey),
    enabled: isFinished,
    retry: 3,
  });
}
