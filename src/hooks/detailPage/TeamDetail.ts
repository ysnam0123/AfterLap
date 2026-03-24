import { getTeamDetail } from '@/lib/api/internal/detailPage';
import { TeamSeasonDetail } from '@/types/detailPage';
import { useQuery } from '@tanstack/react-query';

export function useTeamDetailData(teamSlug: string) {
  return useQuery<TeamSeasonDetail[]>({
    queryKey: ['team_slug', teamSlug],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      return await getTeamDetail(teamSlug);
    },
  });
}
