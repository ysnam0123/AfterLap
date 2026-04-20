'use client';

import { Session } from '@/types/meeting';
import { useState } from 'react';
import CSSAnimatedContent from '@/components/CSSAnimatedContent';
import SessionBox from './SessionBox';

interface PageProps {
  initialSessions?: Session[];
  upcomingSessionKey: number;
}
export default function NextSessionClient({
  initialSessions,
  upcomingSessionKey,
}: PageProps) {
  const [seeAll, setSeeAll] = useState(false);

  const restSessions = initialSessions?.filter(
    (s) => s.session_key !== upcomingSessionKey,
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        {seeAll && (
          <div className="flex flex-col gap-2">
            <div className="h-1 w-full bg-(--color-box-border)" />
            <>
              {restSessions?.map((session) => (
                <CSSAnimatedContent
                  key={session.session_key}
                  distance={10}
                  direction="vertical"
                  reverse={false}
                  initialOpacity={0}
                  animateOpacity
                  scale={0.5}
                  threshold={0.1}
                  delay={0}
                >
                  <SessionBox data={session} />
                </CSSAnimatedContent>
              ))}
            </>
          </div>
        )}
        <div className="mobile">
          <button
            onClick={() => setSeeAll(!seeAll)}
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
          >
            <p className="font-ria text-[12px] font-semibold">
              {seeAll ? '접기' : '펼치기'}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
