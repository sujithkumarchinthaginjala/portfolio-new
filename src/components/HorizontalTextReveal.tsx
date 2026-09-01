import React from 'react';
import { motion, useTransform, MotionValue } from 'motion/react';

interface HorizontalTextRevealProps {
  text: string;
  progress: MotionValue<number>;
  range?: [number, number];
  className?: string;
  wordClassName?: string;
  startX?: number;
  enableBlur?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
}

interface WordRevealProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  startX: number;
  enableBlur: boolean;
  wordClassName?: string;
}

const WordReveal: React.FC<WordRevealProps> = ({
  word,
  index,
  total,
  progress,
  range,
  startX,
  enableBlur,
  wordClassName = '',
}) => {
  const [rangeStart, rangeEnd] = range;
  const totalSpan = Math.max(0.001, rangeEnd - rangeStart);
  
  // Calculate smooth staggered thresholds with overlapping windows
  const step = totalSpan / Math.max(1, total);
  const wordStart = rangeStart + index * (step * 0.82);
  const wordEnd = Math.min(rangeEnd, wordStart + step * 1.6);

  // Strictly invisible before wordStart so words literally emerge out of nowhere
  const opacity = useTransform(
    progress,
    [0, Math.max(0, wordStart - 0.005), wordStart, wordEnd],
    [0, 0, 0, 1]
  );

  const x = useTransform(
    progress,
    [0, Math.max(0, wordStart - 0.005), wordStart, wordEnd],
    [startX, startX, startX, 0]
  );

  const filter = useTransform(
    progress,
    [0, Math.max(0, wordStart - 0.005), wordStart, wordEnd],
    enableBlur ? ['blur(6px)', 'blur(6px)', 'blur(6px)', 'blur(0px)'] : ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
  );

  return (
    <span className="inline-block overflow-visible whitespace-nowrap mr-[0.28em] last:mr-0">
      <motion.span
        style={{
          opacity,
          x,
          filter,
          display: 'inline-block',
          willChange: 'transform, opacity, filter',
        }}
        className={wordClassName}
      >
        {word}
      </motion.span>
    </span>
  );
};

export const HorizontalTextReveal: React.FC<HorizontalTextRevealProps> = ({
  text,
  progress,
  range = [0, 0.25],
  className = '',
  wordClassName = '',
  startX = 80,
  enableBlur = true,
  as: Component = 'div',
}) => {
  // Split words while preserving punctuation
  const words = React.useMemo(() => text.trim().split(/\s+/), [text]);

  return (
    <Component className={`flex flex-wrap items-baseline ${className}`}>
      {words.map((word, i) => (
        <WordReveal
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={progress}
          range={range}
          startX={startX}
          enableBlur={enableBlur}
          wordClassName={wordClassName}
        />
      ))}
    </Component>
  );
};

export default HorizontalTextReveal;
