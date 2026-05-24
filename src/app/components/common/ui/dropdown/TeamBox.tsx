// import { Team as TeamType } from '@/types/team';
import { teams2026 } from '@/images/team';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TeamBox({
  // className,
  onMouseLeave,
}: {
  className?: string;
  onMouseLeave: () => void;
}) {
  const router = useRouter();
  return (
    <div
      className="absolute top-22 left-0 z-500 flex min-h-120 w-screen justify-center border-t border-[#2e2e2e] bg-[#0f0f10]/97 px-12.5 py-12.5 backdrop-blur select-none"
      onMouseLeave={onMouseLeave}
    >
      <div className="grid max-w-400 grid-cols-5 gap-8">
        {teams2026.map((team) => (
          <div
            key={team.team_slug}
            onClick={() => router.push(`/team/${team.team_slug}`)}
            className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] border border-[#2a2a2a] bg-[#1a1a1d] px-4 pt-3 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-(--team-color) hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            style={{ '--team-color': team.team_colour } as React.CSSProperties}
          >
            <Image
              src={team.main_logo}
              alt="logo"
              width={80}
              height={80}
              className="object-contain transition-transform duration-200 ease-out group-hover:scale-105"
              priority
            />
            <h1 className="font-ria mb-3 text-[20px] font-medium text-[#b5b5b5] transition-colors duration-200 group-hover:text-white">
              {team.team_kr_name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
