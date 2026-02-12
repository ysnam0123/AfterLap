import { Circuit } from '@/types/circuit';
import Image from 'next/image';
interface PageProps {
  circuitData: Circuit;
}

export default function AboutBeforePoint({ circuitData }: PageProps) {
  return (
    <>
      <div className="w-full rounded-2xl bg-[#212121] px-4.5 py-3 sm:rounded-4xl sm:px-7 sm:py-5">
        <div className="flex justify-between border-b border-[#474747] pb-1.5">
          <h1
            style={{ fontFamily: 'Paperlolgy', fontWeight: 700 }}
            className="text-[14px] text-[#c4c4c4] sm:text-[18px]"
          >
            경기 관전 포인트
          </h1>
          <p className="text-[12px] sm:text-[14px]">* AI 수집 데이터</p>
        </div>
        <div className="flex items-center justify-between gap-10">
          <ul className="flex flex-col gap-3">
            {!circuitData.watch_points && (
              <p>아직 충분히 진행되지 않은 레이스입니다.</p>
            )}
            {circuitData.watch_points &&
              circuitData.watch_points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FED010]" />
                  <p
                    style={{ fontFamily: 'Paperlolgy', fontWeight: 400 }}
                    className="text-[14px] sm:text-[15px] lg:text-[19px]"
                  >
                    {point}
                  </p>
                </li>
              ))}
          </ul>
          <Image
            src={circuitData.circuit_img}
            alt="circuit"
            width={130}
            height={130}
            priority
          />
        </div>
      </div>
    </>
  );
}
