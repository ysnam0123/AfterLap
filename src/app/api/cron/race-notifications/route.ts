import { NextRequest, NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { sendPush, type SubscriptionRow } from '@/lib/server/push';

// 새 테이블(notification_*) 타입 미생성 상태라 schema 추론용 loose alias
type AdminClient = SupabaseClient<never, 'public', 'public'>;

/**
 * pg_cron이 매 10분마다 호출.
 * 1) 30분 후 ~ 40분 후 사이 시작하는 레이스 → '30min_before' 알림
 * 2) 지금 ~ 10분 후 사이 시작하는 레이스 → 'race_start' 알림
 * 3) 지난 10분 안에 끝난 레이스 → 'race_end' 알림
 * notification_sent_log로 중복 발송 방지.
 */
export const dynamic = 'force-dynamic';

interface Meeting {
  meeting_key: number;
  meeting_name: string;
  date_start: string;
  date_end: string;
}

type NotifyType = '30min_before' | 'race_start' | 'race_end';

const PREF_COLUMN: Record<NotifyType, string> = {
  '30min_before': 'notify_30min_before',
  race_start: 'notify_race_start',
  race_end: 'notify_race_end',
};

function buildPayload(meeting: Meeting, type: NotifyType) {
  switch (type) {
    case '30min_before':
      return {
        title: '⏰ 레이스 30분 전',
        body: `${meeting.meeting_name} 곧 시작합니다.`,
        url: `/season/${meeting.meeting_key}`,
        tag: `m${meeting.meeting_key}-30`,
      };
    case 'race_start':
      return {
        title: '🏁 레이스 시작',
        body: `${meeting.meeting_name} 그린 라이트!`,
        url: `/season/${meeting.meeting_key}`,
        tag: `m${meeting.meeting_key}-start`,
      };
    case 'race_end':
      return {
        title: '🏆 레이스 종료',
        body: `${meeting.meeting_name} 결과를 확인해보세요.`,
        url: `/season/${meeting.meeting_key}`,
        tag: `m${meeting.meeting_key}-end`,
      };
  }
}

export async function POST(req: NextRequest) {
  // 인증: pg_cron이 헤더로 CRON_SECRET 보냄
  const authHeader = req.headers.get('authorization');
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!authHeader || authHeader !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: 'service role key not configured' },
      { status: 500 },
    );
  }

  // service role 클라이언트 (RLS 우회 — 모든 사용자 구독/설정 읽기 필요)
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  }) as unknown as AdminClient;

  const now = new Date();
  const in10min = new Date(now.getTime() + 10 * 60 * 1000);
  const in30min = new Date(now.getTime() + 30 * 60 * 1000);
  const in40min = new Date(now.getTime() + 40 * 60 * 1000);
  const past10min = new Date(now.getTime() - 10 * 60 * 1000);

  // Race 세션만 (qualifying·practice 제외)
  // sessions 테이블에서 session_type='Race' 인 것들의 meeting_key 들고, meetings join
  const sentSummary: Record<NotifyType, number> = {
    '30min_before': 0,
    race_start: 0,
    race_end: 0,
  };

  for (const [type, [startWindow, endWindow]] of [
    ['30min_before', [in30min, in40min]] as const,
    ['race_start', [now, in10min]] as const,
  ]) {
    const { data: races } = await admin
      .from('sessions')
      .select('meeting_key, date_start, date_end, meetings!inner(meeting_name)')
      .eq('session_type', 'Race')
      .gte('date_start', startWindow.toISOString())
      .lt('date_start', endWindow.toISOString());

    if (!races || races.length === 0) continue;
    for (const race of races as unknown as Array<{
      meeting_key: number;
      date_start: string;
      date_end: string;
      meetings: { meeting_name: string };
    }>) {
      sentSummary[type as NotifyType] += await fanOutToSubscribers(
        admin,
        {
          meeting_key: race.meeting_key,
          meeting_name: race.meetings.meeting_name,
          date_start: race.date_start,
          date_end: race.date_end,
        },
        type as NotifyType,
      );
    }
  }

  // race_end: 종료된 레이스
  {
    const { data: races } = await admin
      .from('sessions')
      .select('meeting_key, date_start, date_end, meetings!inner(meeting_name)')
      .eq('session_type', 'Race')
      .gte('date_end', past10min.toISOString())
      .lt('date_end', now.toISOString());

    if (races && races.length > 0) {
      for (const race of races as unknown as Array<{
        meeting_key: number;
        date_start: string;
        date_end: string;
        meetings: { meeting_name: string };
      }>) {
        sentSummary.race_end += await fanOutToSubscribers(
          admin,
          {
            meeting_key: race.meeting_key,
            meeting_name: race.meetings.meeting_name,
            date_start: race.date_start,
            date_end: race.date_end,
          },
          'race_end',
        );
      }
    }
  }

  return NextResponse.json({ ok: true, sent: sentSummary });
}

// 만약 pg_cron이 GET으로 호출하는 경우를 대비
export async function GET(req: NextRequest) {
  return POST(req);
}

async function fanOutToSubscribers(
  admin: AdminClient,
  meeting: Meeting,
  type: NotifyType,
): Promise<number> {
  const prefColumn = PREF_COLUMN[type];

  // 알림 받기로 설정 + 해당 타입 ON 인 user_id 들
  const { data: prefRows } = await admin
    .from('notification_preferences')
    .select(`user_id, ${prefColumn}`)
    .eq(prefColumn, true);

  const eligibleUserIds = (
    (prefRows ?? []) as Array<{ user_id: string }>
  ).map((r) => r.user_id);

  if (eligibleUserIds.length === 0) return 0;

  // 이미 발송된 사용자 제외
  const { data: sentRows } = await admin
    .from('notification_sent_log')
    .select('user_id')
    .eq('meeting_key', meeting.meeting_key)
    .eq('notify_type', type);

  const alreadySent = new Set(
    ((sentRows ?? []) as Array<{ user_id: string }>).map((r) => r.user_id),
  );
  const toSendUserIds = eligibleUserIds.filter((id) => !alreadySent.has(id));
  if (toSendUserIds.length === 0) return 0;

  // 해당 사용자들의 push subscription
  const { data: subs } = await admin
    .from('push_subscriptions')
    .select('id, user_id, endpoint, p256dh, auth')
    .in('user_id', toSendUserIds);

  if (!subs || subs.length === 0) return 0;

  const payload = buildPayload(meeting, type);
  let successCount = 0;

  for (const sub of subs as SubscriptionRow[]) {
    const result = await sendPush(sub, payload);
    if (result === 'ok') {
      successCount++;
      await logSent(admin, {
        user_id: sub.user_id,
        meeting_key: meeting.meeting_key,
        notify_type: type,
      });
    } else if (result === 'expired') {
      // subscription 만료 → 삭제
      await admin.from('push_subscriptions').delete().eq('id', sub.id);
    }
  }

  return successCount;
}

// notification_sent_log 테이블 타입이 generated types에 없어서 별도 insert helper로 분리
async function logSent(
  admin: AdminClient,
  row: { user_id: string; meeting_key: number; notify_type: NotifyType },
) {
  // @ts-expect-error - notification_sent_log not in generated types yet
  await admin.from('notification_sent_log').insert(row);
}
