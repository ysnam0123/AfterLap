'use client';

import { usePreferenceStore } from '@/store/PreferenceStore';
import SelectDriver from '../components/preference/SelectDriver';
import SelectTeam from '../components/preference/SelectTeam';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const step = usePreferenceStore((state) => state.step);
  const setStep = usePreferenceStore((state) => state.setStep);
  const reset = usePreferenceStore((state) => state.reset);

  const handleBack = () => {
    if (step === 1) {
      reset();
      router.push('/');
    } else if (step === 2) {
      setStep(1);
    }
  };

  return (
    <section className="mx-auto flex flex-col gap-4 px-5 pb-24 select-none">
      <button
        onClick={handleBack}
        className="btn-interaction inline-flex max-w-30 cursor-pointer items-center gap-2 rounded-md border border-(--color-button-border) bg-(--color-button-bg) px-3 py-1.5 text-[14px] font-medium text-gray-300"
      >
        <ChevronLeft className="h-6 w-6" />
        <p className="text-[16px]">뒤로가기</p>
      </button>
      {step === 1 && <SelectTeam />}
      {step === 2 && <SelectDriver />}
    </section>
  );
}
