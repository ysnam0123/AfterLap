import { WeatherSessionSummary } from '@/types/raceResult';
import Image from 'next/image';

export default function WeatherSummary({
  weather,
}: {
  weather: WeatherSessionSummary;
}) {
  return (
    <>
      <div className="flex flex-col gap-3 rounded-[5px] border border-(--color-card-border) bg-(--color-card-bg) px-3 py-3.75 pl-5 shadow-(--shadow-soft) sm:rounded-4xl sm:py-5">
        <h1 className="flex items-center gap-1 text-(--color-sub-text)">
          <Image
            src="/icons/weather.svg"
            alt="icon"
            width={28}
            height={28}
            className="desktop"
            priority
          />
          <Image
            src="/icons/weather.svg"
            alt="icon"
            width={20}
            height={20}
            className="mobile"
            priority
          />
          <p
            className="text-[14px] sm:text-[20px]"
            style={{ fontFamily: 'paperlogy', fontWeight: 500 }}
          >
            날씨
          </p>
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3 sm:gap-6">
            <div className="text-[14px] font-semibold text-white sm:text-xl">
              {weather.weather_summary}
            </div>
            <div className="flex items-center justify-between gap-10">
              <div className="flex flex-col text-[12px] sm:text-[18px]">
                <span className="text-(--color-sub-text)">트랙 온도</span>
                <div className="">
                  {weather.track_temp_level}
                  <span className="ml-1 text-white/80">
                    ({weather.avg_track_temp.toFixed(1)}°C)
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-(--color-sub-text)">바람</div>
                <div className="">{weather.wind_level}</div>
              </div>
            </div>
          </div>
          <Image
            src={'/icons/weathers/intermittent.svg'}
            alt="weather"
            width={99}
            height={99}
            className="mobile"
            priority
          />
          <Image
            src={'/icons/weathers/intermittent.svg'}
            alt="weather"
            width={160}
            height={160}
            className="desktop"
            priority
          />
        </div>
      </div>
    </>
  );
}
