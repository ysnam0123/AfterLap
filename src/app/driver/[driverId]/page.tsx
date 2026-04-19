'use client';
import DriverHero from '@/app/components/driver/DriverHero';
import { DriverPerformance } from '@/app/components/driver/DriverPerformance';
import DriverStats from '@/app/components/driver/DriverStats';
import DriverDetailSkeleton from '@/app/components/driver/skeleton/DriverDetailSkeleton';
import { useDriverDetailData } from '@/hooks/detailPage/DriverDetail';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function Page() {
  const params = useParams<{ driverId: string }>();
  const [opened, setOpened] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2026);
  const driverId = Number(params.driverId);

  const { data: driverDetailData, isLoading: driverDetailLoading } =
    useDriverDetailData(driverId);

  const seasonData = driverDetailData?.seasons.find(
    (data) => data.year === selectedYear,
  );

  const seasonYears = useMemo<number[]>(
    () => driverDetailData?.seasons.map((s) => s.year) ?? [],
    [driverDetailData?.seasons],
  );
  return (
    <div className="min-h-screen">
      {driverDetailLoading && <DriverDetailSkeleton />}
      {!driverDetailLoading && seasonData && driverDetailData && (
        <div className="mx-auto w-full px-5 sm:px-15 md:px-20 lg:px-40">
          <DriverHero
            data={driverDetailData}
            seasonData={seasonData}
            opened={opened}
            setOpened={setOpened}
            years={seasonYears}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <DriverStats data={seasonData} />
          <DriverPerformance
            results={seasonData.season_performance}
            teamColor={seasonData.team.team_colour}
          />
        </div>
      )}
    </div>
  );
}
