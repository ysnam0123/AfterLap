'use client';

import { TeamDriverCard } from '../TeamDriverCard';
import { findHeadshot } from '@/utils/findHeadShot';
import { useState } from 'react';
import { Team2026 } from '@/images/team';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TeamSeason } from '@/types/detailPage';

export default function TeamDriver({
  selectedYear,
  seasonData,
  team,
}: {
  selectedYear: number;
  seasonData: TeamSeason;
  team: Team2026;
}) {
  const [rdOpened, setRdOpened] = useState(false);
  const seasonMainDrivers =
    seasonData?.drivers.filter((driver) => driver.is_main) ?? [];
  const seasonReserveDrivers =
    seasonData?.drivers.filter((driver) => driver.is_main === false) ?? [];
  return (
    <>
      <div className="border-t border-neutral-800 py-5 sm:py-12">
        <h2 className="mb-4 text-[18px] font-semibold tracking-tight sm:mb-8 sm:text-2xl">
          시즌 드라이버
        </h2>
        <div className="mb-10 grid grid-cols-2 gap-6">
          {seasonMainDrivers.map((driver) => (
            <TeamDriverCard
              key={driver.driver_id}
              driverId={driver.driver_id}
              name={driver.kr_name}
              number={driver.driver_number}
              imageUrl={findHeadshot(driver.full_name, selectedYear)}
              teamColor={team.team_colour}
            />
          ))}
        </div>
        {seasonReserveDrivers.length > 0 && (
          <section>
            <button
              onClick={() => setRdOpened(!rdOpened)}
              className="mb-4 flex cursor-pointer items-center gap-1 border border-(--color-button-border) bg-(--color-button-bg) px-4 py-1 text-[14px] hover:bg-(--color-button-hover) active:bg-(--color-button-active)"
            >
              <p>리저브 드라이버 보기</p>{' '}
              {rdOpened ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
              {rdOpened &&
                seasonReserveDrivers.map((driver) => (
                  <TeamDriverCard
                    driverId={driver.driver_id}
                    key={driver.driver_id}
                    name={driver.kr_name}
                    number={driver.driver_number}
                    imageUrl={findHeadshot(driver.full_name, selectedYear)}
                    teamColor={team.team_colour}
                  />
                ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
