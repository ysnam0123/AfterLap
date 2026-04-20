'use client';
import { Team2026 } from '@/images/team';
import { Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

interface NewTeamProps {
  team: Team2026;
}

export default function Team({ team }: NewTeamProps) {
  const router = useRouter();
  return (
    <>
      <motion.div
        onClick={() => router.push(`/team/${team.team_slug}`)}
        className="relative cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
        whileHover={{
          scale: 1.02,
          boxShadow: `0 0 28px ${team.team_colour}44`,
          borderColor: team.team_colour,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <div
          className="absolute top-0 right-0 left-0 h-1"
          style={{ backgroundColor: team.team_colour }}
        />
        <div className="mb-4 flex items-start justify-between">
          <div className="flex w-full items-center justify-between">
            <div className="flex h-19 w-19 items-center justify-center rounded-lg bg-zinc-800/50 p-2">
              <Image
                src={team.main_logo}
                alt={`${team.main_logo} logo`}
                width={74}
                height={74}
                priority
              />
            </div>
            <div className="flex flex-col">
              <h3 className="mb-1 text-[22px] font-semibold text-white">
                {team.team_name}
              </h3>
              <p className="text-[16px] tracking-wider text-zinc-500 uppercase">
                {team.team_kr_name}
              </p>
            </div>
          </div>
        </div>
        <Image
          src={team.car_img ? team.car_img : '/cars/car.webp'}
          alt={`${team.team_name} car`}
          width={360}
          height={40}
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 300px, (min-width: 640px) 260px, 220px"
          className="mb-4 w-55 sm:block sm:w-65 lg:w-75 xl:w-90"
          priority
        />
        <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
          <Users className="h-4 w-4 text-zinc-600" />
          <div className="z-30 flex flex-1 items-center gap-4">
            {team.drivers.map((driver) => (
              <div
                key={driver.driver_id}
                className="group flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/driver/${driver.driver_id}`);
                }}
              >
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 p-2 sm:h-8 sm:w-8"
                  style={{
                    borderLeft: `2px solid ${team.team_colour}`,
                  }}
                >
                  {driver.driver_number}
                </div>
                <p
                  className="text-[10px] transition-all duration-100 ease-in group-hover:border-b sm:text-[16px]"
                  style={{ borderColor: team.team_colour }}
                >
                  {driver.kr_name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="z-20 flex items-center">
          <div className="flex gap-20"></div>
        </div>
      </motion.div>
    </>
  );
}
