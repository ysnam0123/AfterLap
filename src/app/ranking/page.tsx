'use client';

import { useYearStore } from '@/store/YearStore';
import { useDriverRankingData } from '../api/f1/ranking/driverRanking';
import { useState } from 'react';
import SeasonChangeButton from '../components/common/SeasonChangeButton';
import PodiumCard from '../components/season/meetings/PodiumCard';
import DriverRankingTable from '../components/ranking/DriverRankingTable';
import {
  groupTeamSeasonRanking,
  useTeamSeasonRanking,
} from '../api/f1/ranking/TeamRanking';
import F1Loading from '../components/common/F1Loading';

export default function Page() {
  const [opened, setOpened] = useState(false);
  const selectedYear = useYearStore((s) => s.selectedYear);
  const setSelectedYear = useYearStore((s) => s.setSelectedYear);
  const years = [2023, 2024, 2025, 2026];
  const { data: DriverRanking, isPending: DriverRankingLoading } =
    useDriverRankingData(selectedYear);
  if (DriverRanking) {
    console.log('드라이버 랭킹:', DriverRanking);
  }
  const { data: TeamRanking = [], isPending: TeamRankingLoading } =
    useTeamSeasonRanking(selectedYear);
  const teamRankings = groupTeamSeasonRanking(TeamRanking);

  if (TeamRanking) {
    console.log('팀 랭킹:', teamRankings);
  }
  const tabs = ['드라이버 랭킹', '팀 랭킹'];
  const [isSelected, setIsSelected] = useState('드라이버 랭킹');
  const first = DriverRanking?.find((r) => r.rank === 1);
  const second = DriverRanking?.find((r) => r.rank === 2);
  const third = DriverRanking?.find((r) => r.rank === 3);
  const showDriverRanking = isSelected === '드라이버 랭킹';
  const showTeamRanking = isSelected === '팀 랭킹';

  return (
    <>
      <section className="w-full px-5 pt-5 sm:px-10 lg:px-15">
        <SeasonChangeButton
          opened={opened}
          setOpenedAction={setOpened}
          years={years}
          selectedYear={selectedYear}
          setSelectedYearAction={setSelectedYear}
        />
        {DriverRankingLoading ||
          (TeamRankingLoading && (
            <div className="flex h-100 items-center justify-center sm:h-100">
              <F1Loading loadingText="로딩 중..." />
            </div>
          ))}
        <div className="mt-3 flex items-center gap-0 sm:gap-5">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setIsSelected(tab)}
              className={`${isSelected === tab ? 'bg-[#252525]' : 'bg-[#111111]'} rounded-none ${idx === 0 ? 'rounded-l-xl' : ''} ${idx === tabs.length - 1 ? 'rounded-r-xl' : ''} w-full cursor-pointer rounded-none border border-(--color-button-border) bg-(--color-button-bg) px-4 py-2 hover:bg-(--color-box-hover) active:bg-(--color-box-active) sm:rounded-[10px] sm:px-5`}
            >
              {tab}
            </button>
          ))}
        </div>
        {DriverRanking && showDriverRanking && (
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
            <DriverRankingTable year={selectedYear} results={DriverRanking} />
          </section>
        )}
      </section>
    </>
  );
}
