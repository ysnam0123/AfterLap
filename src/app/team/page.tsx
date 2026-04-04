'use client';
import { teams2026 } from '@/images/team';
import Team from '../components/team/Team';

export default function Page() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col px-5 select-none md:px-10 lg:px-20">
        <h1 className="font-paper mb-5 text-[20px] font-semibold sm:mb-10 sm:text-[30px]">
          2026 Season
        </h1>
        <div className="">
          <div className="grid grid-cols-1 gap-5 sm:gap-10 md:grid-cols-2">
            {teams2026.map((team) => (
              <Team key={team.team_slug} team={team} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
