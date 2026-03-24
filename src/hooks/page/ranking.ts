import { fetchRankingData } from '@/lib/api/internal/ranking';
import { RankingResponse } from '@/types/Ranking';
import { useQuery } from '@tanstack/react-query';

export function useRankingData() {
  return useQuery<RankingResponse>({
    queryKey: ['ranking'],
    queryFn: fetchRankingData,
    refetchInterval: 1000 * 30,
  });
}
