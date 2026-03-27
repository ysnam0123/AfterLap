// 1. 서버용 createClient를 가져옵니다. (경로 확인!)
import { createClient } from '@/supabase/server';
import { getFavoriteData } from '@/lib/server/favorite';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 2. 서버용 클라이언트는 비동기(await)로 생성합니다.
    // 내부에서 이미 cookies()를 호출하므로 여기서 따로 cookies()를 부를 필요가 없습니다.
    const supabase = await createClient();

    // 3. 유저 정보를 가져옵니다. (await 필수)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 로그인하지 않은 경우 빈 배열 반환
    if (!user) {
      return NextResponse.json({ favoriteDrivers: [], favoriteTeams: [] });
    }

    // 유저 ID를 기반으로 즐겨찾기 데이터 호출
    const favorites = await getFavoriteData(user.id);
    return NextResponse.json(favorites);
  } catch (error) {
    console.error('유저 선호 호출 실패:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
