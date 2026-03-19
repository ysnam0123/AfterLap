'use client';

import { CardProps } from '@/hooks/SeasonRacePodium';
import { countryCodeFlags } from '@/images/flags';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GrandPrixCardWithProblem({ meetingInfo }: CardProps) {
  const router = useRouter();
  const flagSrc = countryCodeFlags[meetingInfo.country_code];

  return (
    <>
      <div
        // onClick={() => router.push(`/season/${meetingInfo.meeting_key}`)}
        className="flex w-full cursor-pointer flex-col rounded-[10px] border border-(--color-card-border) bg-(--color-card-bg) p-4.5 font-semibold shadow-(--shadow-soft) transition hover:bg-(--color-card-hover) hover:shadow-(--shadow-strong)"
      >
        <p className="mb-2 text-[10px] text-[#8B8B8B] sm:text-[12px]">
          {meetingInfo.meeting_official_name}
        </p>
        <div className="flex w-full items-center justify-between">
          <div className="mb-2.5 flex w-full flex-col justify-between gap-1 sm:mb-5">
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
            </div>
            <div className="mt-3 ml-auto flex items-center gap-1">
              <p
                style={{ fontFamily: 'Pretendard', fontWeight: 500 }}
                className="text-[18px]"
              >
                일정 취소
              </p>
              <div className="h-5 w-5 rounded-full bg-[#F6CD00]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
