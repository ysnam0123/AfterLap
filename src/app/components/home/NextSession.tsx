'use client';

import LiveSessionBox from './LiveSessionBox';
import SessionBox from './SessionBox';
import { LiveSession, NextMeeting } from '@/types/meeting';
import { useSessionData } from '@/hooks/sessions';
import { getSessionStatus } from '@/utils/time';
import { useState } from 'react';
import NextSessionTitle from './NextSessionTitle';
import AnimatedContent from '@/components/AnimatedContent';

interface PageProps {
  data: NextMeeting;
  liveSession: LiveSession;
}
export default function NextSession({ data, liveSession }: PageProps) {
  const meetingKey = data?.meeting_key ?? null;
  const { data: nextSessions = [] } = useSessionData(meetingKey, !!meetingKey);
  const [seeAll, setSeeAll] = useState(false);
  console.log('다음 미팅 세션들:', nextSessions);
  const upcomingSession = nextSessions.find(
    (session) =>
      getSessionStatus(session.date_start, session.date_end) === 'upcoming',
  );
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
      <div className="flex flex-col gap-2">
        <h1
          style={{ fontFamily: 'RiaSans', fontWeight: 900 }}
          className="text-[18px] font-semibold text-[#C4C4C4] sm:text-[30px] sm:text-(--color-title)"
        >
          Next
        </h1>
        <section className="flex flex-col gap-2">
          <NextSessionTitle data={data} />
          {liveSession && <LiveSessionBox data={liveSession} />}
          {!liveSession && upcomingSession && (
            <div className="flex flex-col gap-2">
              {!seeAll && (
                <>
                  <AnimatedContent
                    distance={10}
                    direction="vertical"
                    reverse={false}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={0.5}
                    threshold={0.1}
                    delay={0}
                  >
                    <SessionBox data={upcomingSession!} />
                  </AnimatedContent>
                </>
              )}
              {seeAll && (
                <>
                  {nextSessions.map((session) => (
                    <AnimatedContent
                      key={session.session_key}
                      distance={10}
                      direction="vertical"
                      reverse={false}
                      ease="power3.out"
                      initialOpacity={0}
                      animateOpacity
                      scale={0.5}
                      threshold={0.1}
                      delay={0}
                    >
                      <SessionBox data={session} />
                    </AnimatedContent>
                  ))}
                </>
              )}
            </div>
          )}
        </section>
        <div className="mobile">
          <button
            onClick={() => setSeeAll(!seeAll)}
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
          >
            <p
              style={{ fontFamily: 'RiaSans', fontWeight: 600 }}
              className="text-[12px]"
            >
              {seeAll ? '접기' : '펼치기'}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
