'use client';

import { StintsWithDriver } from '@/types/raceResult';
import Image from 'next/image';
import { useMemo, useState } from 'react';

interface TireStrategyProps {
  stints: StintsWithDriver[];
  totalLaps: number;
}

// F1 공식 컴파운드 색상
const COMPOUND_COLOR: Record<string, string> = {
  SOFT: '#e8002d',
  MEDIUM: '#ffd906',
  HARD: '#f0f0ec',
  INTERMEDIATE: '#39b54a',
  WET: '#0067ff',
  UNKNOWN: '#666666',
};

const COMPOUND_LABEL: Record<string, string> = {
  SOFT: 'S',
  MEDIUM: 'M',
  HARD: 'H',
  INTERMEDIATE: 'I',
  WET: 'W',
  UNKNOWN: '?',
};

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  compound: string;
  lapStart: number;
  lapEnd: number;
  tyreAge: number;
  driverName: string;
}

export default function TireStrategy({ stints, totalLaps }: TireStrategyProps) {
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
      <div className="flex h-40 items-center justify-center text-sm text-white/40">
        타이어 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="relative mt-4 select-none px-2 sm:px-0">
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
              <span className="text-xs text-white/60">{compound}</span>
            </div>
          );
        })}
      </div>

      {/* 랩 눈금 헤더 */}
      <div className="mb-1 ml-[90px] flex text-[10px] text-white/30 sm:ml-[120px]">
        {[1, Math.round(laps * 0.25), Math.round(laps * 0.5), Math.round(laps * 0.75), laps].map(
          (lap) => (
            <span
              key={lap}
              className="text-center"
              style={{ width: `${(1 / laps) * 100}%`, position: 'relative', left: `${((lap - 1) / laps) * 100}%` }}
            >
              {lap}
            </span>
          ),
        )}
      </div>

      {/* 드라이버 행 */}
      <div className="space-y-1.5">
        {driverGroups.map(([driverNumber, driverStints]) => {
          const info = driverStints[0];
          return (
            <div key={driverNumber} className="flex items-center gap-2">
              {/* 드라이버 정보 */}
              <div className="flex w-[90px] shrink-0 items-center gap-1.5 sm:w-[120px]">
                <div
                  className="h-5 w-1 rounded-full sm:h-6"
                  style={{ backgroundColor: info.team_colour || '#666' }}
                />
                {info.headshot_url && (
                  <Image
                    src={info.headshot_url}
                    alt={info.full_name}
                    width={24}
                    height={24}
                    sizes="24px"
                    className="h-5 w-5 rounded-full object-cover sm:h-6 sm:w-6"
                  />
                )}
                <span className="truncate text-[11px] font-medium text-white/80 sm:text-xs">
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
                        color: stint.compound === 'HARD' ? '#000' : stint.compound === 'MEDIUM' ? '#000' : '#fff',
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
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-xs shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="font-semibold text-white">{tooltip.driverName}</p>
          <p className="text-white/70">
            컴파운드:{' '}
            <span style={{ color: COMPOUND_COLOR[tooltip.compound] }}>
              {tooltip.compound}
            </span>
          </p>
          <p className="text-white/70">
            {tooltip.lapStart}랩 → {tooltip.lapEnd}랩 (
            {tooltip.lapEnd - tooltip.lapStart + 1}랩)
          </p>
          <p className="text-white/50">타이어 나이: {tooltip.tyreAge}랩</p>
        </div>
      )}
    </div>
  );
}
