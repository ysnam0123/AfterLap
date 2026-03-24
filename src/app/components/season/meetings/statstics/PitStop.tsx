'use client';

import DriverProfile from '../DriverProfile';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DefaultDriverProfile from '../DefaultDriverProfile';
// import { useState } from 'react';
import { findHeadshot } from '@/utils/findHeadShot';
import { PitView } from '@/types/raceResult';
export default function PitStop({
  pit,
  year,
}: {
  pit: PitView[];
  year: number;
}) {
  const router = useRouter();
  // const tabs = ['팀 별', '드라이버 별'];
  // const [isSelected, setIsSelected] = useState('팀 별');
  return (
    <>
      {/* <div className="mt-3 flex items-center gap-0 pl-0 sm:gap-5 sm:pl-5">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setIsSelected(tab)}
            className={`${isSelected === tab ? 'bg-[#252525]' : 'bg-[#111111]'} rounded-none ${idx === 0 ? 'rounded-l-xl' : ''} ${idx === tabs.length - 1 ? 'rounded-r-xl' : ''} w-full cursor-pointer rounded-none border border-(--color-button-border) bg-(--color-button-bg) px-4 py-2 hover:bg-(--color-box-hover) active:bg-(--color-box-active) sm:rounded-[10px] sm:px-5`}
          >
            {tab}
          </button>
        ))}
      </div> */}
      <table className="w-full table-fixed border-collapse whitespace-nowrap select-none sm:text-left">
        <thead>
          <tr className="border-b border-white text-[14px] text-[#8B8B8B] sm:text-[20px]">
            <th className="w-[8%] py-3 text-center sm:w-[12%]">번호</th>
            <th className="w-[40%] py-3 pl-3 text-left sm:w-[30%]">드라이버</th>
            {/* 768 px 이상에서 보임 */}
            <th className="hidden w-[14%] py-3 text-center sm:w-[20%] md:table-cell">
              팀
            </th>
            <th className="hidden w-[15%] py-3 text-center md:table-cell">
              총 피트스탑 시간
            </th>
            <th className="w-[15%] py-3 text-center">스탑 시간</th>
          </tr>
        </thead>
        <tbody>
          {pit.map((p) => (
            <tr
              key={p.pit_duration - p.driver_number}
              className="border-b border-[#2A2A2A] text-[16px] hover:bg-[#232323]"
            >
              <td
                style={{ fontFamily: 'PartialSans', fontWeight: 700 }}
                className="py-3 text-center text-[14px] font-bold sm:text-[20px]"
              >
                {p.driver_number}
              </td>
              <td className="py-3 font-bold">
                <div className="group flex min-w-0 cursor-pointer items-center justify-start gap-3 pl-3 text-[16px] sm:text-[18px]">
                  {findHeadshot(p.full_name, year) ? (
                    <DriverProfile
                      className="shrink-0 duration-200 group-hover:scale-110"
                      headshot={findHeadshot(p.full_name, year)}
                      teamColor={p.team_colour}
                    />
                  ) : (
                    <DefaultDriverProfile />
                  )}
                  <div className="relative flex min-w-0 flex-col md:flex-row">
                    <div className="text-[13px] md:text-[18px]">
                      <p className="truncate">{p.kr_name}</p>
                    </div>
                    <div
                      style={{ borderLeftColor: p.team_colour }}
                      className="block border-l-4 pl-1 text-[11px] font-medium md:hidden"
                    >
                      {p.team_kr_name}
                    </div>
                  </div>
                </div>
              </td>
              {/* 팀명 */}
              {/* 768 px 이상에서 보임 */}
              <td className="hidden py-3 md:table-cell">
                <div
                  className="group flex cursor-pointer items-center gap-2"
                  onClick={() => router.push(`/team/${p.team_slug}`)}
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 sm:h-9 sm:w-9"
                    style={{ backgroundColor: p.team_colour }}
                  >
                    <Image
                      src={p.white_logo}
                      alt="teamLogo"
                      width={28}
                      height={28}
                      priority
                    />
                  </div>
                  <span className="relative hidden truncate sm:block">
                    {p.team_kr_name}
                  </span>
                </div>
              </td>
              <td className="hidden py-3 text-center text-[22px] md:table-cell">
                {p.pit_duration} 초
              </td>
              <td className="py-3 text-center text-[15px]">
                {p.stop_duration === null ? '제공되지 않음' : p.stop_duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
