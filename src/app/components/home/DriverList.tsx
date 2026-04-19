'use client';
import { teams2026 } from '@/images/team';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function DriverList() {
  const router = useRouter();
  return (
    <>
      <h2 className="font-paper text-[18px] font-semibold text-(--color-title)">
        드라이버 목록
      </h2>

      <section className="hide-scrollbar flex w-full gap-4 overflow-x-auto px-2">
        {teams2026.map((team) =>
          team.drivers.map((driver) => {
            return (
              <div
                key={driver.driver_id}
                className="flex shrink-0 flex-col items-center gap-2 transition active:scale-95 active:opacity-80"
                onClick={() => router.push(`/driver/${driver.driver_id}`)}
              >
                <div
                  style={{ backgroundColor: team.team_colour }}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-[6px] border border-(--color-card-border) p-2.5"
                >
                  <Image
                    src={driver.headshot}
                    alt="driver"
                    width={80}
                    height={80}
                    sizes="80px"
                    quality={65}
                  />
                </div>

                <h1 className="text-[13px] font-semibold">{driver.kr_name}</h1>
              </div>
            );
          }),
        )}
      </section>
      <div className="mobile">
        <button
          onClick={() => router.push('/driver')}
          className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
        >
          <p className="font-ria text-[12px] font-medium">드라이버 전체보기</p>
        </button>
      </div>
    </>
  );
}
