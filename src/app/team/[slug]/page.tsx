'use client';

import F1Loading from '@/app/components/common/F1Loading';
import SeasonChangeButton from '@/app/components/common/SeasonChangeButton';
import { SeasonPerformance } from '@/app/components/team/SeasonPerformance';
import TeamDriver from '@/app/components/team/TeamDetail/TeamDriver';
import TeamPerformanceTable from '@/app/components/team/TeamDetail/TeamPerformanceTable';
import TeamStats from '@/app/components/team/TeamStats';
import { useTeamDetailData } from '@/hooks/detailPage/TeamDetail';
import { teams2026 } from '@/images/team';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function Page() {
  const params = useParams<{ slug: string }>();
  const teamSlug = params.slug;
  const { data: teamDetailData, isLoading: teamDetailLoading } =
    useTeamDetailData(teamSlug);

  const seasonYears = useMemo<number[]>(
    () => teamDetailData?.seasons.map((s) => s.year) ?? [],
    [teamDetailData?.seasons],
  );
  const [opened, setOpened] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2026);
  useEffect(() => {
    console.log(seasonYears[seasonYears.length - 1]);
  }, [seasonYears]);
  const team = teams2026.find((t) => t.team_slug === params.slug);
  const seasonData = teamDetailData?.seasons.find(
    (data) => data.year === selectedYear,
  );

  const performanceWithCumulative = useMemo(() => {
    if (!seasonData?.performance) return [];
    let cumulative = 0;
    return seasonData.performance.map((item) => {
      cumulative += item.points;
      return {
        round: item.round,
        points: item.points,
        position: item.position,
        cumulativePoints: cumulative,
        race: item.race,
        flag: item.flag,
        race_kr_name: item.race_kr_name,
      };
    });
  }, [seasonData?.performance]);

  console.log(teamDetailData);
  return (
    <>
      {teamDetailLoading && (
        <div className="flex h-100 items-center justify-center">
          <F1Loading loadingText="팀 정보 불러오는 중..." />
        </div>
      )}
      {!teamDetailLoading && team && teamDetailData && seasonData && (
        <div className="mx-auto w-full px-5 sm:px-10 lg:px-30">
          <div className="relative flex items-center justify-between border-b border-neutral-800">
            <div
              style={{ borderColor: team.team_colour }}
              className="z-20 flex flex-col gap-0.5 border-l-4 pl-4 select-none sm:gap-2 sm:border-l-8"
            >
              <h1 className="text-[20px] tracking-tight sm:text-5xl">
                {seasonData.team_kr_name}
              </h1>
              <div className="flex items-center sm:text-[20px]">
                <p className="tracking-wide text-[#5f5f5f] uppercase">
                  {team.team_slug}
                </p>
                <p className="flex items-center tracking-wide text-[#5f5f5f] uppercase">
                  <span className="hidden sm:block">-</span>
                  <span className="hidden sm:block">
                    <span>{selectedYear}</span>시즌
                  </span>
                </p>
              </div>
            </div>

            <Image
              src={seasonData.main_logo}
              alt={'logo'}
              width={240}
              height={240}
              className="z-20 w-33 sm:w-55 sm:pb-3"
            />
          </div>
          <div className="my-3">
            <SeasonChangeButton
              opened={opened}
              setOpenedAction={setOpened}
              years={seasonYears}
              selectedYear={selectedYear}
              setSelectedYearAction={setSelectedYear}
              className=""
            />
          </div>
          <TeamStats data={seasonData} />
          <TeamDriver
            selectedYear={selectedYear}
            seasonData={seasonData}
            team={team}
          />
          <section className="desktop">
            <SeasonPerformance
              data={performanceWithCumulative}
              teamColor={team.team_colour}
            />
          </section>
          <TeamPerformanceTable data={performanceWithCumulative} />
        </div>
      )}
    </>
  );
}

// sm: 640
// md: 768
// lg: 1024
// xl: 1280
