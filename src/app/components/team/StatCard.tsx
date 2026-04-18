'use client';

import { useState } from 'react';
import CountUp from '@/app/components/common/CountUp';

interface StatCardProps {
  label: string;
  value: string | number;
  teamColor: string;
}

export function StatCard({ label, value, teamColor }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-default border-2 border-neutral-800 bg-[#111] p-3 transition-all duration-200 select-none sm:p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderBottomColor: isHovered ? teamColor : '',
        borderBottomWidth: isHovered ? '2px' : '1px',
      }}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[14px] tracking-wider text-neutral-500 uppercase">
          {label}
        </p>
        <p className="text-[20px] font-semibold tracking-tight sm:text-3xl">
          {typeof value === 'number' ? (
            <CountUp value={value} />
          ) : (
            value
          )}
        </p>
      </div>
    </div>
  );
}
