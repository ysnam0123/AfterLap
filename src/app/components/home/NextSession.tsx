import { LiveSession, NextMeeting, Session } from '@/types/meeting';
import NextSessionServer from './NextSession/NextSessionServer';
import NextSessionClient from './NextSession/NextSessionClient';

interface PageProps {
  data: NextMeeting | null;
  liveSession: LiveSession | null;
  initialSessions?: Session[];
  upcomingSession: Session;
  upcomingSessionKey: number;
}
export default function NextSession({
  data,
  liveSession,
  initialSessions,
  upcomingSession,
  upcomingSessionKey,
}: PageProps) {
  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <NextSessionServer
          data={data}
          liveSession={liveSession}
          upcomingSession={upcomingSession}
        />
        <NextSessionClient
          initialSessions={initialSessions}
          upcomingSessionKey={upcomingSessionKey}
        />
      </div>
    </>
  );
}
// 'use client';

// import LiveSessionBox from './LiveSessionBox';
// import SessionBox from './SessionBox';
// import { LiveSession, NextMeeting, Session } from '@/types/meeting';
// import { useState } from 'react';
// import NextSessionTitle from './NextSessionTitle';
// import CSSAnimatedContent from '@/components/CSSAnimatedContent';

// interface PageProps {
//   data: NextMeeting | null;
//   liveSession: LiveSession | null;
//   initialSessions?: Session[];
//   upcomingSession: Session;
// }
// export default function NextSession({
//   data,
//   liveSession,
//   initialSessions,
//   upcomingSession,
// }: PageProps) {
//   const [seeAll, setSeeAll] = useState(false);

//   if (!data) {
//     return null;
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-2">
//         <section className="flex flex-col gap-2">
//           <NextSessionTitle data={data} />
//           {liveSession && <LiveSessionBox data={liveSession} />}
//           {!liveSession && upcomingSession && (
//             <div className="flex flex-col gap-2">
//               {!seeAll && (
//                 <>
//                   <SessionBox data={upcomingSession!} />
//                 </>
//               )}
//               {seeAll && (
//                 <>
//                   {initialSessions?.map((session) => (
//                     <CSSAnimatedContent
//                       key={session.session_key}
//                       distance={10}
//                       direction="vertical"
//                       reverse={false}
//                       initialOpacity={0}
//                       animateOpacity
//                       scale={0.5}
//                       threshold={0.1}
//                       delay={0}
//                     >
//                       <SessionBox data={session} />
//                     </CSSAnimatedContent>
//                   ))}
//                 </>
//               )}
//             </div>
//           )}
//         </section>
//         <div className="mobile">
//           <button
//             onClick={() => setSeeAll(!seeAll)}
//             className="flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
//           >
//             <p className="font-ria text-[12px] font-semibold">
//               {seeAll ? '접기' : '펼치기'}
//             </p>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
