'use client';

import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TeamBox from './dropdown/TeamBox';
import DriverBox from './dropdown/DriverBox';
import { ChevronDown, ChevronLeft } from 'lucide-react';
export default function Header() {
  const [openTeam, setOpenTeam] = useState(false);
  const [openDriver, setOpenDriver] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);
  const isDetailPage = pathSegments.length >= 2;
  return (
    <>
      <div className="sticky top-0 z-50 mb-4 flex w-full flex-col gap-3 bg-(--color-bg-primary) px-2.5 py-2.5 lg:h-22">
        <div className="flex items-center gap-17.5 select-none lg:px-17.5 xl:px-35">
          <Image
            src={'/AfterLapLogo.svg'}
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
        {isDetailPage && (
          <div className="mobile">
            <button onClick={() => router.back()} className="flex items-center">
              <ChevronLeft className="h-5.25 w-5.25" />
              <p className="text-[14px] font-semibold">뒤로가기</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
