import { TeamTable } from './team';

export interface Driver {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  headshot_url: string;
  country_code: string;
}

// driver detail
interface Performance {
  race: string;
  round: number;
  points: number;
  position: string | null;
  flag: string;
}

export interface DriverSeasonData {
  year: number;
  rank: number;
  total_points: number;
  wins: number;
  podiums: number;
  poles: number;
  driver_number: number;
  headshot_url: string | null;

  team: TeamTable;
  season_performance: Performance[];
}

export interface DriverDetailData {
  driver_id: number;
  first_name: string;
  last_name: string;
  kr_name: string;
  flag: string;
  country_kr_name: string;
  seasons: DriverSeasonData[];
}
