import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';
import loading from '../../../../public/loading.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LoadingLottieProps {
  className?: string;
  loadingText?: string;
}

export default function SimpleLoading({
  className,
  loadingText = '로딩 중...',
}: LoadingLottieProps) {
  return (
    <>
      <div
        className={twMerge(
          'flex h-30 w-30 flex-col items-center justify-center gap-5',
          className,
        )}
      >
        <Lottie animationData={loading} loop className="w-full" />
        <p className="text-2xl">{loadingText}</p>
      </div>
    </>
  );
}
