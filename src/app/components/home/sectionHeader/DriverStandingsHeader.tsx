'use client';

import { useRouter } from 'next/navigation';

export default function DriverStandingsHeader() {
  const router = useRouter();
  return (
    <>
      <div className="mb-3 flex items-center justify-between sm:mb-5">
        <h2 className="text-[16px] font-semibold text-(--color-title) sm:text-[18px]">
          2026 시즌 드라이버 랭킹
        </h2>
        <div className="desktop">
          <button
            onClick={() => router.push('/ranking')}
            className="flex h-8 cursor-pointer items-center justify-center md:h-10"
          >
            <p className="font-paper text-[12px] font-semibold text-[#F8F8F8] sm:text-[16px]">
              더보기
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
