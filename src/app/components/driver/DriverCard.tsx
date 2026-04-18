import Image from 'next/image';

export default function DriverCard({
  headshot,
  // teamColor,
}: {
  headshot: string;
  // teamColor?: string;
}) {
  return (
    <div className="flex items-center justify-center rounded-2xl">
      <Image
        src={headshot ? headshot : '/driversImg/defaultDriver.webp'}
        alt="driver"
        width={280}
        height={280}
        sizes="(min-width: 1024px) 280px, 200px"
        className="z-30 md:h-50 md:w-50 lg:h-70 lg:w-70"
        priority
      />
    </div>
  );
}
