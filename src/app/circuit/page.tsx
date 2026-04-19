'use client';

import CircuitCard from '../components/circuit/CircuitCard';
import F1Loading from '../components/common/F1Loading';
import { useCircuitViewData } from '@/hooks/useCircuit';

export default function Page() {
  // 서킷
  const { data: circuitData, isPending: circuitLoading } = useCircuitViewData();

  return (
    <>
      <section className="mx-auto grid min-h-screen w-full gap-7.5 px-5 sm:px-10 md:grid-cols-2 lg:grid-cols-3 lg:px-15">
        {circuitLoading && (
          <div className="flex h-100 items-center justify-center sm:h-100">
            <F1Loading loadingText="서킷 로딩 중..." />
          </div>
        )}
        {!circuitLoading &&
          circuitData?.map((c) => <CircuitCard key={c.circuit_key} data={c} />)}
      </section>
    </>
  );
}
