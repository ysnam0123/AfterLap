'use client';
import { useUserStore } from '@/store/useUserFavoriteStore';
import { TeamSeasonRankingView } from '@/types/Ranking';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Favorite from '../Auth/Favorite';

interface TS {
  data: TeamSeasonRankingView[];
}
export default function ConstructorStandings({ data }: TS) {
  const router = useRouter();
  const favoriteTeams = useUserStore((state) => state.favoriteTeams);
  return (
    <>
      <section className="w-full">
        <div className="mb-3 border-b border-white/10 pb-2">
          <div className="grid grid-cols-[60px_1fr_80px] text-xs sm:text-sm">
            <span>등수</span>
            <span>팀</span>
            <span className="pr-2 text-right">포인트</span>
          </div>
        </div>

        {/* Table Body */}
        <div className="mb-1 space-y-1">
          {data.map((item) => (
            <div
              key={item.rank}
              onClick={() => router.push(`/team/${item.team_slug}`)}
              className="grid h-14 cursor-pointer grid-cols-[6px_40px_1fr_80px] items-center border-y border-r border-(--color-table-border) bg-(--color-table-bg) transition hover:bg-(--color-table-hover) active:bg-[#848484] sm:h-16 sm:grid-cols-[6px_60px_1fr_80px]"
            >
              {/* Team Color Bar */}
              <div
                style={{ backgroundColor: item.team_colour }}
                className={`h-full rounded-l-lg`}
              />

              {/* Rank */}
              <div className="text-center text-[16px] font-semibold sm:text-base">
                {item.rank}
              </div>

              {/* Team */}
              <div className="flex cursor-pointer items-center gap-3 py-2">
                <div className="relative h-9 w-16">
                  <Image
                    src={item.small_logo}
                    alt="team logo"
                    fill
                    sizes="60px"
                    className="object-contain"
                  />
                </div>
                <span className="relative inline-flex items-center gap-1 truncate text-sm font-medium sm:text-base">
                  {item.team_kr_name}
                  {favoriteTeams.includes(item.team_slug) && <Favorite />}
                </span>
              </div>

              {/* Points */}
              <div className="pr-3 text-right text-sm font-semibold sm:text-base">
                {item.team_total_points}
              </div>
            </div>
          ))}
        </div>
        <div className="mobile">
          <button
            onClick={() => router.push('/ranking')}
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
          >
            <p className="font-ria text-[12px] font-semibold">전체보기</p>
          </button>
        </div>
      </section>
    </>
  );
}
