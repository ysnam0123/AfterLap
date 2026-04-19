// F1 공식 컴파운드 색상
export const COMPOUND_COLOR: Record<string, string> = {
  SOFT: '#e8002d',
  MEDIUM: '#ffd906',
  HARD: '#f0f0ec',
  INTERMEDIATE: '#39b54a',
  WET: '#0067ff',
  UNKNOWN: '#666666',
};

export const COMPOUND_LABEL: Record<string, string> = {
  SOFT: 'S',
  MEDIUM: 'M',
  HARD: 'H',
  INTERMEDIATE: 'I',
  WET: 'W',
  UNKNOWN: '?',
};

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  compound: string;
  lapStart: number;
  lapEnd: number;
  tyreAge: number;
  driverName: string;
}
