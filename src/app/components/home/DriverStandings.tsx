'use client';
import { useUserStore } from '@/store/useUserFavoriteStore';
import { DriverSeasonRankingView } from '@/types/Ranking';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Favorite from '../Auth/Favorite';

interface DS {
  data: DriverSeasonRankingView[];
  seeAll: boolean;
  setSeeAll: (see: boolean) => void;
}
export default function DriverStandings({ data, seeAll, setSeeAll }: DS) {
  const router = useRouter();
  const favoriteDrivers = useUserStore((state) => state.favoriteDrivers);
  return (
    <section className="w-full">
      <div className="w-full">
        {/* Header */}
        <div className="mb-3 border-b border-white/10 pb-2">
          <div className="grid grid-cols-[60px_1fr_80px] pr-3 text-xs text-white/60 sm:text-sm md:grid-cols-[60px_1fr_1fr_80px]">
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
            <div
              key={item.rank}
              onClick={() => router.push(`/driver/${item.driver_id}`)}
              className="grid h-14 cursor-pointer grid-cols-[6px_50px_2fr_1fr] items-center border-y border-r border-(--color-table-border) bg-(--color-table-bg) transition hover:bg-(--color-table-hover) sm:h-16 sm:grid-cols-[6px_60px_1fr_1fr_80px]"
            >
              {/* Team Color Bar */}
              <div
                style={{ backgroundColor: item.team_colour }}
                className={`h-full rounded-l-lg`}
              />

              {/* Rank */}
              <div className="text-center text-sm font-semibold text-white sm:text-base">
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
                    className="object-fill"
                    alt="driver"
                    priority
                    quality={50}
                  />
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex gap-2 text-[13px] md:text-[18px]">
                    <span className="inline-flex gap-1 truncate text-sm font-medium text-white sm:text-base">
                      {item.kr_name}
                      {favoriteDrivers.includes(item.driver_id) && <Favorite />}
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
              <div className="hidden truncate text-center text-sm text-white/80 sm:text-base md:block">
                {item.team_kr_name}
              </div>

              {/* Points */}
              <div className="pr-3 text-right text-sm font-semibold text-white sm:text-base">
                {item.total_points}
              </div>
            </div>
          ))}
        </div>
        <div className="mobile">
          <button
            onClick={() => setSeeAll(!seeAll)}
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
          >
            <p className="font-ria text-[12px] font-medium">
              {seeAll ? '접기' : '펼치기'}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
