import { DriverPositionGain } from '@/types/raceResult';
import { ArrowBigRight, Flame } from 'lucide-react';
import Image from 'next/image';

export default function Top3Position({
  setSelectedTab,
  positionGain,
}: {
  setSelectedTab: (tab: string) => void;
  positionGain: DriverPositionGain[];
}) {
  return (
    <>
      <div className="flex flex-col gap-3 rounded-[5px] border border-(--color-card-border) bg-(--color-card-bg) px-3 py-2.5 shadow-(--shadow-soft) sm:rounded-4xl sm:px-7.5 sm:py-5">
        <div className="mb-4 flex items-center justify-between text-(--color-sub-text)">
          <h1 className="text-gray-420 flex items-center gap-1">
            <Image
              src="/icons/graph.svg"
              alt="icon"
              width={28}
              height={28}
              className="desktop"
              priority
            />
            <Image
              src="/icons/graph.svg"
              alt="icon"
              width={20}
              height={20}
              className="mobile"
              priority
            />
            <p
              className="text-[12px] sm:text-[20px]"
              style={{ fontFamily: 'paperlogy', fontWeight: 500 }}
            >
              포지션 상승 TOP 3
            </p>
          </h1>
          <button
            onClick={() => setSelectedTab('포지션')}
            className="cursor-pointer text-[12px] hover:text-(--color-title-hover) sm:text-[18px]"
          >
            전체보기
          </button>
        </div>
        {positionGain.length === 0 ? (
          <div className="flex items-center justify-between rounded-2xl border border-(--color-box-border) bg-(--color-box-bg) px-4 py-3">
            <p className="text-[13px] text-(--color-sub-text) md:text-[16px]">
              포지션 데이터가 아직 없어요.
            </p>
            <button
              onClick={() => setSelectedTab('포지션')}
              className="cursor-pointer rounded-xl border border-(--color-button-border) bg-(--color-button-bg) px-3 py-1.5 text-[12px] text-(--color-title) shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong)"
            >
              포지션 탭 보기
            </button>
          </div>
        ) : (
          positionGain.slice(0, 3).map((position) => (
            <div
              key={position.driver_id}
              className="flex items-center justify-between gap-2.5 px-0 sm:gap-4"
            >
              <p className="w-24 flex-1 shrink-0 truncate text-[14px] font-semibold sm:w-40 sm:text-[18px]">
                {position.kr_name}
              </p>
              <div className="flex w-24 flex-1 shrink-0 items-center justify-center gap-1 text-[22px] sm:w-32 sm:gap-4">
                <p className="w-6 text-center">{position.start_position}</p>
                <ArrowBigRight className="h-5 w-5 shrink-0" />
                <p className="w-6 text-center">{position.end_position}</p>
              </div>
              <div className="relative flex w-20 items-center gap-2 text-[14px] font-semibold sm:text-[18px]">
                <span>+ {position.position_gain}</span>
                <Flame className="text-[#FF5900]" />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
