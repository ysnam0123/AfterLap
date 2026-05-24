import type { SupabaseClient } from '@supabase/supabase-js';

export type SubState =
  | 'idle'
  | 'unsupported'
  | 'denied'
  | 'not_subscribed'
  | 'subscribed';

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const buffer = new ArrayBuffer(raw.length);
  const arr = new Uint8Array(buffer);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return buffer;
}

export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

export async function getCurrentSubscriptionState(): Promise<SubState> {
  if (!isPushSupported()) return 'unsupported';
  if (Notification.permission === 'denied') return 'denied';
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    return sub ? 'subscribed' : 'not_subscribed';
  } catch {
    return 'not_subscribed';
  }
}

export async function subscribeUserToPush(
  supabase: SupabaseClient,
  userId: string,
): Promise<void> {
  if (!isPushSupported()) throw new Error('Push not supported');

  // 권한 요청
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') throw new Error('Permission denied');

  // SW 등록 (next-pwa가 이미 등록한 sw.js를 사용)
  const reg = await navigator.serviceWorker.ready;

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) throw new Error('VAPID public key missing');

  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
  }

  const json = sub.toJSON();
  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
    throw new Error('Invalid subscription object');
  }

  // Supabase에 저장 (endpoint UNIQUE라 upsert로 처리)
  const { error } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: userId,
      endpoint: json.endpoint,
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
      user_agent: navigator.userAgent,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'endpoint' },
  );
  if (error) throw error;

  // 사용자가 첫 구독이면 기본 preferences row도 자동 생성
  await supabase
    .from('notification_preferences')
    .upsert(
      {
        user_id: userId,
        notify_30min_before: true,
        notify_race_start: true,
        notify_race_end: true,
      },
      { onConflict: 'user_id', ignoreDuplicates: true },
    );
}

export async function unsubscribeUserFromPush(
  supabase: SupabaseClient,
): Promise<void> {
  if (!isPushSupported()) return;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;

  const endpoint = sub.endpoint;
  await sub.unsubscribe();
  await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint);
}
