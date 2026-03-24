import axios from 'axios';

export const fetchDrivers = async (sessionKey: number) => {
  const res = await axios.get('/api/drivers', {
    params: { session_key: sessionKey },
  });
  return res.data;
};
