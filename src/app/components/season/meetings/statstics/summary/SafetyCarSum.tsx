import { RaceControl } from '@/app/api/f1/race/raceControl';
import Image from 'next/image';
import { useEffect } from 'react';

export default function SafetyCarSummary({
  SafetyCarNumber,
  raceControl,
  totalLaps,
  setSelectedTab,
}: {
  SafetyCarNumber: number;
  raceControl: RaceControl[];
  totalLaps: number;
  setSelectedTab: (tab: string) => void;
}) {
  const safetyCarEvents = raceControl.filter(
    (e) => e.category === 'safety_car',
  );
  const redFlagEvents = raceControl.filter((e) => e.flag === 'RED');
  const safetyCarCount = safetyCarEvents.length;
  const redFlagCount = redFlagEvents.length;

  // 세이프티카 영향 랩 수 (중복 제거)
  const safetyCarLaps = new Set(safetyCarEvents.map((e) => e.lap_number)).size;
  let summaryText = '';

  // 🟥 Red Flag 우선
  if (redFlagCount > 0) {
    if (redFlagCount >= 2) {
      summaryText = '중단이 반복된 혼란스러운 레이스';
    } else {
      summaryText = '레드 플래그로 흐름이 끊긴 레이스';
    }
  }
  // 🚗 Safety Car 판단
  else if (safetyCarCount >= 3) {
    summaryText = '전략 변수가 많았던 레이스';
  } else if (safetyCarLaps >= 10) {
    summaryText = '레이스 흐름이 여러 번 리셋됨';
  } else {
    const lastScLap = Math.max(...safetyCarEvents.map((e) => e.lap_number), 0);
    if (lastScLap / totalLaps >= 0.7) {
      summaryText = '후반부 세이프티카로 승부 결정';
    } else if (lastScLap > 0 && lastScLap / totalLaps <= 0.3) {
      summaryText = '초반부터 흐름이 깨진 레이스';
    }
  }

  // 🟢 대체 문구 (아무것도 없을 때)
  if (!summaryText) {
    summaryText = '원활히 진행된 레이스';
  }

  return (
    <div className="flex flex-col gap-3 rounded-4xl border border-[#262626] bg-[#161616] px-3 py-3.75 sm:px-7.5 sm:py-5">
      <div className="mb-4 flex items-center justify-between text-gray-400">
        <h1 className="flex items-center gap-2">
          <Image
            src="/icons/safety.svg"
            alt="icon"
            width={36}
            height={36}
            className="desktop"
            priority
          />
          <Image
            src="/icons/safety.svg"
            alt="icon"
            width={20}
            height={20}
            className="mobile"
            priority
          />
          <p
            className="text-[13px] sm:text-[20px]"
            style={{ fontFamily: 'paperlogy', fontWeight: 500 }}
          >
            레이스 중립화
          </p>
        </h1>
        <button
          onClick={() => setSelectedTab('이벤트')}
          className="cursor-pointer text-[12px] hover:text-[#cacaca] sm:text-[18px]"
        >
          전체보기
        </button>
      </div>
      <div
        className="flex items-end justify-between px-2"
        style={{ fontFamily: 'RiaSans', fontWeight: 700 }}
      >
        <div className="flex flex-col">
          <span className="mb-3 text-[18px] leading-none sm:text-[36px]">
            {safetyCarCount}
            <span className="ml-2 text-[14px] text-gray-400 sm:text-[18px]">
              세이프티 카
            </span>
            {redFlagCount > 0 && (
              <span className="ml-2 text-[14px] text-red-500 sm:text-[18px]">
                · {redFlagCount} 레드 플래그
              </span>
            )}
          </span>
        </div>
      </div>

      {/* 요약 문구 */}
      <p className="mt-2 text-center text-[14px] text-gray-300 sm:text-[20px]">
        {summaryText}
      </p>

      {/* 하단 보조 정보 */}
      {safetyCarLaps > 0 && (
        <p className="text-left text-[10px] text-gray-500 sm:text-[13px]">
          Safety Car Laps · {safetyCarLaps} / {totalLaps}
        </p>
      )}
    </div>
  );
}
