'use client';
import { RaceResults } from '@/types/meeting';
import RaceResultTable from './table/RaceResultTable';
import StartingGridTable from './table/StartingGridTable';
import Summary from './statstics/summary/Summary';
import Position from './statstics/Position';
import PitStop from './statstics/PitStop';
import TireStrategy from './statstics/TireStrategy';
import { useState } from 'react';
import { useRaceResultData } from '@/hooks/result/raceResult';
import RaceTabs from '../../mobile/meeting/RaceTabs';

export default function RaceResultSection({
  year,
  sessionKey,
  sessionResults,
  // isPending,
  isRaceFinished,
  startingGrid,
}: RaceResults) {
  const tabs = [
    { label: '레이스 결과', icon: '/icons/checker.webp' },
    { label: '스타팅 그리드', icon: '/icons/checker.webp' },
    { label: '전체 요약', icon: '/icons/overview.webp' },
    { label: '포지션 변동', icon: '/icons/graph.webp' },
    { label: '피트 스탑', icon: '/icons/pitstop.webp' },
    { label: '타이어 전략', icon: '/icons/retirement.webp' },
    // { label: '이벤트', icon: '/icons/retirement.webp' },
  ];
  const [selectedTab, setSelectedTab] = useState('레이스 결과');

  const podiumResults = sessionResults.slice(0, 3);
  const first = podiumResults.find((r) => r.position === 1);
  const totalLaps = first?.number_of_laps;

  const { data: raceResultData, isLoading: raceResultLoading } =
    useRaceResultData(sessionKey!, isRaceFinished);

  if (!raceResultData) return null;

  const {
    driverPitData,
    // teamPitData,
    positionData,
    weatherData,
    // raceControlData,
    stintsData,
  } = raceResultData;

  // const deployCount = raceControlData?.filter(
  //   (e) => e.category === 'SafetyCar' && e.message === 'SAFETY CAR DEPLOYED',
  // ).length;

  // groupby를 아직 안해서 못씀
  // const {
  //   data: teamPitData,
  //   isLoading: teamPitLoading,
  //   isError: teamPitError,
  // } = useTeamPitData(sessionKey);
  if (positionData) {
    console.log('드라이버 별 포지션:', positionData);
  }
  // 테스트
  if (stintsData) {
    console.log('sessionStints 불러옴:', stintsData);
  }
  // if (raceControlData) {
  //   console.log('raceControlData 불러옴:', raceControlData);
  // }
  if (driverPitData) {
    console.log('driverPitData 불러옴:', driverPitData);
  }
  // if (teamPitData) {
  //   console.log('teamPitData 불러옴:', teamPitData);
  // }
  if (weatherData) {
    console.log('weatherData 불러옴:', weatherData);
  }
  const renderMap: Record<string, React.ReactNode> = {
    '레이스 결과': <RaceResultTable year={year} results={sessionResults} />,
    '스타팅 그리드': <StartingGridTable results={startingGrid} />,
    '전체 요약': (
      <Summary
        year={year}
        pit={driverPitData ?? []}
        totalLaps={totalLaps ?? 0}
        weather={weatherData}
        // SafetyCarNumber={deployCount ?? 0}
        // raceControl={raceControlData ?? []}
        setSelectedTab={setSelectedTab}
        positionGain={positionData ?? []}
      />
    ),
    '포지션 변동': <Position year={year} positionGain={positionData ?? []} />,
    '피트 스탑': <PitStop year={year} pit={driverPitData ?? []} />,
    '타이어 전략': (
      <TireStrategy stints={stintsData ?? []} totalLaps={totalLaps ?? 0} />
    ),
  };

  return (
    <>
      {!raceResultLoading && (
        <>
          <div className="mt-3 sm:px-5 md:px-0">
            <RaceTabs
              selectedTab={selectedTab}
              setSelectedTabAction={setSelectedTab}
              tabs={tabs}
            />
          </div>
          <div className="">{renderMap[selectedTab]}</div>
          {/* <div className="">{renderMap[selectedTab]}</div> */}
        </>
      )}
    </>
  );
}
