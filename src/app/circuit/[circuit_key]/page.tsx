'use client';

import { useCircuitDetailData } from '@/app/api/meeting/Circuit';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function CircuitDetailPage() {
  const params = useParams<{ circuit_key: string }>();
  const { data: circuitDetail, isPending: circuitLoading } =
    useCircuitDetailData(Number(params.circuit_key));
  console.log(circuitDetail);
  return (
    <main className="mx-auto px-5 pt-5 text-white sm:px-10 md:px-20">
      {circuitDetail && (
        <>
          <header className="mb-10 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              {circuitDetail.circuit_short_name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                {circuitDetail.country_kr_name}
                <Image
                  src={circuitDetail.flag}
                  alt="flag"
                  width={26}
                  height={8}
                />
              </div>
              <div>랩 수 {circuitDetail.laps}</div>
              <div>서킷 길이 {circuitDetail.circuit_length} km</div>
              <div>첫 개최 {circuitDetail.first_grand_prix}</div>
            </div>
          </header>

          <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
              <div className="mb-4 text-sm text-white/60">트랙 맵</div>

              <div className="flex h-40 items-center justify-center rounded-lg md:h-80">
                <Image
                  src={circuitDetail.circuit_bg}
                  alt="circuit"
                  width={300}
                  height={320}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
              <h3 className="mb-4 text-lg font-semibold">서킷 정보</h3>

              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex justify-between">
                  <span>정식 명칭</span>
                  <span className="text-white">
                    {circuitDetail.circuit_long_name}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>위치</span>
                  <span className="text-white">Monza, Italy</span>
                </li>
                <li className="flex justify-between">
                  <span>랩 레코드</span>
                  <span className="text-white">
                    {circuitDetail.lap_record.time}
                  </span>
                </li>
                <li className="flex justify-center">
                  <Image
                    src={circuitDetail.circuit_img}
                    alt="circuit"
                    width={200}
                    height={200}
                  />
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
              <h3 className="mb-4 text-lg font-semibold">서킷 기록</h3>

              <div className="space-y-3 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>최다 우승</span>
                  <span className="text-white">Michael Schumacher (5회)</span>
                </div>
                <div className="flex justify-between">
                  <span>최다 폴 포지션</span>
                  <span className="text-white">7회</span>
                </div>
                <div className="flex justify-between">
                  <span>최단 랩</span>
                  <span className="text-white">1:20.235</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
              <h3 className="mb-4 text-lg font-semibold">최고 랩 타임</h3>

              <div className="flex items-center justify-between rounded-lg bg-neutral-800 p-4">
                <div>
                  <p className="text-sm text-white/60">
                    {circuitDetail.lap_record.driver}
                  </p>
                  <p className="text-xs text-white/40">
                    {circuitDetail.lap_record.year}
                  </p>
                </div>
                <p className="text-2xl font-bold">
                  {circuitDetail.lap_record.time}
                </p>
              </div>
            </div>
          </section>

          {/* <section>
            <h3 className="mb-4 text-lg font-semibold">최근 경기 결과</h3>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-neutral-900 text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left">연도</th>
                    <th className="px-4 py-3 text-left">우승</th>
                    <th className="px-4 py-3 text-left">팀</th>
                    <th className="px-4 py-3 text-right">FASTEST LAP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-neutral-950">
                  {[
                    {
                      year: 2023,
                      winner: 'Sergio Pérez',
                      team: 'Red Bull',
                      lap: '1:21.257',
                    },
                    {
                      year: 2022,
                      winner: 'Max Verstappen',
                      team: 'Red Bull',
                      lap: '1:24.030',
                    },
                    {
                      year: 2021,
                      winner: 'Max Verstappen',
                      team: 'Red Bull',
                      lap: '1:21.046',
                    },
                  ].map((row) => (
                    <tr key={row.year} className="hover:bg-white/5">
                      <td className="px-4 py-3">{row.year}</td>
                      <td className="px-4 py-3">{row.winner}</td>
                      <td className="px-4 py-3">{row.team}</td>
                      <td className="px-4 py-3 text-right">{row.lap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section> */}
        </>
      )}
    </main>
  );
}
