'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, BellOff, ChevronLeft, Check } from 'lucide-react';
import { supabase } from '@/supabase/client';
import { useAuth } from '@/context/useAuth';
import {
  subscribeUserToPush,
  unsubscribeUserFromPush,
  getCurrentSubscriptionState,
  type SubState,
} from '@/lib/client/pushSubscription';

interface Prefs {
  notify_30min_before: boolean;
  notify_race_start: boolean;
  notify_race_end: boolean;
}

const DEFAULT_PREFS: Prefs = {
  notify_30min_before: true,
  notify_race_start: true,
  notify_race_end: true,
};

export default function NotificationSettingsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [subState, setSubState] = useState<SubState>('idle');
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/');
      return;
    }
    (async () => {
      const s = await getCurrentSubscriptionState();
      setSubState(s);

      const { data } = await supabase
        .from('notification_preferences')
        .select('notify_30min_before, notify_race_start, notify_race_end')
        .eq('user_id', user.id)
        .maybeSingle();
      if (data) setPrefs(data);
    })();
  }, [user, isLoading, router]);

  const isOn = subState === 'subscribed';
  const isUnsupported = subState === 'unsupported';
  const isDenied = subState === 'denied';

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleToggleSubscription = () => {
    if (!user) return;
    if (isUnsupported) {
      showToast('이 브라우저는 푸시 알림을 지원하지 않습니다.');
      return;
    }
    if (isDenied) {
      showToast(
        '브라우저 알림 권한이 차단되어 있어요. 주소창 옆 자물쇠 → 알림 → 허용으로 변경 후 다시 시도해주세요.',
      );
      return;
    }

    startTransition(async () => {
      try {
        if (isOn) {
          await unsubscribeUserFromPush(supabase);
          setSubState('not_subscribed');
          showToast('알림이 꺼졌습니다.');
        } else {
          await subscribeUserToPush(supabase, user.id);
          setSubState('subscribed');
          showToast('알림이 켜졌습니다.');
        }
      } catch (e) {
        console.error(e);
        showToast('처리 중 오류가 발생했습니다.');
      }
    });
  };

  const updatePref = async (key: keyof Prefs, value: boolean) => {
    if (!user) return;
    const next = { ...prefs, [key]: value };
    setPrefs(next); // optimistic
    const { error } = await supabase.from('notification_preferences').upsert(
      {
        user_id: user.id,
        ...next,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );
    if (error) {
      setPrefs(prefs); // rollback
      showToast('설정 저장 실패');
    }
  };

  if (isLoading) {
    return (
      <section className="page-container px-5 pt-6 pb-20">
        <p className="text-(--color-sub-text)">로딩 중...</p>
      </section>
    );
  }

  return (
    <section className="page-container max-w-2xl px-5 pt-6 pb-20">
      <button
        onClick={() => router.back()}
        className="text-(--color-sub-text) hover:text-(--color-title) mb-4 flex items-center gap-1 text-sm"
      >
        <ChevronLeft className="h-4 w-4" />
        뒤로가기
      </button>

      <div className="mb-6 flex items-center gap-3">
        <Bell className="text-(--color-accent) h-6 w-6" />
        <h1 className="font-ria text-(--color-title) text-2xl font-black sm:text-3xl">
          알림 설정
        </h1>
      </div>

      {/* 메인 토글 */}
      <div className="mb-6 rounded-xl border border-(--color-card-border) bg-(--color-card-bg) p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-(--color-title) flex items-center gap-2 text-base font-bold">
              {isOn ? (
                <Bell className="text-(--color-accent) h-4 w-4" />
              ) : (
                <BellOff className="text-(--color-muted) h-4 w-4" />
              )}
              레이스 알림
            </div>
            <p className="text-(--color-sub-text) mt-2 text-sm leading-relaxed">
              {isUnsupported
                ? '이 브라우저는 푸시 알림을 지원하지 않습니다.'
                : isDenied
                  ? '브라우저 알림 권한이 차단되어 있어요. 주소창 옆 자물쇠를 눌러 권한을 허용해주세요.'
                  : isOn
                    ? '레이스 일정에 맞춰 알림을 받고 있어요.'
                    : '알림을 켜면 레이스 시작·종료를 놓치지 않아요.'}
            </p>
          </div>
          <button
            onClick={handleToggleSubscription}
            disabled={pending || isUnsupported}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 ${
              isOn
                ? 'border border-(--color-card-border) bg-(--color-box-bg) text-(--color-title) hover:bg-(--color-box-hover)'
                : 'bg-(--color-accent) text-white hover:brightness-110'
            }`}
          >
            {pending ? '처리 중...' : isOn ? '끄기' : '알림 받기'}
          </button>
        </div>
      </div>

      {/* 알림 종류 토글 */}
      <div
        className={`rounded-xl border border-(--color-card-border) bg-(--color-card-bg) ${
          isOn ? '' : 'opacity-50'
        }`}
      >
        <div className="border-b border-(--color-card-border) px-5 py-3">
          <h2 className="text-(--color-title) text-sm font-bold">알림 종류</h2>
          <p className="text-(--color-sub-text) mt-1 text-xs">
            받고 싶은 알림만 선택하세요.
          </p>
        </div>

        <PrefToggle
          label="레이스 시작 30분 전"
          description="여유 있게 시청 준비하세요"
          checked={prefs.notify_30min_before}
          disabled={!isOn}
          onChange={(v) => updatePref('notify_30min_before', v)}
        />
        <PrefToggle
          label="레이스 시작"
          description="첫 랩 직전에 알려드려요"
          checked={prefs.notify_race_start}
          disabled={!isOn}
          onChange={(v) => updatePref('notify_race_start', v)}
        />
        <PrefToggle
          label="레이스 종료"
          description="결과 확인하러 가세요"
          checked={prefs.notify_race_end}
          disabled={!isOn}
          onChange={(v) => updatePref('notify_race_end', v)}
          isLast
        />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-(--color-card-border) bg-(--color-card-bg) px-4 py-2.5 text-sm text-(--color-title) shadow-lg">
          {toast}
        </div>
      )}
    </section>
  );
}

function PrefToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
  isLast,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  isLast?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 px-5 py-4 ${
        isLast ? '' : 'border-b border-(--color-card-border)'
      } ${disabled ? 'cursor-not-allowed' : 'hover:bg-(--color-card-hover)'}`}
    >
      <div className="flex-1">
        <div className="text-(--color-title) text-sm font-semibold">
          {label}
        </div>
        <div className="text-(--color-sub-text) mt-0.5 text-xs">
          {description}
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
          checked
            ? 'bg-(--color-accent)'
            : 'bg-(--color-box-selected)'
        } disabled:cursor-not-allowed`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5.5' : 'translate-x-0.5'
          }`}
        />
        {checked && (
          <Check className="absolute top-1 left-1 h-3.5 w-3.5 text-(--color-accent)" />
        )}
      </button>
    </label>
  );
}
