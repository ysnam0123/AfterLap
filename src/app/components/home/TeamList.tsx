'use client';
import { teams2026 } from '@/images/team';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TeamList() {
  const router = useRouter();
  return (
    <>
      <h2 className="font-paper text-[18px] font-semibold text-(--color-title)">
        팀 목록
      </h2>

      <section className="hide-scrollbar flex w-full gap-4 overflow-x-auto px-2">
        {teams2026.map((team) => {
          return (
            <div
              // onClick={() => router.push(`/team/${team.team_slug}`)}
              key={team.team_slug}
              className="flex shrink-0 flex-col items-center gap-2 transition active:scale-95 active:opacity-80"
            >
              <div
                style={{ backgroundColor: team.team_colour }}
                className="flex cursor-pointer flex-col items-center justify-center rounded-[6px] border border-(--color-card-border) p-2.5"
              >
                <Image
                  src={team.main_logo}
                  alt="logo"
                  width={80}
                  height={80}
                  sizes="80px"
                  quality={65}
                />
              </div>

              <h1 className="text-[15px]">{team.team_kr_name}</h1>
            </div>
          );
        })}
      </section>
      <div className="mobile">
        <button
          onClick={() => router.push('/team')}
          className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
        >
          <p className="font-ria text-[12px] font-semibold">팀 전체보기</p>
        </button>
      </div>
    </>
  );
}
