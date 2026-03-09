'use client';
import { CircuitView } from '@/types/circuit';
import { CircuitCard } from './CircuitCard';
import { useRouter } from 'next/navigation';

interface CircuitProps {
  data: CircuitView[];
}
export default function CircuitGrid({ data }: CircuitProps) {
  const router = useRouter();
  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between pr-3">
        <h2 className="text-[18px] font-semibold text-(--color-title)">
          서킷 둘러보기
        </h2>
        <div className="desktop">
          <button
            onClick={() => router.push('/circuit')}
            className="flex h-8 cursor-pointer items-center justify-center rounded-[10px] border border-(--color-button-border) bg-(--color-button-bg) px-3 py-1.75 shadow-(--shadow-soft) transition-all duration-120 hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active) md:h-10"
          >
            <p
              className="text-[12px] text-[#F8F8F8] sm:text-[16px]"
              style={{ fontFamily: 'Paperlolgy', fontWeight: 600 }}
            >
              서킷 더보기
            </p>
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5">
        {data.map((c, idx) => (
          <CircuitCard key={c.circuit_key} data={c} idx={idx} />
        ))}
      </div>
      <div className="mobile">
        <button
          onClick={() => router.push('/circuit')}
          className="flex h-full w-full cursor-pointer items-center justify-center rounded-[12px] border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
        >
          <p
            style={{ fontFamily: 'RiaSans', fontWeight: 500 }}
            className="text-[12px]"
          >
            서킷 구경하기
          </p>
        </button>
      </div>
    </section>
  );
}
