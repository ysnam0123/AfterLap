'use client';
import React, { useRef, useEffect, useState } from 'react';

interface CSSAnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
}

export default function CSSAnimatedContent({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = '',
  style,
  ...props
}: CSSAnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const axis = direction === 'horizontal' ? 'X' : 'Y';
  const offset = reverse ? -distance : distance;

  const hiddenStyle: React.CSSProperties = {
    opacity: animateOpacity ? initialOpacity : 1,
    transform: `translate${axis}(${offset}px) scale(${scale})`,
    visibility: 'visible',
  };

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: `translate${axis}(0px) scale(1)`,
    transition: `opacity ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}s, transform ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}s`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...hiddenStyle, ...(visible ? visibleStyle : {}), ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
