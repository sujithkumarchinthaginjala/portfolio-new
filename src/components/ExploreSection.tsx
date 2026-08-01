import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Server, Database, Layers } from 'lucide-react';
import { NavTab } from '../types';
import {
  useSectionScrollFx,
  staggerContainer,
  staggerItem,
  revealViewport,
  EASE_OUT,
} from '../utils/animations';

interface ExploreSectionProps {
  activeTab: NavTab;
  onOpenSignUpModal: () => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  activeTab,
  onOpenSignUpModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollFx = useSectionScrollFx(sectionRef);

  return (
    <motion.section
      ref={sectionRef}
      {...scrollFx}
      id="about"
      className="relative z-10 w-full py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-800 text-white"
    >
      {/* Section Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          <motion.span variants={staggerItem} className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#f05228] block mb-2 font-mono">
            // ABOUT ME & PROFESSIONAL SUMMARY
          </motion.span>
          <motion.h2 variants={staggerItem} className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight">
            Engineering Scalable Enterprise Applications
          </motion.h2>
        </div>
        <motion.p variants={staggerItem} className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed font-sans font-medium">
          Java Full Stack Developer with experience developing enterprise web applications using Java, Spring Boot, Angular, Vue 3, SQL, and REST APIs. Skilled in designing scalable backend services, building responsive user interfaces, and collaborating within Agile teams.
        </motion.p>
      </motion.div>

      {/* Grid Features */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE_OUT } }}
          className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex flex-col justify-between group hover:border-[#f05228]/60 hover:shadow-[0_20px_50px_-20px_rgba(240,82,40,0.35)] transition-all shadow-xl"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700 text-[#f05228]">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">Backend & Microservices</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              Designing RESTful APIs and backend business logic using Java, Spring Boot, Spring Framework 6, and Hibernate/JPA ORM frameworks.
            </p>
          </div>
          <button
            onClick={onOpenSignUpModal}
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f05228] group-hover:translate-x-1 transition-transform cursor-pointer"
          >
            <span>Learn More</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        <motion.div
          variants={staggerItem}
          whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE_OUT } }}
          className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex flex-col justify-between group hover:border-[#f05228]/60 hover:shadow-[0_20px_50px_-20px_rgba(240,82,40,0.35)] transition-all shadow-xl"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700 text-[#f05228]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">Modern Frontend UI</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              Building responsive single-page web applications with Angular 21, Vue 3 Composition API, TypeScript, and optimized asset delivery.
            </p>
          </div>
          <button
            onClick={onOpenSignUpModal}
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f05228] group-hover:translate-x-1 transition-transform cursor-pointer"
          >
            <span>View Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        <motion.div
          variants={staggerItem}
          whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE_OUT } }}
          className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex flex-col justify-between group hover:border-[#f05228]/60 hover:shadow-[0_20px_50px_-20px_rgba(240,82,40,0.35)] transition-all shadow-xl"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700 text-[#f05228]">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">Databases & DevOps</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              Structured database operations in MySQL and PostgreSQL, version control with Git/GitHub, Maven builds, and AWS cloud basics.
            </p>
          </div>
          <button
            onClick={onOpenSignUpModal}
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f05228] group-hover:translate-x-1 transition-transform cursor-pointer"
          >
            <span>Explore Stack</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Footer Credits */}
      <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-mono">
        <div>SUJITH KUMAR CHINTHAGINJALA // JAVA FULL STACK DEVELOPER</div>
        <div className="flex items-center gap-4">
          <span>HYDERABAD, INDIA • +91-6302487572</span>
        </div>
      </div>
    </motion.section>
  );
};
