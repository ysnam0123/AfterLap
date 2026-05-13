'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';

type ThemeKey = 'light' | 'dark' | 'red_bull' | 'ferrari';

const OPTIONS: {
  key: ThemeKey;
  label: string;
  render: () => React.ReactNode;
}[] = [
  {
    key: 'light',
    label: '라이트',
    render: () => <Sun className="h-3.5 w-3.5" />,
  },
  {
    key: 'dark',
    label: '다크',
    render: () => <Moon className="h-3.5 w-3.5" />,
  },
  {
    key: 'red_bull',
    label: '레드불 테마',
    render: () => (
      <Image
        src="/team_main_logo/redbullracing.webp"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
      />
    ),
  },
  {
    key: 'ferrari',
    label: '페라리 테마',
    render: () => (
      <Image
        src="/team_main_logo/ferrari.webp"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
      />
    ),
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-[136px]" />;
  }

  const current = (theme as ThemeKey) ?? 'dark';

  return (
    <div
      role="radiogroup"
      aria-label="테마 선택"
      className="flex h-8 items-center gap-0.5 rounded-lg border border-(--color-box-border) bg-(--color-box-bg) p-0.5"
    >
      {OPTIONS.map((opt) => {
        const isActive = current === opt.key;
        return (
          <button
            key={opt.key}
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setTheme(opt.key)}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-all duration-150 active:scale-[0.88] ${
              isActive
                ? 'bg-(--color-accent-soft) text-(--color-accent) ring-1 ring-(--color-accent)/40'
                : 'text-(--color-title) hover:bg-(--color-box-hover)'
            }`}
          >
            {opt.render()}
          </button>
        );
      })}
    </div>
  );
}
