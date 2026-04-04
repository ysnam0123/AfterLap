export default function StatBox({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <>
      <div className="mb-5 flex flex-col gap-3.75">
        <p className="font-paper text-[30px] font-semibold">{title}</p>
        <p className="font-ria text-[30px] font-black">{value}</p>
      </div>
    </>
  );
}
