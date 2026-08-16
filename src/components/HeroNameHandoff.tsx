import React from 'react';
import { motion, MotionValue, useMotionValue, useScroll } from 'motion/react';
import { SujithGlowText } from './SujithGlowText';

interface HeroNameHandoffProps {
  nameRef: React.RefObject<HTMLHeadingElement | null>;
  exploreRef: React.RefObject<HTMLDivElement | null>;
  sourceOpacity: MotionValue<number>;
}

/**
 * Transfers the title from the hero to the leading edge of the Explore surface.
 * The handoff is derived from the elements' live bounds, rather than a viewport
 * height or a guessed scroll-progress value, so typography and layout changes
 * cannot desynchronise it.
 */
export const HeroNameHandoff: React.FC<HeroNameHandoffProps> = ({ nameRef, exploreRef, sourceOpacity }) => {
  const { scrollY } = useScroll();
  const top = useMotionValue(-1000);
  const left = useMotionValue(-1000);
  const width = useMotionValue(0);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(1);

  const update = React.useCallback(() => {
    const name = nameRef.current;
    const explore = exploreRef.current;
    if (!name || !explore) return;

    const nameBounds = name.getBoundingClientRect();
    const exploreTop = explore.getBoundingClientRect().top;
    const isAttached = exploreTop <= nameBounds.bottom && exploreTop > -nameBounds.height;

    left.set(nameBounds.left);
    width.set(nameBounds.width);

    if (isAttached) {
      // Keep the bottom of the title flush with the rising Explore surface.
      top.set(exploreTop - nameBounds.height);
      opacity.set(1);
      sourceOpacity.set(0);

      // Gradually reduce font size (scale 1.0 -> 0.45) as Explore section scrolls up
      const shrinkProgress = Math.max(0, Math.min(1, (nameBounds.bottom - exploreTop) / 700));
      scale.set(1 - shrinkProgress * 0.55);
    } else {
      opacity.set(0);
      sourceOpacity.set(1);
      scale.set(1);
    }
  }, [exploreRef, left, nameRef, opacity, scale, sourceOpacity, top, width]);

  React.useEffect(() => {
    update();
    const resizeObserver = new ResizeObserver(update);
    if (nameRef.current) resizeObserver.observe(nameRef.current);
    if (exploreRef.current) resizeObserver.observe(exploreRef.current);
    window.addEventListener('resize', update);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [exploreRef, nameRef, update]);

  React.useEffect(() => scrollY.on('change', update), [scrollY, update]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed z-30 pointer-events-none select-none"
      style={{ top, left, width, opacity }}
    >
      <SujithGlowText scale={scale} />
    </motion.div>
  );
};
