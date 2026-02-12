'use client';
import { NextMeeting } from '@/hooks/NextMeeting';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSessionData } from '@/app/api/meeting/Sessions';
import SessionBox from './SessionBox';

interface PageProps {
  data?: NextMeeting;
}
export default function NextSession({ data }: PageProps) {
  const router = useRouter();
  const meetingKey = data?.meeting_key ?? null;
  const { data: nextSessions = [] } = useSessionData(meetingKey, !!meetingKey);

  if (!data) {
    return null;
  }

  console.log('nextSessions:', nextSessions);
  return (
    <>
      <div className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-(--color-box-bg) p-4 sm:gap-0 sm:p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[14px] font-semibold text-[#FED010] sm:text-[30px] sm:text-(--color-title)">
            다음 일정
          </h1>
          <button
            onClick={() => router.push(`/season`)}
            className="flex h-8 cursor-pointer items-center justify-center rounded-[10px] bg-[#666666] px-3 py-1.75 transition-all duration-120 hover:bg-[#4C4C4C] active:bg-[#CDC9C9]/50 md:h-10"
          >
            <p
              className="text-[12px] text-[#F8F8F8] sm:text-[16px]"
              style={{ fontFamily: 'Paperlolgy', fontWeight: 600 }}
            >
              일정 전체보기
            </p>
          </button>
        </div>
        <section className="flex flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full flex-col gap-1 lg:max-w-152.5 lg:shrink-0 lg:pb-0">
              <h1 className="text-[20px] font-semibold sm:text-[22px] lg:text-[30px]">
                {data.meeting_name}
              </h1>
              <h1 className="mt-0 text-[10px] font-medium text-(--color-sub-text) sm:mt-1 sm:text-[14px] lg:text-[18px]">
                {data.meeting_official_name}
              </h1>

              <div className="my-0.5 flex flex-wrap items-center gap-2 text-[12px] sm:my-1.5 sm:mt-3 sm:text-[14px] lg:text-[16px]">
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

          <div className="flex grid-cols-3 flex-col gap-2 sm:grid sm:gap-5">
            {nextSessions.map((session) => (
              <SessionBox key={session.session_key} data={session} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
