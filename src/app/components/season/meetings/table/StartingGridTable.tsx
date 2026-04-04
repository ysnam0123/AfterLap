'use client';
import { StartingGridWithDriver } from '@/types/meeting';
import DefaultDriverProfile from '../DefaultDriverProfile';
import DriverProfile from '../DriverProfile';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUserStore } from '@/store/useUserFavoriteStore';
import Favorite from '@/app/components/Auth/Favorite';

export default function StartingGridTable({
  results,
}: {
  results: StartingGridWithDriver[];
}) {
  const router = useRouter();
  const favoriteDrivers = useUserStore((state) => state.favoriteDrivers);
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

      return { ...result, displayPosition: '-' };
    });

  return (
    <>
      <table className="w-full border-collapse select-none">
        <thead>
          <tr className="border-b border-white text-center text-[13px] text-[#8B8B8B] sm:text-[20px]">
            <th className="w-[3%] py-3 sm:w-[8%]">포지션</th>
            <th className="w-[8%] py-4 sm:w-[30%]">이름</th>
            {/* 768 px 이상에서 보임 */}
            <th className="hidden px-4 py-4 sm:w-[25%] md:table-cell">팀</th>
            <th className="w-[10%] py-4">Lap Time</th>
          </tr>
        </thead>
        <tbody>
          {processedResults.map((result) => (
            <tr
              key={result.driver_number}
              className="border-b border-[#2A2A2A] text-center text-[16px]"
            >
              <td className="font-pretendard px-0 py-5 text-center text-[14px] font-semibold sm:px-4 sm:text-[20px]">
                {result.displayPosition}
              </td>
              <td className="py-3 font-bold">
                <div className="group flex cursor-pointer items-center justify-start gap-3 text-[18px]">
                  {result.headshot_url ? (
                    <DriverProfile
                      className="duration-200 group-hover:scale-110"
                      headshot={result.headshot_url}
                      teamColor={result.team_colour}
                    />
                  ) : (
                    <DefaultDriverProfile />
                  )}
                  <div className="relative flex min-w-0 flex-col items-start md:flex-row">
                    <div className="flex gap-2 text-[13px] md:text-[18px]">
                      <span className="inline-flex gap-1 truncate text-sm font-medium text-white sm:text-base">
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
              {/* 768 px 이상에서 보임 */}
              <td className="hidden px-4 py-3 md:table-cell">
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

                  <span className="relative">{result.team_kr_name}</span>
                </div>
              </td>
              <td className="py-3 text-center text-[15px] sm:text-[22px]">
                {result.lap_duration ? `${result.lap_duration}` : 'null'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
