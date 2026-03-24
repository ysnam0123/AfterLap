// export default function DnsDnfDsqInfo() {
//   return (
//     <>
//       <div className="flex flex-col gap-1 pt-2 text-[15px]">
//         <p>
//           <span className="font-semibold">DNF</span>: 완주 실패
//         </p>
//         <p>
//           <span className="font-semibold">DNS</span>: 미출전
//         </p>
//         <p>
//           <span className="font-semibold">DSQ</span>: 실격
//         </p>
//       </div>
//     </>
//   );
// }

export default function DnsDnfDsqInfo() {
  const items = [
    {
      label: 'DNF',
      desc: '완주 실패',
      color: 'bg-red-500/10 text-red-400 border-red-500/30',
    },
    {
      label: 'DNS',
      desc: '미출전',
      color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    },
    {
      label: 'DSQ',
      desc: '실격',
      color: 'bg-gray-500/10 text-gray-300 border-gray-500/30',
    },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#111] p-4">
      <p className="mb-3 text-sm font-semibold text-gray-400">경기 상태 안내</p>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border px-3 py-2"
          >
            <span
              className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${item.color}`}
            >
              {item.label}
            </span>

            <span className="text-sm text-gray-300">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
