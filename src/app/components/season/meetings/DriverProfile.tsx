import Image, { StaticImageData } from 'next/image';

export default function DriverProfile({
  headshot,
  teamColor,
  className,
}: {
  headshot: StaticImageData | string;
  teamColor: string;
  className: string;
}) {
  const upgradeHeadshotQuality = (url: string) => {
    if (url.includes('.transform/')) {
      return url.replace(
        /\.transform\/\d+col\/image\.png$/,
        '.transform/4col/image.png',
      );
    }
    return url;
  };
  // const headshotSrc = upgradeHeadshotQuality(headshot);
  return (
    <>
      <div
        // style={{ backgroundColor: teamColor }}
        className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#222222] ${className}`}
      >
        <Image src={headshot} alt="logo" width={36} height={36} priority />
      </div>
    </>
  );
}
