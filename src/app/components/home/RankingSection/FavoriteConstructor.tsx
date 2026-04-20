'use client';

import { useUserStore } from '@/store/useUserFavoriteStore';
import Favorite from '../../Auth/Favorite';

export default function FavoriteConstructor({
  teamSlug,
}: {
  teamSlug: string;
}) {
  const favoriteTeams = useUserStore((s) => s.favoriteTeams);

  if (!favoriteTeams.includes(teamSlug)) return null;

  return <Favorite />;
}
