'use client';

import { usePreferenceStore } from '@/store/PreferenceStore';
import SelectDriver from '../components/preference/SelectDriver';
import SelectTeam from '../components/preference/SelectTeam';

export default function Page() {
  const step = usePreferenceStore((state) => state.step);

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 px-5 pb-24 select-none">
      {step === 1 && <SelectTeam />}
      {step === 2 && <SelectDriver />}
    </section>
  );
}
