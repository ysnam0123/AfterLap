'use client';

import { useUserStore } from '@/store/useUserFavoriteStore';
import Favorite from '../../Auth/Favorite';

export default function FavoriteDriver({ driverId }: { driverId: number }) {
  const favoriteDrivers = useUserStore((state) => state.favoriteDrivers);

  if (!favoriteDrivers.includes(driverId)) return null;

  return <Favorite />;
}
