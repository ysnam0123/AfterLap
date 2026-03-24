import axios from 'axios';

export const getCircuits = async () => {
  const res = await axios.get('/api/circuit');
  return res.data;
};

export const getCircuit = async (circuitKey: number) => {
  const res = await axios.get('/api/circuit', {
    params: { circuit_key: circuitKey },
  });
  return res.data;
};
