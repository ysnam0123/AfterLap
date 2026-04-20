import Image from 'next/image';
import { NextMeeting } from '@/types/meeting';

interface PageProps {
  data: NextMeeting;
}

export default function NextSessionTitle({ data }: PageProps) {
  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-1 lg:max-w-152.5 lg:shrink-0 lg:pb-0">
          <h1 className="flex items-center gap-2 text-[20px] font-semibold sm:text-[22px] lg:text-[30px]">
            <span>{data.countries.country_kr_name} 그랑프리</span>
            <div className="relative h-3.5 w-6 shrink-0">
              <Image
                src={data.countries.flag}
                alt="flag"
                fill
                sizes="24px"
                className="object-contain"
              />
            </div>
          </h1>
          <h1 className="mt-0 text-[14px] font-medium text-[#787575] sm:mt-1 sm:text-[14px] lg:text-[18px]">
            {data.meeting_official_name}
          </h1>
        </div>
      </div>
    </>
  );
}
