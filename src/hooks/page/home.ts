import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '@/lib/api/internal/home';

export function useHomeData() {
  return useQuery({
    queryKey: ['home'],
    queryFn: fetchHomeData,
    refetchInterval: 1000 * 30, // live 포함이면 여기서 관리
  });
}
