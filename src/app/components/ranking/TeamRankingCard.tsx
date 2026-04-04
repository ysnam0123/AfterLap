'use client';
import { TeamSeasonRankingView } from '@/types/Ranking';
import { findHeadshot } from '@/utils/findHeadShot';
import { CalendarDays, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CardProps {
  year: number;
  data: TeamSeasonRankingView;
}

export default function TeamRankingCard({ data, year }: CardProps) {
  const router = useRouter();
  return (
    <>
      <div className="font-ria flex w-full flex-col rounded-4xl border border-[#5f5f5f] bg-[#0C0C0B] p-3.75 font-medium">
        <div className="flex items-center justify-between">
          <div
            style={{ borderLeftColor: data.team_colour }}
            className="border-l-4 pl-4"
          >
            <p className="text-[20px]">{data.rank}</p>
          </div>
          <div className="flex flex-col gap-1 text-[18px]">
            <p className="text-[18px] font-semibold">{data.team_kr_name}</p>
            <p className="text-[15px] font-medium">{data.team_name}</p>
          </div>
        </div>
        {/* 로고 및 드라이버 */}
        <div className="flex items-center justify-between">
          <Image src={data.main_logo} alt="logo" width={100} height={100} />
          <div className="flex items-center gap-3">
            {data.drivers.map((driver) => (
              <div
                key={driver.driver_id}
                onClick={() => router}
                className="flex h-16.5 w-16.5 items-center justify-center rounded-[5px] bg-[#222222]"
              >
                <Image
                  src={findHeadshot(driver.full_name, year)}
                  alt="driver"
                  width={50}
                  height={50}
                  priority
                />
              </div>
            ))}
          </div>
        </div>
        {/* 정보 박스 */}
        <div className="flex flex-col items-center rounded-[10px] border border-[#5f5f5f] bg-[#0C0C0B] py-3.75">
          <div className="flex w-full items-center border-b border-[#5f5f5f] pb-3.75">
            <div className="flex w-full flex-col items-center gap-2 border-r border-[#5F5F5F] px-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#8B8B8B]" />
                <span className="text-[12px] md:text-[14px] xl:text-[16px]">
                  {data.team_races}
                </span>
              </div>
              <p className="text-[14px] text-[#8B8B8B]">경기 수</p>
            </div>
            <div className="flex w-full flex-col items-center gap-2 border-r border-[#5F5F5F] px-2.5">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#FFD400]" />
                <span className="text-[12px] md:text-[14px] xl:text-[16px]">
                  {data.wins}
                </span>
              </div>
              <p className="text-[14px] text-[#8B8B8B]">우승</p>
            </div>
            <div className="flex w-full flex-col items-center gap-2 border-r border-[#5F5F5F] px-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#8B8B8B]" />
                <span className="text-[12px] md:text-[14px] xl:text-[16px]">
                  {data.podiums}
                </span>
              </div>
              <p className="text-[14px] text-[#8B8B8B]">포디움</p>
            </div>
            <div className="flex w-full flex-col items-center gap-2 px-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#8B8B8B]" />
                <span className="text-[12px] md:text-[14px] xl:text-[16px]">
                  {data.avg_finish}
                </span>
              </div>
              <p className="text-[14px] text-[#8B8B8B]">평균 등수</p>
            </div>
          </div>
          <p className="pt-3.75">
            <span>{data.team_total_points}</span>
            <span> 포인트</span>
          </p>
        </div>
      </div>
    </>
  );
}
