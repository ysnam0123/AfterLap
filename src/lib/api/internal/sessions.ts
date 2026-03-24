import axios from 'axios';

export const fetchSessions = async (meetingKey: number) => {
  const res = await axios.get('/api/sessions', {
    params: { meeting_key: meetingKey },
  });
  return res.data;
};
