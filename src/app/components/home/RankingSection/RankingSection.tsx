import ConstructorHeader from '../sectionHeader/ConstructorHeader';
import DriverStandingsHeader from '../sectionHeader/DriverStandingsHeader';
import ConstructorStandings from './ConstructorStandings';
import DriverStandings from './DriverStandings';

import {
  DriverSeasonRankingView,
  TeamSeasonRankingRow,
  TeamSeasonRankingView,
} from '@/types/Ranking';

interface pageProps {
  driverRanking: DriverSeasonRankingView[];
  teamRanking: TeamSeasonRankingRow[];
  TData: TeamSeasonRankingView[];
}
export default function RankingSection({
  driverRanking,
  teamRanking,
  TData,
}: pageProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <ConstructorHeader />
          {teamRanking && <ConstructorStandings data={TData} />}
        </div>
        <div>
          <DriverStandingsHeader />
          {driverRanking && (
            <DriverStandings data={driverRanking.slice(0, 5)} />
          )}
        </div>
      </div>
    </>
  );
}
