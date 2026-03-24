'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client'; // ✅ 변경
import Lottie from 'lottie-react';
import loading from '../../../../public/loading.json';

export default function Page() {
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleLogin = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        let next = searchParams.get('next') || '/';
        if (!next.startsWith('/')) next = '/';

        const supabase = createClient(); // ✅ 여기서 생성

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
          const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            nickname: user.user_metadata?.name ?? null,
            avatar_url:
              user.user_metadata?.avatar_url ??
              user.user_metadata?.picture ??
              null,
            preference_completed: false,
          });

          if (error) {
            router.replace('/login?error=insert');
            return;
          }

          router.replace(`/preference?next=${encodeURIComponent(next)}`);
          return;
        }

        if (!profile.preference_completed) {
          router.replace(`/preference?next=${encodeURIComponent(next)}`);
          return;
        }

        router.replace(next);
      } catch (err) {
        router.replace('/login?error=unknown');
      }
    };

    handleLogin();
  }, [router]);

  return (
    <div className="flex h-30 w-30 flex-col items-center justify-center gap-5">
      <Lottie animationData={loading} loop className="w-full" />
      <p className="animate-pulse text-2xl">로그인 중...</p>
    </div>
  );
}
// 'use client';

// import { useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/supabase/client';
// import Lottie from 'lottie-react';
// import loading from '../../../../public/loading.json';

// export default function Page() {
//   console.log('callback 들어옴');
//   const router = useRouter();
//   const hasRun = useRef(false); // ✅ 중복 실행 방지

//   const searchParams =
//     typeof window !== 'undefined'
//       ? new URLSearchParams(window.location.search)
//       : null;

//   let next = searchParams?.get('next') || '/';

//   // 보안 (중요)
//   if (!next.startsWith('/')) next = '/';

//   useEffect(() => {
//     if (hasRun.current) return;
//     hasRun.current = true;

//     const handleLogin = async () => {
//       try {
//         // ✅ session 안정화 (retry 포함)
//         let session = null;

//         for (let i = 0; i < 3; i++) {
//           const { data, error } = await supabase.auth.getSession();

//           if (error) throw error;

//           session = data.session;

//           if (session) break;

//           // session 아직 없으면 refresh + 대기
//           await supabase.auth.refreshSession();
//           await new Promise((res) => setTimeout(res, 300));
//         }

//         if (!session) {
//           router.replace('/login?error=session');
//           return;
//         }

//         const user = session.user;

//         // 1. 프로필 조회
//         const { data: profile, error: profileError } = await supabase
//           .from('profiles')
//           .select('id, preference_completed')
//           .eq('id', user.id)
//           .single();

//         // ❗ 진짜 에러
//         if (profileError && profileError.code !== 'PGRST116') {
//           console.error('프로필 조회 실패:', profileError);
//           router.replace('/login?error=profile');
//           return;
//         }

//         // 2. 프로필 없으면 생성 (idempotent)
//         if (!profile) {
//           const { error: insertError } = await supabase
//             .from('profiles')
//             .upsert({
//               id: user.id,
//               nickname: user.user_metadata?.name ?? null,
//               avatar_url:
//                 user.user_metadata?.avatar_url ??
//                 user.user_metadata?.picture ??
//                 null,
//               preference_completed: false,
//             });

//           if (insertError) {
//             console.error('프로필 생성 실패:', insertError);
//             router.replace('/login?error=insert');
//             return;
//           }

//           router.replace(`/preference?next=${encodeURIComponent(next)}`);
//           return;
//         }

//         // 3. 온보딩 안한 유저
//         if (!profile.preference_completed) {
//           router.replace(`/preference?next=${encodeURIComponent(next)}`);
//           return;
//         }

//         // 4. 정상 유저
//         router.replace(next);
//       } catch (err) {
//         console.error('로그인 처리 실패:', err);
//         router.replace('/login?error=unknown');
//       }
//     };

//     handleLogin();
//   }, [router, next]);

//   return (
//     <div className="flex h-30 w-30 flex-col items-center justify-center gap-5">
//       <Lottie animationData={loading} loop className="w-full" />
//       <p className="animate-pulse text-2xl">로그인 중...</p>
//     </div>
//   );
// }
