import { getLiveSession } from '@/lib/server/liveSession';
import { getNextMeeting } from '@/lib/server/nextMeeting';
import { ensureSessions } from '@/lib/server/sessions';
import FavoritesSync from './components/home/FavoritesSync';
import NextSession from './components/home/NextSession/NextSession';
import TeamList from './components/home/List/TeamList';
import DriverList from './components/home/List/DriverList';
import { getSessionStatus } from '@/utils/time';
import { Suspense } from 'react';
import CircuitGridSkeleton from './components/home/skeleton/CircuitGridSkeleton';
import CircuitGrid from './components/home/homeCircuit/CircuitGrid';
import RankingSection from './components/home/RankingSection/RankingSection';
import RankingSkeleton from './components/home/skeleton/RankingSkeleton';
import TeamListSkeleton from './components/home/skeleton/TeamListSkeleton';

export default async function Page() {
  const nextMeeting = await getNextMeeting();

  const [liveSession, initialSessions] = await Promise.all([
    getLiveSession(),
    nextMeeting?.meeting_key
      ? ensureSessions(nextMeeting.meeting_key)
      : Promise.resolve([]),
  ]);

  const upcomingSession = initialSessions?.find(
    (session) =>
      getSessionStatus(session.date_start, session.date_end) === 'upcoming',
  );

  return (
    <section className="mx-auto flex max-w-full flex-col gap-5 px-5 pt-4 select-none sm:gap-8 lg:px-15 xl:px-35">
      <div>
        <h1 className="font-ria text-[18px] font-black text-(--color-title) sm:text-[30px] sm:text-(--color-title)">
          Next
        </h1>
        <NextSession
          data={nextMeeting}
          liveSession={liveSession}
          initialSessions={initialSessions}
          upcomingSession={upcomingSession}
          upcomingSessionKey={upcomingSession.session_key}
        />
      </div>
      <Suspense fallback={<RankingSkeleton />}>
        <RankingSection />
      </Suspense>

      <Suspense fallback={<TeamListSkeleton />}>
        <TeamList />
      </Suspense>
      <Suspense fallback={<TeamListSkeleton />}>
        <DriverList />
      </Suspense>
      <Suspense fallback={<CircuitGridSkeleton />}>
        <CircuitGrid />
      </Suspense>
      <FavoritesSync />
    </section>
  );
}
