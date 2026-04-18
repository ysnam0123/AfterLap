'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface CountUpProps {
  value: number;
  className?: string;
}

/**
 * 숫자가 0에서 목표값까지 spring 애니메이션으로 카운트업되는 컴포넌트.
 * framer-motion useSpring 활용.
 */
export default function CountUp({ value, className }: CountUpProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 25,
  });
  const display = useTransform(springValue, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
}
