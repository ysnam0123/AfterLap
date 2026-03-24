'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="mt-10 w-full border-t border-(--color-box-border) bg-(--color-box-bg) px-4 pt-6 pb-20 select-none sm:mt-20 sm:px-12 sm:py-10">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        {/* Left */}
        <div className="flex flex-col items-start gap-4 lg:w-100 lg:border-r lg:border-(--color-box-border) lg:pr-10">
          <Image
            src="/AfterLapLogo.svg"
            alt="AfterLap Logo"
            width={270}
            height={67}
            className="hidden h-16.75 w-auto sm:block"
          />
          <Image
            src="/AfterLapLogo.svg"
            alt="AfterLap Logo"
            width={150}
            height={36}
            className="block h-9 w-auto sm:hidden"
          />

          <div className="pl-1 text-sm sm:text-base">
            <p className="text-(--color-title)">Beyond the Result</p>
            <p className="text-(--color-sub-text)">
              결과를 넘어서, 세션과 드라이버의 흐름을 읽다
            </p>
          </div>

          <p className="mt-4 text-xs text-(--color-sub-text) sm:text-sm">
            © 2025 After Lap - All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="hidden gap-20 lg:flex">
          {/* Navigation */}
          <div>
            <h2 className="mb-3 text-lg">둘러보기</h2>
            <ul className="space-y-1 text-base text-(--color-sub-text)">
              <li
                onClick={() => router.push('/season')}
                className="cursor-pointer hover:text-(--color-title-hover)"
              >
                시즌
              </li>
              <li
                onClick={() => router.push('/ranking')}
                className="cursor-pointer hover:text-(--color-title-hover)"
              >
                순위
              </li>
              <li
                onClick={() => router.push('/team')}
                className="cursor-pointer hover:text-(--color-title-hover)"
              >
                팀
              </li>
              <li
                onClick={() => router.push('/driver')}
                className="cursor-pointer hover:text-(--color-title-hover)"
              >
                드라이버
              </li>
              <li
                onClick={() => router.push('/circuit')}
                className="cursor-pointer hover:text-(--color-title-hover)"
              >
                서킷
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h2 className="mb-3 text-lg">AfterLap</h2>
            <ul className="space-y-1 text-base text-(--color-sub-text)">
              <li className="cursor-pointer hover:text-(--color-title-hover)">
                AfterLap에 대하여
              </li>
              <li className="cursor-pointer hover:text-(--color-title-hover)">
                문의하기
              </li>
              <li className="cursor-pointer hover:text-(--color-title-hover)">
                Developer
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 hidden border-t border-(--color-box-border) lg:block" />
    </footer>
  );
}
