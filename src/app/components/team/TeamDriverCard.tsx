'use client';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DriverCardProps {
  name: string;
  number: number;
  imageUrl: StaticImageData | string;
  teamColor: string;
  driverId: number;
}

export function TeamDriverCard({
  name,
  number,
  imageUrl,
  teamColor,
  driverId,
}: DriverCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        onClick={() => router.push(`/driver/${driverId}`)}
        className="cursor-pointer overflow-hidden border border-neutral-800 bg-[#111] transition-all duration-300 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-center bg-neutral-900">
          <Image
            src={imageUrl ? imageUrl : '/public/driversImg/defaultDriver.webp'}
            alt="driver"
            width={300}
            height={300}
            className="w-25 pt-3 sm:w-55 lg:w-75"
          />
        </div>
        <div className="relative flex items-center justify-center border-t border-neutral-800 px-3 py-2 sm:justify-start sm:px-6 sm:py-6">
          <div
            className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
            style={{
              width: isHovered ? '100%' : '0%',
              backgroundColor: teamColor,
            }}
          />
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-semibold tracking-tight sm:text-4xl">
              {number}
            </span>
            <div>
              <p
                className="text-[12px] tracking-tight transition-colors duration-300 sm:text-lg"
                style={{ color: isHovered ? teamColor : 'white' }}
              >
                {name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
