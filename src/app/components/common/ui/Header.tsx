'use client';

import Image from 'next/image';
import logo from '/public/AfterLapLogo.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TeamBox from './dropdown/TeamBox';
import DriverBox from './dropdown/DriverBox';
import { ChevronDown } from 'lucide-react';
export default function Header() {
  const [openTeam, setOpenTeam] = useState(false);
  const [openDriver, setOpenDriver] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 z-50 mb-4 flex h-12.5 w-full flex-col bg-(--color-bg-primary) px-2.5 py-2.5 lg:h-23.5">
        <div className="flex items-center gap-17.5 select-none lg:px-17.5 xl:px-35">
          <Image
            src={logo}
            alt="logo"
            className="h-7.5 w-auto cursor-pointer"
            width={125}
            height={30}
            onClick={() => router.push('/')}
            onMouseEnter={() => {
              setOpenDriver(false);
              setOpenTeam(false);
            }}
            priority
          />
          <div className="desktop">
            <ul className="flex gap-14">
              <li
                onClick={() => router.push('/season')}
                className="cursor-pointer border-b-2 border-transparent py-6.25 hover:border-[#ffffff]"
              >
                시즌
              </li>
              <li
                onClick={() => router.push('/ranking')}
                className="cursor-pointer border-b-2 border-transparent py-6.25 hover:border-[#ffffff]"
              >
                순위
              </li>
              <li
                className="flex cursor-pointer gap-0 border-b-2 border-transparent py-6.25 hover:border-[#ffffff]"
                onClick={() => {
                  router.push('/team');
                  setOpenTeam(false);
                }}
                onMouseEnter={() => {
                  setOpenDriver(false);
                  setOpenTeam(true);
                }}
              >
                <span>팀</span>
                <ChevronDown />
              </li>
              <li
                className="flex cursor-pointer gap-0 border-b-2 border-transparent py-6.25 hover:border-[#ffffff]"
                onClick={() => {
                  router.push('/driver');
                  setOpenDriver(false);
                }}
                onMouseEnter={() => {
                  setOpenDriver(true);
                  setOpenTeam(false);
                }}
              >
                <span>드라이버</span>
                <ChevronDown />
              </li>
              <li
                onClick={() => router.push('/circuit')}
                className="cursor-pointer border-b-2 border-transparent py-6.25 hover:border-[#ffffff]"
              >
                서킷
              </li>
              {/* <li
                onClick={() => router.push('/infomation')}
                className="cursor-pointer border-b-2 border-transparent py-6.25 hover:border-[#ffffff]"
              >
                f1 알아보기
              </li> */}
            </ul>
          </div>
          {openTeam && <TeamBox onMouseLeave={() => setOpenTeam(false)} />}
          {openDriver && (
            <DriverBox
              onMouseLeave={() => setOpenDriver(false)}
              onClick={() => setOpenDriver(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
