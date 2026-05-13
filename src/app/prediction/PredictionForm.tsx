'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { submitPrediction } from './actions';
import type { PredictionDriver } from '@/lib/server/predictions';
import { X, Check } from 'lucide-react';

type Slot = 1 | 2 | 3;

interface Props {
  meetingKey: number;
  meetingName: string;
  drivers: PredictionDriver[];
  initial: { p1: number | null; p2: number | null; p3: number | null };
  raceStart: string;
}

const SLOT_LABEL: Record<Slot, string> = { 1: 'P1', 2: 'P2', 3: 'P3' };
const SLOT_POINTS: Record<Slot, number> = { 1: 10, 2: 7, 3: 5 };

export default function PredictionForm({
  meetingKey,
  meetingName,
  drivers,
  initial,
  raceStart,
}: Props) {
  const [p1, setP1] = useState<number | null>(initial.p1);
  const [p2, setP2] = useState<number | null>(initial.p2);
  const [p3, setP3] = useState<number | null>(initial.p3);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const podium: Record<Slot, number | null> = { 1: p1, 2: p2, 3: p3 };
  const filled = [p1, p2, p3].filter(Boolean) as number[];

  const setSlot = (slot: Slot, value: number | null) => {
    if (slot === 1) setP1(value);
    if (slot === 2) setP2(value);
    if (slot === 3) setP3(value);
  };

  const onDriverClick = (driverNumber: number) => {
    setMessage(null);
    const existingSlot = ([1, 2, 3] as Slot[]).find(
      (s) => podium[s] === driverNumber,
    );
    if (existingSlot) {
      setSlot(existingSlot, null);
      return;
    }
    const nextEmpty = ([1, 2, 3] as Slot[]).find((s) => podium[s] === null);
    if (!nextEmpty) {
      setMessage({
        type: 'error',
        text: '포디움이 가득 찼어요. 슬롯의 X를 눌러 비워주세요.',
      });
      return;
    }
    setSlot(nextEmpty, driverNumber);
  };

  const onSubmit = () => {
    if (!p1 || !p2 || !p3) return;
    setMessage(null);
    startTransition(async () => {
      const result = await submitPrediction({
        meetingKey,
        p1,
        p2,
        p3,
      });
      if (result.ok) {
        setMessage({ type: 'success', text: '예측이 저장됐어요!' });
      } else {
        setMessage({
          type: 'error',
          text: result.error ?? '저장에 실패했어요.',
        });
      }
    });
  };

  const isComplete = !!(p1 && p2 && p3);
  const findDriver = (n: number | null) =>
    n ? drivers.find((d) => d.driver_number === n) : null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-(--color-title) text-lg font-semibold sm:text-xl">
          {meetingName} 포디움 예측
        </h2>
        <p className="text-(--color-sub-text) mt-1 text-sm">
          드라이버 카드를 눌러 P1 → P2 → P3 순서로 채워주세요. 마감:{' '}
          {new Date(raceStart).toLocaleString('ko-KR', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* 포디움 슬롯 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {([1, 2, 3] as Slot[]).map((slot) => {
          const driver = findDriver(podium[slot]);
          return (
            <div
              key={slot}
              className="flex flex-col items-center gap-2 rounded-xl border border-(--color-card-border) bg-(--color-card-bg) p-3 sm:p-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-(--color-accent) font-ria text-xl font-black sm:text-2xl">
                  {SLOT_LABEL[slot]}
                </span>
                <span className="text-(--color-sub-text) text-xs">
                  +{SLOT_POINTS[slot]}점
                </span>
              </div>
              {driver ? (
                <div className="relative flex flex-col items-center gap-1">
                  {driver.headshot_url && (
                    <Image
                      src={driver.headshot_url}
                      alt={driver.full_name}
                      width={64}
                      height={64}
                      className="h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16"
                    />
                  )}
                  <p className="text-(--color-title) text-center text-xs font-semibold sm:text-sm">
                    {driver.kr_name || driver.full_name}
                  </p>
                  <button
                    onClick={() => setSlot(slot, null)}
                    aria-label={`${SLOT_LABEL[slot]} 비우기`}
                    className="absolute -top-1 -right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-(--color-box-selected) text-(--color-text) hover:bg-(--color-box-hover)"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex h-16 w-12 items-center justify-center rounded-full border border-dashed border-(--color-border) text-(--color-placeholder) sm:h-20 sm:w-16">
                  ?
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 드라이버 그리드 */}
      <div>
        <p className="text-(--color-sub-text) mb-2 text-sm">드라이버 선택</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5">
          {drivers.map((d) => {
            const slot = filled.includes(d.driver_number)
              ? ([1, 2, 3] as Slot[]).find(
                  (s) => podium[s] === d.driver_number,
                )
              : null;
            const isSelected = !!slot;
            return (
              <button
                key={d.driver_number}
                onClick={() => onDriverClick(d.driver_number)}
                className={`relative flex cursor-pointer flex-col items-center gap-1 rounded-lg border p-2 transition-all active:scale-[0.97] ${
                  isSelected
                    ? 'border-(--color-accent) bg-(--color-accent-soft)'
                    : 'border-(--color-card-border) bg-(--color-card-bg) hover:bg-(--color-card-hover)'
                }`}
                style={
                  d.team_colour
                    ? {
                        boxShadow: isSelected
                          ? `inset 0 -3px 0 ${d.team_colour}`
                          : undefined,
                      }
                    : undefined
                }
              >
                {isSelected && slot && (
                  <span className="bg-(--color-accent) absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                    {SLOT_LABEL[slot]}
                  </span>
                )}
                {d.headshot_url && (
                  <Image
                    src={d.headshot_url}
                    alt={d.full_name}
                    width={56}
                    height={56}
                    className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
                  />
                )}
                <p className="text-(--color-title) text-center text-xs leading-tight font-semibold sm:text-sm">
                  {d.kr_name || d.full_name}
                </p>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: d.team_colour ?? 'var(--color-sub-text)' }}
                >
                  #{d.driver_number}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
            message.type === 'success'
              ? 'border-(--color-success)/40 bg-(--color-success)/10 text-(--color-success)'
              : 'border-(--color-accent)/40 bg-(--color-accent-soft) text-(--color-accent)'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
          {message.text}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={!isComplete || pending}
        className="bg-(--color-accent) flex h-12 cursor-pointer items-center justify-center rounded-lg font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pending ? '저장 중...' : isComplete ? '예측 저장' : '드라이버 3명을 선택하세요'}
      </button>
    </div>
  );
}
