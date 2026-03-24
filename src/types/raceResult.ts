export interface Pit {
  date: string;
  session_key: number;
  pit_duration: number;
  lane_duration: number;
  stop_duration: number;
  lap_number: number;
  meeting_key: number;
  driver_number: number;
}

export interface PitView {
  date: string;
  session_key: number;
  pit_duration: number;
  lane_duration: number;
  stop_duration: number;
  lap_number: number;
  meeting_key: number;

  driver_id: number;
  driver_number: number;
  country_code: string;
  country_kr_name: string;
  full_name: string;
  kr_name: string;
  flag: string;
  headshot_url: string;

  team_colour: string;
  team_kr_name: string;
  team_name: string;
  team_slug: string;
  main_logo: string;
  white_logo: string;
}

export interface TeamPitStopRow {
  // race context
  date: string; // YYYY-MM-DD
  meeting_key: number;
  session_key: number;
  year: number;

  // team
  team_slug: string | null;
  team_name: string | null;
  team_kr_name: string | null;
  team_colour: string | null;
  main_logo: string | null;
  white_logo: string | null;

  // driver
  driver_id: number;
  driver_number: number;
  full_name: string;
  kr_name: string | null;

  // pit stop
  lap_number: number;
  stop_duration: number | null; // ⭐ 핵심 기준
  lane_duration: number | null;
  pit_duration: number | null;
}

export interface Position {
  date: string;
  meeting_key: number;
  session_key: number;
  driver_number: number;
  position: number;
}

export interface DriverPositionGain {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  start_position: number;
  end_position: number;
  position_gain: number;

  driver_id: number;
  driver_name: string;
  name_acronym: string;
  kr_name: string;
  headshot_url: string;

  team_kr_name: string;
  team_name: string;
  team_slug: string;
  team_colour: string;
  white_logo: string;
}

export interface TeamPositionGain {
  meeting_key: number;
  session_key: number;
  position_gain: number;
  total_position_gain: number;

  team_kr_name: number;
  team_name: string;
  team_slug: string;
  team_colour: string;
  white_logo: string;
}

export interface RaceControl {
  meeting_key: number;
  session_key: number;
  date: string;
  driver_number?: number;
  lap_number: number;
  category?: string;
  flag?:
    | 'YELLOW'
    | 'DOUBLE_YELLOW'
    | 'GREEN'
    | 'RED'
    | 'CLEAR'
    | 'BLUE'
    | 'CHEQUERED'
    | 'BLACK AND WHITE'
    | 'CLEAR'
    | null;
  scope?: string;
  sector?: string;
  message: string;
}

export interface StartingGrid {
  position: number;
  meeting_key: number;
  session_key: number;
  lap_duration: number;
  driver_number: number;
}

export interface Stints {
  meeting_key: number;
  session_key: number;
  stint_number: number;
  driver_number: number;
  lap_start: number;
  lap_end: number;
  compound: string;
  tyre_age_at_start: number;
}

export interface WeatherSessionSummary {
  meeting_key: number;
  session_key: number;

  had_rain: boolean;
  rain_pattern:
    | 'none'
    | 'early'
    | 'mid'
    | 'late'
    | 'intermittent'
    | 'continuous';

  avg_track_temp: number;
  track_temp_level: 'low' | 'moderate' | 'high';

  avg_wind_speed: number;
  wind_level: 'calm' | 'moderate' | 'strong';

  weather_summary: string;
}
export interface Weather {
  meeting_key: number;
  session_key: number;
  date: string;
  track_temperature: number;
  rainfall: number;
  wind_speed: number;
  pressure: number;
  humidity: number;
  air_temperature: number;
  wind_direction: number;
}
