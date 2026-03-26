import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. 기본 응답 객체 생성
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. 서버 사이드 Supabase 클라이언트 설정
  // 이 클라이언트는 쿠키를 직접 읽고 쓰는 역할을 합니다.
  const supabase = createServerClient(
    // 서버용 클라이언트
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 유저의 브라우저에 저장된 모든 쿠키를 가져온다.
        getAll: () => request.cookies.getAll(),

        // 토큰 갱신이 필요할때, 새 쿠키를 구워서 브라우저에 저장한다.
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 3. 현재 세션 정보를 확인 (이 과정에서 만료된 토큰은 자동으로 갱신됨)
  // 로그인이 안 되어 있어도 에러를 내지 않고 그냥 넘어갑니다.
  await supabase.auth.getUser();

  // 4. 윤서님의 전략: "모든 유저를 통과시킨다!"
  // 특정 페이지(예: /admin)를 막고 싶다면 여기에 if문을 추가하면 됩니다.

  return response;
}

// 5. 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    // 이미지,아이콘같은 정적파일을 불러올때마다 로그인을 체크하면 서버가 너무 힘들어진다.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
