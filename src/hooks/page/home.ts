import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '@/lib/api/internal/home';
import { HomeData } from '@/types/home';

export function useHomeData(options?: { initialData?: HomeData }) {
  return useQuery({
    queryKey: ['home'],
    queryFn: fetchHomeData,
    initialData: options?.initialData,
    refetchInterval: 1000 * 30,
  });
}
