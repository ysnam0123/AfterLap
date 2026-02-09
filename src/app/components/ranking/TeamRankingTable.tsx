import { TeamSeasonRankingView } from '@/types/Ranking';
import TeamRankingCard from './TeamRankingCard';

interface PageProps {
  data: TeamSeasonRankingView[];
  year: number;
}

export default function TeamRankingTable({ data, year }: PageProps) {
  return (
    <>
      {data.length === 0 && <div></div>}
      {data && (
        <div className="grid gap-5 pt-10 md:grid-cols-2 lg:grid-cols-3">
          {data.map((team) => (
            <TeamRankingCard key={team.team_slug} year={year} data={team} />
          ))}
        </div>
      )}
    </>
  );
}
