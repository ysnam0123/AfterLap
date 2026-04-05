import { LiveSession, NextMeeting } from './meeting';
import { DriverSeasonRankingView, TeamSeasonRankingRow } from './Ranking';

export interface HomeData {
  liveSession: LiveSession | null;
  nextMeeting: NextMeeting | null;
  driverRanking: DriverSeasonRankingView[] | null;
  teamRanking: TeamSeasonRankingRow[] | null;
}
