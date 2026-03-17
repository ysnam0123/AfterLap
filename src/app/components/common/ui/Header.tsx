'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TeamBox from './dropdown/TeamBox';
import DriverBox from './dropdown/DriverBox';
import { ChevronDown, ChevronLeft, CircleUserRound } from 'lucide-react';
import LoginModal from '../../Auth/LoginModal';
import { supabase } from '@/supabase/client';
import { User } from '@supabase/supabase-js';
export default function Header() {
  const [openTeam, setOpenTeam] = useState(false);
  const [openDriver, setOpenDriver] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);
  const isDetailPage = pathSegments.length >= 2;
  const [loginOpen, setLoginOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1️⃣ 현재 세션 확인
    const getInitialUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    };

    getInitialUser();

    // 2️⃣ 로그인/로그아웃 실시간 구독
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      console.log('현재 유저:', user);
    } else {
      console.log('로그아웃 상태');
    }
  }, [user]);
  return (
    <>
      <div className="sticky top-0 z-50 mb-4 flex w-full flex-col gap-3 border-b border-(--color-box-border) bg-(--color-bg-primary)/90 px-5 py-2.5 backdrop-blur lg:h-22">
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
                className="cursor-pointer border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-white hover:text-white"
              >
                시즌
              </li>
              <li
                onClick={() => router.push('/ranking')}
                className="cursor-pointer border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-white hover:text-white"
              >
                순위
              </li>
              <li
                className="flex cursor-pointer gap-0 border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-white hover:text-white"
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
                className="flex cursor-pointer gap-0 border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-white hover:text-white"
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
                className="cursor-pointer border-b-2 border-transparent py-6.25 text-(--color-title) hover:border-white hover:text-white"
              >
                서킷
              </li>
              <li
                onClick={() => router.push('/infomation')}
                className="ml-auto cursor-pointer border-b-2 border-transparent py-6.25 hover:border-[#ffffff]"
              >
                f1 알아보기
              </li>
            </ul>
          </div>
          {!user ? (
            <button
              onClick={() => setLoginOpen(true)}
              className="ml-auto flex h-10 cursor-pointer items-center justify-center truncate rounded-[10px] bg-(--color-button-bg) px-6 text-[13px] font-semibold transition hover:bg-(--color-button-hover) sm:h-12 sm:text-[18px]"
            >
              로그인
            </button>
          ) : (
            <CircleUserRound
              onClick={() => router.push('/profile')}
              className="ml-auto h-7 w-7 cursor-pointer text-[#EFEFEF]"
            />
          )}
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

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
