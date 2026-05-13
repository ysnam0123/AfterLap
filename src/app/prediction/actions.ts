'use server';

import { createServerSupabase } from '@/lib/server/supabase';
import { revalidatePath } from 'next/cache';

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

export async function submitPrediction(input: {
  meetingKey: number;
  p1: number;
  p2: number;
  p3: number;
}): Promise<SubmitResult> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: '로그인이 필요합니다.' };

  const { meetingKey, p1, p2, p3 } = input;
  if (!meetingKey || !p1 || !p2 || !p3) {
    return { ok: false, error: '세 명의 드라이버를 모두 선택해주세요.' };
  }
  if (p1 === p2 || p2 === p3 || p1 === p3) {
    return {
      ok: false,
      error: '같은 드라이버를 두 번 선택할 수 없어요.',
    };
  }

  const { data: meeting } = await supabase
    .from('meetings')
    .select('date_start, meeting_key')
    .eq('meeting_key', meetingKey)
    .maybeSingle();

  if (!meeting) return { ok: false, error: '레이스 정보를 찾을 수 없어요.' };
  if (new Date(meeting.date_start) <= new Date()) {
    return {
      ok: false,
      error: '레이스가 이미 시작되어 예측이 마감되었어요.',
    };
  }

  const { error } = await supabase.from('predictions').upsert(
    {
      user_id: user.id,
      meeting_key: meetingKey,
      p1_driver_number: p1,
      p2_driver_number: p2,
      p3_driver_number: p3,
      total_points: null,
      scored_at: null,
    },
    { onConflict: 'user_id,meeting_key' },
  );

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath('/prediction');
  return { ok: true };
}
