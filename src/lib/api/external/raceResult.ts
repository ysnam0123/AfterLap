import { axiosInstance } from '@/app/api/axiosInstance';
import {
  Pit,
  Position,
  RaceControl,
  Stints,
  Weather,
} from '@/types/raceResult';
import axios from 'axios';

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
  try {
    const response = await axiosInstance.get<RaceControl[]>('/race_control', {
      params: { session_key: sessionKey },
    });

    console.log(`세션 ${sessionKey} 데이터 호출 성공!`);
    return response.data;
  } catch (error) {
    // ✅ axios.isAxiosError를 사용해 타입을 좁힙니다.
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn(`⚠️ 세션 ${sessionKey}: OpenF1 데이터 없음 (401)`);
        return [];
      }
      // Axios 에러지만 401은 아닌 경우
      console.error('❌ Axios 에러 발생:', error.message);
    } else {
      // ✅ Axios 에러가 아닌 일반 에러(런타임 에러 등) 처리
      console.error('❌ 예상치 못한 에러 발생:', error);
    }

    return [];
  }
};
// export const fetchRaceControlDataFromAPI = async (
//   sessionKey: number,
// ): Promise<RaceControl[]> => {
//   const response = await axiosInstance.get('/race_control', {
//     params: { session_key: sessionKey },
//   });
//   console.log('레이스 컨트롤 데이터 불러오기:', response.data);
//   return response.data;
// };

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
