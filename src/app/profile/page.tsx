'use client';
import { supabase } from '@/supabase/client';
import { Heart, LogOut, ChevronRight } from 'lucide-react';

export default function Page() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut({ scope: 'global' });

    if (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 px-5 select-none">
      {/* 프로필 카드 영역 */}
      <div className="h-28 w-full rounded-2xl bg-(--color-box-bg)" />

      {/* 나의 팀 / 드라이버 변경 */}
      <button
        type="button"
        className="flex h-14 w-full items-center justify-between rounded-2xl bg-(--color-box-bg) px-5 transition active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <Heart size={20} />
          <span className="font-medium">나의 팀 / 드라이버 변경</span>
        </div>

        <ChevronRight size={18} />
      </button>

      {/* 로그아웃 */}
      <button
        type="button"
        className="flex h-14 w-full items-center justify-between rounded-2xl bg-(--color-box-bg) px-5 text-[#ef1414] transition active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <LogOut size={20} />
          <span className="font-medium">로그아웃</span>
        </div>

        <ChevronRight size={18} />
      </button>
    </section>
  );
}
