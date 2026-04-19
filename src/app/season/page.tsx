'use client';

import { useState } from 'react';
import { useYearStore } from '@/store/YearStore';
import SeasonChangeButton from '../components/common/SeasonChangeButton';
import F1Loading from '../components/common/F1Loading';
import GrandPrixCardWithPodium from '../components/season/GrandPrixCardWithPodium';
import GrandPrixCard from '../components/season/GrandPrixCard';
import { years } from '@/data/years';
import GrandPrixCardWithProblem from '../components/season/GrandPrixCardWithProblem';
import AnimatedContent from '@/components/AnimatedContent';
import { useSeasonData } from '@/hooks/page/season';

export default function Page() {
  const [opened, setOpened] = useState(false);
  const selectedYear = useYearStore((s) => s.selectedYear);
  const setSelectedYear = useYearStore((s) => s.setSelectedYear);
  const { data: meetings, isPending: pageLoading } =
    useSeasonData(selectedYear);
  // const sortedMeetings = [...(meetings ?? [])].sort((a, b) => {
  //   const isAUpcoming = a.meeting_problem === null && a.status === 'scheduled';
  //   const isBUpcoming = b.meeting_problem === null && b.status === 'scheduled';
  //   if (isAUpcoming && !isBUpcoming) return -1;
  //   if (!isAUpcoming && isBUpcoming) return 1;

  //   return a.round - b.round;
  // });
  return (
    <>
      <main className="min-h-screen px-5 lg:px-10">
        <section className="mx-auto w-full max-w-350">
          {pageLoading && (
            <>
              <div className="flex h-100 items-center justify-center font-bold md:h-200">
                <F1Loading loadingText="시즌 불러오는 중..." />
              </div>
            </>
          )}
          {!pageLoading && meetings && (
            <>
              <SeasonChangeButton
                opened={opened}
                setOpenedAction={setOpened}
                years={years}
                selectedYear={selectedYear}
                setSelectedYearAction={setSelectedYear}
              />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-7">
                {meetings.map((meeting) =>
                  meeting.meeting_problem === 'cancelled' ? (
                    <AnimatedContent
                      key={meeting.meeting_key}
                      distance={140}
                      direction="vertical"
                      reverse={false}
                      ease="power3.out"
                      initialOpacity={0}
                      animateOpacity
                      scale={0.5}
                      threshold={0.1}
                      delay={0}
                    >
                      <GrandPrixCardWithProblem meetingInfo={meeting} />
                    </AnimatedContent>
                  ) : meeting.race_podium ? (
                    <AnimatedContent
                      key={meeting.meeting_key}
                      distance={140}
                      direction="vertical"
                      reverse={false}
                      ease="power3.out"
                      initialOpacity={0}
                      animateOpacity
                      scale={0.5}
                      threshold={0.1}
                      delay={0}
                    >
                      <GrandPrixCardWithPodium meetingInfo={meeting} />
                    </AnimatedContent>
                  ) : (
                    <AnimatedContent
                      key={meeting.meeting_key}
                      distance={140}
                      direction="vertical"
                      reverse={false}
                      ease="power3.out"
                      initialOpacity={0}
                      animateOpacity
                      scale={0.5}
                      threshold={0.1}
                      delay={0}
                    >
                      <GrandPrixCard meetingInfo={meeting} />
                    </AnimatedContent>
                  ),
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
