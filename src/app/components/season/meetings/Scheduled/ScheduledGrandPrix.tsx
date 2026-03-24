import { Session } from '@/types/meeting';
import About from './About';
import NextScheduleBox from './NextScheduleBox';
import { Circuit } from '@/types/circuit';

interface PageProps {
  data: Session;
  circuitData: Circuit;
}

export default function ScheduledGrandPrix({ data, circuitData }: PageProps) {
  return (
    <>
      <section className="flex flex-col gap-4 px-5 pt-5 sm:gap-10 sm:px-0 sm:pt-0">
        <NextScheduleBox data={data} />
        <About circuitData={circuitData} />
      </section>
    </>
  );
}
