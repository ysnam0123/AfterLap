'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { LogIn } from 'lucide-react';

const LoginModal = dynamic(() => import('./LoginModal'));

interface Props {
  description?: string;
}

export default function LoginPromptCard({
  description = '이 기능을 사용하려면 로그인해주세요.',
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-(--color-card-border) bg-(--color-card-bg) p-8 text-center">
        <LogIn className="text-(--color-accent) h-10 w-10" />
        <div>
          <h2 className="text-(--color-title) text-lg font-semibold">
            로그인이 필요해요
          </h2>
          <p className="text-(--color-sub-text) mt-1 text-sm">{description}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-(--color-accent) flex h-10 cursor-pointer items-center justify-center rounded-lg px-6 font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
        >
          로그인하기
        </button>
      </div>
      {open && <LoginModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
