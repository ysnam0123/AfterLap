import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { createServerSupabase } from '@/lib/server/supabase';
import { getNextMeeting } from '@/lib/server/nextMeeting';
import {
  getDriversForMeeting,
  getMyPrediction,
  getMySeasonStats,
  getRacePodium,
  scoreMeetingIfFinished,
} from '@/lib/server/predictions';
import PredictionForm from './PredictionForm';
import PredictionResultView from './PredictionResultView';
import LoginPromptCard from './LoginPromptCard';

export const dynamic = 'force-dynamic';

export default async function PredictionPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-5 pt-6 pb-20 lg:px-10">
        <Header />
        <LoginPromptCard />
      </section>
    );
  }

  const nextMeeting = await getNextMeeting();

  if (!nextMeeting) {
    const year = new Date().getFullYear();
    const stats = await getMySeasonStats(year);
    return (
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-5 pt-6 pb-20 lg:px-10">
        <Header />
        <div className="flex flex-col items-center gap-4 rounded-xl border border-(--color-card-border) bg-(--color-card-bg) p-8 text-center">
          <Trophy className="text-(--color-accent) h-10 w-10" />
          <div>
            <h2 className="text-(--color-title) text-lg font-semibold">
              {year} 시즌 종료
            </h2>
            <p className="text-(--color-sub-text) mt-1 text-sm">
              올해의 모든 그랑프리가 끝났어요. 내년 시즌에 다시 만나요.
            </p>
          </div>
          {stats && (
            <div className="flex gap-6 rounded-lg bg-(--color-box-bg) px-6 py-4">
              <div className="flex flex-col items-center">
                <span className="text-(--color-sub-text) text-xs">총점</span>
                <span className="text-(--color-accent) font-ria text-2xl font-black">
                  {stats.total_points}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-(--color-sub-text) text-xs">예측 횟수</span>
                <span className="text-(--color-title) font-ria text-2xl font-black">
                  {stats.predictions_count}
                </span>
              </div>
            </div>
          )}
          <Link
            href="/prediction/leaderboard"
            className="bg-(--color-accent) flex h-10 cursor-pointer items-center justify-center rounded-lg px-6 font-semibold text-white hover:brightness-110"
          >
            리더보드 보기
          </Link>
        </div>
      </section>
    );
  }

  const meetingKey = nextMeeting.meeting_key;
  const isLocked = new Date(nextMeeting.date_start) <= new Date();

  if (isLocked) {
    await scoreMeetingIfFinished(meetingKey);
  }

  const [myPrediction, drivers, podium] = await Promise.all([
    getMyPrediction(meetingKey),
    getDriversForMeeting(meetingKey),
    isLocked ? getRacePodium(meetingKey) : Promise.resolve(null),
  ]);

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-5 pt-6 pb-20 lg:px-10">
      <Header />
      {isLocked ? (
        <PredictionResultView
          meetingName={nextMeeting.meeting_name}
          prediction={myPrediction}
          podium={podium}
          drivers={drivers}
        />
      ) : (
        <PredictionForm
          meetingKey={meetingKey}
          meetingName={nextMeeting.meeting_name}
          drivers={drivers}
          initial={{
            p1: myPrediction?.p1_driver_number ?? null,
            p2: myPrediction?.p2_driver_number ?? null,
            p3: myPrediction?.p3_driver_number ?? null,
          }}
          raceStart={nextMeeting.date_start}
        />
      )}
    </section>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-ria text-(--color-title) text-2xl font-black sm:text-3xl">
        레이스 예측
      </h1>
      <Link
        href="/prediction/leaderboard"
        className="flex items-center gap-1.5 rounded-lg border border-(--color-card-border) bg-(--color-card-bg) px-3 py-2 text-sm font-medium text-(--color-title) transition-colors hover:bg-(--color-card-hover)"
      >
        <Trophy className="h-4 w-4" />
        리더보드
      </Link>
    </div>
  );
}
