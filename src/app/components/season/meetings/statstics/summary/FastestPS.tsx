import { PitView } from '@/app/api/f1/race/pit';
import Image from 'next/image';
import DefaultDriverProfile from '../../DefaultDriverProfile';
import { findHeadshot } from '@/utils/findHeadShot';
import { useEffect } from 'react';

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
  const stopDurationOffered = pit[0].stop_duration !== null ? true : false;
  console.log('stopDurationOffered', stopDurationOffered);
  // useEffect(() => {
  //   console.log(findHeadshot(fastest.full_name, year));
  //   console.log(fastest.full_name);
  //   console.log(fastest.full_name.split(' ').join('').toLowerCase());
  //   console.log('4번 year', year);
  // }, [fastest.full_name, year]);
  return (
    <>
      <div className="flex flex-col gap-3 rounded-4xl border border-[#262626] bg-[#161616] px-3 py-2.5 sm:px-7.5 sm:py-5">
        <div className="text-gray-400">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-gray-420 flex items-center gap-1">
              <Image
                src="/icons/pitstop.svg"
                alt="icon"
                width={28}
                height={28}
                className="desktop"
                priority
              />
              <Image
                src="/icons/pitstop.svg"
                alt="icon"
                width={20}
                height={20}
                className="mobile"
                priority
              />
              <p
                className="text-[14px] md:text-[20px]"
                style={{ fontFamily: 'paperlogy', fontWeight: 500 }}
              >
                Best 피트 스탑
              </p>
            </h1>
            <button
              onClick={() => setSelectedTab('피트 스탑')}
              className="cursor-pointer text-[13px] hover:text-[#cacaca] md:text-[18px]"
            >
              전체보기
            </button>
          </div>
          {!stopDurationOffered && (
            <div className="flex w-full">
              <p className="ml-auto text-[11px]">
                * 차량 정지시간이 제공되지 않는 레이스입니다.
              </p>
            </div>
          )}
        </div>
        {fastest && (
          <div
            style={{ fontFamily: 'Pretendard', fontWeight: 500 }}
            className="flex items-center justify-between px-4"
          >
            <div className="flex flex-col items-center">
              <Image
                src={fastest.main_logo}
                alt="teamLogo"
                width={100}
                height={70}
                className="desktop"
                priority
              />
              <Image
                src={fastest.main_logo}
                alt="teamLogo"
                width={70}
                height={50}
                className="mobile"
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
