import { RaceStatsticsTab } from '@/types/meeting';

export default function RaceTabs({
  tabs,
  selectedTab,
  setSelectedTabAction,
}: {
  tabs: RaceStatsticsTab[];
  selectedTab: string;
  setSelectedTabAction: (tab: string) => void;
}) {
  return (
    <>
      <div className="hide-scrollbar flex items-center gap-2.5 overflow-x-scroll">
        <ul className="mb-4 flex gap-2.5 sm:mb-7.5 sm:gap-2.5">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              onClick={() => setSelectedTabAction(tab.label)}
              className={`${selectedTab === tab.label ? 'border-b-4 border-[#D80003] bg-(--color-box-selected)' : 'border-(--color-card-border bg-(--color-button-bg)'} flex h-10 cursor-pointer items-center justify-center truncate rounded-[5px] px-4 text-[13px] font-semibold hover:bg-(--color-button-hover) active:bg-(--color-button-active) sm:h-12 sm:rounded-[6px] sm:text-[18px]`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
