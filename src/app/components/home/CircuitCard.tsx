import { CircuitView } from '@/types/circuit';
import Image from 'next/image';

interface CircuitProps {
  data: CircuitView;
  idx: number;
}

export function CircuitCard({ data, idx }: CircuitProps) {
  return (
    <div className="flex h-15 cursor-pointer items-center justify-between rounded-2xl border border-(--color-card-border) bg-(--color-card-dark-bg) px-5 py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-card-hover) hover:shadow-(--shadow-strong) sm:h-25">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex h-8 w-10 shrink-0 items-center justify-center rounded-sm border border-(--color-box-border) bg-(--color-box-bg) text-xs sm:h-10 sm:w-11.25">
          <Image
            src={data.flag}
            alt="flag"
            width={37}
            height={22}
            className="aspect-37/22 h-auto w-7 sm:w-9"
            quality={65}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold sm:text-[16px]">
            {data.circuit_short_name}
          </p>
          <p className="truncate text-[14px] text-(--color-sub-text) sm:text-[16px]">
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
          priority={idx === 0}
        />
      </div>
    </div>
  );
}
