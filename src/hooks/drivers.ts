import { fetchDrivers } from '@/lib/api/internal/drivers';
import { Driver } from '@/types/driver';
import { useQuery } from '@tanstack/react-query';

export function useDriverData(sessionKey: number | null, isFetchable: boolean) {
  return useQuery<Driver[]>({
    queryKey: ['drivers', sessionKey],
    staleTime: 1000 * 60 * 60,
    enabled: isFetchable,

    queryFn: () => fetchDrivers(sessionKey!),
  });
}
