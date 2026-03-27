import { useQuery } from '@tanstack/react-query';
import { fetchUserFavorite } from '@/lib/api/internal/favorite';

export const useFavorites = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['userFavorites', userId],
    queryFn: () => fetchUserFavorite(),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
