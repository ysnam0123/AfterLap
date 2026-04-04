import React from 'react';

export default function DriverStandingsSkeleton() {
  // 보통 초기 화면에 10명 정도 보여주므로 10개의 행을 생성합니다.
  const skeletonRows = Array.from({ length: 5 });

  return (
    <section className="w-full">
      <div className="w-full">
        <div className="mb-3 border-b border-white/10 pb-2">
          <div className="grid grid-cols-[60px_1fr_80px] pr-3 md:grid-cols-[60px_1fr_1fr_80px]">
            <div className="h-3 w-8 animate-pulse rounded bg-[#252525]" />
            <div className="h-3 w-10 animate-pulse rounded bg-[#252525]" />
            <div className="mx-auto hidden h-3 w-10 animate-pulse rounded bg-[#252525] md:block" />
            <div className="ml-auto h-3 w-12 animate-pulse rounded bg-[#252525]" />
          </div>
        </div>

        <div className="mb-1 space-y-1">
          {skeletonRows.map((_, idx) => (
            <div
              key={idx}
              className="grid h-14 grid-cols-[6px_50px_2fr_1fr] items-center border-y border-r border-white/5 bg-white/5 sm:h-16 sm:grid-cols-[6px_60px_1fr_1fr_80px]"
            >
              <div className="h-full w-full animate-pulse rounded-l-lg bg-[#252525]" />
              <div className="flex justify-center">
                <div className="h-5 w-4 animate-pulse rounded bg-[#252525]" />
              </div>
              <div className="flex items-center gap-3 py-2">
                <div className="h-9 w-9 animate-pulse rounded-full bg-[#252525] sm:h-11.5 sm:w-11.5" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 w-20 animate-pulse rounded bg-[#252525] sm:h-5 sm:w-28" />
                  <div className="h-3 w-16 animate-pulse border-l-4 border-gray-700 bg-[#252525]/50 md:hidden" />
                </div>
              </div>
              <div className="hidden justify-center md:flex">
                <div className="h-4 w-24 animate-pulse rounded bg-[#252525]" />
              </div>
              <div className="flex justify-end pr-3">
                <div className="h-5 w-8 animate-pulse rounded bg-[#252525]" />
              </div>
            </div>
          ))}
        </div>
        <div className="mobile w-full">
          <div className="mt-2 h-10 w-full animate-pulse rounded-2xl bg-[#252525]" />
        </div>
      </div>
    </section>
  );
}
