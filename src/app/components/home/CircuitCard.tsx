import { CircuitView } from '@/types/circuit';
import Image from 'next/image';

interface CircuitProps {
  data: CircuitView;
  idx: number;
}

export function CircuitCard({ data }: CircuitProps) {
  return (
    <div className="flex h-15 cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-(--color-card-bg) px-5 py-2.5 transition hover:bg-(--color-card-hover) sm:h-25">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex h-8 w-10 shrink-0 items-center justify-center rounded-sm bg-[#303030] text-xs sm:h-10 sm:w-11.25">
          <Image
            src={data.flag}
            alt="flag"
            width={37}
            height={22}
            className="h-auto w-7 sm:w-9"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold sm:text-[16px]">
            {data.circuit_short_name}
          </p>
          <p className="truncate text-[14px] text-[#909090] sm:text-[16px]">
            {data.country_kr_name}
          </p>
        </div>
      </div>
      <div className="shrink-0">
        <Image
          src={data.circuit_img}
          alt="flag"
          width={80}
          height={80}
          className="h-auto w-14 sm:w-20"
        />
      </div>
    </div>
  );
}
