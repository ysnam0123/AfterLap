'use client';
import { useYoutube } from '@/hooks/useYoutue';
import Image from 'next/image';

export default function HighLights() {
  const { data, isPending, isError } = useYoutube();
  // if (data) {
  //   console.log('youtube', data);
  // }

  return (
    <>
      <div className="w-full select-none">
        <h1 className="mb-3 text-[25px] font-bold text-(--color-title)">
          공식 유튜브{' '}
        </h1>
        {isPending && <></>}
        {isError && <></>}
        <div className="grid min-h-62.5 grid-cols-2 gap-10 rounded-4xl border border-white/10 bg-[#1a1a1a] px-5 py-5 sm:grid-cols-4">
          {data &&
            data.map((video) => (
              <a
                key={video.snippet.title}
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                className="flex w-full flex-col items-start gap-3"
              >
                <Image
                  src={video.snippet.thumbnails.medium.url}
                  alt="youtube"
                  width={video.snippet.thumbnails.medium.width}
                  height={video.snippet.thumbnails.medium.height}
                />
                <p className="line-clamp-2 w-full text-[13px] sm:text-[16px]">
                  {video.snippet.title}
                </p>
              </a>
            ))}
        </div>
      </div>
    </>
  );
}
