'use client';

import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleKakaoLogin = async () => {
    const currentPath = window.location.pathname;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        // next : 로그인 끝나고 이동할 위치
        redirectTo: `https://afterlap.vercel.app/auth/callback?next=${currentPath}`,
      },
    });
    if (error) {
      console.error('카카오 로그인 에러:', error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-105 px-4"
          >
            <Card className="border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              <CardContent className="flex flex-col gap-8 p-8">
                {/* close */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>

                {/* brand */}
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-white">AfterLap</h1>
                  <p className="mt-2 text-sm text-gray-400">
                    로그인하고 F1 레이스 데이터를 확인하세요
                  </p>
                </div>

                {/* login buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleGoogleLogin}
                    className="relative flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-white text-sm font-semibold text-black hover:bg-gray-200"
                  >
                    <Image
                      src="/icons/google.svg"
                      alt="google"
                      width={20}
                      height={20}
                      className="absolute left-3.75"
                    />
                    Google로 로그인
                  </button>

                  <button
                    onClick={handleKakaoLogin}
                    className="relative flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-[#FEE500] text-sm font-semibold text-black hover:bg-[#d5bd00]"
                  >
                    <Image
                      src="/icons/kakao.svg"
                      alt="kakao"
                      width={20}
                      height={20}
                      className="absolute left-3.75"
                    />
                    카카오로 로그인
                  </button>
                </div>

                {/* terms */}
                <p className="text-center text-xs text-gray-500">
                  로그인 시 서비스 이용약관 및 <br /> 개인정보 처리방침에
                  동의하게 됩니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
