'use client';

import { Trophy, Flag, House, Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function MobileFooter() {
  const router = useRouter();
  const pathname = usePathname();

  const menus = [
    { label: '홈', icon: House, path: '/' },
    { label: '그랑프리', icon: Flag, path: '/season' },
    { label: '순위', icon: Trophy, path: '/ranking' },
    { label: '전체메뉴', icon: Menu, path: '/menus' },
  ];

  return (
    <footer className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="flex h-17.5 items-center justify-around px-3">
        {menus.map(({ label, icon: Icon, path }) => {
          const isActive =
            path === '/' ? pathname === '/' : pathname.startsWith(path);

          return (
            <button
              key={label}
              onClick={() => router.push(path)}
              className="relative flex w-15 flex-col items-center justify-center gap-0.5"
            >
              {/* active indicator */}
              {isActive && (
                <span className="absolute -top-1.5 h-0.75 w-6 rounded-full bg-white" />
              )}

              <Icon
                size={label === '홈' ? 26 : 22}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-[#4A4A4A]'
                }`}
              />

              <p
                className={`text-[11px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-[#4A4A4A]'
                }`}
              >
                {label}
              </p>
            </button>
          );
        })}
      </div>
    </footer>
  );
}
