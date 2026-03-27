import axios from 'axios';

export const fetchUserFavorite = async () => {
  const res = await axios.get('/api/user/favorites');
  return res.data;
};
