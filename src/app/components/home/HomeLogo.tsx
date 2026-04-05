import Image from 'next/image';

export default function HomeLogo() {
  return (
    <>
      <div className="flex items-center gap-1 sm:mr-auto sm:flex-col sm:items-start">
        <Image
          src={'/AfterLapLogo.webp'}
          alt="logo"
          width={270}
          height={67}
          priority
        />
        <div className="flex flex-col gap-1">
          <p className="pl-3">결과를 넘어서</p>
          <p className="pl-3">세션과 드라이버의 흐름을 읽다.</p>
        </div>
      </div>
    </>
  );
}
