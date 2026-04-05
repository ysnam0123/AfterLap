'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { findHeadshot } from '@/utils/findHeadShot';
import { Team2026, teamDriver } from '@/images/team';

export default function SeasonDriverCard({
  driver,
  year,
  teamData,
}: {
  driver: teamDriver;
  year: number;
  teamData: Team2026;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/driver/${driver.driver_id}`)}
      style={{ borderColor: teamData.team_colour }}
      className={`group relative h-50 w-full cursor-pointer overflow-hidden rounded-[10px] border px-4 py-3 select-none sm:h-55 sm:px-5 sm:py-5`}
    >
      <Image
        src="/cardBg.png"
        alt="bg"
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-1 bg-black/0 transition-all duration-100 group-hover:bg-white/10" />

      <div className="relative z-20 flex flex-col gap-1">
        <p className="text-[20px] font-semibold text-white">{driver.kr_name}</p>
        <div className="z-10 flex justify-between">
          <div className="z-10 flex flex-col">
            <p className="text-[18px]">{teamData.team_kr_name}</p>
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-1">
                <Image
                  src={driver.flag}
                  alt="국기"
                  width={20}
                  height={20}
                  priority
                />
                <p>{driver.driver_number}</p>
              </div>
            </div>
            <Image
              src={teamData.main_logo}
              alt="logo"
              width={50}
              height={50}
              priority
            />
          </div>
          {findHeadshot(driver.full_name, year) ? (
            <Image
              src={findHeadshot(driver.full_name, year)}
              alt="driver"
              width={140}
              height={140}
              className="z-10"
              priority
            />
          ) : (
            <Image
              src={'/driversImg/defaultDriver.webp'}
              alt="driver"
              width={160}
              height={160}
              className="z-10"
            />
          )}
        </div>
      </div>
    </div>
  );
}
