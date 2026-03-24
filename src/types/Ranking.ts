export interface DriverSeasonRankingView {
  rank: number;
  year: number;

  driver_number: number;
  driver_id: number;
  full_name: string;
  kr_name: string;
  name_acronym: string;
  headshot_url: string;
  is_main: boolean;
  flag: string;
  country_kr_name: string;

  team_name: string;
  team_kr_name: string;
  team_slug: string;
  team_colour: string;
  main_logo: string;
  white_logo: string;

  total_points: number;

  races: number;
  wins: number;
  podiums: number;
  best_finish: number;
  avg_finish: number;
}

export interface TeamSeasonRankingRow {
  rank: number;
  year: number;

  team_name: string;
  team_kr_name: string;
  team_slug: string;
  team_colour: string;
  main_logo: string;
  white_logo: string;
  car_img: string;
  small_logo: string;

  team_total_points: number;
  team_races: number;
  wins: number;
  podiums: number;
  avg_finish: number;

  driver_number: number;
  driver_id: number;
  full_name: string;
  kr_name: string;
  name_acronym: string;
  headshot_url: string;
  is_main: boolean;
}

export interface TeamSeasonRankingView {
  rank: number;
  year: number;

  team_name: string;
  team_kr_name: string;
  team_slug: string;
  team_colour: string;
  main_logo: string;
  white_logo: string;
  car_img: string;
  small_logo: string;

  team_total_points: number;
  team_races: number;
  wins: number;
  podiums: number;
  avg_finish: number;

  drivers: Driver[];
}

interface Driver {
  driver_number: number;
  driver_id: number;
  full_name: string;
  kr_name: string;
  name_acronym: string;
  headshot_url: string;
  is_main: boolean;
}

// const teams = groupBy(data, d => d.team_slug);

export interface RankingResponse {
  driverRanking: DriverSeasonRankingView[];
  teamRanking: TeamSeasonRankingRow[];
}
