import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, MotionValue } from 'motion/react';

interface SujithGlowTextProps {
  className?: string;
  nameRef?: React.RefObject<HTMLHeadingElement | null>;
  sujithY?: MotionValue<string>;
  sujithColor?: MotionValue<string>;
  nameOpacity?: MotionValue<number>;
  scale?: MotionValue<number> | number;
}

// -------------------------------------------------------------
// THREE.JS UNIFIED GLOW LIGHT CANVAS
// -------------------------------------------------------------
const GlowingLightScene: React.FC = () => {
  return (
    <group>
      {/* Soft Ambient & Point Light Beam illuminating the whole name */}
      <pointLight color="#f05228" intensity={6} distance={6} position={[0, 0, 1.2]} />
      <pointLight color="#ffffff" intensity={3} distance={3} position={[0, 0, 1.5]} />
    </group>
  );
};

// -------------------------------------------------------------
// UNIFIED THREE.JS GLOW TEXT COMPONENT (SOFT WHITE WITH ORANGE GLOW)
// -------------------------------------------------------------
export const SujithGlowText: React.FC<SujithGlowTextProps> = ({
  className,
  nameRef,
  sujithY,
  sujithColor,
  nameOpacity,
  scale,
}) => {
  return (
    <div className={`relative inline-block ${className || ''}`}>
      {/* 3D Three.js WebGL Canvas Overlay */}
      <div className="absolute -inset-x-12 -inset-y-8 pointer-events-none z-10 overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <GlowingLightScene />
        </Canvas>
      </div>

      {/* White Name Title Header with Soft Orange Glow */}
      <motion.h1
        ref={nameRef}
        style={{
          y: sujithY,
          color: sujithColor,
          opacity: nameOpacity,
          scale: scale || 1,
        }}
        className="font-display text-[55px] sm:text-[95px] md:text-[110px] lg:text-[135px] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] select-none text-white relative z-20 origin-right [filter:drop-shadow(0_0_15px_rgba(240,82,40,0.5))] [text-shadow:0_0_12px_rgba(240,82,40,0.5),0_0_24px_rgba(240,82,40,0.25)]"
      >
        SUJITH
      </motion.h1>
    </div>
  );
};
