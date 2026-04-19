import { SortedSessionResult } from '@/types/meeting';
import { DriverSeasonRankingView } from '@/types/Ranking';
import { findHeadshot } from '@/utils/findHeadShot';
import Image from 'next/image';

export default function PodiumCard({
  result,
  rank,
  year,
}: {
  year: number;
  result: SortedSessionResult | DriverSeasonRankingView;
  rank: 1 | 2 | 3;
}) {
  const headShot = findHeadshot(result.full_name, year);
  const podiumStyle = {
    1: 'h-68 ',
    2: 'h-64 ',
    3: 'h-60 ',
  }[rank];
  return (
    <>
      <div
        className={`relative hidden w-full min-w-50 overflow-hidden rounded-br-2xl border border-(--color-card-border) bg-(--color-card-bg) whitespace-nowrap shadow-(--shadow-soft) transition-all duration-300 select-none sm:block ${podiumStyle}`}
      >
        <Image
          src="/cardBg.webp"
          alt="bg"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="absolute inset-0 z-0 object-cover"
          priority
        />
        <Image
          src={headShot}
          alt="driver"
          width={160}
          height={160}
          className="absolute bottom-16.25 left-1/2 z-10 -translate-x-1/2"
          priority
        />
        <Image
          src={result.main_logo}
          alt="team"
          width={90}
          height={90}
          className="absolute right-1"
          priority
        />
        <div className="absolute bottom-0 z-20 flex h-14 w-full items-center justify-between border-t border-(--color-box-border) bg-(--color-box-bg)/95 px-3.75 backdrop-blur">
          <div className="flex w-full items-center justify-between">
            <span className="text-[19px] font-bold">{result.kr_name}</span>
            <div className="flex items-center gap-3">
              <p className="font-pretendard text-[16px] font-semibold">
                {result.driver_number}
              </p>
              <Image
                src={result.flag}
                alt="team"
                width={30}
                height={30}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
