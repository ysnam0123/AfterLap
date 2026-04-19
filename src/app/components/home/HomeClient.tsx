'use client';

import { useHomeData } from '@/hooks/page/home';
import { HomeData } from '@/types/home';
import NextSession from './NextSession';
import NextSessionSkeleton from './skeleton/NextSessionSkeleton';
import ConstructorHeader from './sectionHeader/ConstructorHeader';
import ConstructorStandings from './ConstructorStandings';
import ConstructorStandingsSkeleton from './skeleton/ConstructorStandingsSkeleton';
import DriverStandingsHeader from './sectionHeader/DriverStandingsHeader';
import DriverStandings from './DriverStandings';
import DriverStandingsSkeleton from './skeleton/DriverStandingsSkeleton';
import TeamList from './TeamList';
import DriverList from './DriverList';
import CircuitGrid from './CircuitGrid';
import { useEffect, useMemo, useState } from 'react';
import { groupTeamSeasonRanking } from '@/utils/groupTeamSeasonRanking';
import { useAuth } from '@/context/useAuth';
import { useFavorites } from '@/hooks/favorite';
import { useUserStore } from '@/store/useUserFavoriteStore';
import { CircuitView } from '@/types/circuit';

interface Data {
  initialData: HomeData;
  initialCircuits: CircuitView[];
}
export default function HomeClient({ initialData, initialCircuits }: Data) {
  const { data: homeData } = useHomeData({ initialData });
  const { liveSession, nextMeeting, driverRanking, teamRanking } =
    homeData ?? {};
  const [seeAll, setSeeAll] = useState(false);
  const TData = useMemo(() => {
    if (!teamRanking) return [];
    return groupTeamSeasonRanking(teamRanking).slice(0, 5);
  }, [teamRanking]);

  const pageLoading = !initialData;

  const { user } = useAuth();
  const { data: userFavorite } = useFavorites(user?.id);

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
        <div>
          <h1 className="font-ria text-[18px] font-black text-(--color-title) sm:text-[30px] sm:text-(--color-title)">
            Next
          </h1>
          {/* !pageLoading */}
          {!pageLoading ? (
            <NextSession data={nextMeeting} liveSession={liveSession} />
          ) : (
            <NextSessionSkeleton />
          )}
        </div>

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
        <CircuitGrid data={initialCircuits.slice(0, 6)} />
      </section>
    </>
  );
}
