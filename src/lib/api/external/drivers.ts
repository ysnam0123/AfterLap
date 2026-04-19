import { axiosInstance } from '@/app/api/axiosInstance';
import { Driver } from '@/types/team';

export const fetchDriverDataFromAPI = async (
  sessionKey: number,
): Promise<Driver[]> => {
  const response = await axiosInstance.get('/drivers', {
    params: { session_key: sessionKey },
  });
  return response.data;
};
