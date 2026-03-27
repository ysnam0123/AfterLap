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

export interface MeetingDetailResponse {
  meetingDetail: Meeting;
  sessions: Session[];
}
export interface Session {
  meeting_key: number;
  session_key: number;
  location: string;
  date_start: string;
  date_end: string;
  sesstion_type: string;
  session_name: string;
  country_key: number;
  country_code: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  gmt_offset: string;

  year: number;

  created_at: string;
  id: string;
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
  driver_id: number;
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
  isRaceFinished: boolean;
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
  driver_id: number;
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

export interface RaceStatsticsTab {
  label: string;
  icon: string;
}

export interface LiveSession {
  country_name: string;
  date_end: string;
  date_start: string;
  meeting_key: number;
  meeting_name: string;
  round: number;
  session_key: number;
  session_name: string;
  year: number;
}

interface NextMeetingCircuit {
  circuit_img: string;
  circuit_long_name: string;
}
interface NextMeetingCountry {
  flag: string;
  country_kr_name: string;
}
export interface NextMeeting {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_end: string;
  date_start: string;
  gmt_offset: string;
  id: string;
  location: string;
  meeting_code: string;
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  round: number;
  year: number;
  circuits: NextMeetingCircuit;
  countries: NextMeetingCountry;
}

export interface RacePodiumItem {
  position: 1 | 2 | 3;
  driver_code: string;
  driver_season_profile_id: number;
  team_colour: string;
  team_white_logo: string;
}

export interface MeetingWithStatusAndPodium {
  meeting_key: number;
  circuit_key: number;
  circuit_short_name: string;
  meeting_problem: string;

  meeting_code: string;
  location: string;

  country_key: number;
  country_code: string;
  country_name: string;
  country_kr_name: string | null;

  meeting_name: string;
  meeting_official_name: string;
  gmt_offset: string;
  date_start: string;
  date_end: string;
  year: number;
  round: number;
  status: 'scheduled' | 'ongoing' | 'finished';
  race_podium: RacePodiumItem[] | null;
  circuit_img: string;
}

export interface GrandPrixCardProps {
  meetingInfo: MeetingWithStatusAndPodium;
}
