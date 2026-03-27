'use client';

import { countryCodeFlags } from '@/images/flags';
import { GrandPrixCardProps } from '@/types/meeting';
import { formatDateTime } from '@/utils/time';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GrandPrixCardWithPodium({
  meetingInfo,
}: GrandPrixCardProps) {
  const router = useRouter();
  const flagSrc = countryCodeFlags[meetingInfo.country_code];
  const krStatus = () => {
    switch (meetingInfo.status) {
      case 'finished':
        return (
          <div className="flex items-center gap-1 text-[14px]">
            <p>종료</p>
            <div className="h-5 w-5 rounded-full bg-[#05AF05]"></div>
          </div>
        );
      case 'ongoing':
        return (
          <div className="flex items-center gap-1 text-[14px]">
            <p>진행중</p>
            <div className="h-5 w-5 rounded-full bg-[#B80000]"></div>
          </div>
        );
      case 'scheduled':
        return (
          <div className="flex items-center gap-1 text-[14px]">
            <p>예정</p>
            <div className="h-5 w-5 rounded-full bg-[#595959]"></div>
          </div>
        );
    }
  };

  const position = (p: number) => {
    if (p === 1) return '1st';
    if (p === 2) return '2nd';
    if (p === 3) return '3rd';
  };

  return (
    <>
      <div
        onClick={() => router.push(`/season/${meetingInfo.meeting_key}`)}
        className="flex min-h-45.5 w-full cursor-pointer flex-col justify-between rounded-[12px] border border-(--color-card-border) bg-(--color-card-bg) p-4.5 font-semibold shadow-(--shadow-soft) transition hover:bg-(--color-card-hover) hover:shadow-(--shadow-strong)"
      >
        <div className="mb-2.5 flex items-center justify-between sm:mb-5">
          <div className="flex flex-col gap-3">
            <p className="text-[12px]">
              <span className="mr-0.5">{meetingInfo.round}</span>
              <span>- 라운드</span>
            </p>
            <div className="flex gap-2">
              <Image
                src={flagSrc}
                alt="flag"
                width={24}
                height={24}
                className="rounded-full object-contain"
                priority
              />
              <p className="text-[20px] text-white">
                {meetingInfo.country_kr_name}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-0.5 text-[12px]">
            {/* <p>{meetingInfo.date_start.split('T')[0]}</p> */}
            <p>{formatDateTime(meetingInfo.date_start)}</p>
            <span>{krStatus()}</span>
          </div>
        </div>
        <p className="flex text-[10px] text-[#8B8B8B] sm:text-[12px]">
          {meetingInfo.meeting_official_name}
        </p>
        <div className="flex min-h-10 w-full items-center gap-2">
          {meetingInfo.race_podium?.map((podium) => (
            <div
              key={podium.driver_code}
              className="flex flex-1 items-center justify-between rounded-[10px] border border-(--color-box-border) bg-(--color-box-bg) px-2 py-1.75 font-semibold"
            >
              <p className="text-[10px] leading-none sm:text-[12px]">
                {position(podium.position)}
              </p>
              <p className="text-[14px] leading-none sm:text-[16px] lg:text-[18px]">
                {podium.driver_code}
              </p>
              <div
                className="h-5 w-5 shrink-0 rounded-full bg-contain bg-center bg-no-repeat sm:h-6 sm:w-6"
                style={{
                  backgroundColor: podium.team_colour,
                  backgroundImage: `url(${podium.team_white_logo})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
