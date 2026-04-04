import { Circuit } from '@/types/circuit';

interface PageProps {
  circuitData: Circuit;
}

export default function AboutCircuit({ circuitData }: PageProps) {
  return (
    <>
      <div className="flex w-full flex-col rounded-2xl bg-[#212121] px-4.5 py-3 sm:rounded-4xl sm:px-7 sm:py-5">
        <h1 className="font-paper border-b border-[#474747] pb-1 text-[14px] font-semibold text-[#c4c4c4] sm:text-[18px]">
          서킷 정보
        </h1>
        <div className="flex items-center gap-10 pt-2">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-[#838383] sm:text-[16px]">
              서킷 길이
            </p>
            <p className="text-[14px] sm:text-[18px]">
              {circuitData.circuit_length} km
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-[#838383] sm:text-[16px]">랩 수</p>
            <p className="text-[14px] sm:text-[18px]">
              {circuitData.laps} Laps
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-2">
          <p className="text-[12px] text-[#838383] sm:text-[16px]">
            난이도 요약
          </p>
          <div className="text-[14px] sm:text-[16px] lg:text-[18px]">
            {!circuitData.difficulty_summary && (
              <p>아직 충분히 진행되지 않은 레이스입니다. </p>
            )}
            {circuitData.difficulty_summary && circuitData.difficulty_summary}
          </div>
        </div>
      </div>
    </>
  );
}
