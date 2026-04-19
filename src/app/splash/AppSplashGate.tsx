'use client';

import { useEffect, useState } from 'react';
import MobileSplash from '../components/mobile/MobileSplash';

const SPLASH_MIN_TIME = 500;
const SPLASH_KEY = 'afterlap:splash:seen';
const FADE_DURATION = 500;

export default function AppSplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // 1️⃣ 스플래시 노출 조건 판단
  useEffect(() => {
    if (!shouldShowSplash()) return;

    const seen = localStorage.getItem(SPLASH_KEY);
    if (seen) return;

    setShowSplash(true);

    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, SPLASH_MIN_TIME);

    return () => clearTimeout(timer);
  }, []);

  // 2️⃣ fade-out 후 스플래시 종료
  useEffect(() => {
    if (!showSplash || !minTimePassed) return;

    setFadeOut(true);

    const timer = setTimeout(() => {
      setShowSplash(false);
      localStorage.setItem(SPLASH_KEY, 'true');
    }, FADE_DURATION);

    return () => clearTimeout(timer);
  }, [showSplash, minTimePassed]);

  if (showSplash) {
    return (
      <div className={fadeOut ? 'animate-fade-out' : ''}>
        <MobileSplash />
      </div>
    );
  }

  return <>{children}</>;
}

/* ===================== */
/*        helpers        */
/* ===================== */

function isPWA() {
  const nav = window.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    nav.standalone === true
  );
}

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function shouldShowSplash() {
  // PWA 또는 모바일 브라우저만
  return isPWA() || isMobile();
}
