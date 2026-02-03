import { country_code_flags } from '@/images/flags';
import { Meeting } from '@/types/meeting';
import Image from 'next/image';
import SimpleLoading from '../common/SimpleLoading';
import { Circuit } from '@/types/circuit';
interface CircuitData {
  circuitInfo?: Circuit | null;
  meetingInfo?: Meeting;
}
export default function SeasonHeroBox({
  circuitInfo,
  meetingInfo,
}: CircuitData) {
  if (!meetingInfo || !circuitInfo) {
    return null;
  }
  const flagSrc = country_code_flags[meetingInfo!.country_code];
  const circuitSrc = circuitInfo.circuit_detail_img;
  if (circuitInfo) {
    console.log('서킷 정보 테스트:', circuitInfo);
  }
  return (
    <>
      <section className="relative mb-1 pt-30 select-none sm:mb-12.5 sm:pt-60 md:pt-80 lg:pt-100">
        <div className="absolute inset-0 z-0 h-30 w-full sm:h-60 md:h-80 lg:h-100">
          <Image
            src={circuitInfo.circuit_bg}
            alt="bg"
            width={1440}
            height={567}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black opacity-60" />
        </div>
        <div className="absolute top-0 left-1/2 mx-auto flex w-full max-w-325 -translate-x-1/2 justify-between py-3.75 pl-5 sm:top-3 sm:px-10">
          <div className="flex flex-col gap-2">
            {!meetingInfo ? (
              <div className="desktop flex flex-col gap-2">
                <div className="h-5 w-100 animate-pulse rounded bg-neutral-700" />
                <div className="h-8 w-180 animate-pulse rounded bg-neutral-700" />
                <div className="h-5 w-50 animate-pulse rounded bg-neutral-700" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Image
                    src={flagSrc}
                    alt="flag"
                    width={40}
                    height={40}
                    className="desktop"
                  />
                  <Image
                    src={flagSrc}
                    alt="flag"
                    width={20}
                    height={12}
                    className="mobile"
                  />
                  <h2 className="text-[10px] font-bold sm:text-[20px]">
                    {meetingInfo?.meeting_name}
                  </h2>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <h1 className="text-[13px] font-bold md:text-[18px] lg:text-[22px] xl:text-[26px]">
                    {meetingInfo?.meeting_official_name}
                  </h1>
                </div>
                <p className="text-[10px] font-semibold sm:text-[20px]">
                  <span>라운드 </span>
                  <span className="mr-0.5">{meetingInfo?.round}</span>
                </p>
              </>
            )}
          </div>
          <div className="hidden sm:block">
            <div className="flex flex-col items-center justify-center gap-1 rounded-[30px] bg-[#000000]/90 px-4 py-2 md:h-60 lg:h-80 xl:h-90">
              {!circuitSrc && <SimpleLoading />}
              {circuitSrc && (
                <>
                  <h1 className="text-[18px] font-semibold md:text-[22px]">
                    {circuitInfo.circuit_short_name}
                  </h1>
                  <Image
                    src={circuitSrc}
                    alt="circuit"
                    width={500}
                    height={270}
                    className="w-auto sm:h-33 md:h-40 lg:h-50 xl:h-56.25"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
