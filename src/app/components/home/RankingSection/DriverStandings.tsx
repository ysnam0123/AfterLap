import { DriverSeasonRankingView } from '@/types/Ranking';
import Image from 'next/image';
import FavoriteDriver from './FavoriteDriver';
import Link from 'next/link';

interface DS {
  data: DriverSeasonRankingView[];
}
export default function DriverStandings({ data }: DS) {
  return (
    <section className="w-full">
      <div className="w-full">
        {/* Header */}
        <div className="mb-3 border-b border-white/10 pb-2">
          <div className="grid grid-cols-[60px_1fr_80px] pr-3 text-xs sm:text-sm md:grid-cols-[60px_1fr_1fr_80px]">
            <span>등수</span>
            <span>선수</span>
            {/* 768 px 이상에서 보임 */}
            <span className="hidden text-center md:block">팀</span>
            <span className="text-right">포인트</span>
          </div>
        </div>

        {/* Body */}
        <div className="mb-1 space-y-1">
          {data.map((item, idx) => (
            <Link
              href={`/driver/${item.driver_id}`}
              key={item.rank}
              className="grid h-14 cursor-pointer grid-cols-[6px_50px_2fr_1fr] items-center border-y border-r border-(--color-table-border) bg-(--color-table-bg) transition hover:bg-(--color-table-hover) sm:h-16 sm:grid-cols-[6px_60px_1fr_1fr_80px]"
            >
              {/* Team Color Bar */}
              <div
                style={{ backgroundColor: item.team_colour }}
                className={`h-full rounded-l-lg`}
              />

              {/* Rank */}
              <div className="text-center text-sm font-semibold sm:text-base">
                {idx + 1}
              </div>

              {/* Driver */}
              <div className="flex items-center gap-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#2C2C2C] sm:h-11.5 sm:w-11.5">
                  <Image
                    src={item.headshot_url}
                    width={46}
                    height={46}
                    sizes="46px"
                    className="object-cover"
                    alt="driver"
                    priority
                    quality={65}
                  />
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex gap-2 text-[13px] md:text-[18px]">
                    <span className="inline-flex gap-1 truncate text-sm font-medium sm:text-base">
                      {item.kr_name}
                      <FavoriteDriver driverId={item.driver_id} />
                    </span>
                  </div>
                  <div
                    style={{ borderLeftColor: item.team_colour }}
                    className="block border-l-4 pl-1 text-[11px] font-medium md:hidden"
                  >
                    {item.team_kr_name}
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="hidden truncate text-center text-sm sm:text-base md:block">
                {item.team_kr_name}
              </div>

              {/* Points */}
              <div className="pr-3 text-right text-sm font-semibold sm:text-base">
                {item.total_points}
              </div>
            </Link>
          ))}
        </div>
        <div className="mobile">
          <Link
            href={'/ranking'}
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
          >
            <p className="font-ria text-[12px] font-semibold">전체보기</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
