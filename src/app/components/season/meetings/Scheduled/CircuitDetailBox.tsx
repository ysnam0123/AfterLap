import { Circuit } from '@/types/circuit';
import Image from 'next/image';
interface PageProps {
  circuitData: Circuit;
}

export default function CircuitDetailBox({ circuitData }: PageProps) {
  return (
    <>
      <div className="w-full rounded-2xl bg-(--color-box-bg) px-4.5 py-3 sm:rounded-4xl sm:px-7 sm:py-5">
        <div className="mb-3 flex justify-between border-b border-(--color-box-border) pb-1.5">
          <h1 className="font-paper text-[14px] font-semibold text-[#c4c4c4] sm:text-[18px]">
            서킷 구간 살펴보기
          </h1>
        </div>
        <div className="flex items-center justify-between rounded-md bg-(--color-box-bg) px-1 py-3">
          <Image
            src={circuitData.circuit_detail_img}
            alt="circuit"
            width={130}
            height={130}
            className="w-full"
            priority
          />
        </div>
      </div>
    </>
  );
}
