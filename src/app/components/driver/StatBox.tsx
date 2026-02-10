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
        <p
          className="text-[30px]"
          style={{ fontFamily: 'Paperlolgy', fontWeight: 500 }}
        >
          {title}
        </p>
        <p
          className="text-[30px]"
          style={{ fontFamily: 'RiaSans', fontWeight: 900 }}
        >
          {value}
        </p>
      </div>
    </>
  );
}
