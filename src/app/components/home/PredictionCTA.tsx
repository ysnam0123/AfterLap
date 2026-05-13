import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';
import type { NextMeeting } from '@/types/meeting';
import { createServerSupabase } from '@/lib/server/supabase';

interface Props {
  nextMeeting: NextMeeting | null;
}

export default async function PredictionCTA({ nextMeeting }: Props) {
  if (!nextMeeting) return null;
  const isLocked = new Date(nextMeeting.date_start) <= new Date();

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let myPrediction: { p1_driver_number: number } | null = null;
  if (user) {
    const { data } = await supabase
      .from('predictions')
      .select('p1_driver_number')
      .eq('user_id', user.id)
      .eq('meeting_key', nextMeeting.meeting_key)
      .maybeSingle();
    myPrediction = data;
  }

  let badge: string;
  let title: string;
  if (isLocked) {
    badge = '잠김';
    title = myPrediction
      ? '내 예측 결과 확인하기'
      : `${nextMeeting.meeting_name} 결과 확인하기`;
  } else if (myPrediction) {
    badge = '제출됨';
    title = '예측 수정하기';
  } else {
    badge = '예측 모집중';
    title = `${nextMeeting.meeting_name} 포디움 예측하기`;
  }

  return (
    <Link
      href="/prediction"
      className="group flex items-center justify-between gap-3 rounded-[10px] border border-(--color-card-border) bg-(--color-card-bg) px-4 py-3 transition-colors hover:bg-(--color-card-hover) sm:px-5 sm:py-4"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="bg-(--color-accent-soft) flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12">
          <Sparkles className="text-(--color-accent) h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-(--color-accent) text-[11px] font-semibold sm:text-xs">
            {badge}
          </span>
          <span className="text-(--color-title) text-sm font-semibold sm:text-base">
            {title}
          </span>
        </div>
      </div>
      <ChevronRight className="text-(--color-sub-text) h-5 w-5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
