import Image from 'next/image';

export default function StatsticsCard({ title }: { title: string }) {
  const iconArr = [
    { title: 'Fastest Lap', icon: '/icons/fastest.svg' },
    { title: 'Safety Car', icon: '/icons/safety.svg' },
    { title: 'Weather', icon: '/icons/weather.svg' },
    { title: 'Fastest Pit Stop', icon: '/icons/pitstop.svg' },
    { title: 'Retirements', icon: '/icons/retirement.svg' },
    { title: '포지션 상승 TOP 3', icon: '/icons/graph.svg' },
    { title: '경고', icon: '/icons/warning.svg' },
  ];
  const icon = iconArr.find((item) => item.title === title);
  return (
    <>
      <div className="min-h-55 w-89.5 rounded-[40px] bg-[#1A1A1A] px-7.5 py-6.25">
        <div className="mb-12.5 flex items-center gap-0">
          {icon && <Image src={icon?.icon} alt="icon" width={40} height={40} />}
          <h1 className="font-ria text-[20px] font-bold">{title}</h1>
        </div>
        {/* fastest */}
        {/* <div className="text-right">
          <p style={{ fontFamily: 'RiaSans', fontWeight: 700 }}>
            Max Verstaphen
          </p>
          <p className="text-[30px]">1:42:06:304</p>
        </div> */}
        {/* Safety Car */}
        {/* <div className="text-right">
          <span
            className="mr-5 text-[40px]"
            style={{ fontFamily: 'RiaSans', fontWeight: 700 }}
          >
            3
          </span>
          <span className="text-[20px]">회</span>
        </div> */}
      </div>
    </>
  );
}
