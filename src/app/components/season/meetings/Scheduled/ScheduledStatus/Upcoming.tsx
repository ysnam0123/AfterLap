import { Session } from '@/types/meeting';
import { formatDateTime } from '@/utils/time';
import { Timer } from 'lucide-react';

interface PageProps {
  data: Session;
}

export default function Upcoming({ data }: PageProps) {
  return (
    <>
      <div className="flex items-center gap-2 rounded-xl border border-[#F4C430] bg-(--color-box-bg) px-3.5 py-2.5 sm:gap-3 sm:rounded-4xl sm:border-2 sm:px-5 sm:py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4C430] sm:h-10 sm:w-10">
          <Timer className="h-4 w-4 text-white sm:h-8 sm:w-8" />
        </div>
        <p className="font-paper hidden text-[14px] font-semibold sm:block sm:text-[20px] md:text-[24px]">
          Session Not Started
        </p>
        <p className="font-paper hidden text-[20px] font-semibold lg:block">
          아직 시작되지 않은 세션입니다
        </p>
        <p className="font-paper ml-0 text-[15px] font-semibold sm:ml-3 sm:text-[18px] md:text-[20px]">
          <span>
            {/* {date} {time} */}
            {formatDateTime(data.date_start)}
          </span>
          <span className="pl-1 text-[#F4C430]">시작 예정</span>
        </p>
      </div>
    </>
  );
}
