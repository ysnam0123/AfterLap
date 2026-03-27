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

  const pageLoading = homeLoading || circuitLoading;

  const { user, isLoading: userLoading } = useAuth();
  console.log('현재 로그인된 유저:', user);
  const {
    data: userFavorite,
    isLoading: userFavotieLoading,
    error,
  } = useFavorites(user?.id);
  console.log('현재 로그인된 유저의 선호 목록:', userFavorite);

  const { setFavorites, clearFavorites } = useUserStore();

  useEffect(() => {
    if (userFavorite) {
      setFavorites(userFavorite);
    }
    // 유저가 로그아웃하면 초기화
    if (!user) {
      clearFavorites();
    }
  }, [userFavorite, user, setFavorites, clearFavorites]);

  return (
    <>
      {!pageLoading && (
        <section className="mx-auto flex max-w-full flex-col gap-5 px-5 select-none sm:gap-8 lg:px-15 xl:px-35">
          <NextSession data={nextMeeting} liveSession={liveSession} />

          {driverRanking && teamRanking && CData && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ConstructorStandings data={TData!} />
              <DriverStandings
                data={seeAll ? driverRanking! : driverRanking!.slice(0, 10)}
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
