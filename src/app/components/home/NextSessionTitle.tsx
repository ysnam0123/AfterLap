'use client';

import Image from 'next/image';
import { NextMeeting } from '@/types/meeting';
import { useSessionData } from '@/hooks/sessions';
import { getSessionStatus } from '@/utils/time';

interface PageProps {
  data: NextMeeting;
}

export default function NextSessionTitle({ data }: PageProps) {
  const meetingKey = data?.meeting_key ?? null;
  const { data: nextSessions = [] } = useSessionData(meetingKey, !!meetingKey);
  console.log('다음 미팅 세션들:', nextSessions);
  console.log(
    '바로 직후 세션:',
    nextSessions.find(
      (session) =>
        getSessionStatus(session.date_start, session.date_end) === 'upcoming',
    ),
  );
  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-1 lg:max-w-152.5 lg:shrink-0 lg:pb-0">
          <h1 className="flex items-center gap-2 text-[20px] font-semibold sm:text-[22px] lg:text-[30px]">
            <span>{data.countries.country_kr_name} 그랑프리</span>
            <Image
              src={data.countries.flag}
              alt="flag"
              width={24}
              height={14}
              priority
            />
          </h1>
          <h1 className="mt-0 text-[14px] font-medium text-[#787575] sm:mt-1 sm:text-[14px] lg:text-[18px]">
            {data.meeting_official_name}
          </h1>
        </div>
      </div>
    </>
  );
}
