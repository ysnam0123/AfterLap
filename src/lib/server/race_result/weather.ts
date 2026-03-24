import { fetchWeatherDataFromAPI } from '@/lib/api/external/raceResult';
import { createServerSupabase } from '../supabase';
import { WeatherSessionSummary } from '@/types/raceResult';

export const getWeatherDataFromDB = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('weather')
    .select('*')
    .eq('session_key', sessionKey)
    .order('date', { ascending: true });

  if (error) throw error;
  return data ?? null;
};

export const saveWeatherData = async (sessionKey: number) => {
  const supabase = await createServerSupabase();

  const weatherData = await fetchWeatherDataFromAPI(sessionKey);
  if (!weatherData || weatherData.length === 0) return;

  const { data, error } = await supabase
    .from('weather')
    .upsert(weatherData, {
      onConflict: 'meeting_key,session_key,date',
    })
    .select();

  console.log('data:', data);
  console.log('error:', error);
};

export const ensureWeatherData = async (sessionKey: number) => {
  const existing = await getWeatherDataFromDB(sessionKey);

  if (existing.length > 0) {
    return existing;
  }

  await saveWeatherData(sessionKey);
  return await getWeatherDataFromDB(sessionKey);
};

export const getWeatherSummary = async (
  sessionKey: number,
): Promise<WeatherSessionSummary> => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('weather_session_summary')
    .select('*')
    .eq('session_key', sessionKey)
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
};
