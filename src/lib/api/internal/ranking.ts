import axios from 'axios';

export const fetchRankingData = async () => {
  const res = await axios.get('/api/ranking');
  return res.data;
};
