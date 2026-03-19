'use client';
import { RaceResults } from '@/types/meeting';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import RaceResultTable from './table/RaceResultTable';
import StartingGridTable from './table/StartingGridTable';
import { useStintsData } from '@/app/api/f1/race/stints';
import { useRaceControlData } from '@/app/api/f1/race/raceControl';
import { usePitData } from '@/app/api/f1/race/pit';
import { useWeatherSummary } from '@/app/api/f1/race/weather';
import { usePositionData } from '@/app/api/f1/race/position';
import Summary from './statstics/summary/Summary';
import Position from './statstics/Position';
import PitStop from './statstics/PitStop';
import Events from './statstics/Events';
import RaceTabs from '../../mobile/meeting/RaceTabs';

export default function RaceResultSection({
  year,
  sessionKey,
  sessionResults,
  // isPending,
  startingGrid,
}: RaceResults) {
  const tabs = [
    { label: '레이스 결과', icon: '/icons/checker.svg' },
    { label: '스타팅 그리드', icon: '/icons/checker.svg' },
    { label: '전체 요약', icon: '/icons/overview.svg' },
    { label: '포지션', icon: '/icons/graph.svg' },
    { label: '피트 스탑', icon: '/icons/pitstop.svg' },
    { label: '이벤트', icon: '/icons/retirement.svg' },
    { label: '타이어 전략', icon: '/icons/retirement.svg' },
  ];
  const [selectedTab, setSelectedTab] = useState('레이스 결과');

  const podiumResults = sessionResults.slice(0, 3);
  const first = podiumResults.find((r) => r.position === 1);
  const totalLaps = first?.number_of_laps;

  const { data: sessionStints, isLoading: stintsLoading } =
    useStintsData(sessionKey);

  const { data: sessionRaceControl, isLoading: raceControlLoading } =
    useRaceControlData(sessionKey);

  const deployCount = sessionRaceControl?.filter(
    (e) => e.category === 'SafetyCar' && e.message === 'SAFETY CAR DEPLOYED',
  ).length;

  const {
    data: pitData,
    isLoading: pitLoading,
    isError: pitError,
  } = usePitData(sessionKey);

  // groupby를 아직 안해서 못씀
  // const {
  //   data: teamPitData,
  //   isLoading: teamPitLoading,
  //   isError: teamPitError,
  // } = useTeamPitData(sessionKey);
  const { data: weatherSummary, isLoading: weatherLoading } =
    useWeatherSummary(sessionKey);
  const { data: driverPositionGain, isLoading: dPositionLoading } =
    usePositionData(sessionKey, !!sessionKey);
  if (driverPositionGain) {
    console.log('드라이버 별 포지션:', driverPositionGain);
  }
  const summaryLoading =
    stintsLoading ||
    raceControlLoading ||
    pitLoading ||
    weatherLoading ||
    dPositionLoading;

  // 테스트
  if (sessionStints) {
    console.log('sessionStints 불러옴:', sessionStints);
  }
  if (sessionRaceControl) {
    console.log('sessionRaceControl 불러옴:', sessionRaceControl);
  }
  if (pitData) {
    console.log('pitData 불러옴:', pitData);
  }
  if (pitError) {
    console.log('pitData 에러:', pitError);
  }
  // if (teamPitData) {
  //   console.log('teamPitData 불러옴:', teamPitData);
  // }
  if (weatherSummary) {
    console.log('weatherSummary 불러옴:', weatherSummary);
  }
  const renderMap: Record<string, React.ReactNode> = {
    '레이스 결과': <RaceResultTable year={year} results={sessionResults} />,
    '스타팅 그리드': <StartingGridTable results={startingGrid} />,
    '전체 요약': (
      <Summary
        year={year}
        pit={pitData ?? []}
        totalLaps={totalLaps ?? 0}
        weather={weatherSummary}
        SafetyCarNumber={deployCount ?? 0}
        raceControl={sessionRaceControl ?? []}
        setSelectedTab={setSelectedTab}
        positionGain={driverPositionGain ?? []}
      />
    ),
    포지션: <Position year={year} positionGain={driverPositionGain ?? []} />,
    '피트 스탑': <PitStop year={year} pit={pitData ?? []} />,
    이벤트: <Events />,
    '타이어 전략': <Events />,
  };

  return (
    <>
      <div className="mt-3 sm:px-5 md:px-0">
        <RaceTabs
          selectedTab={selectedTab}
          setSelectedTabAction={setSelectedTab}
          tabs={tabs}
        />
        <div className="mobile">{renderMap[selectedTab]}</div>
      </div>
      <div className="desktop">{renderMap[selectedTab]}</div>
    </>
  );
}
