'use client';
import { Session } from '@/types/meeting';
import { formatDateTime } from '@/utils/time';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PageProps {
  data: Session;
}
export default function SessionBox({ data }: PageProps) {
  const router = useRouter();
  const date = data.date_start.split('T')[0];
  const time = data.date_start.split('T')[1].split('+')[0];
  const isFinished = () => {
    return new Date(data.date_end) < new Date();
  };
  return (
    <>
      <div className="flex h-full w-full flex-row items-center justify-between gap-3 rounded-[10px] border border-(--color-box-border) bg-(--color-box-bg) px-3 py-1 sm:flex-col sm:items-center sm:px-5 sm:py-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <Image
              src={'/icons/checker.svg'}
              alt="checker"
              width={40}
              height={40}
              className="desktop"
            />
            <Image
              src={'/icons/checker.svg'}
              alt="checker"
              width={26}
              height={26}
              className="mobile"
            />
            <h1
              style={{ fontFamily: 'RiaSans', fontWeight: 900 }}
              className="text-[12px] sm:text-[16px]"
            >
              {data.session_name}
            </h1>
          </div>
          <span
            style={{ fontFamily: 'RiaSans', fontWeight: 500 }}
            className="text-[10px] sm:text-[12px] md:text-[14px]"
          >
            {/* {date} / {time} */}
            {formatDateTime(data.date_start)}
          </span>
        </div>
        <button
          onClick={() => router.push(`/season/${data.meeting_key}`)}
          className="cursor-pointer rounded-[5px] border border-(--color-button-border) bg-(--color-button-bg) px-4 py-2 text-[12px] hover:bg-(--color-button-hover) active:bg-(--color-button-active) sm:h-10 sm:py-2 sm:text-[16px]"
        >
          {isFinished() ? '결과보기' : '일정보기'}
        </button>
      </div>
    </>
  );
}
