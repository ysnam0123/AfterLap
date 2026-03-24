import Top3Position from './Top3Position';
import WeatherSummary from '../WeatherSummary';
import FastestPitStop from './FastestPS';
import SafetyCarSummary from './SafetyCarSum';
import {
  DriverPositionGain,
  PitView,
  RaceControl,
  WeatherSessionSummary,
} from '@/types/raceResult';

export default function Summary({
  weather,
  SafetyCarNumber,
  raceControl,
  totalLaps,
  setSelectedTab,
  positionGain,
  pit,
  year,
}: {
  pit: PitView[];
  weather?: WeatherSessionSummary | null;
  SafetyCarNumber: number;
  raceControl: RaceControl[];
  totalLaps: number;
  setSelectedTab: (tab: string) => void;
  positionGain: DriverPositionGain[];
  year: number;
}) {
  console.log('3번 year :', year);
  return (
    <>
      <div className="px-5 md:px-0">
        <div className="grid w-full gap-5 rounded-xl bg-none py-4 sm:gap-5 sm:rounded-4xl sm:border sm:border-(--color-box-border) sm:bg-(--color-card-bg) sm:px-10 lg:grid-cols-2">
          {weather ? (
            <WeatherSummary weather={weather} />
          ) : (
            <div className="flex flex-col gap-3 rounded-[5px] border border-(--color-card-border) bg-(--color-card-bg) px-3 py-3.75 pl-5 shadow-(--shadow-soft) sm:rounded-4xl sm:py-5">
              <p
                className="text-[14px] text-(--color-title) sm:text-[20px]"
                style={{ fontFamily: 'paperlogy', fontWeight: 500 }}
              >
                날씨
              </p>
              <p className="text-[13px] text-(--color-sub-text) sm:text-[16px]">
                날씨 요약 데이터가 아직 없어요.
              </p>
            </div>
          )}
          <Top3Position
            setSelectedTab={setSelectedTab}
            positionGain={positionGain}
          />
          <FastestPitStop
            year={year}
            pit={pit}
            setSelectedTab={setSelectedTab}
          />
          <SafetyCarSummary
            SafetyCarNumber={SafetyCarNumber}
            raceControl={raceControl}
            totalLaps={totalLaps}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
    </>
  );
}
