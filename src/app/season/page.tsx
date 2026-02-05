'use client';

import { useState } from 'react';
import { useYearStore } from '@/store/YearStore';
import SeasonChangeButton from '../components/common/SeasonChangeButton';
import { useMeetingsWithStatusAndPodium } from '@/hooks/SeasonRacePodium';
import F1Loading from '../components/common/F1Loading';
import GrandPrixCardWithPodium from '../components/season/GrandPrixCardWithPodium';
import GrandPrixCard from '../components/season/GrandPrixCard';
import { years } from '@/data/years';

export default function Page() {
  const [opened, setOpened] = useState(false);
  const selectedYear = useYearStore((s) => s.selectedYear);
  const setSelectedYear = useYearStore((s) => s.setSelectedYear);
  const { data: meetings, isPending } =
    useMeetingsWithStatusAndPodium(selectedYear);
  console.log(meetings);

  return (
    <>
      <main className="min-h-screen px-5 lg:px-10">
        {/* <SeasonHeroBox /> */}
        <section className="mx-auto w-full max-w-350">
          {isPending && (
            <>
              <div className="flex h-200 items-center justify-center">
                <F1Loading loadingText="시즌 불러오는중..." />
              </div>
            </>
          )}
          {!isPending && meetings && (
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
                  meeting.race_podium ? (
                    <GrandPrixCardWithPodium
                      key={meeting.meeting_key}
                      meetingInfo={meeting}
                    />
                  ) : (
                    <GrandPrixCard
                      key={meeting.meeting_key}
                      meetingInfo={meeting}
                    />
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
