'use client';

import { useEffect } from 'react';
import { useCircuitViewData } from '../api/meeting/Circuit';
import CircuitCard from '../components/circuit/CircuitCard';
import { useSeasonDrivers } from '@/hooks/SeasonDrivers';
import { useTeams } from '@/hooks/seasonTeams';

export default function Page() {
  // 서킷
  const { data: circuitData, isPending: circuitLoading } = useCircuitViewData();
  const { data: mainDriver } = useSeasonDrivers(2026);
  const { data: teams } = useTeams(2026);
  if (circuitData) {
    console.log(circuitData);
  }
  if (mainDriver) {
    console.log(mainDriver);
  }
  if (teams) {
    console.log('teams:', teams);
  }
  return (
    <>
      <section className="mx-auto grid w-full gap-7.5 px-5 sm:px-10 md:grid-cols-2 lg:grid-cols-3 lg:px-15">
        {circuitData?.map((c) => (
          <CircuitCard key={c.circuit_key} data={c} />
        ))}
      </section>
    </>
  );
}
