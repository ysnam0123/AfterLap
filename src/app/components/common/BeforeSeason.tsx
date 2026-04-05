import Image from 'next/image';

export default function BeforeSeason() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 md:gap-5">
        <Image
          src={'/loadingLogo.webp'}
          alt="logo"
          width={400}
          height={24}
          className="h-18 w-60 md:h-24 md:w-100"
          priority
        />
        <p className="font-paper text-[20px] font-semibold text-[#6f6f6f] md:text-[40px]">
          시즌 시작 전입니다
        </p>
      </div>
    </>
  );
}
