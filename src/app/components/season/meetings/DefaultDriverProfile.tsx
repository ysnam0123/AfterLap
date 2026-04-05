import Image from 'next/image';

export default function DefaultDriverProfile() {
  return (
    <>
      <div className="juce flex h-10 w-10 items-center rounded-full border border-[#9A9A9A] bg-[#0B0B0B]">
        <Image src={'/f1Logo.webp'} alt="logo" width={36} height={36} />
      </div>
    </>
  );
}
