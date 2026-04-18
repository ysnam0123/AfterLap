'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * 다크/라이트 모드 토글 버튼.
 * next-themes의 useTheme을 사용해 SSR hydration mismatch를 방지한다.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 클라이언트 마운트 후에만 렌더링 (hydration mismatch 방지)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-(--color-box-border) bg-(--color-box-bg) text-(--color-title) transition-colors hover:bg-(--color-box-hover)"
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드' : '다크 모드'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.div>
    </motion.button>
  );
}
