'use client';
import { supabase } from '@/supabase/client';
import {
  Heart,
  LogOut,
  ChevronRight,
  Map,
  Layers,
  IdCard,
  Bell,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut({ scope: 'global' });

    if (error) {
      console.error('로그아웃 실패:', error);
    }
  };
  const menus = [
    {
      label: '나의 팀/드라이버 변경',
      icon: Heart,
      path: '/preference',
      className: '',
    },
    { label: '서킷 둘러보기', icon: Map, path: '/circuit', className: '' },
    { label: '팀 목록 보기', icon: Layers, path: '/team', className: '' },
    {
      label: '드라이버 목록 보기',
      icon: IdCard,
      path: '/driver',
      className: '',
    },
    {
      label: '알림 설정하기',
      icon: Bell,
      path: '',
      className: '',
    },
    {
      label: '로그아웃',
      icon: LogOut,
      path: '/menus',
      className: 'text-[#FF0000]',
      onClick: handleLogout,
    },
  ];

  return (
    <section className="mx-auto flex flex-col gap-4 px-5 select-none lg:px-10">
      {/* 프로필 카드 영역 */}
      {menus.map(({ label, icon: Icon, path, className, onClick }) => {
        return (
          <button
            key={label}
            onClick={() => {
              if (onClick) {
                onClick();
              } else if (path) {
                router.push(path);
              }
            }}
            type="button"
            className={`flex h-14 w-full items-center justify-between rounded-2xl border border-(--color-card-border) bg-(--color-card-bg) px-5 transition active:scale-[0.98] ${className}`}
          >
            <div className="flex items-center gap-3">
              <Icon className="transition-colors duration-200" />
              <span className="font-medium">{label}</span>
            </div>

            <ChevronRight size={18} />
          </button>
        );
      })}
    </section>
  );
}
