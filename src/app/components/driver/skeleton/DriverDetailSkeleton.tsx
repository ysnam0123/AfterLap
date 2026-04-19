'use client';

export default function DriverDetailSkeleton() {
  return (
    <div className="mx-auto w-full px-5 sm:px-15 md:px-20 lg:px-40">
      <section className="py-6">
        <div className="mb-6 h-9 w-28 animate-pulse rounded-lg bg-[#252525]" />

        <div className="flex flex-col gap-3 border-b border-neutral-800 pb-6">
          <div className="h-4 w-20 animate-pulse rounded bg-[#252525]" />
          <div className="h-10 w-64 animate-pulse rounded bg-[#252525] sm:h-14 sm:w-80" />
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-pulse rounded-sm bg-[#252525]" />
            <div className="h-4 w-24 animate-pulse rounded bg-[#252525]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 animate-pulse rounded bg-[#252525]" />
          </div>
        </div>

        <div className="mt-6 h-60 w-full animate-pulse rounded-2xl bg-[#252525] sm:h-80" />
      </section>

      <section className="my-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-[#111] p-4"
            >
              <div className="h-3 w-16 animate-pulse rounded bg-[#252525]" />
              <div className="h-7 w-10 animate-pulse rounded bg-[#252525]" />
            </div>
          ))}
        </div>
      </section>

      <section className="my-6">
        <div className="mb-4 h-5 w-32 animate-pulse rounded bg-[#252525]" />

        <div className="mb-6 flex h-32 items-end gap-1">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 animate-pulse rounded-t bg-[#252525]"
              style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
            />
          ))}
        </div>

        <div className="mb-2 grid grid-cols-[40px_1fr_80px] gap-4 border-b border-neutral-800 pb-2 sm:grid-cols-[40px_1fr_80px_80px]">
          {['라운드', '그랑프리', '포인트'].map((_, i) => (
            <div
              key={i}
              className="h-3 w-full animate-pulse rounded bg-[#252525]"
            />
          ))}
        </div>

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[40px_1fr_80px] gap-4 border-b border-white/5 py-3 sm:grid-cols-[40px_1fr_80px_80px]"
          >
            <div className="h-4 w-6 animate-pulse rounded bg-[#252525]" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded-sm bg-[#252525]" />
              <div className="h-4 w-32 animate-pulse rounded bg-[#252525]" />
            </div>
            <div className="h-4 w-8 animate-pulse rounded bg-[#252525]" />
          </div>
        ))}
      </section>
    </div>
  );
}
