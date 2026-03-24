import { TeamSeason } from '@/types/detailPage';
import { StatCard } from './StatCard';

export default function TeamStats({ data }: { data: TeamSeason }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 py-0 sm:pb-12 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="컨스트럭터 랭킹"
          value={data.rank}
          teamColor={data?.team_colour}
        />
        <StatCard
          label="Total Points"
          value={data.total_points}
          teamColor={data?.team_colour}
        />
        <StatCard
          label="우승 / 포디움"
          value={`${data.wins} / ${data.podiums}`}
          teamColor={data?.team_colour}
        />
        {/* <StatCard
                    label="Drivers"
                    value={team.drivers.join(' • ')}
                    teamColor={data?.team_colour}
                  /> */}
      </div>
    </>
  );
}
