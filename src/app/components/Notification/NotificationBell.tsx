'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Bell, BellRing } from 'lucide-react';
import { useAuth } from '@/context/useAuth';
import {
  getCurrentSubscriptionState,
  type SubState,
} from '@/lib/client/pushSubscription';

const LoginModal = dynamic(
  () => import('../Auth/LoginModal'),
);

export default function NotificationBell() {
  const router = useRouter();
  const { user } = useAuth();
  const [state, setState] = useState<SubState>('idle');
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      const s = await getCurrentSubscriptionState();
      if (!cancelled) setState(s);
    };
    refresh();
    window.addEventListener('focus', refresh);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', refresh);
    };
  }, []);

  const handleClick = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    router.push('/settings/notifications');
  };

  const isOn = state === 'subscribed';
  const Icon = isOn ? BellRing : Bell;

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="알림 설정"
        title={isOn ? '알림 켜짐 — 설정 열기' : '알림 설정'}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-(--color-box-border) bg-(--color-box-bg) transition-all duration-150 hover:bg-(--color-box-hover) active:scale-[0.88] ${
          isOn ? 'text-(--color-accent)' : 'text-(--color-title)'
        }`}
      >
        <Icon className="h-4 w-4" />
      </button>
      {loginOpen && (
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      )}
    </>
  );
}
