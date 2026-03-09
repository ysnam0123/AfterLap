'use client';
import { TeamSeasonRankingView } from '@/types/Ranking';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TS {
  data: TeamSeasonRankingView[];
}
export default function ConstructorStandings({ data }: TS) {
  const router = useRouter();
  return (
    <>
      <section className="w-full">
        <div className="mb-3 flex items-center justify-between sm:mb-5">
          <h2 className="text-[14px] font-semibold text-(--color-title) sm:text-[18px]">
            2025 시즌 팀 랭킹
          </h2>
          <div className="desktop">
            <button className="flex h-8 cursor-pointer items-center justify-center md:h-10">
              <p
                className="text-[12px] text-[#F8F8F8] sm:text-[16px]"
                style={{ fontFamily: 'Paperlolgy', fontWeight: 600 }}
              >
                더보기
              </p>
            </button>
          </div>
        </div>
        <div className="mb-3 border-b border-white/10 pb-2">
          <div className="grid grid-cols-[60px_1fr_80px] text-xs text-white/60 sm:text-sm">
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
              className="grid h-10 cursor-pointer grid-cols-[6px_40px_1fr_80px] items-center border-y border-r border-(--color-table-border) bg-(--color-table-bg) transition hover:bg-(--color-table-hover) active:bg-[#848484] sm:h-16 sm:grid-cols-[6px_60px_1fr_80px]"
            >
              {/* Team Color Bar */}
              <div
                style={{ backgroundColor: item.team_colour }}
                className={`h-full rounded-l-lg`}
              />

              {/* Rank */}
              <div className="text-center text-[16px] font-semibold text-white sm:text-base">
                {item.rank}
              </div>

              {/* Team */}
              <div className="flex cursor-pointer items-center gap-3 py-2">
                <Image
                  src={item.small_logo}
                  width={70}
                  height={40}
                  alt="team logo"
                  className="h-6 w-auto sm:h-9"
                  priority
                />
                <span className="truncate text-sm font-medium text-white sm:text-base">
                  {item.team_kr_name}
                </span>
              </div>

              {/* Points */}
              <div className="pr-3 text-right text-sm font-semibold text-white sm:text-base">
                {item.team_total_points}
              </div>
            </div>
          ))}
        </div>
        <div className="mobile">
          <button
            onClick={() => router.push('/ranking')}
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-[12px] border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
          >
            <p
              style={{ fontFamily: 'RiaSans', fontWeight: 500 }}
              className="text-[12px]"
            >
              전체보기
            </p>
          </button>
        </div>
      </section>
    </>
  );
}
