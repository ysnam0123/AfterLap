'use client';
import { useState } from 'react';
import SeasonDriverCard from '../components/driver/SeasonDriverCard';
import { teams2026 } from '@/images/team';

export default function Page() {
  const [selectedYear, setSelectedYear] = useState(2026);

  return (
    <>
      <div className="mx-auto w-full px-5 sm:px-10 md:px-15">
        <h1 className="font-paper mb-5 text-[20px] font-semibold sm:mb-0 sm:pb-10">
          2026 시즌 드라이버
        </h1>
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teams2026.map((team) =>
            team.drivers.map((driver) => (
              <SeasonDriverCard
                teamData={team}
                key={driver.driver_id}
                year={selectedYear}
                driver={driver}
              />
            )),
          )}
        </section>
      </div>
    </>
  );
}
