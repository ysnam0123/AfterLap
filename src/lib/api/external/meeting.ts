import { axiosInstance } from '@/app/api/axiosInstance';
import { ApiMeeting } from '@/types/meeting';

export const fetchMeetingsFromAPI = async (
  year: number,
): Promise<ApiMeeting[]> => {
  const response = await axiosInstance.get('/meetings', {
    params: { year: year },
  });
  console.log(response.data);
  return response.data ?? [];
};
