'use client';
import Image from 'next/image';
import Summary from './summary/Summary';
import Position from './Position';
import PitStop from './PitStop';
import Events from './Events';
import { RaceStatsticsTab } from '@/types/meeting';
import {
  DriverPositionGain,
  PitView,
  RaceControl,
  Stints,
  WeatherSessionSummary,
} from '@/types/raceResult';

export default function ResultStatstics({
  totalLaps,
  weather,
  pit,
  stints,
  raceControl,
  positionGain,
  tabs,
  selectedTab,
  setSelectedTabAction,
  year,
}: {
  totalLaps: number;
  weather: WeatherSessionSummary;
  pit: PitView[];
  stints: Stints[];
  raceControl: RaceControl[];
  positionGain: DriverPositionGain[];
  tabs: RaceStatsticsTab[];
  selectedTab: string;
  setSelectedTabAction: (tab: string) => void;
  year: number;
}) {
  console.log('스틴트 데이터:', stints);
  const renderTabContent = () => {
    switch (selectedTab) {
      case '전체 요약':
        return (
          <Summary
            year={year}
            pit={pit}
            totalLaps={totalLaps}
            weather={weather}
            // SafetyCarNumber={deployCount}
            // raceControl={raceControl}
            setSelectedTab={setSelectedTabAction}
            positionGain={positionGain}
          />
        );
      case '포지션':
        return <Position year={year} positionGain={positionGain} />;
      case '피트 스탑':
        return <PitStop year={year} pit={pit} />;
      case '이벤트':
        return <Events />;
      default:
        return null;
    }
  };

  const deployCount = raceControl.filter(
    (e) => e.category === 'SafetyCar' && e.message === 'SAFETY CAR DEPLOYED',
  ).length;
  console.log(deployCount);

  return (
    <>
      <section className="select-none">
        <h1 className="font-pretendard mb-12.5 text-[16px] sm:text-[40px]">
          STATSTICS
        </h1>
        <div className="min-h-100 w-full rounded-4xl bg-[#1A1A1A]">
          <ul className="flex items-center">
            {tabs.map((tab) => (
              <li
                className={`${selectedTab === tab.label ? 'border-b-2 border-[#BFBFBF]' : ''} flex h-13 w-full cursor-pointer items-center justify-center gap-1 hover:bg-[#393939]`}
                key={tab.label}
                onClick={() => setSelectedTabAction(tab.label)}
              >
                <Image
                  src={tab.icon}
                  alt="icon"
                  height={30}
                  width={30}
                  className="hidden sm:block"
                />
                <p className="font-pretendard text-[18px] font-semibold">
                  {tab.label}
                </p>
              </li>
            ))}
          </ul>
          <div className="w-full p-4">{renderTabContent()}</div>
        </div>
      </section>
    </>
  );
}
