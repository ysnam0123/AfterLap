'use client';
import { Session } from '@/types/meeting';

export default function SessionNav({
  sessionTabs,
  isSelectedKey,
  setIsSelectedAction,
  sessionFinishMap,
}: {
  sessionTabs: Session[];
  isSelectedKey: number | null;
  setIsSelectedAction: (sessionKey: number) => void;
  sessionFinishMap: Record<number, boolean>;
}) {
  return (
    <>
      <div className="relative">
        <div className="hide-scrollbar flex items-center justify-normal overflow-x-scroll sm:justify-between">
          <ul className="flex gap-1.5 sm:mb-7.5 sm:gap-2.5">
            {sessionTabs.map((session) => {
              const isFinished = sessionFinishMap[session.session_key];
              const isActive = isSelectedKey === session.session_key;

              return (
                <li
                  key={session.session_name}
                  onClick={() => {
                    setIsSelectedAction(session.session_key);
                  }}
                  className={`flex h-10 items-center justify-center truncate rounded-[5px] px-4 text-[13px] font-semibold sm:h-12 sm:rounded-[10px] sm:text-[18px] ${
                    isActive
                      ? 'border-b-2 border-[#D80003] sm:border-0 sm:bg-[#4B4B4B]'
                      : 'bg-[#212121] hover:bg-[#4B4B4B]'
                  } ${!isFinished ? 'opacity-70' : ''} cursor-pointer`}
                >
                  {session.session_name}
                  {!isFinished && (
                    <span className="ml-1 text-[10px] text-[#FED010] sm:text-[12px]">
                      예정
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-[#1E1E1E]/80 to-transparent sm:hidden" />
      </div>
    </>
  );
}
