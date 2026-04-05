import Image from 'next/image';

export default function Favorite({ className }: { className?: string }) {
  return (
    <>
      <div className={`${className}`}></div>
      <Image
        src={'/icons/favorite.webp'}
        alt="favorite"
        width={30}
        height={15}
      />
    </>
  );
}
