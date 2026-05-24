'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TeamBox from './dropdown/TeamBox';
import DriverBox from './dropdown/DriverBox';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/useAuth';
import UserProfile from '../../Auth/UserProfile';
import ThemeToggle from '../../common/ThemeToggle';
import NotificationBell from '../../Notification/NotificationBell';

const LoginModal = dynamic(() => import('../../Auth/LoginModal'));
export default function Header() {
  const [openTeam, setOpenTeam] = useState(false);
  const [openDriver, setOpenDriver] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);
  const isDetailPage = pathSegments.length >= 2;
  const [loginOpen, setLoginOpen] = useState(false);

  const { user, isLoading } = useAuth();

  return (
    <>
      <div className="sticky top-0 z-50 flex w-full flex-col gap-3 border-b border-(--color-box-border) bg-(--color-bg-primary)/90 px-5 py-2.5 backdrop-blur lg:h-22 lg:px-0">
        <div className="mx-auto flex w-full max-w-[1536px] items-center gap-17.5 select-none lg:px-17.5 xl:px-35">
          <Image
            src={'/AfterLapLogo.webp'}
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
            fetchPriority="high"
          />
          <div className="desktop">
            <ul className="flex gap-14">
              <li
                onClick={() => router.push('/season')}
                className="cursor-pointer border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-(--color-title-hover) hover:text-(--color-title-hover)"
              >
                시즌
              </li>
              <li
                onClick={() => router.push('/ranking')}
                className="cursor-pointer border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-(--color-title-hover) hover:text-(--color-title-hover)"
              >
                순위
              </li>
              <li
                className="flex cursor-pointer gap-0 border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-(--color-title-hover) hover:text-(--color-title-hover)"
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
                className="flex cursor-pointer gap-0 border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-(--color-title-hover) hover:text-(--color-title-hover)"
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
                className="cursor-pointer border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-(--color-title-hover) hover:text-(--color-title-hover)"
              >
                서킷
              </li>
              {/* <li
                onClick={() => router.push('/infomation')}
                className="ml-auto cursor-pointer border-b-2 border-transparent py-6.25 hover:border-[#ffffff]"
              >
                f1 알아보기
              </li> */}
            </ul>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <div className="desktop">
              <NotificationBell />
            </div>
            {isLoading ? (
              <div className="h-6.5 w-6.5 animate-pulse rounded-full bg-gray-700" />
            ) : !user ? (
              <button
                className="btn-interaction flex cursor-pointer items-center justify-center rounded-[5px] border border-(--color-card-border) bg-(--color-card-bg) px-4 py-2"
                onClick={() => setLoginOpen(true)}
              >
                로그인
              </button>
            ) : (
              <UserProfile
                userData={{
                  name:
                    user.user_metadata?.full_name ??
                    user.user_metadata?.name ??
                    '익명',
                  avatar: user.user_metadata?.avatar_url ?? '',
                }}
              />
            )}
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

      {loginOpen && <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />}
    </>
  );
}
