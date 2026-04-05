import { WeatherSessionSummary } from '@/types/raceResult';

export const getWeatherIcon = (
  rainPattern: WeatherSessionSummary['rain_pattern'],
) => {
  switch (rainPattern) {
    case 'none':
      return '/icons/weathers/sunny.webp';

    case 'early':
    case 'late':
    case 'intermittent':
      return '/icons/weathers/intermittent.webp';

    case 'mid':
      return '/icons/weathers/cloudy.webp';

    case 'continuous':
      return '/icons/weathers/rainy.webp';

    default:
      return '/icons/weathers/sunny.webp';
  }
};
