import { getDriverRanking } from '@/lib/server/driverRanking';
import ConstructorHeader from '../sectionHeader/ConstructorHeader';
import DriverStandingsHeader from '../sectionHeader/DriverStandingsHeader';
import ConstructorStandings from './ConstructorStandings';
import DriverStandings from './DriverStandings';
import { getTeamSeasonRanking } from '@/lib/server/teamRanking';
import { groupTeamSeasonRanking } from '@/utils/groupTeamSeasonRanking';

export default async function RankingSection() {
  const [driverRanking, teamRanking] = await Promise.all([
    getDriverRanking(2026),
    getTeamSeasonRanking(2026),
  ]);

  const TData = groupTeamSeasonRanking(teamRanking).slice(0, 5);
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
