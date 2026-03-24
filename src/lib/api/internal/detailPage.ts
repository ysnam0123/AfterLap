import axios from 'axios';

export const getTeamDetail = async (teamSlug: string) => {
  const res = await axios.get(`/api/team/${teamSlug}`);
  return res.data;
};

export const getDriverDetail = async (driverId: number) => {
  const res = await axios.get(`/api/driver/${driverId}`);
  return res.data;
};
