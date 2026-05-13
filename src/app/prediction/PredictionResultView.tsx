import Image from 'next/image';
import { Check, X } from 'lucide-react';
import type {
  PredictionDriver,
  PredictionRow,
  RacePodium,
} from '@/lib/server/predictions';

interface Props {
  meetingName: string;
  prediction: PredictionRow | null;
  podium: RacePodium | null;
  drivers: PredictionDriver[];
}

function findDriver(drivers: PredictionDriver[], n: number) {
  return drivers.find((d) => d.driver_number === n) ?? null;
}

function DriverCell({ driver }: { driver: PredictionDriver | null }) {
  if (!driver)
    return (
      <div className="flex h-12 items-center text-(--color-placeholder) text-sm">
        예측 없음
      </div>
    );
  return (
    <div className="flex items-center gap-2">
      {driver.headshot_url && (
        <Image
          src={driver.headshot_url}
          alt={driver.full_name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
      )}
      <div className="flex flex-col">
        <span className="text-(--color-title) text-sm font-semibold">
          {driver.kr_name || driver.full_name}
        </span>
        <span
          className="text-[11px]"
          style={{ color: driver.team_colour ?? 'var(--color-sub-text)' }}
        >
          #{driver.driver_number}
        </span>
      </div>
    </div>
  );
}

export default function PredictionResultView({
  meetingName,
  prediction,
  podium,
  drivers,
}: Props) {
  const myP1 = prediction ? findDriver(drivers, prediction.p1_driver_number) : null;
  const myP2 = prediction ? findDriver(drivers, prediction.p2_driver_number) : null;
  const myP3 = prediction ? findDriver(drivers, prediction.p3_driver_number) : null;

  const rows: { label: string; mine: PredictionDriver | null; actual: PredictionDriver | null; points?: number }[] = [
    { label: 'P1', mine: myP1, actual: podium?.p1 ?? null, points: 10 },
    { label: 'P2', mine: myP2, actual: podium?.p2 ?? null, points: 7 },
    { label: 'P3', mine: myP3, actual: podium?.p3 ?? null, points: 5 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-(--color-title) text-lg font-semibold sm:text-xl">
          {meetingName}
        </h2>
        <p className="text-(--color-sub-text) mt-1 text-sm">
          {podium ? '레이스 결과와 내 예측을 비교해보세요.' : '레이스가 끝나면 결과가 표시돼요.'}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-(--color-card-border) bg-(--color-card-bg)">
        <div className="grid grid-cols-[60px_1fr_1fr_60px] items-center bg-(--color-table-head-bg) px-3 py-2 text-xs font-semibold text-(--color-sub-text)">
          <span>슬롯</span>
          <span>내 예측</span>
          <span>실제 결과</span>
          <span className="text-right">점수</span>
        </div>
        {rows.map((r) => {
          const isCorrect =
            r.mine && r.actual && r.mine.driver_number === r.actual.driver_number;
          const isOnPodium =
            r.mine &&
            podium &&
            [podium.p1.driver_number, podium.p2.driver_number, podium.p3.driver_number].includes(
              r.mine.driver_number,
            );
          return (
            <div
              key={r.label}
              className="grid grid-cols-[60px_1fr_1fr_60px] items-center border-t border-(--color-card-border) px-3 py-3"
            >
              <span className="text-(--color-accent) font-ria text-lg font-black">
                {r.label}
              </span>
              <DriverCell driver={r.mine} />
              <DriverCell driver={r.actual} />
              <div className="flex items-center justify-end gap-1 text-sm font-semibold">
                {podium && r.mine ? (
                  isCorrect ? (
                    <>
                      <Check className="h-4 w-4 text-(--color-success)" />
                      <span className="text-(--color-success)">+{r.points}</span>
                    </>
                  ) : isOnPodium ? (
                    <span className="text-(--color-warning)">+2</span>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-(--color-placeholder)" />
                      <span className="text-(--color-placeholder)">0</span>
                    </>
                  )
                ) : (
                  <span className="text-(--color-placeholder)">—</span>
                )}
              </div>
            </div>
          );
        })}
        {prediction?.total_points !== null && prediction?.total_points !== undefined && (
          <div className="flex items-center justify-between border-t border-(--color-card-border) bg-(--color-table-head-bg) px-3 py-3">
            <span className="text-(--color-title) text-sm font-semibold">총점</span>
            <span className="text-(--color-accent) font-ria text-2xl font-black">
              {prediction.total_points}점
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
