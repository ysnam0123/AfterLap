import { Session } from '@/types/meeting';
import { formatDateTime } from '@/utils/time';
import { Timer } from 'lucide-react';

interface PageProps {
  data: Session;
}

export default function NextScheduleBox({ data }: PageProps) {
  const date = data.date_start.split('T')[0];
  const time = data.date_start.split('T')[1].split('+')[0];

  const getSessionStatus = (session: Session) => {
    const now = Date.now();
    const start = new Date(data.date_start).getTime();
    const end = new Date(data.date_end).getTime();

    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'ongoing';
    return 'finished';
  };
  // const krStatus = () => {
  //   switch (data.status) {
  //     case 'finished':
  //       return (
  //         <div className="flex items-center gap-1 text-[14px]">
  //           <p>종료</p>
  //           <div className="h-3 w-3 rounded-full bg-[#05AF05]"></div>
  //         </div>
  //       );
  //     case 'ongoing':
  //       return (
  //         <div className="flex items-center gap-1 rounded-[3px] bg-[#4a4a4a] px-2 py-0.5 text-[14px]">
  //           <p>진행중</p>
  //           <div className="h-3 w-3 animate-pulse rounded-full bg-[#B80000]"></div>
  //         </div>
  //       );
  //   }
  // };
  return (
    <>
      <div className="flex items-center gap-2 rounded-xl border border-[#FED010] bg-[#212121] px-3.5 py-2.5 sm:gap-3 sm:rounded-4xl sm:border-2 sm:px-5 sm:py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FED010] sm:h-10 sm:w-10">
          <Timer className="h-5 w-5 text-white sm:h-8 sm:w-8" />
        </div>
        <p
          style={{ fontFamily: 'Paperlolgy', fontWeight: 900 }}
          className="hidden text-[14px] sm:block sm:text-[20px] md:text-[24px]"
        >
          Session Not Started
        </p>
        <p
          style={{ fontFamily: 'Paperlolgy', fontWeight: 500 }}
          className="hidden text-[20px] lg:block"
        >
          아직 시작되지 않은 세션입니다
        </p>
        <p
          style={{ fontFamily: 'Paperlolgy', fontWeight: 500 }}
          className="ml-0 text-[15px] sm:ml-3 sm:text-[18px] md:text-[20px]"
        >
          <span>
            {/* {date} {time} */}
            {formatDateTime(data.date_start)}
          </span>
          <span className="pl-1 text-[#FED010]">시작 예정</span>
        </p>
      </div>
    </>
  );
}
