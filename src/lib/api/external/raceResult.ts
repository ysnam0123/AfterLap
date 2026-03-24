import { axiosInstance } from '@/app/api/axiosInstance';
import {
  Pit,
  Position,
  RaceControl,
  Stints,
  Weather,
} from '@/types/raceResult';

export const fetchPitDataFromAPI = async (
  sessionKey: number,
): Promise<Pit[]> => {
  const response = await axiosInstance.get('/pit', {
    params: { session_key: sessionKey },
  });
  console.log('피트스탑 api 호출:', response.data);
  return response.data;
};

export const fetchPositionDataFromAPI = async (
  sessionKey: number,
): Promise<Position[]> => {
  const response = await axiosInstance.get('/position', {
    params: { session_key: sessionKey },
  });
  console.log('API:', response.data);
  return response.data;
};

export const fetchRaceControlDataFromAPI = async (
  sessionKey: number,
): Promise<RaceControl[]> => {
  const response = await axiosInstance.get('/race_control', {
    params: { session_key: sessionKey },
  });
  console.log('레이스 컨트롤 데이터 불러오기:', response.data);
  return response.data;
};

export const fetchStintsDataFromAPI = async (
  sessionKey: number,
): Promise<Stints[]> => {
  const response = await axiosInstance.get('/stints', {
    params: { session_key: sessionKey },
  });
  return response.data;
};

export const fetchWeatherDataFromAPI = async (
  sessionKey: number,
): Promise<Weather[]> => {
  const response = await axiosInstance.get('/weather', {
    params: { session_key: sessionKey },
  });
  return response.data;
};
