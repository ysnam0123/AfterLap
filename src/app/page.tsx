'use client';
import ConstructorStandings from './components/home/ConstructorStandings';
import DriverStandings from './components/home/DriverStandings';
import CircuitGrid from './components/home/CircuitGrid';
import NextSession from './components/home/NextSession';
import { useMemo, useState } from 'react';
import TeamList from './components/home/TeamList';
import DriverList from './components/home/DriverList';
import { useCircuitViewData } from '@/hooks/useCircuit';
import { useHomeData } from '@/hooks/page/home';
import { groupTeamSeasonRanking } from '@/utils/groupTeamSeasonRanking';

export default function Page() {
  const { data: homeData, isLoading: homeLoading } = useHomeData();
  const { liveSession, nextMeeting, driverRanking, teamRanking } =
    homeData ?? {};
  const { data: circuitData, isPending: circuitLoading } = useCircuitViewData();
  const [seeAll, setSeeAll] = useState(false);

  // console.log('드라이버 랭킹:', driverRanking);
  console.log('다음 미팅:', nextMeeting);

  const TData = useMemo(() => {
    if (!teamRanking) return [];
    return groupTeamSeasonRanking(teamRanking).slice(0, 5);
  }, [teamRanking]);

  const CData = useMemo(() => {
    if (!circuitData) return [];
    return [...circuitData].sort(() => Math.random() - 0.5).slice(0, 6);
  }, [circuitData]);

  const pageLoading = homeLoading && circuitLoading;

  return (
    <>
      {!pageLoading && (
        <section className="mx-auto flex max-w-full flex-col gap-5 px-5 select-none sm:gap-8 lg:px-15 xl:px-35">
          <NextSession data={nextMeeting} liveSession={liveSession} />

          {driverRanking && teamRanking && CData && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ConstructorStandings data={TData!} />
              <DriverStandings
                data={seeAll ? driverRanking! : driverRanking!.slice(10)}
                seeAll={seeAll}
                setSeeAll={setSeeAll}
              />
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
