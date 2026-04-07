'use client';
import dynamic from 'next/dynamic';
import f1Loading from '../../../../public/f1Loading.json';
import { twMerge } from 'tailwind-merge';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LoadingLottieProps {
  className?: string;
  loadingText?: string;
}

export default function F1Loading({
  className = '',
  loadingText = '로딩 중...',
}: LoadingLottieProps) {
  return (
    <>
      <div
        className={twMerge(
          'flex h-50 w-50 flex-col items-center justify-center gap-5 sm:h-100 sm:w-100',
          className,
        )}
      >
        <Lottie animationData={f1Loading} loop className="w-full" />
        <p className="text-2xl">{loadingText}</p>
      </div>
    </>
  );
}
