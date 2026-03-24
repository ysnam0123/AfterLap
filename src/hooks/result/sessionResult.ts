import { useQuery } from '@tanstack/react-query';
import { fetchSessionResult } from '@/lib/api/internal/sessionResult';
import { SortedSessionResult } from '@/types/meeting';

export function useSessionResults(
  sessionKey: number | null,
  isFetchable: boolean,
) {
  return useQuery<SortedSessionResult[]>({
    queryKey: ['session_results', sessionKey],
    enabled: isFetchable,
    staleTime: 1000 * 60 * 60,
    queryFn: () => fetchSessionResult(sessionKey!),
  });
}
