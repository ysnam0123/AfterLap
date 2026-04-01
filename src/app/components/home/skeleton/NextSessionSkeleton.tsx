import React from 'react';

export default function NextSessionSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="h-5.5 w-20 animate-pulse rounded bg-[#252525] sm:h-9 sm:w-32" />
      <section className="flex flex-col gap-2">
        <div className="h-16 w-full animate-pulse rounded-xl bg-[#252525] sm:h-20" />
        <div className="flex flex-col gap-2">
          <div className="h-24 w-full animate-pulse rounded-xl bg-[#252525]" />
        </div>
      </section>
      <div className="mobile w-full">
        <div className="h-10 w-full animate-pulse rounded-xl bg-[#252525]" />
      </div>
    </div>
  );
}
