'use client';

import DriverProfile from '../DriverProfile';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DefaultDriverProfile from '../DefaultDriverProfile';
import { findHeadshot } from '@/utils/findHeadShot';
import { PitView } from '@/types/raceResult';
import Favorite from '@/app/components/Auth/Favorite';
import { useUserStore } from '@/store/useUserFavoriteStore';

export default function PitStop({
  pit,
  year,
}: {
  pit: PitView[];
  year: number;
}) {
  const router = useRouter();
  const favoriteDrivers = useUserStore((state) => state.favoriteDrivers);

  // 1. 데이터 전체 중에 stop_duration이 하나라도 존재하는지 확인 (헤더 결정용)
  const hasAnyStopDuration = pit.some((p) => p.stop_duration !== null);

  return (
    <>
      <table className="w-full table-fixed border-collapse whitespace-nowrap select-none sm:text-left">
        <thead>
          <tr className="border-b border-white text-[14px] text-[#8B8B8B] sm:text-[20px]">
            <th className="w-[10%] py-3 text-center sm:w-[12%]">번호</th>
            <th className="w-[45%] py-3 pl-5 text-left sm:w-[30%]">드라이버</th>
            <th className="hidden w-[20%] py-3 text-center md:table-cell">
              팀
            </th>

            {/* 2. 전체 데이터에 stop_duration이 있을 때만 '총 시간' 헤더를 데스크톱에서 보여줌 */}
            {hasAnyStopDuration && (
              <th className="hidden w-[20%] py-3 text-center md:table-cell">
                총 시간
              </th>
            )}

            {/* 3. stop_duration이 아예 없으면 이 헤더가 '피트스탑 시간' 역할을 수행 */}
            <th className="w-[25%] py-3 text-center sm:w-[18%]">
              {hasAnyStopDuration ? '스탑 시간' : '시간'}
            </th>
          </tr>
        </thead>
        <tbody>
          {pit.map((p) => {
            const isStopNull = p.stop_duration === null;

            return (
              <tr
                key={`${p.pit_duration}-${p.driver_number}`}
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
                        <span className="inline-flex gap-1 truncate text-sm font-medium text-white sm:text-base">
                          {p.kr_name}
                          {favoriteDrivers.includes(p.driver_id) && (
                            <Favorite />
                          )}
                        </span>
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

                {/* 4. 총 시간 데이터 표시 로직 */}
                {/* 전체 데이터 중 하나라도 스탑시간이 있으면 -> 데스크톱에선 무조건 보여주고, 모바일에선 내 스탑시간이 null일때만 보여줌 */}
                {hasAnyStopDuration && (
                  <td
                    className={`py-3 text-center text-[15px] sm:text-[22px] ${
                      !isStopNull ? 'hidden md:table-cell' : 'table-cell'
                    }`}
                  >
                    {p.pit_duration}s
                    {isStopNull && (
                      <span className="ml-1 text-[10px] text-gray-400 md:hidden">
                        (Total)
                      </span>
                    )}
                  </td>
                )}

                {/* 5. 개별 스탑 시간 (데이터가 있을 때만 표시) */}
                {/* 만약 전체가 null이면 위 4번 td가 'table-cell'로 작동하며 '시간' 열을 채움 */}
                {!isStopNull && (
                  <td className="table-cell py-3 text-center text-[15px] font-semibold text-white sm:text-[22px]">
                    {p.stop_duration}s
                  </td>
                )}

                {/* 6. 예외 케이스: 모든 데이터가 null인데 나만 null인 경우 (4번이 처리함) */}
                {!hasAnyStopDuration && isStopNull && (
                  <td className="table-cell py-3 text-center text-[15px] sm:text-[22px]">
                    {p.pit_duration}s
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
// 'use client';

// import DriverProfile from '../DriverProfile';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import DefaultDriverProfile from '../DefaultDriverProfile';
// // import { useState } from 'react';
// import { findHeadshot } from '@/utils/findHeadShot';
// import { PitView } from '@/types/raceResult';
// import Favorite from '@/app/components/Auth/Favorite';
// import { useUserStore } from '@/store/useUserFavoriteStore';
// export default function PitStop({
//   pit,
//   year,
// }: {
//   pit: PitView[];
//   year: number;
// }) {
//   const router = useRouter();
//   const favoriteDrivers = useUserStore((state) => state.favoriteDrivers);
//   // const tabs = ['팀 별', '드라이버 별'];
//   // const [isSelected, setIsSelected] = useState('팀 별');
//   return (
//     <>
//       {/* <div className="mt-3 flex items-center gap-0 pl-0 sm:gap-5 sm:pl-5">
//         {tabs.map((tab, idx) => (
//           <button
//             key={tab}
//             onClick={() => setIsSelected(tab)}
//             className={`${isSelected === tab ? 'bg-[#252525]' : 'bg-[#111111]'} rounded-none ${idx === 0 ? 'rounded-l-xl' : ''} ${idx === tabs.length - 1 ? 'rounded-r-xl' : ''} w-full cursor-pointer rounded-none border border-(--color-button-border) bg-(--color-button-bg) px-4 py-2 hover:bg-(--color-box-hover) active:bg-(--color-box-active) sm:rounded-[10px] sm:px-5`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div> */}
//       <table className="w-full table-fixed border-collapse whitespace-nowrap select-none sm:text-left">
//         <thead>
//           <tr className="border-b border-white text-[14px] text-[#8B8B8B] sm:text-[20px]">
//             <th className="w-[5%] py-3 text-center sm:w-[12%]">번호</th>
//             <th className="w-[30%] py-3 pl-5 text-left sm:w-[30%]">드라이버</th>
//             {/* 768 px 이상에서 보임 */}
//             <th className="hidden w-[14%] py-3 text-center sm:w-[20%] md:table-cell">
//               팀
//             </th>
//             <th className="hidden w-[15%] py-3 text-center md:table-cell">
//               총 피트스탑 시간
//             </th>
//             <th className="w-[15%] py-3 text-center">스탑 시간</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pit.map((p) => (
//             <tr
//               key={p.pit_duration - p.driver_number}
//               className="border-b border-[#2A2A2A] text-[16px] hover:bg-[#232323]"
//             >
//               <td
//                 style={{ fontFamily: 'PartialSans', fontWeight: 700 }}
//                 className="py-3 text-center text-[14px] font-bold sm:text-[20px]"
//               >
//                 {p.driver_number}
//               </td>
//               <td className="py-3 font-bold">
//                 <div className="group flex min-w-0 cursor-pointer items-center justify-start gap-3 pl-3 text-[16px] sm:text-[18px]">
//                   {findHeadshot(p.full_name, year) ? (
//                     <DriverProfile
//                       className="shrink-0 duration-200 group-hover:scale-110"
//                       headshot={findHeadshot(p.full_name, year)}
//                       teamColor={p.team_colour}
//                     />
//                   ) : (
//                     <DefaultDriverProfile />
//                   )}
//                   <div className="relative flex min-w-0 flex-col md:flex-row">
//                     <div className="text-[13px] md:text-[18px]">
//                       <span className="inline-flex gap-1 truncate text-sm font-medium text-white sm:text-base">
//                         {p.kr_name}
//                         {favoriteDrivers.includes(p.driver_id) && <Favorite />}
//                       </span>
//                     </div>
//                     <div
//                       style={{ borderLeftColor: p.team_colour }}
//                       className="block border-l-4 pl-1 text-[11px] font-medium md:hidden"
//                     >
//                       {p.team_kr_name}
//                     </div>
//                   </div>
//                 </div>
//               </td>
//               {/* 팀명 */}
//               {/* 768 px 이상에서 보임 */}
//               <td className="hidden py-3 md:table-cell">
//                 <div
//                   className="group flex cursor-pointer items-center gap-2"
//                   onClick={() => router.push(`/team/${p.team_slug}`)}
//                 >
//                   <div
//                     className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 sm:h-9 sm:w-9"
//                     style={{ backgroundColor: p.team_colour }}
//                   >
//                     <Image
//                       src={p.white_logo}
//                       alt="teamLogo"
//                       width={28}
//                       height={28}
//                       priority
//                     />
//                   </div>
//                   <span className="relative hidden truncate sm:block">
//                     {p.team_kr_name}
//                   </span>
//                 </div>
//               </td>
//               <td className="hidden py-3 text-center text-[22px] md:table-cell">
//                 {p.pit_duration} 초
//               </td>
//               <td className="py-3 text-center text-[15px]">
//                 {p.stop_duration === null ? '제공되지 않음' : p.stop_duration}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }
