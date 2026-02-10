'use client';

import { CardProps } from '@/hooks/SeasonRacePodium';
import { countryCodeFlags } from '@/images/flags';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GrandPrixCard({ meetingInfo }: CardProps) {
  const router = useRouter();
  const flagSrc = countryCodeFlags[meetingInfo.country_code];

  return (
    <>
      <div
        onClick={() => router.push(`/season/${meetingInfo.meeting_key}`)}
        className="flex w-full cursor-pointer flex-col rounded-[10px] border border-white/10 bg-[#1A1A1A] p-4.5 font-semibold hover:bg-[#313131]"
      >
        <p className="mb-2 text-[10px] text-[#8B8B8B] sm:text-[12px]">
          {meetingInfo.meeting_official_name}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex h-full flex-col">
            <div className="mb-2.5 flex flex-col justify-between gap-1 sm:mb-5">
              <div className="flex gap-2">
                <Image
                  src={flagSrc}
                  alt="flag"
                  width={24}
                  height={24}
                  className="rounded-full object-contain"
                />
                <p className="text-[16px] text-white sm:text-[20px]">
                  {meetingInfo.country_kr_name}
                </p>
              </div>
              <p className="text-[12px] sm:text-[14px]">
                {meetingInfo.date_start.split('T')[0]}
              </p>
            </div>
            <p className="mt-auto text-[12px]">
              <span className="mr-0.5">{meetingInfo.round}</span>
              <span>- 라운드</span>
            </p>
          </div>
          <div className="rounded-xl bg-[#333333] px-2.5 py-1">
            <Image
              src={meetingInfo.circuit_img}
              alt="img"
              width={120}
              height={120}
              className="h-20 w-20 sm:h-30 sm:w-30"
            />
          </div>
        </div>
      </div>
    </>
  );
}
