import { DriverSeasonData } from '@/hooks/detailPage/DriverDetail';
import { StatCard } from '../team/StatCard';

export default function DriverStats({ data }: { data?: DriverSeasonData }) {
  return (
    <>
      <div className="mb-10 grid grid-cols-1 gap-4 border-b border-[#4C4C4C] py-5 pt-8 sm:py-8 md:grid-cols-2 lg:grid-cols-4">
        {data && (
          <>
            <StatCard
              label="드라이버 순위"
              value={data.rank}
              teamColor={data?.team.team_colour}
            />
            <StatCard
              label="Total Points"
              value={data.total_points}
              teamColor={data?.team.team_colour}
            />
            <StatCard
              label="포디움 횟수"
              value={data.podiums}
              teamColor={data?.team.team_colour}
            />
            <StatCard
              label="우승 횟수"
              value={data.wins}
              teamColor={data?.team.team_colour}
            />
          </>
        )}
      </div>
    </>
  );
}
