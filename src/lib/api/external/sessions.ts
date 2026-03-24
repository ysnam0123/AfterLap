import { axiosInstance } from '@/app/api/axiosInstance';
import { Session } from '@/types/meeting';

export const fetchSessionFromAPI = async (
  meetingKey: number,
): Promise<Session[]> => {
  const response = await axiosInstance.get('/sessions', {
    params: { meeting_key: meetingKey },
  });
  return response.data;
};
