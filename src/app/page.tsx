'use client';
import HighLights from './components/home/HighLights';
import { useLiveSession } from '@/hooks/LiveSession';
import { useNextMeeting } from '@/hooks/NextMeeting';
import { useMeetingsWithStatusAndPodium } from '@/hooks/SeasonRacePodium';
import ConstructorStandings from './components/home/ConstructorStandings';
import DriverStandings from './components/home/DriverStandings';
import CircuitGrid from './components/home/CircuitGrid';
import NextSession from './components/home/NextSession';
import { useMemo } from 'react';
import { useDriverRankingData } from './api/f1/ranking/driverRanking';
import { useCircuitViewData } from './api/meeting/Circuit';
import {
  groupTeamSeasonRanking,
  useTeamSeasonRanking,
} from './api/f1/ranking/TeamRanking';

export default function Page() {
  // 라이브 세션 아직 건드리지 않음
  const { data: liveSession, isPending: liveSessionLoading } = useLiveSession();
  if (liveSession) {
    console.log('라이브 세션:', liveSession);
  }
  const { data: nextMeeting, isPending: nextMeetingLoading } = useNextMeeting();
  if (nextMeeting) {
    console.log('다음 미팅:', nextMeeting);
  }

  // 시즌 화면으로 넘어가기 위한 로딩
  const { data: meetings } = useMeetingsWithStatusAndPodium(2026);

  // 드라이버 랭킹
  const { data: DriverRanking, isPending: DriverRankingLoading } =
    useDriverRankingData(2025);
  const DRData = DriverRanking?.slice(0, 5);

  const { data: teamRanking, isPending: teamRankingLoading } =
    useTeamSeasonRanking(2025);

  const TData = useMemo(() => {
    if (!teamRanking) return [];
    return groupTeamSeasonRanking(teamRanking).slice(0, 5);
  }, [teamRanking]);

  // 서킷
  const { data: circuitData, isPending: circuitLoading } = useCircuitViewData();

  const CData = useMemo(() => {
    if (!circuitData) return [];
    return [...circuitData].sort(() => Math.random() - 0.5).slice(0, 6);
  }, [circuitData]);

  const pageLoading =
    DriverRankingLoading ||
    teamRankingLoading ||
    nextMeetingLoading ||
    circuitLoading;

  console.log(new Date('2026-02-11T07:00:00+00:00').toLocaleString());

  return (
    <>
      {/* {pageLoading && <MobileSplash />} */}
      {!pageLoading && (
        <section className="mx-auto flex max-w-full flex-col gap-5 px-5 pt-5 select-none sm:gap-8 lg:px-15 xl:px-35">
          <NextSession data={nextMeeting} />
          {!DriverRankingLoading && DriverRanking && teamRanking && CData && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ConstructorStandings data={TData!} />
              <DriverStandings data={DRData!} />
            </div>
          )}
          <CircuitGrid data={CData} />
          <HighLights />
        </section>
      )}
    </>
  );
}
