'use client';
import { CircuitView } from '@/types/circuit';
import { Crown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PageProps {
  data: CircuitView;
}
export default function CircuitCard({ data }: PageProps) {
  const router = useRouter();
  return (
    <>
      <article
        onClick={() => router.push(`/circuit/${data.circuit_key}`)}
        className="flex cursor-pointer flex-col select-none"
      >
        <Image
          src={data.circuit_bg}
          alt="bg"
          width={360}
          height={200}
          className="h-35 w-auto rounded-t-xl object-cover sm:h-50"
          priority
        />
        <div className="flex max-h-40 w-full items-center justify-between gap-2 rounded-b-xl border border-(--color-box-border) bg-(--color-card-dark-bg) px-2.5 py-2 sm:gap-5 sm:px-5 sm:py-3.75">
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col gap-0.5 border-b border-(--color-box-border) pb-2 sm:gap-2 sm:pb-5">
              <h1 className="">{data.circuit_short_name}</h1>
              <div className="flex items-center gap-0.5 sm:gap-2">
                <Image
                  src={data.flag}
                  alt="flag"
                  width={25}
                  height={15}
                  className="h-2 sm:h-3.75"
                  priority
                />
                <p className="text-[14px]">{data.country_kr_name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 truncate">
              <div className="flex items-center gap-2 pt-2.5 sm:gap-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-[12px] text-[#5E5E5E] sm:text-[14px]">
                    랩 수
                  </h2>
                  <p className="text-[14px] sm:text-[16px]">{data.laps}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[12px] text-[#5E5E5E] sm:text-[14px]">
                    서킷 길이
                  </h2>
                  <p className="text-[14px] sm:text-[16px]">
                    {data.circuit_length}
                  </p>
                </div>
              </div>
              {data.lap_record.driver !== null && (
                <div className="flex items-center gap-1 text-[14px] sm:text-[16px]">
                  <Crown className="h-4.25 w-4.25 text-[#D6B706]" />
                  <p className="border-r-2 border-(--color-border) pr-1">
                    {data.lap_record.driver}
                  </p>
                  <p className="">{data.lap_record.year}년</p>
                </div>
              )}
            </div>
          </div>
          <Image
            src={data.circuit_img}
            width={100}
            height={100}
            priority
            alt="circuit "
            className="h-20 w-20 sm:h-25 sm:w-25"
          />
        </div>
      </article>
    </>
  );
}
