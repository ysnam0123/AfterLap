'use client';

import { teams2026 } from '@/images/team';
import { usePreferenceStore } from '@/store/PreferenceStore';
import Image from 'next/image';

export default function SelectTeam() {
  const { selectedTeams, toggleTeam, setStep } = usePreferenceStore();

  return (
    <>
      <h1 className="text-[18px]">나의 팀을 선택하세요 (최대 2팀)</h1>

      <section className="mx-auto grid w-full grid-cols-3 gap-6.25">
        {teams2026.map((team) => {
          const isSelected = selectedTeams.includes(team.team_slug);

          return (
            <div
              key={team.team_slug}
              className="flex flex-col items-center gap-2"
            >
              <div
                onClick={() => toggleTeam(team.team_slug)}
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-[6px] border p-2.5 transition"
                style={{
                  borderColor: isSelected
                    ? team.team_colour
                    : 'var(--color-card-border)',
                  background: 'var(--color-card-bg)',
                }}
              >
                <Image
                  src={team.main_logo}
                  alt="logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>

              <h1 className="text-[15px] text-[#b5b5b5]">
                {team.team_kr_name}
              </h1>
            </div>
          );
        })}
      </section>

      <div className="fixed bottom-0 left-0 w-full border-t border-[#2E2E30] bg-[#121214] p-4">
        <button
          disabled={selectedTeams.length === 0}
          onClick={() => setStep(2)}
          className={`w-full rounded-lg py-3 text-sm font-semibold transition ${
            selectedTeams.length > 0
              ? 'bg-white text-black'
              : 'cursor-not-allowed bg-[#2a2a2a] text-gray-500'
          }`}
        >
          다음
        </button>
      </div>
    </>
  );
}
