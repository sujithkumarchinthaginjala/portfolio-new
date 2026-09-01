import React, { useEffect, useState } from 'react';
import { motion, useTransform, MotionValue } from 'motion/react';

interface LuxuryClockWallpaperProps {
  scrollYProgress: MotionValue<number>;
}

export const LuxuryClockWallpaper: React.FC<LuxuryClockWallpaperProps> = ({
  scrollYProgress,
}) => {
  // Live real-time clock angles with mechanical spring-ticking motion
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    let animationFrameId: number;
    const update = () => {
      setTime(new Date());
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Authentic mechanical watch escapement tick physics (snappy snap + elastic micro-settle on every second)
  const tickProgress = Math.min(1, milliseconds / 140);
  const easeOutBack = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };
  const tickOffset = tickProgress < 1 ? easeOutBack(tickProgress) : 1;
  const smoothSeconds = seconds + tickOffset;

  // Hand angles
  const secondAngle = smoothSeconds * 6; // 360 / 60
  const minuteAngle = (minutes + seconds / 60 + milliseconds / 60000) * 6; // 360 / 60
  const hourAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30; // 360 / 12

  // Scroll-linked scale: Full size during initial entry & header reveal, then smoothly reduces in the center as cards scatter around it
  const wallpaperScale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.38, 0.76, 0.96],
    [1.0, 1.0, 0.46, 0.46, 0.38]
  );

  // Scroll-linked Y-offset: shifts gracefully upward so it is completely visible above bottom cards
  const wallpaperY = useTransform(
    scrollYProgress,
    [0, 0.22, 0.38, 0.76, 0.96],
    [0, 0, -120, -120, -150]
  );

  const wallpaperOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.78, 0.96],
    [0.92, 1, 1, 0.2]
  );

  // 12 hour positions matching theme color (#f05228)
  const indices = [
    { hour: 12, deg: 0, isCardinalLong: false },
    { hour: 1, deg: 30, isCardinalLong: false },
    { hour: 2, deg: 60, isCardinalLong: false },
    { hour: 3, deg: 90, isCardinalLong: true },
    { hour: 4, deg: 120, isCardinalLong: false },
    { hour: 5, deg: 150, isCardinalLong: false },
    { hour: 6, deg: 180, isCardinalLong: false },
    { hour: 7, deg: 210, isCardinalLong: false },
    { hour: 8, deg: 240, isCardinalLong: false },
    { hour: 9, deg: 270, isCardinalLong: true },
    { hour: 10, deg: 300, isCardinalLong: false },
    { hour: 11, deg: 330, isCardinalLong: false },
  ];

  // Increased dial radius for grand wallpaper presence
  const dialRadius = 310; // px distance from center to marker center

  return (
    <div className="absolute inset-0 bg-[#000000] overflow-hidden pointer-events-none z-0 flex items-center justify-center select-none">
      {/* 1. Grand Deep Atmospheric Portfolio Theme Glow (Fiery Amber/Orange #f05228 Ambient Lighting) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 750px at 50% 50%, rgba(240, 82, 40, 0.12) 0%, rgba(234, 88, 12, 0.05) 45%, transparent 75%),
            radial-gradient(ellipse 90% 80% at 50% 50%, rgba(240, 82, 40, 0.05) 0%, transparent 80%),
            #000000
          `,
        }}
      />

      {/* 2. Central Luxury Timepiece Surface Container (Scaled Up to 850px) */}
      <motion.div
        style={{
          opacity: wallpaperOpacity,
          scale: wallpaperScale,
          y: wallpaperY,
        }}
        className="relative w-[850px] h-[850px] flex items-center justify-center will-change-transform"
      >
        {/* Grand Soft Ambient Core Halo in Theme Colors */}
        <div className="absolute w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle_at_center,rgba(240,82,40,0.16)_0%,rgba(251,146,60,0.06)_50%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* 3. The 12 Luminous Theme Glass Capsule Markers */}
        {indices.map((item) => {
          const rad = ((item.deg - 90) * Math.PI) / 180;
          const x = Math.cos(rad) * dialRadius;
          const y = Math.sin(rad) * dialRadius;

          if (item.isCardinalLong) {
            // Elongated Horizontal Pill Capsule (9 o'clock & 3 o'clock) - Scaled Up
            const isLeft = item.hour === 9;
            const longWidth = 120;
            const longHeight = 24;
            const offsetX = isLeft ? -dialRadius + 30 : dialRadius - 30;

            return (
              <div
                key={`index-${item.hour}`}
                className="absolute flex items-center justify-center"
                style={{
                  left: `calc(50% + ${offsetX - longWidth / 2}px)`,
                  top: `calc(50% - ${longHeight / 2}px)`,
                  width: `${longWidth}px`,
                  height: `${longHeight}px`,
                }}
              >
                {/* Outer Orange Glow Halo */}
                <div 
                  className="absolute inset-0 rounded-full blur-lg opacity-90"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(240, 82, 40, 0.9) 0%, rgba(234, 88, 12, 0.5) 60%, transparent 100%)',
                  }}
                />

                {/* 3D Glass Pill Capsule Body in Portfolio Theme Orange */}
                <div
                  className="relative w-full h-full rounded-full border border-orange-300/40 overflow-hidden shadow-[0_0_30px_rgba(240,82,40,0.8),inset_0_1.5px_4px_rgba(255,255,255,0.85),inset_0_-1.5px_4px_rgba(0,0,0,0.9)]"
                  style={{
                    background: `
                      linear-gradient(180deg, 
                        rgba(255, 255, 255, 0.55) 0%, 
                        rgba(251, 146, 60, 0.95) 22%, 
                        rgba(240, 82, 40, 0.92) 58%, 
                        rgba(30, 10, 5, 0.98) 100%
                      )
                    `,
                  }}
                >
                  {/* Internal Liquid Bioluminescent Beam Highlight */}
                  <div className="absolute inset-x-3 top-1.5 h-[4.5px] rounded-full bg-gradient-to-r from-transparent via-white/95 to-transparent blur-[0.4px]" />
                  <div className="absolute inset-x-6 bottom-1.5 h-[2.5px] rounded-full bg-amber-200/50 blur-[0.6px]" />
                </div>
              </div>
            );
          }

          // Regular Hour Pill Capsule - Scaled Up
          const capsuleWidth = 13;
          const capsuleHeight = 36;

          return (
            <div
              key={`index-${item.hour}`}
              className="absolute flex items-center justify-center"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: `${capsuleWidth}px`,
                height: `${capsuleHeight}px`,
                transform: `translate(-50%, -50%) rotate(${item.deg}deg)`,
              }}
            >
              {/* Outer Orange Glow Halo */}
              <div 
                className="absolute inset-0 rounded-full blur-md opacity-85"
                style={{
                  background: 'radial-gradient(circle at center, rgba(240, 82, 40, 0.8) 0%, rgba(234, 88, 12, 0.4) 60%, transparent 100%)',
                }}
              />

              {/* 3D Glass Pill Capsule Body */}
              <div
                className="relative w-full h-full rounded-full border border-orange-300/45 overflow-hidden shadow-[0_0_20px_rgba(240,82,40,0.7),inset_0_1.5px_3px_rgba(255,255,255,0.9),inset_0_-1.5px_3px_rgba(0,0,0,0.9)]"
                style={{
                  background: `
                    linear-gradient(180deg, 
                      rgba(255, 255, 255, 0.6) 0%, 
                      rgba(251, 146, 60, 0.95) 28%, 
                      rgba(240, 82, 40, 0.85) 65%, 
                      rgba(25, 8, 3, 0.98) 100%
                    )
                  `,
                }}
              >
                {/* Top Specular Highlight */}
                <div className="absolute inset-x-1 top-0.5 h-[2.5px] rounded-full bg-white/95 blur-[0.2px]" />
              </div>
            </div>
          );
        })}

        {/* 4. Scaled Luxury Timepiece Needles (Clock Hands) */}

        {/* Hour Hand */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: '6px',
            height: '160px',
            transformOrigin: '50% 100%',
            transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          }}
        >
          {/* Subtle Ambient Hand Drop Shadow */}
          <div className="absolute inset-0 bg-black/75 blur-[4px] translate-y-1.5 translate-x-1" />
          {/* Metallic Tapered Needle */}
          <div 
            className="relative w-full h-full rounded-full border border-orange-300/35 shadow-[0_0_14px_rgba(240,82,40,0.6)]"
            style={{
              background: 'linear-gradient(to top, #1c0b05 0%, #ea580c 55%, #fed7aa 100%)',
              clipPath: 'polygon(30% 100%, 70% 100%, 100% 15%, 50% 0%, 0% 15%)',
            }}
          />
        </div>

        {/* Minute Hand */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: '5px',
            height: '250px',
            transformOrigin: '50% 100%',
            transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
          }}
        >
          {/* Subtle Hand Drop Shadow */}
          <div className="absolute inset-0 bg-black/75 blur-[4px] translate-y-1.5 translate-x-1" />
          {/* Sleek Extended Needle */}
          <div 
            className="relative w-full h-full rounded-full border border-orange-200/50 shadow-[0_0_20px_rgba(240,82,40,0.8)]"
            style={{
              background: 'linear-gradient(to top, #1c0b05 0%, #f05228 50%, #ffffff 100%)',
              clipPath: 'polygon(35% 100%, 65% 100%, 100% 10%, 50% 0%, 0% 10%)',
            }}
          >
            {/* Center Luminous Spine */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[1.5px] h-40 bg-white/95 shadow-[0_0_6px_#ffffff]" />
          </div>
        </div>

        {/* Counter-Weight Needle Tail for Minute Hand */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: '5px',
            height: '50px',
            transformOrigin: '50% 0%',
            transform: `translate(-50%, 0%) rotate(${minuteAngle}deg)`,
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #f05228, #1c0b05)',
            }}
          />
        </div>

        {/* 5. Motion Ticking Second Hand (Live Escapement Snapping Tick) */}
        <div
          className="absolute pointer-events-none will-change-transform z-20"
          style={{
            left: '50%',
            top: '50%',
            width: '2.4px',
            height: '280px',
            transformOrigin: '50% 100%',
            transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
          }}
        >
          {/* Second Hand Drop Shadow */}
          <div className="absolute inset-0 bg-black/60 blur-[2px] translate-y-1.5 translate-x-1" />
          
          {/* Second Hand Stem in Theme Orange with High-Glow Tip */}
          <div 
            className="relative w-full h-full rounded-full shadow-[0_0_12px_rgba(240,82,40,0.9)]"
            style={{
              background: 'linear-gradient(to top, #ea580c 0%, #f05228 70%, #ffedd5 100%)',
            }}
          >
            {/* Luminous Tip Pointer */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#f05228] shadow-[0_0_14px_#f05228,0_0_20px_#ffffff]" />
          </div>
        </div>

        {/* Second Hand Counter-Weight Tail with Ring */}
        <div
          className="absolute pointer-events-none will-change-transform z-20"
          style={{
            left: '50%',
            top: '50%',
            width: '2.4px',
            height: '60px',
            transformOrigin: '50% 0%',
            transform: `translate(-50%, 0%) rotate(${secondAngle}deg)`,
          }}
        >
          <div 
            className="w-full h-full rounded-full bg-[#f05228] relative flex flex-col items-center justify-end"
          >
            {/* Counterbalance Ring */}
            <div className="w-4 h-4 rounded-full border-[1.5px] border-[#f05228] bg-black/85 -mb-2 shadow-[0_0_8px_rgba(240,82,40,0.7)]" />
          </div>
        </div>

        {/* 6. Center Beveled Metallic Pivot Knob (Pin) in Theme Orange / Gold (Scaled to 32px) */}
        <div className="relative z-30 w-8 h-8 rounded-full border border-orange-300/80 shadow-[0_3px_15px_rgba(0,0,0,0.95),0_0_22px_rgba(240,82,40,0.8)] flex items-center justify-center">
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `
                radial-gradient(circle at 35% 35%, 
                  #ffffff 0%, 
                  #fed7aa 22%, 
                  #f05228 55%, 
                  #7c2d12 85%, 
                  #1c0b05 100%
                )
              `,
            }}
          />
          {/* Central Specular Dot */}
          <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>

      </motion.div>
    </div>
  );
};

export default LuxuryClockWallpaper;
