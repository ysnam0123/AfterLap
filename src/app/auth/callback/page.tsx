'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
// 1. JSON을 require 대신 import로 가져옵니다 (ESLint 에러 해결)
import loadingData from '../../../../public/loading.json';
// 2. Lottie 컴포넌트의 타입을 정의합니다 (any 에러 해결)
import type { LottieComponentProps } from 'lottie-react';

export default function Page() {
  const router = useRouter();
  const hasRun = useRef(false);

  // any 대신 React 컴포넌트 타입을 지정합니다.
  const [Lottie, setLottie] = useState<React.FC<LottieComponentProps> | null>(
    null,
  );

  useEffect(() => {
    // 클라이언트에서만 lottie-react를 로드합니다.
    import('lottie-react').then((mod) => setLottie(() => mod.default));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || hasRun.current) return;
    hasRun.current = true;

    const handleLogin = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        let next = searchParams.get('next') || '/';
        if (!next.startsWith('/')) next = '/';

        const supabase = createClient();
        let session = null;

        for (let i = 0; i < 3; i++) {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          session = data.session;
          if (session) break;
          await supabase.auth.refreshSession();
          await new Promise((res) => setTimeout(res, 300));
        }

        if (!session) {
          router.replace('/login?error=session');
          return;
        }

        const user = session.user;
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, preference_completed')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          router.replace('/login?error=profile');
          return;
        }

        if (!profile) {
          await supabase.from('profiles').upsert({
            id: user.id,
            nickname: user.user_metadata?.name ?? null,
            avatar_url:
              user.user_metadata?.avatar_url ??
              user.user_metadata?.picture ??
              null,
            preference_completed: false,
          });
          router.replace(`/preference?next=${encodeURIComponent(next)}`);
          return;
        }

        if (!profile.preference_completed) {
          router.replace(`/preference?next=${encodeURIComponent(next)}`);
          return;
        }

        router.replace(next);
      } catch (err) {
        console.error('콜백 페이지 에러:', err);
        router.replace('/login?error=unknown');
      }
    };

    handleLogin();
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <div className="h-32 w-32">
        {/* 3. 로드된 Lottie 컴포넌트와 import한 loadingData를 사용합니다. */}
        {Lottie && <Lottie animationData={loadingData} loop />}
      </div>
      <p className="animate-pulse text-xl font-medium">로그인 중입니다...</p>
    </div>
  );
}
