import { CalendarDays, Trophy } from 'lucide-react';
import Image from 'next/image';

export default function TeamRankingCard() {
  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-4xl border border-[#5f5f5f] bg-[#0C0C0B] p-3.75">
        <div className="flex items-center justify-between">
          <div className="border-l-4 border-[#FF8E00] pl-4">
            <p className="text-[20px]">1</p>
          </div>
          <div className="flex flex-col gap-1 text-[18px]">
            <p>맥라렌</p>
            <p>McLaren</p>
          </div>
        </div>
        {/* 로고 및 드라이버 */}
        <div className="flex items-center justify-between">
          <Image
            src={'/team_main_logo/mclaren.svg'}
            alt="logo"
            width={100}
            height={100}
          />
          <div className="flex items-center gap-3">
            <div className="flex h-16.5 w-16.5 items-center justify-center rounded-[5px] bg-[#222222]">
              <Image
                src={'/driversImg/2025/landonorris.svg'}
                alt="driver"
                width={50}
                height={50}
              />
            </div>
            <div className="flex h-16.5 w-16.5 items-center justify-center rounded-[5px] bg-[#222222]">
              <Image
                src={'/driversImg/2025/oscarpiastri.svg'}
                alt="driver"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
        {/* 정보 박스 */}
        <div className="flex flex-col items-center rounded-[10px] border border-[#5f5f5f] bg-[#0C0C0B] py-3.75">
          <div className="mx-2.5 flex items-center border-b border-[#5f5f5f] pb-3.75">
            <div className="flex flex-col items-center gap-2 border-r border-[#5F5F5F] px-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#8B8B8B]" />
                <span>23</span>
              </div>
              <p className="text-[14px] text-[#8B8B8B]">경기 수</p>
            </div>
            <div className="flex flex-col items-center gap-2 border-r border-[#5F5F5F] px-2.5">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#FFD400]" />
                <span>23</span>
              </div>
              <p className="text-[14px] text-[#8B8B8B]">우승</p>
            </div>
            <div className="flex flex-col items-center gap-2 border-r border-[#5F5F5F] px-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#8B8B8B]" />
                <span>23</span>
              </div>
              <p className="text-[14px] text-[#8B8B8B]">포디움</p>
            </div>
            <div className="flex flex-col items-center gap-2 px-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#8B8B8B]" />
                <span>23</span>
              </div>
              <p className="text-[14px] text-[#8B8B8B]">평균 등수</p>
            </div>
          </div>
          <p className="pt-3.75">472 포인트</p>
        </div>
      </div>
    </>
  );
}
