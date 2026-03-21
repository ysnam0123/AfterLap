'use client';
import { NextMeeting } from '@/hooks/NextMeeting';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSessionData } from '@/app/api/meeting/Sessions';

import { useLiveSession } from '@/hooks/LiveSession';
import LiveSessionBox from './LiveSessionBox';
import SessionBox from './SessionBox';
import AnimatedContent from '@/components/AnimatedContent';

interface PageProps {
  data?: NextMeeting;
}
export default function NextSession({ data }: PageProps) {
  const router = useRouter();
  const meetingKey = data?.meeting_key ?? null;
  const { data: nextSessions = [] } = useSessionData(meetingKey, !!meetingKey);

  const { data: liveSession, isPending: liveSessionLoading } = useLiveSession();

  if (!data) {
    return null;
  }

  // console.log('nextSessions:', nextSessions);
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-[18px] font-semibold text-[#C4C4C4] sm:text-[30px] sm:text-(--color-title)">
          다음 일정
        </h1>
        <section className="flex flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full flex-col gap-0 lg:max-w-152.5 lg:shrink-0 lg:pb-0">
              <h1 className="text-[20px] font-semibold sm:text-[22px] lg:text-[30px]">
                {data.meeting_name}
              </h1>
              <h1 className="mt-0 text-[12px] font-medium text-[#787575] sm:mt-1 sm:text-[14px] lg:text-[18px]">
                {data.meeting_official_name}
              </h1>

              <div className="my-0.5 flex flex-wrap items-center gap-2 text-[12px] text-[#787575] sm:my-1.5 sm:mt-3 sm:text-[14px] lg:text-[16px]">
                <p>{data.circuits.circuit_long_name}</p>
                <div className="hidden h-6 w-px bg-(--color-sub-text) lg:block" />
                <p>{data.countries.country_kr_name}</p>
                <Image
                  src={data.countries.flag}
                  alt="flag"
                  width={24}
                  height={14}
                  priority
                />
              </div>
            </div>
          </div>
          {liveSession && <LiveSessionBox data={liveSession} />}
          {!liveSession && (
            <div className="flex flex-col gap-2">
              {nextSessions.map((session) => (
                <SessionBox key={session.session_key} data={session} />
              ))}
            </div>
          )}
        </section>
        <div className="mobile">
          <button className="flex h-full w-full cursor-pointer items-center justify-center rounded-[12px] border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)">
            <p
              style={{ fontFamily: 'RiaSans', fontWeight: 600 }}
              className="text-[12px]"
            >
              2026 일정 전체보기
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
