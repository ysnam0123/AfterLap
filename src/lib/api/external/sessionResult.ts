import { axiosInstance } from '@/app/api/axiosInstance';
import { Session } from '@/types/meeting';

export type Sessions = Session[];

export const fetchResultDataFromAPI = async (
  sessionKey: number,
): Promise<Sessions> => {
  const response = await axiosInstance.get('/session_result', {
    params: { session_key: sessionKey },
  });
  console.log('api에서 세션결과 불러옴:', response.data);
  return response.data;
};
