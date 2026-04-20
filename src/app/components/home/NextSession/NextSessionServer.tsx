import { LiveSession, NextMeeting, Session } from '@/types/meeting';
import NextSessionTitle from '../sectionHeader/NextSessionTitle';
import LiveSessionBox from './LiveSessionBox';
import SessionBox from './SessionBox';

interface PageProps {
  data: NextMeeting | null;
  liveSession: LiveSession | null;
  upcomingSession: Session;
}
export default function NextSessionServer({
  data,
  liveSession,
  upcomingSession,
}: PageProps) {
  if (!data) {
    return null;
  }

  return (
    <>
      <NextSessionTitle data={data} />
      {liveSession && <LiveSessionBox data={liveSession} />}
      {!liveSession && upcomingSession && (
        <>
          {
            <>
              <SessionBox data={upcomingSession!} />
            </>
          }
        </>
      )}
    </>
  );
}
