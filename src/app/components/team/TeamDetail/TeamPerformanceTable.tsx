import Image from 'next/image';
import { TeamPerformanceData } from '../SeasonPerformance';

export default function TeamPerformanceTable({
  data,
}: {
  data: TeamPerformanceData[];
}) {
  return (
    <>
      <div className="sm:space-y-4">
        <h3 className="text-muted-foreground text-[14px] sm:text-[18px]">
          레이스 별 결과
        </h3>
        <div className="overflow-x-auto">
          <table className="text-[18 w-full select-none">
            <thead>
              <tr className="border-border border-b text-[12px] sm:text-[16px]">
                <th className="text-muted-foreground px-2 py-1 text-left font-medium tracking-wider uppercase sm:px-4 sm:py-3">
                  Round
                </th>
                <th className="text-muted-foreground px-2 py-1 text-left font-medium tracking-wider uppercase sm:px-4 sm:py-3">
                  Grand Prix
                </th>
                <th className="text-muted-foreground px-2 py-1 text-right font-medium tracking-wider uppercase sm:px-4 sm:py-3">
                  Points
                </th>
                <th className="text-muted-foreground px-2 py-1 text-right font-medium tracking-wider uppercase sm:px-4 sm:py-3">
                  누적 Points
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((result) => (
                <tr
                  key={result.round}
                  className="border-border/50 border-b transition-colors duration-200 hover:bg-[#252525]"
                >
                  <td className="text-muted-foreground px-4 py-3">
                    {result.round}
                  </td>
                  <td className="flex items-center gap-2 truncate px-4 py-3 text-[12px] sm:text-[16px]">
                    {result.flag && (
                      <Image
                        src={result.flag}
                        alt="flag"
                        width={24}
                        height={15}
                        priority
                      />
                    )}
                    {result.race_kr_name}
                  </td>
                  <td className="px-2 py-1 text-right sm:px-4 sm:py-3">
                    {result.points}
                  </td>
                  <td className="px-2 py-1 text-right font-medium sm:px-4 sm:py-3">
                    {result.cumulativePoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
