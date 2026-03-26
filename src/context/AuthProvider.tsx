'use client';

import { useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/supabase/client';
import { AuthContext } from '@/context/AuthContext';
import { Session, User } from '@supabase/supabase-js';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기화 및 실시간 동기화
    // 앱에 접속할때 실행되어서, 브라우저에 남은 세션이 있는지 확인한다.
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    };

    init();

    // 사용자 상태 감지. 로그인,로그아웃,토큰 갱신 이벤트를 실시간으로 감지한다.
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    // 컴포넌트가 사라질때 unsubscribe를 통해 리스너를 해제하여 메모리 누수를 방지한다.
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
