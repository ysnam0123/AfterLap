import { Session } from '@/types/meeting';
import { formatDateTime, getSessionStatus } from '@/utils/time';
import { Timer } from 'lucide-react';
import Ongoing from './ScheduledStatus/Ongoing';
import Upcoming from './ScheduledStatus/Upcoming';

interface PageProps {
  data: Session;
}

export default function NextScheduleBox({ data }: PageProps) {
  const date = data.date_start.split('T')[0];
  const time = data.date_start.split('T')[1].split('+')[0];

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
