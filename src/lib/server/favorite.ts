// ✅ 서버 전용 createClient를 가져와야 합니다. (아까 만든 파일 위치 확인!)
import { createClient } from '@/supabase/server';

export const getFavoriteData = async (userId: string) => {
  // 1. 서버 전용 클라이언트는 비동기(await)로 생성합니다.
  const supabase = await createClient();

  // 2. 이제 안전하게 데이터를 긁어옵니다.
  const [drivers, teams] = await Promise.all([
    supabase
      .from('user_favorite_drivers')
      .select('driver_id')
      .eq('user_id', userId),
    supabase
      .from('user_favorite_teams')
      .select('team_slug')
      .eq('user_id', userId),
  ]);

  return {
    favoriteDrivers: drivers.data?.map((d) => d.driver_id) || [],
    favoriteTeams: teams.data?.map((t) => t.team_slug) || [],
  };
};
