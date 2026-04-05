// export type StatType = 'Fastest Lap' | 'Safety Car' | 'Weather';
// export  const STAT_CONFIG: Record<
//   StatType,
//   {
//     icon: string;
//     render: (data: any) => JSX.Element;
//   }
// > = {
//   'Fastest Lap': {
//     icon: '/icons/fastest.webp',
//     render: (data) => (
//       <>
//         <p className="font-ria font-bold">{data.driver}</p>
//         <p className="text-[30px]">{data.time}</p>
//       </>
//     ),
//   },
//   'Safety Car': {
//     icon: '/icons/safety.webp',
//     render: (data) => (
//       <>
//         <p className="font-ria font-bold">Deployments</p>
//         <p className="text-[30px]">{data.count} times</p>
//       </>
//     ),
//   },
//   'Weather': {
//     icon: '/icons/weather.webp',
//     render: (data) => (
//       <>
//         <p className="font-ria font-bold">{data.condition}</p>
//         <p className="text-[30px]">{data.temp}°C</p>
//       </>
//     ),
//   },
// };
