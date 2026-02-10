'use client';
import PodiumCard from './PodiumCard';
import { RaceResults } from '@/types/meeting';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import DnsDnfDsqInfo from './DnsDnfDsqInfo';
import RaceResultTable from './table/RaceResultTable';
import StartingGridTable from './table/StartingGridTable';
import ResultStatstics from './statstics/ResultStatstics';
import { useStintsData } from '@/app/api/f1/race/stints';
import { useRaceControlData } from '@/app/api/f1/race/raceControl';
import { usePitData } from '@/app/api/f1/race/pit';
import { useWeatherSummary } from '@/app/api/f1/race/weather';
import F1Loading from '../../common/F1Loading';
import { usePositionData } from '@/app/api/f1/race/position';
import RaceTabs from '../../mobile/meeting/raceTabs';
import Summary from './statstics/summary/Summary';
import Position from './statstics/Position';
import PitStop from './statstics/PitStop';
import Events from './statstics/Events';

export default function RaceResultSection({
  year,
  sessionKey,
  sessionResults,
  // isPending,
  startingGrid,
}: RaceResults) {
  const tabs = [
    { label: '전체 요약', icon: '/icons/overview.svg' },
    { label: '포지션', icon: '/icons/graph.svg' },
    { label: '피트 스탑', icon: '/icons/pitstop.svg' },
    { label: '이벤트', icon: '/icons/retirement.svg' },
  ];
  const mobileTabs = [
    { label: '레이스 결과', icon: '/icons/checker.svg' },
    { label: '스타팅 그리드', icon: '/icons/checker.svg' },
  ];
  const [selectedTab, setSelectedTab] = useState('전체 요약');
  const [mobileSelectedTab, mobileSetSelectedTab] = useState('레이스 결과');
  const statisticsRef = useRef<HTMLDivElement | null>(null);
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const podiumResults = sessionResults.slice(0, 3);
  const first = podiumResults.find((r) => r.position === 1);
  const second = podiumResults.find((r) => r.position === 2);
  const third = podiumResults.find((r) => r.position === 3);
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
  // if (teamPitData) {
  //   console.log('teamPitData 불러옴:', teamPitData);
  // }
  if (weatherSummary) {
    console.log('weatherSummary 불러옴:', weatherSummary);
  }
  const mobileRenderMap: Record<string, React.ReactNode> = {
    '레이스 결과': <RaceResultTable year={year} results={sessionResults} />,
    '스타팅 그리드': <StartingGridTable results={startingGrid} />,
    '전체 요약': (
      <Summary
        year={year}
        pit={pitData!}
        totalLaps={totalLaps!}
        weather={weatherSummary!}
        SafetyCarNumber={deployCount!}
        raceControl={sessionRaceControl!}
        setSelectedTab={mobileSetSelectedTab}
        positionGain={driverPositionGain!}
      />
    ),
    포지션: <Position year={year} positionGain={driverPositionGain!} />,
    '피트 스탑': <PitStop year={year} pit={pitData!} />,
    이벤트: <Events />,
  };

  return (
    <>
      <div className="my-0 flex items-end justify-center gap-7.5 sm:my-5 sm:px-5 md:px-0">
        {second && <PodiumCard year={year} result={second} rank={2} />}
        {first && <PodiumCard year={year} result={first} rank={1} />}
        {third && <PodiumCard year={year} result={third} rank={3} />}
      </div>
      <div className="mobile mt-3 sm:px-5 md:px-0">
        <RaceTabs
          selectedTab={mobileSelectedTab}
          setSelectedTabAction={mobileSetSelectedTab}
          tabs={tabs}
          mobileTabs={mobileTabs}
        />
        <div>{mobileRenderMap[mobileSelectedTab]}</div>
      </div>
      <div className="desktop">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsShow(!isShow)}
            className={`${isShow ? 'bg-[#EBEBEB] text-[#262626]' : 'bg-[#212121]'} mb-5 flex h-10 cursor-pointer items-center justify-center rounded-[10px] px-3.25 font-semibold hover:bg-[#4B4B4B] active:bg-[#2b2b2b]`}
          >
            스타팅 그리드
          </button>
          <button
            onClick={() => {
              statisticsRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
            className={`mb-5 flex h-10 cursor-pointer items-center justify-center rounded-[10px] bg-[#212121] px-3.25 font-semibold hover:bg-[#4B4B4B] active:bg-[#2b2b2b]`}
          >
            경기 분석 보기
          </button>
        </div>
        <div className="mb-5 min-h-50 w-full rounded-[10px] sm:mb-12.5">
          {!isShow ? (
            <>
              <RaceResultTable year={year} results={sessionResults} />
              <DnsDnfDsqInfo />
            </>
          ) : (
            <StartingGridTable results={startingGrid} />
          )}
        </div>
        {summaryLoading ? (
          <div className="flex h-100 items-center justify-center">
            <F1Loading loadingText="정보 불러오는 중..." />
          </div>
        ) : (
          <div ref={statisticsRef}>
            <ResultStatstics
              year={year}
              tabs={tabs}
              totalLaps={totalLaps!}
              weather={weatherSummary!}
              pit={pitData!}
              stints={sessionStints!}
              raceControl={sessionRaceControl!}
              positionGain={driverPositionGain!}
              selectedTab={selectedTab}
              setSelectedTabAction={setSelectedTab}
            />
          </div>
        )}
      </div>
    </>
  );
}
