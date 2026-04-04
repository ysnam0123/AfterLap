import StatBox from './StatBox';

export default function DriverDetail() {
  return (
    <>
      <section className="min-h-250 w-full rounded-[30px] bg-[#1C1C25] px-10 py-7.5 select-none">
        <h1 className="font-pretendard mb-12.5 text-[40px] font-semibold">
          STATSTICS
        </h1>
        <div className="grid grid-cols-4">
          <StatBox title="시즌 순위" value="5th" />
          <StatBox title="시즌 포인트" value="224" />
          <StatBox title="시즌 순위" value="5th" />
          <StatBox title="시즌 순위" value="5th" />
        </div>
      </section>
    </>
  );
}
