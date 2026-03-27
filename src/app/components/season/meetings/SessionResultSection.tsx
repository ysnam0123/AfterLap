'use client';
import { SessionResults } from '@/types/meeting';
import Image from 'next/image';
import DriverProfile from './DriverProfile';
import DefaultDriverProfile from './DefaultDriverProfile';
import { useRouter } from 'next/navigation';
import { findHeadshot } from '@/utils/findHeadShot';
import LogoLoading from '../../common/LogoLoading';

export default function SessionResultSection({
  sessionResults,
  isPending,
  year,
}: SessionResults) {
  const router = useRouter();
  const processedResults = [...sessionResults]
    .sort((a, b) => {
      // 둘 다 완주
      if (a.position !== null && b.position !== null) {
        return a.position - b.position;
      }

      // 완주 vs 리타이어 → 완주 먼저
      if (a.position !== null) return -1;
      if (b.position !== null) return 1;

      // 둘 다 리타이어면 순서 유지
      return 0;
    })
    .map((result, index) => {
      if (result.position !== null) {
        return {
          ...result,
          displayPosition: index + 1,
        };
      }

      if (result.dsq) return { ...result, displayPosition: 'DSQ' };
      if (result.dns) return { ...result, displayPosition: 'DNS' };
      if (result.dnf) return { ...result, displayPosition: 'DNF' };

      return { ...result, displayPosition: '-' };
    });
  return (
    <>
      {/* {sessionResults.length === 0 && (
        <div className="flex h-100 items-center justify-center sm:h-100">
          <LogoLoading loadingText="결과가 곧 업데이트 됩니다" />
        </div>
      )} */}
      {!isPending && sessionResults.length > 0 && (
        <table className="mt-3 w-full table-fixed border-collapse select-none">
          <thead className="bg-(--color-table-head-bg)">
            <tr className="border-b border-[#1C1A1D] text-[14px] text-[#8B8B8B] sm:text-[20px]">
              <th className="w-[10%] shrink-0 px-4 py-3 sm:w-[10%]">등수</th>
              <th className="w-[30%] py-3 text-left sm:w-[30%]">이름</th>
              {/* 768 px 이상에서 보임 */}
              <th className="hidden py-3 text-left sm:w-[25%] md:table-cell">
                팀
              </th>
              {/* 768 px 이상에서 보임 */}
              <th className="hidden py-3 sm:w-[8%] md:table-cell">Laps</th>
              <th className="w-[15%] py-3">시간</th>
            </tr>
          </thead>
          <tbody className="bg-[#000000]">
            {processedResults.map((result) => (
              <tr
                key={result.driver_number}
                className="border-b border-[#2A2A2A] hover:bg-[#1a1a1a]"
              >
                <td
                  style={{ fontFamily: 'PartialSans', fontWeight: 700 }}
                  className="py-3 text-center text-[14px] sm:text-[22px]"
                >
                  {result.displayPosition}
                </td>
                <td className="py-3 font-bold">
                  <div className="group flex cursor-pointer items-center justify-start gap-3 text-[14px] sm:text-[18px]">
                    {findHeadshot(result.full_name, year) ? (
                      <DriverProfile
                        className="duration-200 group-hover:scale-110"
                        headshot={findHeadshot(result.full_name, year)}
                        teamColor={result.team_colour}
                      />
                    ) : (
                      <DefaultDriverProfile />
                    )}
                    <div className="relative flex min-w-0 flex-col md:flex-row">
                      <div className="flex gap-2 text-[13px] md:text-[18px]">
                        <p className="truncate">{result.kr_name}</p>
                        {/* 640px 이상에서 보임 */}
                        <p className="hidden sm:block">
                          {result.driver_number}
                        </p>
                      </div>
                      <div
                        style={{ borderLeftColor: result.team_colour }}
                        className="block border-l-4 pl-1 text-[11px] font-medium md:hidden"
                      >
                        {result.team_kr_name}
                      </div>
                    </div>
                  </div>
                </td>
                {/* 768 px 이상에서 보임 */}
                <td className="hidden py-3 md:table-cell">
                  <div
                    className="group flex cursor-pointer items-center gap-2 text-[18px]"
                    onClick={() => router.push(`/team/${result.team_slug}`)}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110"
                      style={{ backgroundColor: result.team_colour }}
                    >
                      <Image
                        src={result.white_logo}
                        alt="teamLogo"
                        width={30}
                        height={30}
                        priority
                      />
                    </div>

                    <span className="relative">
                      {result.team_kr_name}
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-current transition-all duration-200 group-hover:w-full" />
                    </span>
                  </div>
                </td>
                {/* 768 px 이상에서 보임 */}
                <td className="hidden py-3 text-center text-[22px] md:table-cell">
                  {result.number_of_laps}
                </td>
                <td className="py-3 text-center text-[18px] sm:text-[20px]">
                  + {result.gap_to_leader}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
