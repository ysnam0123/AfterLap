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
        className="absolute top-22 left-0 z-500 min-h-100 w-screen bg-[#1a1a1a] px-12.5 py-10 select-none"
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
                className="flex min-h-8 cursor-pointer items-center gap-5 rounded-xl border border-(--team-color) bg-(--color-card-bg) px-4 py-3 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-[#3f3e3e] hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
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
