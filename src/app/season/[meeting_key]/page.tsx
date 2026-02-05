'use client';
import SeasonHeroBox from '@/app/components/season/SeasonHeroBox';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import RaceResultSection from '@/app/components/season/meetings/RaceResultSection';
import SessionResultSection from '@/app/components/season/meetings/SessionResultSection';
import SessionNav from '@/app/components/season/meetings/SessionNav';
import { useCircuitData } from '@/app/api/meeting/Circuit';
import F1Loading from '@/app/components/common/F1Loading';
import { useStartingGridData } from '@/app/api/f1/race/starting_grid';
import {
  getSessionResult,
  useSortedResults,
} from '@/app/api/meeting/sessionResult';
import { useMeetingData } from '@/app/api/meeting/Meetings';
import { useSessionData } from '@/app/api/meeting/Sessions';
import { useDriverData } from '@/app/api/f1/Drivers';
import ScheduledGrandPrix from '@/app/components/season/meetings/Scheduled/ScheduledGrandPrix';
import { isSessionFinished } from '@/utils/isSessionFinished';

export default function Page() {
  const params = useParams<{ meeting_key: string }>();
  const meetingKey = Number(params.meeting_key);
  const { data: meetingInfo, isPending: meetingLoading } =
    useMeetingData(meetingKey);
  const year = meetingInfo?.year;
  const { data: circuitInfo, isPending: circuitLoading } = useCircuitData(
    meetingInfo?.circuit_key,
  );
  const sessionFetchable = !!meetingKey && !!meetingInfo;
  const { data: sessions = [], isPending: sessionLoading } = useSessionData(
    meetingKey,
    sessionFetchable,
  );
  const [selectedSessionKey, setSelectedSessionKey] = useState<number | null>(
    null,
  );
  const selectedSession = useMemo(
    () => sessions.find((s) => s.session_key === selectedSessionKey) ?? null,
    [sessions, selectedSessionKey],
  );
  const isSelectedSessionFinished = selectedSession
    ? isSessionFinished(selectedSession)
    : false;
  const sessionFinishMap = useMemo(() => {
    return sessions.reduce<Record<number, boolean>>((acc, session) => {
      acc[session.session_key] = isSessionFinished(session);
      return acc;
    }, {});
  }, [sessions]);
  const raceSession = useMemo(
    () => sessions.find((s) => s.session_name === 'Race') ?? null,
    [sessions],
  );
  const qualifyingSession = useMemo(
    () => sessions.find((s) => s.session_name === 'Qualifying') ?? null,
    [sessions],
  );
  const qualifyingSessionKey = qualifyingSession?.session_key ?? null;
  const isQualifyingSessionFinished = qualifyingSession
    ? isSessionFinished(qualifyingSession)
    : false;

  const isDriverFetchable = !!selectedSessionKey && isSelectedSessionFinished;
  const { data: driverData = [], isPending: driverLoading } = useDriverData(
    selectedSessionKey,
    isDriverFetchable,
  );

  const sessionResultFetchable =
    !!selectedSessionKey &&
    isSelectedSessionFinished &&
    !!driverData &&
    driverData.length >= 15;
  const { data: sessionResults = [], isLoading: sessionResultLoading } =
    useSortedResults(selectedSessionKey, sessionResultFetchable);

  const startingGridFetchable =
    isQualifyingSessionFinished && driverData && driverData.length >= 15;
  const {
    data: startingGridData,
    isLoading: startingGridLoading,
    isError: startingGridError,
  } = useStartingGridData(qualifyingSessionKey!, startingGridFetchable);

  const finishedSessions = sessions
    .filter(isSessionFinished)
    .sort(
      (a, b) => new Date(b.date_end).getTime() - new Date(a.date_end).getTime(),
    );
  const upcomingSessions = sessions
    .filter((s) => !isSessionFinished(s))
    .sort(
      (a, b) =>
        new Date(a.date_start).getTime() - new Date(b.date_start).getTime(),
    );
  useEffect(() => {
    if (!sessions.length || selectedSessionKey) return;

    if (finishedSessions.length > 0) {
      setSelectedSessionKey(finishedSessions[0].session_key);
    } else if (upcomingSessions.length > 0) {
      setSelectedSessionKey(upcomingSessions[0].session_key);
    } else {
      setSelectedSessionKey(sessions[0].session_key);
    }
  }, [sessions, selectedSessionKey, finishedSessions, upcomingSessions]);

  const isPageReady =
    !!meetingInfo && !!year && !!circuitInfo && sessions.length > 0;

  if (selectedSessionKey) {
    getSessionResult(selectedSessionKey);
  }

  return (
    <>
      <>
        <SeasonHeroBox meetingInfo={meetingInfo} circuitInfo={circuitInfo} />
        {!isPageReady && (
          <>
            {' '}
            <div className="flex h-100 items-center justify-center sm:h-100">
              <F1Loading loadingText="로딩 중..." />
            </div>
          </>
        )}
        {isPageReady && (
          <>
            <section className="mx-auto min-h-screen w-full px-5 md:px-10 lg:px-20 xl:px-35">
              <>
                {selectedSessionKey && (
                  <SessionNav
                    sessionTabs={sessions}
                    isSelectedKey={selectedSessionKey}
                    setIsSelectedAction={setSelectedSessionKey}
                    sessionFinishMap={sessionFinishMap}
                  />
                )}
                <div>
                  {!isSelectedSessionFinished && selectedSession && (
                    <ScheduledGrandPrix
                      data={selectedSession}
                      circuitData={circuitInfo}
                    />
                  )}
                  {isSelectedSessionFinished && (
                    <>
                      {selectedSession?.session_name === 'Race' &&
                      raceSession &&
                      startingGridData ? (
                        <RaceResultSection
                          year={year}
                          sessionKey={raceSession.session_key}
                          sessionResults={sessionResults}
                          startingGrid={startingGridData}
                        />
                      ) : (
                        selectedSessionKey && (
                          <SessionResultSection
                            year={year}
                            isPending={sessionResultLoading}
                            sessionResults={sessionResults}
                          />
                        )
                      )}
                    </>
                  )}
                </div>
              </>
            </section>
          </>
        )}
      </>
    </>
  );
}
