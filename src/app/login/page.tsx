'use client';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function LoginScreen() {
  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleKakaoLogin = () => {
    console.log('Kakao login');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="flex flex-col gap-6 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold">AfterLap</h1>
              <p className="mt-2 text-sm text-gray-500">
                로그인하고 레이스 데이터를 확인하세요
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full border bg-white text-black hover:bg-gray-100"
              >
                Google로 로그인
              </button>

              <button
                onClick={handleKakaoLogin}
                className="w-full bg-[#FEE500] text-black hover:bg-[#f7dc00]"
              >
                카카오로 로그인
              </button>
            </div>

            <p className="text-center text-xs text-gray-400">
              로그인하면 서비스 이용약관과 개인정보처리방침에 동의하게 됩니다.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
