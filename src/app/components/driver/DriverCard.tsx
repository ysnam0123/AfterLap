import Image from 'next/image';

export default function DriverCard({
  headshot,
  teamColor,
}: {
  headshot: string;
  teamColor?: string;
}) {
  return (
    <div className="flex items-center justify-center rounded-2xl">
      <Image
        src={headshot ? headshot : '/drivers/defaultDriver.svg'}
        alt="driver"
        width={200}
        height={200}
        className="z-30 md:h-50 md:w-50 lg:h-70 lg:w-70"
        priority
      />
    </div>
  );
}
