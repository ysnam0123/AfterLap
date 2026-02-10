import {
  DriverDetailData,
  DriverSeasonData,
} from '@/hooks/detailPage/DriverDetail';
import Image from 'next/image';
import SeasonChangeButton from '../common/SeasonChangeButton';
import { findHeadshot } from '@/utils/findHeadShot';
import { teams2026 } from '@/images/team';
import DriverCard from './DriverCard';

interface Props {
  data: DriverDetailData;
  opened: boolean;
  setOpened: (state: boolean) => void;
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  seasonData?: DriverSeasonData;
}

export default function DriverHero({
  data,
  opened,
  setOpened,
  years,
  selectedYear,
  seasonData,
  setSelectedYear,
}: Props) {
  const fullName = data.first_name + ' ' + data.last_name;
  const data2026 = teams2026.find((team) =>
    team.drivers.find((driver) => driver.full_name === fullName),
  );
  return (
    <>
      <div className="z-100">
        <SeasonChangeButton
          opened={opened}
          setOpenedAction={setOpened}
          years={years}
          selectedYear={selectedYear}
          setSelectedYearAction={setSelectedYear}
          className="mb-0 sm:mb-0"
        />
      </div>
      <div className="mb-5 flex w-full items-center justify-between">
        <div className="flex flex-col gap-1 select-none">
          <div className="flex items-center justify-between">
            <p
              className="text-[20px] sm:text-[30px] md:text-[50px]"
              style={{ fontFamily: 'RiaSans', fontWeight: 700 }}
            >
              {data.kr_name}
            </p>
          </div>
          <div className="flex text-[14px] sm:text-[20px]">
            <div className="flex items-center gap-1 sm:gap-2 sm:pr-2.5">
              <Image
                src={data.flag}
                alt="flag"
                width={36}
                height={26}
                className="h-4 w-auto sm:h-6"
                priority
              />
              <p>{data.country_kr_name}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p
            style={{ fontFamily: 'Paperlolgy', fontWeight: 600 }}
            className="hidden text-[18px] sm:block sm:text-[20px] md:text-[30px]"
          >
            {seasonData?.team.team_kr_name
              ? seasonData?.team.team_kr_name
              : data2026?.team_kr_name}
          </p>
          {seasonData?.team.main_logo ? (
            <Image
              src={seasonData.team.main_logo}
              alt="logoImg"
              width={100}
              height={100}
              className="z-30 h-auto w-15 sm:w-16 md:w-18 lg:w-25"
              priority
            />
          ) : (
            <Image
              src={data2026!.main_logo}
              alt="logoImg"
              width={100}
              height={100}
              className="z-30 h-auto sm:w-13 md:w-18 lg:w-25"
              priority
            />
          )}
        </div>
      </div>
      <section
        style={{
          backgroundColor: seasonData?.team.team_colour
            ? seasonData.team.team_colour
            : data2026?.team_colour,
        }}
        className="relative flex items-center justify-center gap-6 rounded-xl select-none sm:flex-row sm:gap-20"
      >
        <div className="absolute z-20 h-full w-full rounded-xl bg-black/30" />
        <DriverCard
          teamColor={seasonData?.team.team_colour}
          headshot={findHeadshot(fullName, selectedYear)}
        />
      </section>
    </>
  );
}
