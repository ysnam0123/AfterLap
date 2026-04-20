export default function DriverListSkeleton() {
  return (
    <>
      {/* 제목 */}
      <div className="mb-2 h-5 w-28 animate-pulse rounded bg-gray-700" />

      <section className="hide-scrollbar flex w-full gap-4 overflow-x-auto px-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex shrink-0 flex-col items-center gap-2">
            {/* 카드 */}
            <div className="flex flex-col items-center justify-center rounded-[6px] border border-(--color-card-border) p-2.5">
              <div className="h-[80px] w-[80px] animate-pulse rounded bg-gray-700" />
            </div>

            {/* 이름 */}
            <div className="h-3 w-14 animate-pulse rounded bg-gray-700" />
          </div>
        ))}
      </section>

      {/* 버튼 */}
      <div className="mobile">
        <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-700" />
      </div>
    </>
  );
}
