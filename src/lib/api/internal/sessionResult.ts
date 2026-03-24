import axios from 'axios';
import { SortedSessionResult } from '@/types/meeting';

export const fetchSessionResult = async (
  sessionKey: number,
): Promise<SortedSessionResult[]> => {
  const res = await axios.get(`/api/session-result/${sessionKey}`);
  return res.data;
};
