'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { findHeadshot } from '@/utils/findHeadShot';
import DefaultDriverProfile from '../season/meetings/DefaultDriverProfile';
import DriverProfile from '../season/meetings/DriverProfile';
import { DriverSeasonRankingView } from '@/types/Ranking';

export default function DriverRankingTable({
  results,
  year,
}: {
  year: number;
  results: DriverSeasonRankingView[];
}) {
  const router = useRouter();

  return (
    <>
      <table className="w-full table-fixed border-collapse text-left whitespace-nowrap select-none">
        <thead className="bg-(--color-table-head-bg)">
          <tr className="border-b border-white text-[13px] text-[#8B8B8B] sm:text-[18px]">
            <th className="w-[4%] py-3 text-center sm:w-[8%]">순위</th>

            <th className="w-[18%] py-3 sm:w-[20%]">드라이버</th>

            {/* 768 px 이상에서 보임 */}
            <th className="hidden w-[14%] py-3 sm:w-[12%] md:table-cell">
              국적
            </th>

            {/* 768 px 이상에서 보임 */}
            <th className="hidden w-[14%] py-3 sm:w-[14%] md:table-cell">팀</th>

            {/* 640 px 이상에서 보임 */}
            <th className="hidden w-[10%] py-3 sm:table-cell">평균 등수</th>

            {/* 1280 px 이상에서 보임 */}
            <th className="hidden w-[8%] py-3 xl:table-cell">최고 등수</th>

            <th className="w-[8%] py-3 sm:w-[10%]">포디움</th>

            <th className="w-[5%] py-3 sm:w-[10%]">포인트</th>
          </tr>
        </thead>
        <tbody className="bg-[#000000]">
          {results.map((result) => (
            <tr
              key={`${result.driver_number}`}
              className="border-b border-[#2A2A2A] text-[16px] hover:bg-[#232323]"
            >
              <td
                style={{ fontFamily: 'PartialSans', fontWeight: 700 }}
                className="px-2 py-3 text-center text-[14px] sm:text-[18px]"
              >
                {result.rank}
              </td>
              <td className="py-3 font-bold">
                <div className="group flex min-w-0 cursor-pointer items-center justify-start gap-3">
                  {findHeadshot(result.full_name, year) ? (
                    <DriverProfile
                      className="shrink-0 duration-200 group-hover:scale-110"
                      headshot={findHeadshot(result.full_name, year)}
                      teamColor={result.team_colour}
                    />
                  ) : (
                    <DefaultDriverProfile />
                  )}
                  <div className="relative flex min-w-0 flex-col gap-1 md:flex-row">
                    <div className="flex gap-2 text-[13px] md:text-[17px]">
                      <p className="truncate">{result.kr_name}</p>
                      {/* 640px 이상에서 보임 */}
                      <p className="hidden sm:block">{result.driver_number}</p>
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
              {/* 국가 */}
              <td className="hidden py-3 text-[12px] sm:text-[17px] md:table-cell">
                <div className="flex items-center gap-2">
                  <Image
                    src={result.flag}
                    alt="flag"
                    width={27}
                    height={14}
                    priority
                  />
                  {result.country_kr_name}
                </div>
              </td>
              {/* 팀열 */}
              {/* 768 px 이상에서 보임 */}
              <td className="hidden py-3 md:table-cell">
                <div
                  className="group flex cursor-pointer items-center justify-center gap-2 sm:justify-start"
                  onClick={() => router.push(`/team/${result.team_slug}`)}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 sm:h-9 sm:w-9"
                    style={{ backgroundColor: result.team_colour }}
                  >
                    <Image
                      src={result.white_logo}
                      alt="teamLogo"
                      width={28}
                      height={28}
                      priority
                    />
                  </div>
                  <span className="relative hidden truncate sm:block">
                    {result.team_kr_name}
                  </span>
                </div>
              </td>

              {/* 640 px 이상에서 보임 */}
              <td className="hidden py-3 text-[18px] sm:table-cell">
                {result.avg_finish} 등
              </td>
              {/* 1280 px 이상에서 보임 */}
              <td className="hidden py-3 font-bold xl:table-cell">
                {result.best_finish} 등
              </td>
              <td className="py-3 font-bold">{result.podiums} 회</td>
              <td className="py-3 font-bold">{result.total_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
