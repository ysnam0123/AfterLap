'use client';

import { CardProps } from '@/hooks/SeasonRacePodium';
import { countryCodeFlags } from '@/images/flags';
import { formatDateTime } from '@/utils/time';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GrandPrixCard({ meetingInfo }: CardProps) {
  const router = useRouter();
  const flagSrc = countryCodeFlags[meetingInfo.country_code];
  const krStatus = () => {
    switch (meetingInfo.status) {
      case 'finished':
        return (
          <div className="flex items-center gap-1 text-[14px]">
            <p>종료</p>
            <div className="h-3 w-3 rounded-full bg-[#05AF05]"></div>
          </div>
        );
      case 'ongoing':
        return (
          <div className="flex items-center gap-1 rounded-[3px] bg-[#4a4a4a] px-2 py-0.5 text-[14px]">
            <p>진행중</p>
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#B80000]"></div>
          </div>
        );
    }
  };

  return (
    <>
      <div
        onClick={() => router.push(`/season/${meetingInfo.meeting_key}`)}
        className="flex w-full cursor-pointer flex-col rounded-[10px] border border-(--color-card-border) bg-(--color-card-bg) p-4.5 font-semibold shadow-(--shadow-soft) transition hover:bg-(--color-card-hover) hover:shadow-(--shadow-strong)"
      >
        <p className="mb-2 text-[10px] text-[#8B8B8B] sm:text-[12px]">
          {meetingInfo.meeting_official_name}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex h-full flex-col">
            <div className="mb-2.5 flex flex-col justify-between gap-1 sm:mb-5">
              <div className="flex items-center gap-2">
                <Image
                  src={flagSrc}
                  alt="flag"
                  width={24}
                  height={24}
                  className="rounded-[3px] object-contain"
                  priority
                />
                <p className="text-[16px] text-white sm:text-[20px]">
                  {meetingInfo.country_kr_name}
                </p>
                <span>{krStatus()}</span>
              </div>
              <p className="text-[12px] sm:text-[14px]">
                {formatDateTime(meetingInfo.date_start)}
              </p>
            </div>
            <p className="mt-auto text-[12px]">
              <span className="mr-0.5">{meetingInfo.round}</span>
              <span>- 라운드</span>
            </p>
          </div>
          <div className="rounded-xl border border-(--color-box-border) bg-(--color-box-bg) px-2.5 py-1">
            <Image
              src={meetingInfo.circuit_img}
              alt="img"
              width={120}
              height={120}
              className="h-20 w-20 sm:h-30 sm:w-30"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
