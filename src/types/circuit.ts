export interface Circuit {
  circuit_key: number;
  circuit_short_name: string;
  circuit_long_name: string;
  country_code: string;
  country_name: string;
  circuit_img: string;
  circuit_detail_img: string;
  circuit_bg: string;
  laps: number;
  first_grand_prix: number;
  circuit_length: number;
  lap_record: {
    time: string | null;
    driver: string | null;
    year: number | null;
  };

  difficulty_summary: string;
  watch_points: string[];
}
export interface CircuitView {
  circuit_key: number;
  circuit_short_name: string;
  circuit_long_name: string;
  country_code: string;
  country_name: string;
  circuit_img: string;
  circuit_detail_img: string;
  circuit_bg: string;
  laps: number;
  first_grand_prix: number;
  circuit_length: number;
  lap_record: {
    time: string | null;
    driver: string | null;
    year: number | null;
  };
  country_kr_name: string;
  flag: string;
  difficulty_summary: string;
  watch_points: string[];
}
