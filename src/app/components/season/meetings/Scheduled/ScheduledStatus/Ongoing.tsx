import { Session } from '@/types/meeting';
import { formatDateTime } from '@/utils/time';
import { Timer } from 'lucide-react';

interface PageProps {
  data: Session;
}

export default function Ongoing({ data }: PageProps) {
  return (
    <>
      <div className="flex animate-pulse items-center gap-2 rounded-xl border border-[#E10600] bg-[#212121] px-3.5 py-2.5 sm:gap-3 sm:rounded-4xl sm:border-2 sm:px-5 sm:py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E10600] sm:h-10 sm:w-10">
          <Timer className="h-5 w-5 text-white sm:h-8 sm:w-8" />
        </div>
        <p
          style={{ fontFamily: 'Paperlolgy', fontWeight: 900 }}
          className="hidden text-[14px] sm:block sm:text-[20px] md:text-[24px]"
        >
          Session Ongoing
        </p>
        <p
          style={{ fontFamily: 'Paperlolgy', fontWeight: 500 }}
          className="hidden text-[20px] lg:block"
        >
          세션이 진행중입니다.
        </p>
        <p
          style={{ fontFamily: 'Paperlolgy', fontWeight: 500 }}
          className="ml-0 text-[15px] sm:ml-3 sm:text-[18px] md:text-[20px]"
        >
          <span>{formatDateTime(data.date_start)}</span>
          <span className="animate-pulse pl-1 text-[#E10600]">
            세션 진행 중
          </span>
        </p>
      </div>
    </>
  );
}
