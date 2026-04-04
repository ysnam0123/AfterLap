'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MobileSplash() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // 2.5초 후 페이드아웃 시작
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2500);

    // 3초 후 제거
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <section
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-9999 flex items-center justify-center bg-black ${exiting ? 'splash-exit' : ''} `}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        {/* Logo */}
        <div className="animate-splash-logo">
          <Image
            src={'/AfterLapLogo.web'}
            alt="AfterLap logo"
            width={280}
            height={67}
            priority
          />
        </div>

        {/* Copy */}
        <div className="animate-splash-copy text-[14px] leading-relaxed text-white/80">
          <p>결과를 넘어,</p>
          <p>세션과 드라이버의 흐름을 읽다</p>
        </div>
      </div>
    </section>
  );
}
