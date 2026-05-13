import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Trophy } from 'lucide-react';
import { getSeasonLeaderboard } from '@/lib/server/predictions';
import { createServerSupabase } from '@/lib/server/supabase';

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const year = new Date().getFullYear();
  const entries = await getSeasonLeaderboard(year);

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const myEntry = user ? entries.find((e) => e.user_id === user.id) : null;
  const myRank = myEntry ? entries.indexOf(myEntry) + 1 : null;

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-5 pt-6 pb-20 lg:px-10">
      <div className="flex items-center gap-2">
        <Link
          href="/prediction"
          className="text-(--color-sub-text) hover:text-(--color-title) flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          예측 페이지
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Trophy className="text-(--color-accent) h-7 w-7" />
        <h1 className="font-ria text-(--color-title) text-2xl font-black sm:text-3xl">
          {year} 시즌 리더보드
        </h1>
      </div>

      {myEntry && myRank && (
        <div className="bg-(--color-accent-soft) flex items-center justify-between rounded-xl border border-(--color-accent)/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-(--color-accent) font-ria text-xl font-black">
              #{myRank}
            </span>
            <span className="text-(--color-title) text-sm font-semibold">
              내 순위
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-(--color-sub-text)">
              {myEntry.predictions_count}회 예측
            </span>
            <span className="text-(--color-accent) font-ria text-lg font-black">
              {myEntry.total_points}점
            </span>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-(--color-card-border) bg-(--color-card-bg)">
        <div className="grid grid-cols-[50px_1fr_80px_80px] items-center bg-(--color-table-head-bg) px-4 py-2.5 text-xs font-semibold text-(--color-sub-text)">
          <span>순위</span>
          <span>플레이어</span>
          <span className="text-right">예측</span>
          <span className="text-right">점수</span>
        </div>
        {entries.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-(--color-sub-text)">
            아직 채점된 예측이 없어요. 다음 레이스를 예측해보세요!
          </div>
        ) : (
          entries.map((entry, idx) => {
            const rank = idx + 1;
            const isMe = user?.id === entry.user_id;
            return (
              <div
                key={entry.user_id}
                className={`grid grid-cols-[50px_1fr_80px_80px] items-center border-t border-(--color-card-border) px-4 py-3 ${
                  isMe ? 'bg-(--color-accent-soft)/30' : ''
                }`}
              >
                <span
                  className={`font-ria text-lg font-black ${
                    rank <= 3 ? 'text-(--color-accent)' : 'text-(--color-sub-text)'
                  }`}
                >
                  {rank}
                </span>
                <div className="flex items-center gap-2">
                  {entry.avatar_url ? (
                    <Image
                      src={entry.avatar_url}
                      alt={entry.nickname}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-(--color-box-selected)" />
                  )}
                  <span className="text-(--color-title) truncate text-sm font-medium">
                    {entry.nickname}
                    {isMe && (
                      <span className="text-(--color-accent) ml-1.5 text-xs">
                        (나)
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-right text-sm text-(--color-sub-text)">
                  {entry.predictions_count}
                </span>
                <span className="text-(--color-title) text-right text-sm font-semibold">
                  {entry.total_points}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
