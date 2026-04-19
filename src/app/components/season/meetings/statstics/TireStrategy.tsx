'use client';

import { StintsWithDriver } from '@/types/raceResult';
import { COMPOUND_COLOR, COMPOUND_LABEL, TooltipState } from '@/types/stints';
import { findHeadshot } from '@/utils/findHeadShot';
import { useMemo, useState } from 'react';
import DriverProfile from '../DriverProfile';
import DefaultDriverProfile from '../DefaultDriverProfile';

interface TireStrategyProps {
  stints: StintsWithDriver[];
  totalLaps: number;
  year: number;
}

export default function TireStrategy({
  stints,
  totalLaps,
  year,
}: TireStrategyProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    compound: '',
    lapStart: 0,
    lapEnd: 0,
    tyreAge: 0,
    driverName: '',
  });

  // 드라이버별로 stints 그룹화 (driver_number 기준)
  const driverGroups = useMemo(() => {
    const map = new Map<number, StintsWithDriver[]>();
    for (const stint of stints) {
      if (!map.has(stint.driver_number)) {
        map.set(stint.driver_number, []);
      }
      map.get(stint.driver_number)!.push(stint);
    }
    // stint_number 오름차순 정렬
    for (const [, v] of map) {
      v.sort((a, b) => a.stint_number - b.stint_number);
    }
    // 드라이버 번호 오름차순으로 반환
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [stints]);

  const laps = totalLaps > 0 ? totalLaps : 70;

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    stint: StintsWithDriver,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      compound: stint.compound,
      lapStart: stint.lap_start,
      lapEnd: stint.lap_end,
      tyreAge: stint.tyre_age_at_start,
      driverName: stint.broadcast_name || stint.name_acronym,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  if (!stints || stints.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm">
        타이어 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="relative mt-4 bg-(--color-table-bg) px-2 py-4 select-none sm:px-0">
      {/* 범례 */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {Object.entries(COMPOUND_COLOR).map(([compound, color]) => {
          if (compound === 'UNKNOWN') return null;
          const used = stints.some((s) => s.compound === compound);
          if (!used) return null;
          return (
            <div key={compound} className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs">{compound}</span>
            </div>
          );
        })}
      </div>

      {/* 랩 눈금 헤더 */}
      <div className="relative mb-1 ml-27.5 h-4 text-[12px] sm:ml-35 sm:text-[15px]">
        {[
          1,
          Math.round(laps * 0.25),
          Math.round(laps * 0.5),
          Math.round(laps * 0.75),
          laps,
        ].map((lap, i) => (
          <span
            key={lap}
            className="absolute"
            style={{
              left: `${((lap - 1) / laps) * 100}%`,
              // 첫 번째는 왼쪽 정렬, 마지막은 오른쪽 정렬, 나머지는 중앙 정렬
              transform:
                i === 0
                  ? 'none'
                  : i === 4
                    ? 'translateX(-100%)'
                    : 'translateX(-50%)',
            }}
          >
            {lap}
          </span>
        ))}
      </div>

      {/* 드라이버 행 */}
      <div className="space-y-5">
        {driverGroups.map(([driverNumber, driverStints]) => {
          const info = driverStints[0];
          return (
            <div key={driverNumber} className="flex items-center gap-2">
              {/* 드라이버 정보 */}
              <div className="flex w-28 shrink-0 items-center gap-3 sm:w-35">
                <div
                  className="h-5 w-1 rounded-full sm:h-6"
                  style={{ backgroundColor: info.team_colour || '#666' }}
                />
                {findHeadshot(info.full_name, year) ? (
                  <DriverProfile
                    className="shrink-0 duration-200 group-hover:scale-110"
                    headshot={findHeadshot(info.full_name, year)}
                    teamColor={info.team_colour}
                  />
                ) : (
                  <DefaultDriverProfile />
                )}
                {/* {info.headshot_url && (
                  <Image
                    src={info.headshot_url}
                    alt={info.full_name}
                    width={36}
                    height={36}
                    sizes="24px"
                    className="h-10 w-10 rounded-full object-cover sm:h-15 sm:w-15"
                  />
                )} */}
                <span className="truncate text-[15px] font-medium sm:text-[20px]">
                  {info.name_acronym || info.broadcast_name}
                </span>
              </div>

              {/* 타이어 stint 바 */}
              <div className="relative flex h-6 flex-1 overflow-hidden rounded-sm bg-white/5">
                {driverStints.map((stint) => {
                  const lapStart = Math.max(1, stint.lap_start);
                  const lapEnd = Math.min(laps, stint.lap_end || laps);
                  const leftPct = ((lapStart - 1) / laps) * 100;
                  const widthPct = ((lapEnd - lapStart + 1) / laps) * 100;
                  const color =
                    COMPOUND_COLOR[stint.compound] ?? COMPOUND_COLOR.UNKNOWN;
                  const label = COMPOUND_LABEL[stint.compound] ?? '?';

                  return (
                    <div
                      key={stint.stint_number}
                      className="absolute inset-y-0 flex cursor-pointer items-center justify-center text-[9px] font-bold transition-opacity hover:opacity-80"
                      style={{
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        backgroundColor: color,
                        color:
                          stint.compound === 'HARD'
                            ? '#000'
                            : stint.compound === 'MEDIUM'
                              ? '#000'
                              : '#fff',
                        borderRight: '1px solid rgba(0,0,0,0.25)',
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e, stint)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {widthPct > 6 && label}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 툴팁 */}
      {tooltip.visible && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-xs text-white shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="font-semibold">{tooltip.driverName}</p>
          <p className="">
            컴파운드:{' '}
            <span style={{ color: COMPOUND_COLOR[tooltip.compound] }}>
              {tooltip.compound}
            </span>
          </p>
          <p className="">
            {tooltip.lapStart}랩 → {tooltip.lapEnd}랩 (
            {tooltip.lapEnd - tooltip.lapStart + 1}랩)
          </p>
          <p className="">타이어 나이: {tooltip.tyreAge}랩</p>
        </div>
      )}
    </div>
  );
}
