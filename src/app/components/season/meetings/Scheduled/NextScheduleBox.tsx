import { Session } from '@/types/meeting';
import { getSessionStatus } from '@/utils/time';
import Ongoing from './ScheduledStatus/Ongoing';
import Upcoming from './ScheduledStatus/Upcoming';

interface PageProps {
  data: Session;
}

export default function NextScheduleBox({ data }: PageProps) {
  const status = getSessionStatus(data.date_start, data.date_end);
  const krStatus = () => {
    switch (status) {
      case 'upcoming':
        return <Upcoming data={data} />;
      case 'ongoing':
        return <Ongoing data={data} />;
    }
  };
  return (
    <>
      <div>{krStatus()}</div>
    </>
  );
}
