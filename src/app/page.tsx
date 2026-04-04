'use client';
import ConstructorStandings from './components/home/ConstructorStandings';
import DriverStandings from './components/home/DriverStandings';
import CircuitGrid from './components/home/CircuitGrid';
import NextSession from './components/home/NextSession';
import { useEffect, useMemo, useState } from 'react';
import TeamList from './components/home/TeamList';
import DriverList from './components/home/DriverList';
import { useCircuitViewData } from '@/hooks/useCircuit';
import { useHomeData } from '@/hooks/page/home';
import { groupTeamSeasonRanking } from '@/utils/groupTeamSeasonRanking';
import { useAuth } from '@/context/useAuth';
import { useFavorites } from '@/hooks/favorite';
import { useUserStore } from '@/store/useUserFavoriteStore';
import NextSessionSkeleton from './components/home/skeleton/NextSessionSkeleton';
import ConstructorStandingsSkeleton from './components/home/skeleton/ConstructorStandingsSkeleton';
import DriverStandingsSkeleton from './components/home/skeleton/DriverStandingsSkeleton';
import CircuitGridSkeleton from './components/home/skeleton/CircuitGridSkeleton';
import ConstructorHeader from './components/home/sectionHeader/ConstructorHeader';
import DriverStandingsHeader from './components/home/sectionHeader/DriverStandingsHeader';

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

  const pageLoading = homeLoading || circuitLoading;

  const { user } = useAuth();
  console.log('현재 로그인된 유저:', user);
  const { data: userFavorite } = useFavorites(user?.id);
  console.log('현재 로그인된 유저의 선호 목록:', userFavorite);

  const { setFavorites, clearFavorites } = useUserStore();

  useEffect(() => {
    if (userFavorite) {
      setFavorites(userFavorite);
    }
    if (!user) {
      clearFavorites();
    }
  }, [userFavorite, user, setFavorites, clearFavorites]);

  return (
    <>
      <section className="mx-auto flex max-w-full flex-col gap-5 px-5 select-none sm:gap-8 lg:px-15 xl:px-35">
        <h1 className="font-ria text-[18px] font-black text-[#C4C4C4] sm:text-[30px] sm:text-(--color-title)">
          Next
        </h1>
        {/* !pageLoading */}
        {!pageLoading ? (
          <NextSession data={nextMeeting} liveSession={liveSession} />
        ) : (
          <NextSessionSkeleton />
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <ConstructorHeader />
            {/* teamRanking */}
            {teamRanking ? (
              <ConstructorStandings data={TData!} />
            ) : (
              <ConstructorStandingsSkeleton />
            )}
          </div>
          <div>
            <DriverStandingsHeader />
            {driverRanking ? (
              <DriverStandings
                data={seeAll ? driverRanking! : driverRanking!.slice(0, 5)}
                seeAll={seeAll}
                setSeeAll={setSeeAll}
              />
            ) : (
              <DriverStandingsSkeleton />
            )}
          </div>
        </div>
        <TeamList />
        <DriverList />
        {/* circuitData */}
        {circuitData ? (
          <CircuitGrid data={circuitData.slice(0, 5)} />
        ) : (
          <CircuitGridSkeleton />
        )}
      </section>
    </>
  );
}
