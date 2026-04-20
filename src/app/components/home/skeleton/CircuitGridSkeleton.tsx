import React from 'react';

export default function CircuitGridSkeleton() {
  const skeletonCards = Array.from({ length: 4 });
  return (
    <section className="w-full">
      {/* 헤더 영역: "서킷 둘러보기" + 더보기 버튼 */}
      <div className="mb-3 flex items-center justify-between pr-3">
        <div className="h-6 w-32 animate-pulse rounded bg-(--color-skeleton) sm:h-7" />
        <div className="desktop">
          <div className="h-8 w-24 animate-pulse rounded-[10px] bg-(--color-skeleton) md:h-10" />
        </div>
      </div>

      {/* 그리드 레이아웃: 실제 컴포넌트의 반응형 설정을 그대로 복사 */}
      <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5">
        {skeletonCards.map((_, idx) => (
          <div
            key={idx}
            className="flex h-30 w-full items-center justify-between rounded-xl border border-(--color-skeleton) bg-(--color-skeleton)/5 p-4 sm:h-30"
          >
            {/* 왼쪽: 서킷 이름 및 정보 텍스트 자리 */}
            <div className="flex flex-col gap-2">
              <div className="h-5 w-32 animate-pulse rounded bg-(--color-skeleton)" />
              <div className="h-4 w-20 animate-pulse rounded bg-(--color-skeleton)" />
              <div className="mt-2 h-3 w-24 animate-pulse rounded bg-(--color-skeleton)" />
            </div>

            {/* 오른쪽: 서킷 트랙 이미지(SVG)가 들어갈 자리 */}
            <div className="h-16 w-24 animate-pulse rounded-lg bg-(--color-skeleton) sm:h-20 sm:w-32" />
          </div>
        ))}
      </div>

      {/* 모바일 버튼 자리 */}
      <div className="mobile w-full">
        <div className="mt-2 h-10 w-full animate-pulse rounded-2xl bg-(--color-skeleton)" />
      </div>
    </section>
  );
}
