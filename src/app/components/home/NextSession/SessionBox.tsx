'use client';
import { Session } from '@/types/meeting';
import { formatDateTime, getSessionStatus } from '@/utils/time';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FinishedButton from '../../common/buttons/FinishedButton';
import OngoingButton from '../../common/buttons/OngoingButton';
import UpcomingButton from '../../common/buttons/UpcomingButton';

interface PageProps {
  data: Session;
}
export default function SessionBox({ data }: PageProps) {
  const router = useRouter();
  const isFinished = () => {
    return new Date(data.date_end) < new Date();
  };
  const status = getSessionStatus(data.date_start, data.date_end);
  const krStatus = () => {
    switch (status) {
      case 'finished':
        return <FinishedButton />;
      case 'upcoming':
        return <UpcomingButton />;
      case 'ongoing':
        return <OngoingButton />;
    }
  };
  return (
    <>
      <div className="flex h-full w-full items-center justify-between gap-3 rounded-[10px] border border-(--color-box-border) bg-(--color-box-bg) px-3 py-3.75 sm:px-5 sm:py-3">
        <div className="flex flex-col gap-2.75">
          <div className="flex items-center">
            <Image
              src={'/icons/checker.webp'}
              alt="checker"
              width={40}
              height={40}
              className="desktop"
              priority
            />
            <Image
              src={'/icons/checker.webp'}
              alt="checker"
              width={26}
              height={26}
              className="mobile"
              priority
            />
            <h1 className="font-ria text-[12px] font-black sm:text-[16px]">
              {data.session_name}
            </h1>
          </div>
          <span
            suppressHydrationWarning
            className="font-ria text-[14px] font-medium"
          >
            {formatDateTime(data.date_start)}
          </span>
        </div>
        <div suppressHydrationWarning className="flex flex-col gap-2.75">
          {krStatus()}
          <button
            onClick={() => router.push(`/season/${data.meeting_key}`)}
            className="flex h-8 cursor-pointer items-center justify-center rounded-[5px] border border-(--color-button-border) bg-(--color-button-bg) px-3 py-1.25 text-[14px] hover:bg-(--color-button-hover) active:bg-(--color-button-active) sm:h-10 sm:py-2 sm:text-[16px]"
            suppressHydrationWarning
          >
            {isFinished() ? '결과보기' : '일정보기'}
          </button>
        </div>
      </div>
    </>
  );
}
