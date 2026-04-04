import AboutCircuit from './AboutCircuit';
import AboutBeforePoint from './AboutBeforePoint';
import { Circuit } from '@/types/circuit';
import CircuitDetailBox from './CircuitDetailBox';

interface PageProps {
  circuitData: Circuit;
}

export default function About({ circuitData }: PageProps) {
  return (
    <>
      <div className="flex flex-col gap-5 select-none sm:gap-5">
        <p className="font-paper text-[14px] font-bold sm:text-[18px] md:text-[22px]">
          경기 전 둘러보기
        </p>
        {circuitData && (
          <>
            <div className="flex flex-col items-stretch gap-5 md:flex-row lg:gap-10">
              <AboutCircuit circuitData={circuitData} />
              <AboutBeforePoint circuitData={circuitData} />
            </div>
            <div className="mobile">
              <CircuitDetailBox circuitData={circuitData} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
