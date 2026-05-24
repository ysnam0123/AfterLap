import webpush, { type PushSubscription } from 'web-push';

let vapidConfigured = false;

function ensureVapid() {
  if (vapidConfigured) return;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || 'mailto:noreply@example.com';
  if (!publicKey || !privateKey) {
    throw new Error('VAPID keys missing in environment');
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigured = true;
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}

export interface SubscriptionRow {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}

/**
 * 한 구독자에게 푸시 발송. 410(만료)·404면 호출자가 DB에서 정리해야 함.
 * 반환: 'ok' | 'expired' | 'error'
 */
export async function sendPush(
  sub: SubscriptionRow,
  payload: PushPayload,
): Promise<'ok' | 'expired' | 'error'> {
  ensureVapid();
  const subscription: PushSubscription = {
    endpoint: sub.endpoint,
    keys: { p256dh: sub.p256dh, auth: sub.auth },
  };
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return 'ok';
  } catch (err) {
    const statusCode =
      (err as { statusCode?: number } | null)?.statusCode ?? 0;
    if (statusCode === 404 || statusCode === 410) return 'expired';
    console.error('webpush send failed', statusCode, err);
    return 'error';
  }
}
