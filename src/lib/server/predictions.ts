import { createServerSupabase } from './supabase';

export interface PredictionRow {
  id: string;
  user_id: string;
  meeting_key: number;
  p1_driver_number: number;
  p2_driver_number: number;
  p3_driver_number: number;
  total_points: number | null;
  scored_at: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface PredictionDriver {
  driver_number: number;
  full_name: string;
  kr_name: string | null;
  headshot_url: string | null;
  team_name: string | null;
  team_colour: string | null;
}

export interface RacePodium {
  p1: PredictionDriver;
  p2: PredictionDriver;
  p3: PredictionDriver;
}

export interface LeaderboardEntry {
  user_id: string;
  nickname: string;
  avatar_url: string | null;
  total_points: number;
  predictions_count: number;
}

export async function getMyPrediction(
  meetingKey: number,
): Promise<PredictionRow | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('predictions')
    .select('*')
    .eq('user_id', user.id)
    .eq('meeting_key', meetingKey)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getDriversForMeeting(
  meetingKey: number,
): Promise<PredictionDriver[]> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('drivers')
    .select(
      'driver_number, full_name, krName, headshot_url, team_name, team_colour, session_key',
    )
    .eq('meeting_key', meetingKey)
    .order('session_key', { ascending: false });

  if (error) throw error;
  if (!data) return [];

  const seen = new Set<number>();
  const unique: PredictionDriver[] = [];
  for (const row of data) {
    if (seen.has(row.driver_number)) continue;
    seen.add(row.driver_number);
    unique.push({
      driver_number: row.driver_number,
      full_name: row.full_name,
      kr_name: row.krName ?? null,
      headshot_url: row.headshot_url,
      team_name: row.team_name,
      team_colour: row.team_colour,
    });
  }
  return unique.sort((a, b) => a.driver_number - b.driver_number);
}

export async function getRacePodium(
  meetingKey: number,
): Promise<RacePodium | null> {
  const supabase = await createServerSupabase();

  const { data: raceSession } = await supabase
    .from('sessions')
    .select('session_key')
    .eq('meeting_key', meetingKey)
    .eq('session_type', 'Race')
    .order('date_start', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!raceSession) return null;

  const { data: results } = await supabase
    .from('session_results')
    .select('position, driver_number')
    .eq('session_key', raceSession.session_key)
    .in('position', [1, 2, 3]);

  if (!results || results.length < 3) return null;

  const byPosition: Record<number, number> = {};
  for (const r of results) {
    if (r.position) byPosition[r.position] = r.driver_number;
  }
  if (!byPosition[1] || !byPosition[2] || !byPosition[3]) return null;

  const drivers = await getDriversForMeeting(meetingKey);
  const find = (n: number) => drivers.find((d) => d.driver_number === n);

  const p1 = find(byPosition[1]);
  const p2 = find(byPosition[2]);
  const p3 = find(byPosition[3]);
  if (!p1 || !p2 || !p3) return null;

  return { p1, p2, p3 };
}

export async function isRaceFinished(meetingKey: number): Promise<boolean> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from('sessions')
    .select('date_end')
    .eq('meeting_key', meetingKey)
    .eq('session_type', 'Race')
    .order('date_start', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data?.date_end) return false;
  return new Date(data.date_end) < new Date();
}

/**
 * 레이스가 끝났으면 RPC를 호출해 모든 예측을 채점 (이미 채점된 건 건너뜀).
 * SECURITY DEFINER 함수라 RLS 우회하여 전체 사용자 예측을 일괄 처리.
 */
export async function scoreMeetingIfFinished(meetingKey: number): Promise<void> {
  const finished = await isRaceFinished(meetingKey);
  if (!finished) return;

  const supabase = await createServerSupabase();
  await supabase.rpc('score_predictions_for_meeting', {
    p_meeting_key: meetingKey,
  });
}

export async function getSeasonLeaderboard(
  year: number,
): Promise<LeaderboardEntry[]> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('predictions')
    .select(
      `
      user_id,
      total_points,
      meetings!inner(year),
      profiles(nickname, avatar_url)
    `,
    )
    .eq('meetings.year', year)
    .not('total_points', 'is', null);

  if (error) throw error;
  if (!data) return [];

  const grouped = new Map<string, LeaderboardEntry>();
  for (const row of data as unknown as Array<{
    user_id: string;
    total_points: number;
    profiles: { nickname: string | null; avatar_url: string | null } | null;
  }>) {
    const id = row.user_id;
    const existing = grouped.get(id);
    if (existing) {
      existing.total_points += row.total_points ?? 0;
      existing.predictions_count += 1;
    } else {
      grouped.set(id, {
        user_id: id,
        nickname: row.profiles?.nickname?.trim() || '익명 플레이어',
        avatar_url: row.profiles?.avatar_url ?? null,
        total_points: row.total_points ?? 0,
        predictions_count: 1,
      });
    }
  }

  return Array.from(grouped.values()).sort(
    (a, b) => b.total_points - a.total_points,
  );
}

export async function getMySeasonStats(year: number): Promise<{
  total_points: number;
  predictions_count: number;
} | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('predictions')
    .select('total_points, meetings!inner(year)')
    .eq('user_id', user.id)
    .eq('meetings.year', year)
    .not('total_points', 'is', null);

  if (!data) return { total_points: 0, predictions_count: 0 };

  let total = 0;
  for (const row of data) total += row.total_points ?? 0;
  return { total_points: total, predictions_count: data.length };
}
