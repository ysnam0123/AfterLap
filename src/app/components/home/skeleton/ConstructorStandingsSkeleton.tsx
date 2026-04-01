import React from 'react';

export default function ConstructorStandingsSkeleton() {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between sm:mb-5">
        <div className="h-6 w-32 animate-pulse rounded bg-[#252525] sm:h-7 sm:w-40" />
        <div className="desktop">
          <div className="h-8 w-12 animate-pulse rounded bg-[#252525] md:h-10 md:w-16" />
        </div>
      </div>

      <div className="mb-3 border-b border-white/10 pb-2">
        <div className="grid h-4 grid-cols-[60px_1fr_80px]">
          <div className="h-3 w-8 animate-pulse rounded bg-[#252525]" />
          <div className="h-3 w-10 animate-pulse rounded bg-[#252525]" />
          <div className="mr-2 ml-auto h-3 w-12 animate-pulse rounded bg-[#252525]" />
        </div>
      </div>

      <div className="mb-1 space-y-1">
        {skeletonRows.map((_, index) => (
          <div
            key={index}
            className="grid h-14 grid-cols-[6px_40px_1fr_80px] items-center border-y border-r border-white/5 bg-white/5 sm:h-16 sm:grid-cols-[6px_60px_1fr_80px]"
          >
            <div className="h-full w-full animate-pulse rounded-l-lg bg-[#252525]" />

            <div className="flex justify-center">
              <div className="h-5 w-4 animate-pulse rounded bg-[#252525]" />
            </div>

            <div className="flex items-center gap-3 py-2 pl-2">
              <div className="h-8 w-14 animate-pulse rounded bg-[#252525] sm:h-9 sm:w-16" />
              <div className="h-4 w-24 animate-pulse rounded bg-[#252525] sm:w-32" />
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
    </section>
  );
}
