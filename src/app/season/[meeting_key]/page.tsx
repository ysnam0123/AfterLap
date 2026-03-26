'use client';
import SeasonHeroBox from '@/app/components/season/SeasonHeroBox';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import RaceResultSection from '@/app/components/season/meetings/RaceResultSection';
import SessionResultSection from '@/app/components/season/meetings/SessionResultSection';
import SessionNav from '@/app/components/season/meetings/SessionNav';
import F1Loading from '@/app/components/common/F1Loading';
import ScheduledGrandPrix from '@/app/components/season/meetings/Scheduled/ScheduledGrandPrix';
import { isSessionFinished } from '@/utils/isSessionFinished';
import { useCircuitData } from '@/hooks/useCircuit';
import { useDriverData } from '@/hooks/drivers';
import { useMeetingDetailData } from '@/hooks/page/meetingDetail';
import { useSessionResults } from '@/hooks/result/sessionResult';
import { useStartingGridData } from '@/hooks/result/startingGrid';

export default function Page() {
  const params = useParams<{ meeting_key: string }>();
  const meetingKey = Number(params.meeting_key);
  const { data: detailData, isLoading: meetingDetailLoading } =
    useMeetingDetailData(meetingKey);
  const { meetingDetail, sessions = [] } = detailData ?? {};
  const year = meetingDetail?.year;
  const [selectedSessionKey, setSelectedSessionKey] = useState<number | null>(
    null,
  );
  // 테스트
  useEffect(() => {
    console.log('선택된 세션키:', selectedSessionKey);
  }, [selectedSessionKey]);
  useEffect(() => {
    console.log('세션 모음집:', sessions);
  }, [sessions]);

  const { data: circuitData, isLoading: circuitDataLoading } = useCircuitData(
    meetingDetail?.circuit_key,
  );
  console.log('서킷 데이터:', circuitData);

  const selectedSession = useMemo(
    () => sessions.find((s) => s.session_key === selectedSessionKey) ?? null,
    [sessions, selectedSessionKey],
  );
  const isSelectedSessionFinished = selectedSession
    ? isSessionFinished(selectedSession)
    : false;

  // 테스트
  console.log('선택된 세션의 종료 여부:', isSelectedSessionFinished);

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

  // const isDriverFetchable = !!selectedSessionKey && isSelectedSessionFinished;

  // const { data: driverData = [], isPending: driverLoading } = useDriverData(
  //   selectedSessionKey,
  //   isDriverFetchable,
  // );
  const { data: driverData = [], isPending: driverLoading } = useDriverData(
    selectedSessionKey,
    !!selectedSessionKey,
  );

  const sessionResultFetchable =
    !!selectedSessionKey &&
    isSelectedSessionFinished &&
    !!driverData &&
    driverData.length >= 15;

  const { data: sessionResults = [], isLoading: sessionResultLoading } =
    useSessionResults(selectedSessionKey, sessionResultFetchable);

  const startingGridFetchable =
    isQualifyingSessionFinished && driverData && driverData.length >= 15;

  const { data: startingGridData, isLoading: startingGridLoading } =
    useStartingGridData(
      qualifyingSessionKey!,
      startingGridFetchable && qualifyingSessionKey !== null,
    );

  console.log('스타팅그리드 데이터:', startingGridData);
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

  const isLoading = meetingDetailLoading || circuitDataLoading || driverLoading;

  const hasRequiredData =
    !!meetingDetail && !!circuitData && sessions && sessions.length > 0;

  const isPageReady = !isLoading && hasRequiredData && !!year;

  useEffect(() => {
    console.log('--- 페칭 상태 체크 ---');
    console.log('selectedSessionKey:', selectedSessionKey);
    console.log('isSelectedSessionFinished:', isSelectedSessionFinished);
    console.log('driverData:', driverData.length, '명');
    console.log('sessionResultFetchable:', sessionResultFetchable);
  }, [
    selectedSessionKey,
    isSelectedSessionFinished,
    driverData,
    sessionResultFetchable,
  ]);
  return (
    <>
      <>
        {!isPageReady && (
          <>
            <div className="flex h-100 items-center justify-center sm:h-100">
              <F1Loading loadingText="로딩 중..." />
            </div>
          </>
        )}
        {isPageReady && (
          <>
            <SeasonHeroBox
              meetingInfo={meetingDetail}
              circuitInfo={circuitData}
            />
            <section className="mx-auto min-h-screen w-full px-0 md:px-10 lg:px-20 xl:px-35">
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
                      circuitData={circuitData}
                    />
                  )}
                  {isSelectedSessionFinished && (
                    <>
                      {sessionResultLoading && (
                        <>
                          <div className="flex h-100 items-center justify-center sm:h-100">
                            <F1Loading loadingText="로딩 중..." />
                          </div>
                        </>
                      )}
                      {!sessionResultLoading &&
                      selectedSession?.session_name === 'Race' &&
                      raceSession &&
                      startingGridData ? (
                        <RaceResultSection
                          isRaceFinished={isSelectedSessionFinished}
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
