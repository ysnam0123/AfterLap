import Image from 'next/image';

export default function BeforeSeason() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
        <Image
          src={'/AfterLapLogo.svg'}
          alt="logo"
          width={400}
          height={24}
          className="h-9 w-37.5 md:h-24 md:w-100"
        />
        <p
          style={{ fontFamily: 'Paperlolgy', fontWeight: 500 }}
          className="text-[20px] text-[#6f6f6f] md:text-[40px]"
        >
          시즌 시작 전입니다
        </p>
      </div>
    </>
  );
}
