import { WeatherSessionSummary } from '@/types/raceResult';
import { getWeatherIcon } from '@/utils/getWeatherIcon';
import Image from 'next/image';

export default function WeatherSummary({
  weather,
}: {
  weather: WeatherSessionSummary;
}) {
  // rain_pattern 문자열에 따른 아이콘 결정
  const weatherIcon = getWeatherIcon(weather.rain_pattern);

  return (
    <div className="flex flex-col gap-3 rounded-[5px] border border-(--color-card-border) bg-(--color-card-bg) px-3 py-3.75 pl-5 shadow-(--shadow-soft) sm:rounded-4xl sm:py-5">
      <h1 className="flex items-center gap-1 text-(--color-sub-text)">
        <Image
          src="/icons/weather.svg"
          alt="icon"
          width={28}
          height={28}
          className="h-5 w-5 sm:h-7 sm:w-7" // 모바일/데스크탑 크기 분기
          priority
        />
        <p className="font-paper text-[14px] font-semibold sm:text-[20px]">
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
              <div className="text-white">
                {weather.track_temp_level}
                <span className="ml-1 text-white/80">
                  ({weather.avg_track_temp.toFixed(1)}°C)
                </span>
              </div>
            </div>
            <div className="flex flex-col text-[12px] sm:text-[18px]">
              <div className="text-(--color-sub-text)">바람</div>
              <div className="text-white">{weather.wind_level}</div>
            </div>
          </div>
        </div>

        {/* 메인 날씨 아이콘: Next.js Image의 fill 속성으로 반응형 처리 */}
        <div className="relative h-24.75 w-24.75 sm:h-40 sm:w-40">
          <Image
            src={weatherIcon}
            alt={weather.rain_pattern}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
