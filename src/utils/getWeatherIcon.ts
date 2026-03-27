import { WeatherSessionSummary } from '@/types/raceResult';

export const getWeatherIcon = (
  rainPattern: WeatherSessionSummary['rain_pattern'],
) => {
  switch (rainPattern) {
    case 'none':
      return '/icons/weathers/sunny.svg'; // 해 아이콘 (맑음)

    case 'early':
    case 'late':
    case 'intermittent':
      return '/icons/weathers/intermittent.svg'; // 구름/해 반반 (일시적/부분적)

    case 'mid':
      return '/icons/weathers/cloudy.svg'; // 구름 아이콘 (흐림/비 예보)

    case 'continuous':
      return '/icons/weathers/rainy.svg'; // 비 아이콘 (지속적인 비)

    default:
      return '/icons/weathers/sunny.svg'; // 기본값
  }
};
