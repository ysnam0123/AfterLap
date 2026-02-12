import Image from 'next/image';

interface RaceResult {
  race: string;
  round: number;
  points: number;
  position: string | null;
  flag: string;
}

interface SeasonPerformanceProps {
  results: RaceResult[];
  teamColor: string;
}

export function DriverPerformance({
  results,
  teamColor,
}: SeasonPerformanceProps) {
  const maxPoints = Math.max(...results.map((r) => r.points));

  return (
    <section className="mx-auto w-full rounded-xl border border-[#4C4C4C] bg-[#111111] px-6 py-8 select-none">
      <h2 className="mb-5 text-[30px] font-semibold tracking-wider">
        시즌 퍼포먼스
      </h2>
      <h3 className="mb-3 text-[18px]">레이스 별 포인트</h3>
      <div className="mb-3 flex h-32 items-end gap-1">
        {results.map((result) => (
          <div
            key={result.round}
            className="group flex flex-1 cursor-pointer flex-col justify-end"
          >
            <div className="relative">
              <div
                className="w-full transition-opacity duration-200 group-hover:opacity-70"
                style={{
                  height: `${(result.points / maxPoints) * 120}px`,
                  backgroundColor: teamColor,
                  opacity: 0.9,
                }}
              />
              <div className="bg-foreground text-background absolute -top-8 left-1/2 z-30 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {result.race}: P{result.position} ({result.points}pts)
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Race Results Table */}
      <div className="space-y-2 sm:space-y-4">
        <h3 className="text-muted-foreground text-[18px]">레이스 별 결과</h3>
        <div className="overflow-x-auto">
          <table className="w-full select-none">
            <thead>
              <tr className="border-border border-b text-[12px] sm:text-[16px]">
                <th className="text-muted-foreground px-2 py-1 text-left font-medium tracking-wider uppercase sm:px-4 sm:py-3">
                  Round
                </th>
                <th className="text-muted-foreground px-2 py-1 text-left font-medium tracking-wider uppercase sm:px-4 sm:py-3">
                  Grand Prix
                </th>
                <th className="text-muted-foreground hidden px-2 py-1 text-right font-medium tracking-wider uppercase sm:px-4 sm:py-3 md:table-cell">
                  Position
                </th>
                <th className="text-muted-foreground px-2 py-1 text-right font-medium tracking-wider uppercase sm:px-4 sm:py-3">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr
                  key={result.round}
                  className="border-border/50 border-b transition-colors duration-200 hover:bg-[#252525]"
                >
                  <td className="text-muted-foreground px-2 py-1 sm:px-4 sm:py-3">
                    {result.round}
                  </td>
                  <td className="flex items-center gap-2 px-4 py-3">
                    <Image
                      src={result.flag}
                      alt="flag"
                      width={24}
                      height={15}
                      className="h-auto w-4 sm:h-6"
                      priority
                    />
                    <p className="text-[12px] sm:text-[16px]">{result.race}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-right font-medium md:table-cell">
                    {typeof result.position === 'number'
                      ? `P${result.position}`
                      : result.position}
                  </td>
                  <td className="px-4 py-3 text-right">{result.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
