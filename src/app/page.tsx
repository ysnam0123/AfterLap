'use client';
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
import TeamList from './components/home/TeamList';
import DriverList from './components/home/DriverList';
import AnimatedContent from '@/components/AnimatedContent';

export default function Page() {
  const { data: nextMeeting, isPending: nextMeetingLoading } = useNextMeeting();
  // if (nextMeeting) {
  //   console.log('다음 미팅:', nextMeeting);
  // }

  // 시즌 화면으로 넘어가기 위한 로딩, 이걸 지울까말까?
  const { data: meetings } = useMeetingsWithStatusAndPodium(2026);

  const { data: DriverRanking, isPending: DriverRankingLoading } =
    useDriverRankingData(2026);
  const DRData = DriverRanking?.slice(0, 5);

  const { data: teamRanking, isPending: teamRankingLoading } =
    useTeamSeasonRanking(2026);

  const TData = useMemo(() => {
    if (!teamRanking) return [];
    return groupTeamSeasonRanking(teamRanking).slice(0, 5);
  }, [teamRanking]);

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

  return (
    <>
      {!pageLoading && (
        <section className="mx-auto flex max-w-full flex-col gap-5 px-5 select-none sm:gap-8 lg:px-15 xl:px-35">
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.5}
            threshold={0.1}
            delay={0}
          >
            <NextSession data={nextMeeting} />
          </AnimatedContent>
          {!DriverRankingLoading && DriverRanking && teamRanking && CData && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ConstructorStandings data={TData!} />
              <DriverStandings data={DRData!} />
            </div>
          )}
          <TeamList />
          <DriverList />
          <CircuitGrid data={CData} />
        </section>
      )}
    </>
  );
}
