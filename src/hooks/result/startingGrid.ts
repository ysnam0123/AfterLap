import { fetchStartingGrid } from '@/lib/api/internal/startingGrid';
import { StartingGridWithDriver } from '@/types/meeting';
import { useQuery } from '@tanstack/react-query';

export function useStartingGridData(
  sessionKey: number,
  startingGridFetchable: boolean,
) {
  return useQuery<StartingGridWithDriver[]>({
    queryKey: ['starting_grid_with_driver', sessionKey],
    retry: 3,
    enabled: startingGridFetchable,
    staleTime: 1000 * 60 * 60,

    queryFn: () => fetchStartingGrid(sessionKey),
  });
}
