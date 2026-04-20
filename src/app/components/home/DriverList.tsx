import { teams2026 } from '@/images/team';
import Image from 'next/image';
import Link from 'next/link';

export default function DriverList() {
  return (
    <>
      <h2 className="font-paper text-[18px] font-semibold text-(--color-title)">
        드라이버 목록
      </h2>

      <section className="hide-scrollbar flex w-full gap-4 overflow-x-auto px-2">
        {teams2026.map((team, teamIdx) =>
          team.drivers.map((driver, driverIdx) => {
            const isEager = teamIdx === 0 && driverIdx < 3;
            return (
              <Link
                key={driver.driver_id}
                href={`/driver/${driver.driver_id}`}
                className="flex shrink-0 flex-col items-center gap-2 transition active:scale-95 active:opacity-80"
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
                    loading={isEager ? 'eager' : 'lazy'}
                  />
                </div>

                <h1 className="text-[13px] font-semibold">{driver.kr_name}</h1>
              </Link>
            );
          }),
        )}
      </section>
      <div className="mobile">
        <Link
          href="/driver"
          className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border border-(--color-button-border) bg-(--color-button-bg) py-2.5 shadow-(--shadow-soft) transition hover:bg-(--color-button-hover) hover:shadow-(--shadow-strong) active:bg-(--color-button-active)"
        >
          <p className="font-ria text-[12px] font-medium">드라이버 전체보기</p>
        </Link>
      </div>
    </>
  );
}
