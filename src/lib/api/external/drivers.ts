import { axiosInstance } from '@/app/api/axiosInstance';
import { Driver } from '@/types/team';

export const fetchDriverDataFromAPI = async (
  sessionKey: number,
): Promise<Driver[]> => {
  const response = await axiosInstance.get('/drivers', {
    params: { session_key: sessionKey },
  });
  console.log('API에서 드라이버 불러옴!', response.data);
  return response.data;
};
