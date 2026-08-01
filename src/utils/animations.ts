/**
 * Shared premium motion primitives.
 *
 * These are intentionally minimal, transform/opacity-first, and tuned for a
 * calm, cinematic feel (Linear / Apple / Stripe). Every consumer keeps its own
 * markup — these only supply timing, easing and MotionValues.
 */
import { RefObject } from 'react';
import {
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type Variants,
} from 'motion/react';

/* ------------------------------------------------------------------ */
/* Easing curves                                                       */
/* ------------------------------------------------------------------ */

/** Soft, decelerating ease-out — the workhorse for reveals. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Gentle symmetric ease-in-out — for content that both enters and exits. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/* ------------------------------------------------------------------ */
/* Section scroll effect                                               */
/* ------------------------------------------------------------------ */

/**
 * Drives a whole section through a scroll-linked reveal:
 *  - fades + rises in as it enters from below
 *  - holds fully visible while it owns the viewport
 *  - softly fades + blurs + lifts away as it leaves upward
 *
 * Transitions of adjacent sections overlap naturally, so there are no abrupt
 * cuts. Returns an object you spread onto a `motion.section`. When the user
 * prefers reduced motion, it returns an empty object (section stays static).
 */
export function useSectionScrollFx(ref: RefObject<HTMLElement | null>) {
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Reveal early, hold on a long plateau, release late.
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.16, 0.9, 1], [34, 0, 0, -24]);
  const blur = useTransform(scrollYProgress, [0, 0.13, 0.88, 1], [4, 0, 0, 3]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  if (prefersReduced) return {} as const;

  return {
    style: {
      opacity,
      y,
      filter,
      willChange: 'transform, opacity, filter',
    },
  } as const;
}

/* ------------------------------------------------------------------ */
/* Staggered content reveal                                            */
/* ------------------------------------------------------------------ */

/** Container variant — cascades its children in on view. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Child variant — opacity + a slight lift. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/** Shared viewport config so reveals trigger consistently and only once. */
export const revealViewport = { once: true, margin: '-80px' } as const;

/* ------------------------------------------------------------------ */
/* Content-switch transitions (projects, skills, certs)               */
/* ------------------------------------------------------------------ */

/**
 * Horizontal cross-fade with a whisper of blur for switching between items
 * inside an `AnimatePresence mode="wait"`. Current content drifts out and
 * blurs; incoming content arrives from the opposite side and sharpens.
 */
export const switchPanel: Variants = {
  initial: { opacity: 0, x: 16, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    x: -16,
    filter: 'blur(6px)',
    transition: { duration: 0.35, ease: EASE_IN_OUT },
  },
};
