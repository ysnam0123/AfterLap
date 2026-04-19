'use client';

import AnimatedContent from '@/components/AnimatedContent';
import { useAuth } from '@/context/useAuth';
import { teams2026 } from '@/images/team';
import { usePreferenceStore } from '@/store/PreferenceStore';
import { supabase } from '@/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SelectDriver() {
  const { user } = useAuth();
  const router = useRouter();
  const { selectedTeams, selectedDrivers, toggleDriver, setStep } =
    usePreferenceStore();

  const handleSave = async () => {
    if (!user) return;
    const teams = selectedTeams.map((team) => ({
      user_id: user?.id,
      team_slug: team,
    }));
    const drivers = selectedDrivers.map((driver) => ({
      user_id: user?.id,
      driver_id: driver,
    }));

    // 팀
    await supabase.from('user_favorite_teams').delete().eq('user_id', user.id);

    const { error: teamInsertError } = await supabase
      .from('user_favorite_teams')
      .insert(teams);

    if (teamInsertError) {
      console.error('팀 입력 실패:', teamInsertError);
      return;
    }

    // 드라이버
    await supabase
      .from('user_favorite_drivers')
      .delete()
      .eq('user_id', user.id);

    const { error: driverInsertError } = await supabase
      .from('user_favorite_drivers')
      .insert(drivers);

    if (driverInsertError) {
      console.error('팀 입력 실패:', driverInsertError);
      return;
    }

    // 완료 상태 업데이트
    await supabase
      .from('profiles')
      .update({ preference_completed: true })
      .eq('id', user.id);

    router.push('/');
    setStep(1);
  };

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
              <AnimatedContent
                key={driver.driver_id}
                distance={140}
                direction="vertical"
                reverse={false}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={0.5}
                threshold={0.1}
                delay={0}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    onClick={() => toggleDriver(id)}
                    className="flex w-full cursor-pointer flex-col items-center justify-center rounded-[6px] border-3 px-10 py-2.5 transition"
                    style={{
                      borderColor: isSelected
                        ? team.team_colour
                        : 'var(--color-card-border)',
                      background: 'var(--color-card-dark-bg)',
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

                  <h1 className="text-[18px] font-semibold">
                    {driver.kr_name}
                  </h1>
                </div>
              </AnimatedContent>
            );
          }),
        )}
      </section>

      <div className="fixed bottom-0 left-0 w-full border-t-2 border-(--color-box-border) bg-(--color-bg-primary) p-4">
        <button
          onClick={() => handleSave()}
          disabled={selectedDrivers.length === 0}
          className={`btn-interaction w-full cursor-pointer rounded-lg py-3 text-sm font-semibold transition ${
            selectedDrivers.length > 0
              ? 'bg-(--color-button-bg)'
              : 'cursor-not-allowed bg-(--color-button-disabled) text-gray-500'
          }`}
        >
          저장하기
        </button>
      </div>
    </>
  );
}
