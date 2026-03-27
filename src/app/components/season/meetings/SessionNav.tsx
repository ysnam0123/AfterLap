'use client';
import { Session } from '@/types/meeting';
import { getSessionStatus } from '@/utils/time';

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
          <ul className="flex gap-1.5 sm:mb-4 sm:gap-2.5">
            {sessionTabs.map((session) => {
              const status = getSessionStatus(
                session.date_start,
                session.date_end,
              );
              const isFinished = sessionFinishMap[session.session_key];
              const isActive = isSelectedKey === session.session_key;

              return (
                <li
                  key={session.session_name}
                  onClick={() => {
                    setIsSelectedAction(session.session_key);
                  }}
                  className={`btn-interaction flex h-10 items-center justify-center gap-1 truncate rounded-[10px] px-4 text-[13px] font-semibold transition sm:h-12 sm:text-[18px] ${
                    isActive
                      ? 'border-b-2 border-[#D80003] bg-(--color-box-selected) text-white shadow-(--shadow-soft)'
                      : 'border border-(--color-box-border) bg-(--color-button-bg) text-(--color-title) hover:bg-(--color-button-hover)'
                  } ${!isFinished ? 'opacity-70' : ''} cursor-pointer`}
                >
                  {session.session_name}
                  {!isFinished && status === 'upcoming' && (
                    <span className="ml-1 text-[10px] text-(--color-warning) sm:text-[12px]">
                      예정
                    </span>
                  )}
                  {!isFinished && status === 'ongoing' && (
                    <span className="ml-1 text-[10px] text-[#E10600] sm:text-[12px]">
                      진행 중
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-(--color-bg-primary)/90 to-transparent sm:hidden" />
      </div>
    </>
  );
}
