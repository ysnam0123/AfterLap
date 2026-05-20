'use client';

import { useYearStore } from '@/store/YearStore';
import { useState } from 'react';
import SeasonChangeButton from '../components/common/SeasonChangeButton';
import PodiumCard from '../components/season/meetings/PodiumCard';
import DriverRankingTable from '../components/ranking/DriverRankingTable';
import F1Loading from '../components/common/F1Loading';
import TeamRankingTable from '../components/ranking/TeamRankingTable';
import BeforeSeason from '../components/common/BeforeSeason';
import { groupTeamSeasonRanking } from '@/utils/groupTeamSeasonRanking';
import { useRankingData } from '@/hooks/page/ranking';

export default function Page() {
  const [opened, setOpened] = useState(false);
  const selectedYear = useYearStore((s) => s.selectedYear);
  const setSelectedYear = useYearStore((s) => s.setSelectedYear);
  const years = [2023, 2024, 2025, 2026];

  const { data: rankingData, isLoading: pageLoading } = useRankingData();
  const { driverRanking, teamRanking } = rankingData ?? {};

  const teamRankings = groupTeamSeasonRanking(teamRanking ?? []);
  const tabs = ['드라이버 랭킹', '팀 랭킹'];
  const [isSelected, setIsSelected] = useState('드라이버 랭킹');

  const first = driverRanking?.find((r) => r.rank === 1);
  const second = driverRanking?.find((r) => r.rank === 2);
  const third = driverRanking?.find((r) => r.rank === 3);

  const showdriverRanking = isSelected === '드라이버 랭킹';
  const showTeamRanking = isSelected === '팀 랭킹';

  return (
    <>
      {/* px-5 sm:px-10 lg:px-15 */}
      <section className="page-container px-5 sm:px-10">
        <SeasonChangeButton
          opened={opened}
          setOpenedAction={setOpened}
          years={years}
          selectedYear={selectedYear}
          setSelectedYearAction={setSelectedYear}
        />
        <div className="mt-3 flex items-center gap-0 sm:gap-5">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setIsSelected(tab)}
              className={`${isSelected === tab ? 'bg-(--color-button-selected)' : 'bg-(--color-button-bg)'} rounded-none ${idx === 0 ? 'rounded-l-xl' : ''} ${idx === tabs.length - 1 ? 'rounded-r-xl' : ''} w-full cursor-pointer rounded-none border border-(--color-button-border) bg-(--color-button-bg) px-4 py-2 hover:bg-(--color-box-hover) active:bg-(--color-box-active) sm:rounded-[10px] sm:px-5`}
            >
              {tab}
            </button>
          ))}
        </div>

        {pageLoading && (
          <div className="flex h-100 items-center justify-center sm:h-100">
            <F1Loading loadingText="로딩 중..." />
          </div>
        )}
        {driverRanking && driverRanking.length === 0 && showdriverRanking && (
          <div className="flex h-100 items-center justify-center sm:h-100">
            <BeforeSeason />
          </div>
        )}
        {teamRanking && teamRanking.length === 0 && showTeamRanking && (
          <div className="flex h-100 items-center justify-center sm:h-100">
            <BeforeSeason />
          </div>
        )}
        {driverRanking && driverRanking.length > 0 && showdriverRanking && (
          <section>
            <div className="my-0 flex items-end justify-center gap-7.5 sm:my-5 sm:px-5 md:px-0">
              {second && (
                <PodiumCard year={second.year} result={second} rank={2} />
              )}
              {first && (
                <PodiumCard year={first.year} result={first} rank={1} />
              )}
              {third && (
                <PodiumCard year={third.year} result={third} rank={3} />
              )}
            </div>
            <DriverRankingTable year={selectedYear} results={driverRanking} />
          </section>
        )}
        {showTeamRanking && teamRanking && (
          <>
            <TeamRankingTable year={selectedYear} data={teamRankings} />
          </>
        )}
      </section>
    </>
  );
}
