import { supabase } from '@/supabase/client';

export async function findDriverInfo(meetingKey: number, driverNumber: number) {
  const { data, error } = await supabase
    .from('drivers')
    .select(
      `*,
      countries (
      country_kr_name,
      country_en_name,
      flag
      )`,
    )
    .eq('meeting_key', meetingKey)
    .eq('driver_number', driverNumber)
    .single();
  if (error) {
    console.error('드라이버 정보 찾기 실패', error);
  }
  return data;
}
