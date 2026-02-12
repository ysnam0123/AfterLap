'use client';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface LoadingLottieProps {
  className?: string;
  loadingText?: string;
}

export default function LogoLoading({
  className = '',
  loadingText = '데이터 로딩 중...',
}: LoadingLottieProps) {
  return (
    <>
      <div
        className={twMerge(
          'flex h-50 w-full flex-col items-center justify-center gap-2 sm:h-100 sm:w-100 md:gap-4',
          className,
        )}
      >
        <Image
          src={'/loadingLogo.svg'}
          alt="loadingLogo"
          width={370}
          height={100}
          className="h-16 w-57.5 md:h-25 md:w-92.5"
          priority
        />
        <p
          style={{ fontFamily: 'Pretendard' }}
          className="text-[20px] font-semibold text-[#7A7A79] sm:text-[25px] lg:text-[30px]"
        >
          {loadingText}
        </p>
      </div>
    </>
  );
}
