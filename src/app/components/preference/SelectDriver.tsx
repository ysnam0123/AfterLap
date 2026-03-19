'use client';

import { teams2026 } from '@/images/team';
import { usePreferenceStore } from '@/store/PreferenceStore';
import Image from 'next/image';

export default function SelectDriver() {
  const { selectedDrivers, toggleDriver } = usePreferenceStore();

  return (
    <>
      <h1 className="mb-6 text-[18px]">
        나의 드라이버를 선택하세요 (최대 6명)
      </h1>

      <section className="mx-auto grid w-full grid-cols-2 gap-6.25">
        {teams2026.map((team) =>
          team.drivers.map((driver) => {
            const id = String(driver.driver_id);
            const isSelected = selectedDrivers.includes(id);

            return (
              <div
                key={driver.driver_id}
                className="flex flex-col items-center gap-3"
              >
                <div
                  onClick={() => toggleDriver(id)}
                  className="flex w-full cursor-pointer flex-col items-center justify-center rounded-[6px] border px-10 py-2.5 transition"
                  style={{
                    borderColor: isSelected
                      ? team.team_colour
                      : 'var(--color-card-border)',
                    background: 'var(--color-card-bg)',
                  }}
                >
                  <Image
                    src={driver.headshot}
                    alt="driver"
                    width={80}
                    height={80}
                    priority
                  />
                </div>

                <h1 className="text-[18px] font-semibold text-white">
                  {driver.kr_name}
                </h1>
              </div>
            );
          }),
        )}
      </section>

      <div className="fixed bottom-0 left-0 w-full border-t border-[#2E2E30] bg-[#121214] p-4">
        <button
          disabled={selectedDrivers.length === 0}
          className={`w-full rounded-lg py-3 text-sm font-semibold transition ${
            selectedDrivers.length > 0
              ? 'bg-white text-black'
              : 'cursor-not-allowed bg-[#2a2a2a] text-gray-500'
          }`}
        >
          저장하기
        </button>
      </div>
    </>
  );
}
