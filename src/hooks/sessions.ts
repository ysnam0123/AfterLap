import { useQuery } from '@tanstack/react-query';
import { fetchSessions } from '@/lib/api/internal/sessions';
import { Session } from '@/types/meeting';

export function useSessionData(
  meetingKey: number | null,
  sessionFetchable?: boolean,
  initialData?: Session[],
) {
  return useQuery<Session[]>({
    queryKey: ['sessions', meetingKey],
    enabled: sessionFetchable,
    staleTime: 1000 * 60 * 10,
    retry: 3,
    initialData,
    queryFn: () => fetchSessions(meetingKey!),
  });
}
