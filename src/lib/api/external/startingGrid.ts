import { axiosInstance } from '@/app/api/axiosInstance';
import { StartingGrid } from '@/types/raceResult';

export const fetchStartingGridDataFromAPI = async (
  sessionKey: number,
): Promise<StartingGrid[]> => {
  const response = await axiosInstance.get('/starting_grid', {
    params: { session_key: sessionKey },
  });
  console.log('API에서 스타팅 그리드 불러옴!');
  return response.data;
};
