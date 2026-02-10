import { StaticImageData } from 'next/image';

// API RAW
export interface ApiMeeting {
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  gmt_offset: string;
  date_start: string;
  date_end?: string;
  year: number;
}
// DB / Domain
export type MeetingStatus = 'scheduled' | 'ongoing' | 'finished';
export interface Meeting {
  meeting_key: number;
  circuit_key: number;
  circuit_short_name: string;
  meeting_code: string | null;
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  meeting_name: string;
  meeting_official_name: string;
  gmt_offset: string;
  date_start: string;
  date_end: string;
  year: number;
  round: number | null;

  status: MeetingStatus;
}

export interface Sessions {
  relatedSession: Session[];
}
export interface Session {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  created_at: string;
  date_start: string;
  date_end: string;
  gmt_offset: string;
  id: string;
  location: string;
  meeting_key: number;
  session_key: number;
  session_name: string;
  sesstion_type: string;
  year: number;
}

export interface SessionResult {
  position: number;
  driver_number: number;
  number_of_laps: number;
  dnf: boolean;
  dns: boolean;
  dsq: boolean;
  duration: number;
  gap_to_leader: number;
  meeting_key: number;
  session_key: number;
}

export interface SortedSessionResult {
  meeting_key: number;
  session_key: number;
  number_of_laps: number;
  points: number | null;
  position: number | null;
  result_id: string;
  dnf: boolean;
  dns: boolean;
  dsq: boolean;
  duration: string;
  gap_to_leader: string;
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
export interface SessionResults {
  sessionResults: SortedSessionResult[];
  isPending: boolean;
  year: number;
}
export interface RaceResults {
  year: number;
  sessionKey: number | null;
  sessionResults: SortedSessionResult[];
  startingGrid: StartingGridWithDriver[];
}

export interface StartingGrid {
  driver_number: number;
  lap_duration: number;
  meeting_key: number;
  position: number;
  session_key: number;
}

export interface StartingGridWithDriver {
  driver_number: number;
  full_name: string;
  headshot_url: string | null;
  id: number;
  kr_name: string;
  lap_duration: number;
  main_logo: string | null;
  meeting_key: number;
  position: number;
  session_key: number;
  team_colour: string;
  team_kr_name: string;
  team_name: string;
  team_slug: string;
  white_logo: string;
}

// 레이스 화면의 분석탭
export interface RaceStatsticsTab {
  label: string;
  icon: string;
}
