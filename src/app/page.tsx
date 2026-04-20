import { getLiveSession } from '@/lib/server/liveSession';
import { getNextMeeting } from '@/lib/server/nextMeeting';
import { getDriverRanking } from '@/lib/server/driverRanking';
import { getTeamSeasonRanking } from '@/lib/server/teamRanking';
import { fetchCircuits } from '@/lib/server/circuit';
import { ensureSessions } from '@/lib/server/sessions';
import { groupTeamSeasonRanking } from '@/utils/groupTeamSeasonRanking';
import FavoritesSync from './components/home/FavoritesSync';
import NextSession from './components/home/NextSession';
import ConstructorHeader from './components/home/sectionHeader/ConstructorHeader';
import ConstructorStandings from './components/home/ConstructorStandings';
import DriverStandingsHeader from './components/home/sectionHeader/DriverStandingsHeader';
import DriverStandings from './components/home/DriverStandings';
import TeamList from './components/home/TeamList';
import DriverList from './components/home/DriverList';
import CircuitGrid from './components/home/CircuitGrid';

export default async function Page() {
  const nextMeeting = await getNextMeeting();

  const [liveSession, driverRanking, teamRanking, circuits, initialSessions] =
    await Promise.all([
      getLiveSession(),
      getDriverRanking(2026),
      getTeamSeasonRanking(2026),
      fetchCircuits(),
      nextMeeting?.meeting_key
        ? ensureSessions(nextMeeting.meeting_key)
        : Promise.resolve([]),
    ]);

  const TData = teamRanking ? groupTeamSeasonRanking(teamRanking).slice(0, 5) : [];

  return (
    <section className="mx-auto flex max-w-full flex-col gap-5 px-5 select-none sm:gap-8 lg:px-15 xl:px-35">
      <FavoritesSync />

      <div>
        <h1 className="font-ria text-[18px] font-black text-(--color-title) sm:text-[30px] sm:text-(--color-title)">
          Next
        </h1>
        <NextSession
          data={nextMeeting}
          liveSession={liveSession}
          initialSessions={initialSessions}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <ConstructorHeader />
          {teamRanking && <ConstructorStandings data={TData} />}
        </div>
        <div>
          <DriverStandingsHeader />
          {driverRanking && <DriverStandings data={driverRanking} />}
        </div>
      </div>

      <TeamList />
      <DriverList />
      <CircuitGrid data={circuits.slice(0, 6)} />
    </section>
  );
}
