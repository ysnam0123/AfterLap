'use client';
import { LiveSession } from '@/types/meeting';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PageProps {
  data: LiveSession;
}

export default function LiveSessionBox({ data }: PageProps) {
  const router = useRouter();
  return (
    <>
      <div className="flex h-full w-full items-center justify-between gap-3 rounded-[10px] border border-[#4A4A4A] bg-[#111111] px-3 py-3.75 sm:px-5 sm:py-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.25">
            <Image
              src={'/icons/start.svg'}
              alt="checker"
              width={40}
              height={40}
              className="desktop"
              priority
            />
            <Image
              src={'/icons/start.svg'}
              alt="checker"
              width={32}
              height={32}
              className="mobile"
              priority
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
            className="flex items-center gap-1 text-[14px]"
          >
            <p>세션 진행중</p>
            <div className="h-4 w-4 animate-pulse rounded-full bg-[#E10600]"></div>
          </span>
        </div>
        <button
          onClick={() => router.push(`/season/${data.meeting_key}`)}
          className="flex h-10 cursor-pointer items-center justify-center rounded-[5px] border border-(--color-button-border) bg-(--color-button-bg) px-3 py-1.25 text-[14px] hover:bg-(--color-button-hover) active:bg-(--color-button-active) sm:py-2 sm:text-[16px]"
        >
          바로가기
        </button>
      </div>
    </>
  );
}
