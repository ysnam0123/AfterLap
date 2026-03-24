import { getDriverDetail } from '@/lib/api/internal/detailPage';
import { DriverDetailData } from '@/types/driver';
import { useQuery } from '@tanstack/react-query';

export function useDriverDetailData(driverId: number) {
  return useQuery<DriverDetailData>({
    queryKey: ['driverId', driverId],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      return await getDriverDetail(driverId);
    },
  });
}
