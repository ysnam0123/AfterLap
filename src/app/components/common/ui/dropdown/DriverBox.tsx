import { teams2026 } from '@/images/team';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TeamBox({
  onMouseLeave,
  onClick,
}: {
  onClick: () => void;
  onMouseLeave: () => void;
}) {
  const router = useRouter();
  return (
    <>
      <div
        className="absolute top-22 left-0 z-500 min-h-100 w-screen border-t border-(--color-dropdown-border) bg-(--color-dropdown-bg)/97 px-12.5 py-10 backdrop-blur select-none"
        onMouseLeave={onMouseLeave}
      >
        <div className="mx-auto grid max-w-400 grid-cols-4 gap-x-4 gap-y-6">
          {teams2026.map((team) =>
            team.drivers.map((driver) => (
              <div
                onClick={() => {
                  onClick();
                  router.push(`/driver/${driver.driver_id}`);
                }}
                key={driver.driver_id}
                className="flex min-h-8 cursor-pointer items-center gap-5 rounded-xl border border-(--team-color) bg-(--color-dropdown-card) px-4 py-3 transition-[transform,background-color,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:bg-(--color-dropdown-hover) hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                style={
                  { '--team-color': team.team_colour } as React.CSSProperties
                }
              >
                <Image
                  src={driver.headshot}
                  alt="driver"
                  width={40}
                  height={40}
                  priority
                />
                <h1 className="text-[18px] font-semibold text-white">
                  {driver.kr_name}
                </h1>
              </div>
            )),
          )}
        </div>
      </div>
    </>
  );
}
