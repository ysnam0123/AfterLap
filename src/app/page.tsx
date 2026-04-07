import { getLiveSession } from '@/lib/server/liveSession';
import { getNextMeeting } from '@/lib/server/nextMeeting';
import { getDriverRanking } from '@/lib/server/driverRanking';
import { getTeamSeasonRanking } from '@/lib/server/teamRanking';
import { fetchCircuits } from '@/lib/server/circuit';
import HomeClient from './components/home/HomeClient';

export default async function Page() {
  const [liveSession, nextMeeting, driverRanking, teamRanking, circuits] =
    await Promise.all([
      getLiveSession(),
      getNextMeeting(),
      getDriverRanking(2026),
      getTeamSeasonRanking(2026),
      fetchCircuits(),
    ]);

  return (
    <>
      <HomeClient
        initialData={{ liveSession, nextMeeting, driverRanking, teamRanking }}
        initialCircuits={circuits}
      />
    </>
  );
}
