import { create } from 'zustand';

interface FavoriteState {
  favoriteDrivers: number[];
  favoriteTeams: string[];
  setFavorites: (favorites: {
    favoriteDrivers: number[];
    favoriteTeams: string[];
  }) => void;
  clearFavorites: () => void;
}

export const useUserStore = create<FavoriteState>((set) => ({
  favoriteDrivers: [],
  favoriteTeams: [],

  // 데이터 한꺼번에 업데이트
  setFavorites: (favorites) =>
    set({
      favoriteDrivers: favorites.favoriteDrivers,
      favoriteTeams: favorites.favoriteTeams,
    }),

  // 로그아웃 시 데이터 초기화
  clearFavorites: () => set({ favoriteDrivers: [], favoriteTeams: [] }),
}));
