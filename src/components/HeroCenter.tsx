import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { Code, Terminal, Sparkles, Send, FileText, Download } from 'lucide-react';
import { openPrintableResume, downloadResume } from '../utils/downloadResume';
import { EASE_OUT } from '../utils/animations';

interface HeroCenterProps {
  onOpenSignUpModal: () => void;
  scrollYProgress?: MotionValue<number>;
  nameRef: React.RefObject<HTMLHeadingElement | null>;
  nameOpacity: MotionValue<number>;
}

export const HeroCenter: React.FC<HeroCenterProps> = ({
  onOpenSignUpModal,
  scrollYProgress,
  nameRef,
  nameOpacity
}) => {
  return (
    <div id="home" className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-6 md:px-12 max-w-7xl mx-auto my-auto py-12 min-h-[62vh]">
      <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center gap-8 my-auto">

        {/* Left Column: Stylized Tagline Paragraph with Bold Typography micro labels */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE_OUT }}
          className="md:col-span-5 text-left order-2 md:order-1 flex flex-col justify-center space-y-4"
        >
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f05228] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#f05228] font-mono">
              Java Full Stack Developer
            </span>
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-md font-sans font-medium tracking-tight">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-white inline-block mr-1 leading-none text-[#f05228]">
              J
            </span>
            ava Full Stack Developer with experience building scalable enterprise web applications using Java, Spring Boot, Angular, Vue 3, SQL, and REST APIs. Designing production-ready backend services and high-performance UI components.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase">
              Spring Boot
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase">
              Angular
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase">
              Vue 3
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase">
              REST APIs
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase">
              PostgreSQL / SQL
            </span>
          </div>

          {/* Direct Hero CTA for Resume */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={openPrintableResume}
              className="px-5 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-[#f05228] font-mono text-xs uppercase font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg group"
            >
              <FileText className="w-4 h-4 text-[#f05228] group-hover:scale-110 transition-transform" />
              <span>Download Resume</span>
              <Download className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Center/Main Title Column: Ultra Bold Typography Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
          className="md:col-span-7 flex flex-col items-center md:items-end text-center md:text-right order-1 md:order-2"
        >
          <motion.h1
            ref={nameRef}
            style={{ opacity: nameOpacity }}
            className="font-display text-[55px] sm:text-[95px] md:text-[110px] lg:text-[135px] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] select-none text-white"
          >
            SUJITH
          </motion.h1>
          <div className="font-display text-[30px] sm:text-[50px] md:text-[60px] lg:text-[75px] font-extrabold uppercase tracking-[-0.02em] text-[#f05228] leading-[0.95] select-none -mt-2">
            KUMAR
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE_OUT }}
            className="flex items-center gap-4 mt-4"
          >
            <span className="h-[1px] w-8 sm:w-12 bg-zinc-600 hidden sm:block" />
            <span className="text-zinc-400 text-xs sm:text-sm tracking-[0.25em] uppercase font-bold font-mono">
              INU Tech • Enterprise Solutions • 2026
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Circular "Hire Me" Badge & Action Row below Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75, ease: EASE_OUT }}
        className="mt-8 md:mt-12 mb-4 flex items-center justify-center gap-6"
      >
        <div className="relative group cursor-pointer" onClick={onOpenSignUpModal}>
          {/* Subtle Outer Rings */}
          <div className="absolute -inset-5 rounded-full border border-[#f05228]/40 animate-ping opacity-30 pointer-events-none" />
          <div className="absolute -inset-3 rounded-full border border-zinc-700/60 group-hover:scale-110 transition-transform duration-500 bg-zinc-900/50" />

          {/* Main Solid Badge */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f05228] text-white font-display font-extrabold text-xs sm:text-sm flex flex-col items-center justify-center tracking-tight shadow-2xl group-hover:bg-[#e0431a] transition-colors"
          >
            <span>Hire</span>
            <span className="leading-tight">Me</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

