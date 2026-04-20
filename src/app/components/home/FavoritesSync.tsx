'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/useAuth';
import { useFavorites } from '@/hooks/favorite';
import { useUserStore } from '@/store/useUserFavoriteStore';

export default function FavoritesSync() {
  const { user } = useAuth();
  const { data: userFavorite } = useFavorites(user?.id);
  const { setFavorites, clearFavorites } = useUserStore();

  useEffect(() => {
    if (userFavorite) {
      setFavorites(userFavorite);
    }
    if (!user) {
      clearFavorites();
    }
  }, [userFavorite, user, setFavorites, clearFavorites]);

  return null;
}
