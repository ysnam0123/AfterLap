import { getLiveSession } from '@/lib/server/liveSession';
import { getNextMeeting } from '@/lib/server/nextMeeting';
import { getDriverRanking } from '@/lib/server/driverRanking';
import { getTeamSeasonRanking } from '@/lib/server/teamRanking';
import { fetchCircuits } from '@/lib/server/circuit';
import { ensureSessions } from '@/lib/server/sessions';
import HomeClient from './components/home/HomeClient';

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

  return (
    <>
      <HomeClient
        initialData={{ liveSession, nextMeeting, driverRanking, teamRanking }}
        initialCircuits={circuits}
        initialSessions={initialSessions}
      />
    </>
  );
}
