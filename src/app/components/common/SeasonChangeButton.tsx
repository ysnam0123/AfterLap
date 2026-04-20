'use client';
import { ChevronDown } from 'lucide-react';
import AnimatedContent from '@/components/AnimatedContent';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';

export default function SeasonChangeButton({
  opened,
  setOpenedAction,
  years,
  selectedYear,
  setSelectedYearAction,
  className,
}: {
  opened: boolean;
  setOpenedAction: (state: boolean) => void;
  years: number[];
  selectedYear: number;
  setSelectedYearAction: (year: number) => void;
  className?: string;
}) {
  return (
    <>
      <div className="relative z-30">
        <motion.button
          onClick={() => setOpenedAction(!opened)}
          className={twMerge(
            `mb-2.5 flex h-8 w-21 cursor-pointer items-center justify-center gap-1 rounded-[10px] border border-white/10 bg-(--color-box-bg) text-[14px] font-bold sm:mb-10 sm:h-12.5 sm:w-36 sm:text-[20px] sm:hover:bg-[#4b4b4b]`,
            className,
          )}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <span>{selectedYear}</span>
          <ChevronDown
            className={`h-4.5 w-4.5 transition-transform sm:h-6 sm:w-6 ${opened ? 'rotate-180' : ''}`}
          />
        </motion.button>
        {opened && (
          <AnimatedContent
            distance={3}
            direction="vertical"
            reverse={true}
            duration={0.6}
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0}
            delay={0}
            className="absolute top-full z-800"
          >
            <ul className="w-21 rounded-[10px] border border-white/10 bg-(--color-box-bg) text-center text-[20px] font-bold sm:w-36">
              {years.map((year) => (
                <li
                  key={year}
                  onClick={() => {
                    setSelectedYearAction(year);
                    setOpenedAction(false);
                  }}
                  className="flex h-12.5 cursor-pointer items-center justify-center hover:bg-[#464646]"
                >
                  {year}
                </li>
              ))}
            </ul>
          </AnimatedContent>
        )}
      </div>
    </>
  );
}
