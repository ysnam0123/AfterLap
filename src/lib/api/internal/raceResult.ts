import axios from 'axios';

export const fetchRaceResultData = async (sessionKey: number) => {
  const res = await axios.get(`/api/race-result/${sessionKey}`);
  return res.data;
};
