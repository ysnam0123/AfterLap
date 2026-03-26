import { StartingGridWithDriver } from '@/types/meeting';
import axios from 'axios';

export const fetchStartingGrid = async (
  quealifyingSessionKey: number,
): Promise<StartingGridWithDriver[]> => {
  const res = await axios.get(`/api/starting-grid/${quealifyingSessionKey}`);
  return res.data;
};
