import Image from 'next/image';
import DefaultDriverProfile from '../../DefaultDriverProfile';
import { findHeadshot } from '@/utils/findHeadShot';
import { PitView } from '@/types/raceResult';

export default function FastestPitStop({
  pit,
  setSelectedTab,
  year,
}: {
  setSelectedTab: (tab: string) => void;
  pit: PitView[];
  year: number;
}) {
  const fastest = pit[0];
  const stopDurationOffered = pit[0]?.stop_duration !== null ? true : false;
  return (
    <>
      <div className="flex flex-col gap-3 rounded-[5px] border border-(--color-card-border) bg-(--color-card-bg) px-3 py-3.75 pl-5 shadow-(--shadow-soft) sm:rounded-4xl sm:py-5">
        <div className="text-gray-400">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-gray-420 flex items-center gap-1">
              <Image
                src="/icons/pitstop.webp"
                alt="icon"
                width={28}
                height={28}
                className="desktop"
                priority
              />
              <Image
                src="/icons/pitstop.webp"
                alt="icon"
                width={20}
                height={20}
                className="mobile"
                priority
              />
              <p className="font-paper text-[14px] font-semibold md:text-[20px]">
                Best 피트 스탑
              </p>
            </h1>
            <button
              onClick={() => setSelectedTab('피트 스탑')}
              className="cursor-pointer text-[13px] text-(--color-sub-text) hover:text-(--color-title-hover) md:text-[18px]"
            >
              전체보기
            </button>
          </div>
          {!stopDurationOffered && (
            <div className="flex w-full">
              <p className="ml-auto text-[11px] text-(--color-sub-text)">
                * 차량 정지시간이 제공되지 않는 레이스입니다.
              </p>
            </div>
          )}
        </div>
        {!fastest && (
          <div className="flex items-center justify-between rounded-2xl border border-(--color-box-border) bg-(--color-box-bg) px-4 py-3">
            <p className="text-[13px] text-(--color-sub-text) md:text-[16px]">
              피트스탑 데이터가 아직 없어요.
            </p>
            <button
              onClick={() => setSelectedTab('피트 스탑')}
              className="cursor-pointer rounded-xl border border-(--color-button-border) bg-(--color-button-bg) px-3 py-1.5 text-[12px] text-(--color-title) shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong)"
            >
              피트 탭 보기
            </button>
          </div>
        )}
        {fastest && (
          <div className="font-pretendard flex items-center justify-between px-4 font-semibold">
            <div className="flex flex-col items-center">
              <Image
                style={{ backgroundColor: fastest.team_colour }}
                src={fastest.main_logo}
                alt="teamLogo"
                width={100}
                height={70}
                className="desktop rounded-[5px]"
                priority
              />
              <Image
                src={fastest.main_logo}
                style={{ backgroundColor: fastest.team_colour }}
                alt="teamLogo"
                width={70}
                height={50}
                className="mobile rounded-[5px]"
                priority
              />
              <p className="text-[14px] md:text-[20px]">
                {fastest.team_kr_name}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="desktop">
                {findHeadshot(fastest.full_name, year) ? (
                  <Image
                    src={findHeadshot(fastest.full_name, year)}
                    alt="teamLogo"
                    width={100}
                    height={100}
                    priority
                  />
                ) : (
                  <DefaultDriverProfile />
                )}
              </div>
              <div className="mobile">
                {findHeadshot(fastest.full_name, year) ? (
                  <Image
                    src={findHeadshot(fastest.full_name, year)}
                    alt="teamLogo"
                    width={70}
                    height={70}
                    className="mobile"
                    priority
                  />
                ) : (
                  <DefaultDriverProfile />
                )}
              </div>

              <p className="text-[14px] sm:text-[16px] md:text-[20px]">
                {fastest.kr_name}
              </p>
            </div>
            <span className="text-[22px] sm:text-[18px] md:text-[25px]">
              {stopDurationOffered
                ? `+ ${fastest.stop_duration}s`
                : `+ ${fastest.pit_duration}s`}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
