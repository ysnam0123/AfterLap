import { MeetingDetailResponse } from '@/types/meeting';
import axios from 'axios';

export const fetchMeetingDetail = async (
  meetingKey: number,
): Promise<MeetingDetailResponse> => {
  const res = await axios.get(`/api/season/${meetingKey}`);
  return res.data;
};
