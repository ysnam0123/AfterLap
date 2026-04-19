'use client';
import { SortedSessionResult } from '@/types/meeting';
import DefaultDriverProfile from '../DefaultDriverProfile';
import DriverProfile from '../DriverProfile';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatDuration } from '@/utils/FormattingDuration';
import { findHeadshot } from '@/utils/findHeadShot';
import PodiumCard from '../PodiumCard';
import { useUserStore } from '@/store/useUserFavoriteStore';
import Favorite from '@/app/components/Auth/Favorite';

export default function RaceResultTable({
  results,
  year,
}: {
  year: number;
  results: SortedSessionResult[];
}) {
  const router = useRouter();
  const favoriteDrivers = useUserStore((state) => state.favoriteDrivers);
  const podiumResults = results.slice(0, 3);
  const first = podiumResults.find((r) => r.position === 1);
  const second = podiumResults.find((r) => r.position === 2);
  const third = podiumResults.find((r) => r.position === 3);
  const processedResults = [...results]
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
      <div className="my-0 flex items-end justify-center gap-7.5 sm:my-5 sm:px-5 md:px-0">
        {second && <PodiumCard year={year} result={second} rank={2} />}
        {first && <PodiumCard year={year} result={first} rank={1} />}
        {third && <PodiumCard year={year} result={third} rank={3} />}
      </div>
      <table className="w-full table-fixed border-collapse text-left whitespace-nowrap select-none">
        <thead className="bg-(--color-table-head-bg)">
          <tr className="border-b border-white text-[13px] text-[#8B8B8B] sm:text-[20px]">
            <th className="w-[5%] py-3 text-center sm:w-[8%]">등수</th>
            <th className="w-[22%] py-3 sm:w-[30%]">이름</th>
            {/* 768 px 이상에서 보임 */}
            <th className="hidden w-[14%] py-3 sm:w-[25%] md:table-cell">팀</th>
            {/* 768 px 이상에서 보임 */}
            <th className="hidden w-[8%] py-3 md:table-cell">Laps</th>
            <th className="w-[12%] py-3">시간</th>
            {/* 768 px 이상에서 보임 */}
            <th className="hidden w-[10%] py-3 md:table-cell">포인트</th>
          </tr>
        </thead>
        <tbody className="bg-(--color-table-bg)">
          {processedResults.map((result) => (
            <tr
              key={`${result.session_key}-${result.driver_number}`}
              className="border-b border-(--color-table-border) text-[16px] hover:bg-(--color-table-hover)"
            >
              <td className="font-pretendard px-2 py-3 text-center text-[14px] font-semibold sm:text-[20px]">
                {result.displayPosition}
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
                  <div className="relative flex min-w-0 flex-col md:flex-row">
                    <div className="flex gap-2 text-[13px] md:text-[18px]">
                      <span className="inline-flex gap-1 truncate text-sm font-medium sm:text-base">
                        {result.kr_name}
                        {favoriteDrivers.includes(result.driver_id) && (
                          <Favorite />
                        )}
                      </span>
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
              {/* 768 px 이상에서 보임 */}
              <td className="hidden py-3 text-[12px] sm:text-[22px] md:table-cell">
                {result.dsq ? '실격' : result.number_of_laps}
              </td>
              <td className="py-3 text-[18px]">
                {formatDuration(Number(result.duration))}
              </td>
              {/* 768 px 이상에서 보임 */}
              <td className="hidden py-3 font-bold md:table-cell">
                {result.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
