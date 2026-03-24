import axios from 'axios';

export const fetchStartingGrid = async (quealifyingSessionKey: number) => {
  const res = await axios.get('/api/starting-grid', {
    params: { session_key: quealifyingSessionKey },
  });
  return res.data;
};
