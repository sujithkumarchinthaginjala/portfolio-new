import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { LayoutTemplate, Cpu, Compass, Activity, Database, Cloud, Users } from 'lucide-react';
import { NavTab } from '../types';
import { HorizontalTextReveal } from './HorizontalTextReveal';
import { LuxuryClockWallpaper } from './LuxuryClockWallpaper';

interface ExploreSectionProps {
  activeTab: NavTab;
  onOpenSignUpModal: () => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  activeTab,
  onOpenSignUpModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Clean exit opacity transition as JourneySection slides up from bottom
  const sectionContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.85, 0.96],
    [1, 1, 1, 0]
  );

  // Dynamic CSS blur for background text content ONLY when cards fly in and dwell
  const bgContentBlur = useTransform(
    scrollYProgress,
    [0.28, 0.44, 0.68, 0.80],
    ["blur(0px)", "blur(12px)", "blur(12px)", "blur(0px)"]
  );

  // Eyebrow entrance - strictly 0 at initial entry
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.04, 0.12], [0, 0, 1]);
  const eyebrowX = useTransform(scrollYProgress, [0, 0.04, 0.12], [30, 30, 0]);

  // Paragraph description entrance - strictly 0 at initial entry
  const descOpacity = useTransform(scrollYProgress, [0, 0.08, 0.22], [0, 0, 1]);
  const descY = useTransform(scrollYProgress, [0, 0.08, 0.22], [24, 24, 0]);

  // Bottom stats entrance - strictly 0 at initial entry
  const statsOpacity = useTransform(scrollYProgress, [0, 0.12, 0.26], [0, 0, 1]);
  const statsY = useTransform(scrollYProgress, [0, 0.12, 0.26], [20, 20, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative z-10 w-full h-[450vh] bg-black text-white"
    >
      <motion.div
        style={{ opacity: sectionContentOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none"
      >
        {/* Luxury Real-time Clock Wallpaper Background */}
        <LuxuryClockWallpaper scrollYProgress={scrollYProgress} />

        {/* Header Text with Dynamic Scroll Blur & Horizontal Text Reveal */}
        <motion.div
          style={{ filter: bgContentBlur }}
          className="absolute top-24 lg:top-32 inset-x-0 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 z-0 transition-all duration-300"
        >
          <div className="max-w-4xl">
            <motion.span
              style={{ opacity: eyebrowOpacity, x: eyebrowX }}
              className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#f05228] inline-block mb-3 font-mono bg-[#f05228]/10 border border-[#f05228]/30 px-3 py-1 rounded-md"
            >
              // ABOUT ME & PROFESSIONAL SUMMARY
            </motion.span>
            <HorizontalTextReveal
              as="h2"
              text="Engineering Scalable Enterprise Applications"
              progress={scrollYProgress}
              range={[0.02, 0.22]}
              startX={100}
              enableBlur={true}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight text-white"
              wordClassName="text-white font-extrabold"
            />
          </div>

          <motion.p
            style={{ opacity: descOpacity, y: descY }}
            className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed font-sans font-medium pb-2"
          >
            Java Full Stack Developer with experience developing enterprise web applications using Java, Spring Boot, Angular, Vue 3, SQL, and REST APIs. Skilled in designing scalable backend services, building responsive user interfaces, and collaborating within Agile teams.
          </motion.p>

        </motion.div>

        {/* Premium Bottom Left Content Fill with Dynamic Scroll Blur */}
        <motion.div
          style={{ filter: bgContentBlur, opacity: statsOpacity, y: statsY }}
          className="absolute bottom-24 lg:bottom-32 px-6 md:px-12 max-w-7xl mx-auto z-0 transition-all duration-300"
        >
          <div className="flex flex-wrap items-end gap-8 md:gap-16 pb-4 opacity-90 mt-12 md:mt-0">
            <div className="flex flex-col gap-1">
              <span className="font-display text-3xl md:text-5xl font-black text-white">1.5+</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Years Experience</span>
            </div>
            <div className="h-8 md:h-12 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex flex-col gap-1">
              <span className="font-display text-3xl md:text-5xl font-black text-white">100<span className="text-[#f05228]">%</span></span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Code Quality</span>
            </div>
            <div className="h-8 md:h-12 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f05228] animate-pulse shadow-[0_0_10px_rgba(240,82,40,0.8)]" />
                <span className="text-xs md:text-sm uppercase tracking-widest text-[#f05228] font-mono font-bold">Available to Build</span>
              </div>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Based in Hyderabad, IN</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Layer: Cards scroll starts ONLY AFTER header is in place (>= 0.30) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto z-10 perspective-[1000px]">

          {/* Card 1: Top Left - "Create" (Full Narrative) */}
          <FloatingCard
            scrollYProgress={scrollYProgress}
            enterX="-50vw" enterY="-30vh"
            scatterX="-28vw" scatterY="-12vh"
            exitX="-10vw" exitY="-5vh"
          >
            <div className="p-6 md:p-8 bg-white/[0.05] hover:bg-white/[0.09] border border-white/20 hover:border-[#f05228]/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_65px_rgba(240,82,40,0.35)] rounded-[32px] backdrop-blur-3xl w-[22rem] md:w-[28rem] flex flex-col gap-5 group transition-all duration-300 ring-1 ring-white/10">
              <div className="w-12 h-12 rounded-full bg-[#f05228]/20 flex items-center justify-center text-[#f05228] border border-[#f05228]/40 shadow-[0_0_12px_rgba(240,82,40,0.3)]">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-300/80 font-mono block mb-1">01 · CREATE</span>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Building Digital Experiences</h3>
                <p className="text-sm text-zinc-200/90 leading-relaxed font-medium">I transform ideas into modern digital experiences by combining intuitive design with scalable engineering. Every interface is crafted to be elegant, responsive, and purposeful—delivering products that feel as refined as they are functional.</p>
              </div>
            </div>
          </FloatingCard>

          {/* Card 2: Top Right - "Stats/Graphic" */}
          <FloatingCard
            scrollYProgress={scrollYProgress}
            enterX="50vw" enterY="-30vh"
            scatterX="28vw" scatterY="-24vh"
            exitX="10vw" exitY="-5vh"
          >
            <div className="p-6 bg-white/[0.05] hover:bg-white/[0.09] border border-white/20 hover:border-sky-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_65px_rgba(56,189,248,0.35)] rounded-[32px] backdrop-blur-3xl w-48 md:w-64 flex flex-col items-center text-center gap-3 group transition-all duration-300 ring-1 ring-white/10">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 mb-1 border border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-mono text-sm font-bold text-white tracking-widest uppercase">Performance</h3>
              <div className="flex items-end gap-1">
                <span className="font-display text-3xl font-black text-white">99.9</span>
                <span className="text-xs text-zinc-300/90 pb-1 font-medium">% Uptime</span>
              </div>
            </div>
          </FloatingCard>

          {/* Card 3: Mid Right - "Engineer" (Full Narrative) */}
          <FloatingCard
            scrollYProgress={scrollYProgress}
            enterX="50vw" enterY="0vh"
            scatterX="28vw" scatterY="6vh"
            exitX="12vw" exitY="2vh"
          >
            <div className="p-6 md:p-8 bg-white/[0.05] hover:bg-white/[0.09] border border-white/20 hover:border-indigo-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_65px_rgba(99,102,241,0.35)] rounded-[32px] backdrop-blur-3xl w-[22rem] md:w-[28rem] flex flex-col gap-5 group transition-all duration-300 ring-1 ring-white/10">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-300/80 font-mono">02 · ENGINEER</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Engineering with Purpose</h3>
                <p className="text-sm text-zinc-200/90 leading-relaxed font-medium">Behind every polished experience is a foundation built for reliability. I architect clean, maintainable systems with a focus on performance, scalability, and long-term sustainability—ensuring software evolves effortlessly as requirements grow.</p>
              </div>
            </div>
          </FloatingCard>

          {/* Card 4: Mid Left - "Data" */}
          <FloatingCard
            scrollYProgress={scrollYProgress}
            enterX="-50vw" enterY="0vh"
            scatterX="-38vw" scatterY="8vh"
            exitX="-12vw" exitY="2vh"
          >
            <div className="p-4 md:p-6 bg-white/[0.05] hover:bg-white/[0.09] border border-white/20 hover:border-pink-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_65px_rgba(236,72,153,0.35)] rounded-[32px] backdrop-blur-3xl w-48 md:w-60 flex gap-4 items-center group transition-all duration-300 ring-1 ring-white/10">
              <div className="w-10 h-10 shrink-0 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.3)]">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Data Systems</h3>
                <p className="text-[10px] text-zinc-300/90 font-medium mt-1">SQL / NoSQL / ORM</p>
              </div>
            </div>
          </FloatingCard>

          {/* Card 5: Bottom Left - "Cloud" */}
          <FloatingCard
            scrollYProgress={scrollYProgress}
            enterX="-50vw" enterY="50vh"
            scatterX="-32vw" scatterY="28vh"
            exitX="-8vw" exitY="10vh"
          >
            <div className="p-4 md:p-6 bg-white/[0.05] hover:bg-white/[0.09] border border-white/20 hover:border-cyan-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_65px_rgba(6,182,212,0.35)] rounded-[32px] backdrop-blur-3xl w-48 md:w-60 flex gap-4 items-center group transition-all duration-300 ring-1 ring-white/10">
              <div className="w-10 h-10 shrink-0 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Cloud Native</h3>
                <p className="text-[10px] text-zinc-300/90 font-medium mt-1">AWS / Docker / CI/CD</p>
              </div>
            </div>
          </FloatingCard>

          {/* Card 6: Bottom Right - "Agile" */}
          <FloatingCard
            scrollYProgress={scrollYProgress}
            enterX="50vw" enterY="50vh"
            scatterX="32vw" scatterY="28vh"
            exitX="8vw" exitY="10vh"
          >
            <div className="p-4 md:p-6 bg-white/[0.05] hover:bg-white/[0.09] border border-white/20 hover:border-emerald-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_65px_rgba(16,185,129,0.35)] rounded-[32px] backdrop-blur-3xl w-48 md:w-60 flex flex-col gap-3 group transition-all duration-300 ring-1 ring-white/10">
              <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Agile Delivery</h3>
                <p className="text-[10px] text-zinc-300/90 font-medium mt-1">Leading sprints & teams.</p>
              </div>
            </div>
          </FloatingCard>

          {/* Card 7: Bottom Center - "Evolve" (Full Narrative) */}
          <FloatingCard
            scrollYProgress={scrollYProgress}
            enterX="0vw" enterY="50vh"
            scatterX="0vw" scatterY="29vh"
            exitX="0vw" exitY="8vh"
          >
            <div className="p-6 md:p-8 bg-white/[0.05] hover:bg-white/[0.09] border border-white/20 hover:border-purple-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_65px_rgba(168,85,247,0.35)] rounded-[32px] backdrop-blur-3xl w-[22rem] md:w-[28rem] flex flex-col gap-5 group transition-all duration-300 ring-1 ring-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-300/80 font-mono">03 · EVOLVE</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Driven by Innovation</h3>
                <p className="text-sm text-zinc-200/90 leading-relaxed font-medium">Technology never stands still, and neither do I. By embracing continuous learning, modern development practices, and emerging technologies, I build solutions that are ready for today's challenges and tomorrow's opportunities.</p>
              </div>
            </div>
          </FloatingCard>

        </div>
      </motion.div>
    </section>
  );
};

// Sub-component for animating individual cards
interface FloatingCardProps {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  enterX: string; enterY: string;
  scatterX: string; scatterY: string;
  exitX: string; exitY: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  children, scrollYProgress,
  enterX, enterY,
  scatterX, scatterY,
  exitX, exitY
}) => {
  // Keyframes for scroll progress:
  // 0.00 - 0.30 : Hidden offscreen while header reveals and rests clearly in view
  // 0.30 - 0.48 : Fly in to scatter position
  // 0.48 - 0.68 : Dwell in scatter position
  // 0.68 - 0.84 : Fly out
  // 0.84 - 1.00 : Gone

  const x = useTransform(
    scrollYProgress,
    [0, 0.30, 0.48, 0.68, 0.84, 1],
    [enterX, enterX, scatterX, scatterX, exitX, exitX]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.30, 0.48, 0.68, 0.84, 1],
    [enterY, enterY, scatterY, scatterY, exitY, exitY]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.30, 0.48, 0.68, 0.84, 1],
    [0, 0, 1, 1, 0, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.30, 0.48, 0.68, 0.84, 1],
    [0.8, 0.8, 1, 1, 0.8, 0.8]
  );

  return (
    <motion.div
      style={{ x, y, opacity, scale, position: 'absolute' }}
      className="will-change-transform flex justify-center items-center"
    >
      {children}
    </motion.div>
  );
};
