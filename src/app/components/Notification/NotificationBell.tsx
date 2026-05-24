'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, BellRing } from 'lucide-react';
import {
  getCurrentSubscriptionState,
  type SubState,
} from '@/lib/client/pushSubscription';

export default function NotificationBell() {
  const router = useRouter();
  const [state, setState] = useState<SubState>('idle');

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      const s = await getCurrentSubscriptionState();
      if (!cancelled) setState(s);
    };
    refresh();
    // 페이지 포커스 다시 잡힐 때 상태 동기화 (설정 페이지에서 켜고 돌아온 경우)
    window.addEventListener('focus', refresh);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', refresh);
    };
  }, []);

  const isOn = state === 'subscribed';
  const Icon = isOn ? BellRing : Bell;

  return (
    <button
      onClick={() => router.push('/settings/notifications')}
      aria-label="알림 설정"
      title={isOn ? '알림 켜짐 — 설정 열기' : '알림 설정'}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-(--color-box-border) bg-(--color-box-bg) transition-all duration-150 hover:bg-(--color-box-hover) active:scale-[0.88] ${
        isOn ? 'text-(--color-accent)' : 'text-(--color-title)'
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
