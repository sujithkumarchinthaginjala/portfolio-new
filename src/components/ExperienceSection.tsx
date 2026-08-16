import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSectionScrollFx, switchPanel } from '../utils/animations';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Compass,
  FileText,
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';
import { ProjectShowcaseItem } from '../types';

interface ExperienceSectionProps {
  onContactClick?: () => void;
}

export const projectsList: ProjectShowcaseItem[] = [
  {
    id: 'fpl-cms',
    stepNumber: '01',
    totalSteps: '03',
    title: 'Correspondence Management System (CMS)',
    subtitle: 'Client: Florida Power & Light (FPL)',
    description:
      'Developed and maintained enterprise correspondence management modules using Java, Spring Boot, Angular 21, and MySQL. Built responsive UI components, integrated RESTful APIs, and resolved production issues.',
    iconType: 'cms',
    capabilities: [
      'Angular 21 reactive UI modules & automated document generation',
      'Spring Boot RESTful APIs & backend business logic orchestration',
      'Complex SQL database operations & production environment optimization'
    ]
  },
  {
    id: 'fpl-assist',
    stepNumber: '02',
    totalSteps: '03',
    title: 'Assist Portal',
    subtitle: 'Client: Florida Power & Light (FPL)',
    description:
      'Developed reusable frontend components using Vue 3 and integrated them with Spring Boot REST APIs. Delivered feature enhancements, debugging, deployment support, and performance optimizations.',
    iconType: 'portal',
    capabilities: [
      'Vue 3 composable UI components with state management',
      'Spring Boot REST API integration & data serialization',
      'Deployment support, performance tuning & active debugging'
    ]
  },
  {
    id: 'coincent-vision',
    stepNumber: '03',
    totalSteps: '03',
    title: 'Face Mask Recognition AI',
    subtitle: 'Artificial Intelligence Project • Coincent',
    description:
      'Engineered an automated face mask detection application using Python, TensorFlow, NumPy, and Pandas. Executed data preprocessing, model training, and evaluation for real-time safety compliance.',
    iconType: 'vision',
    capabilities: [
      'TensorFlow CNN model training & image matrix classification',
      'Python data preprocessing, augmentation & image scaling',
      'Real-time frame inference & safety analytics'
    ]
  }
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollFx = useSectionScrollFx(sectionRef);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const currentProject = projectsList[activeIndex];

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projectsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projectsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.section
      ref={sectionRef}
      {...scrollFx}
      id="projects"
      className="relative z-10 w-full py-16 px-4 sm:px-8 max-w-7xl mx-auto text-white overflow-hidden"
    >
      {/* Section Header (Side-by-Side) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="inline-block mb-2 px-3 py-1 rounded-md bg-[#f05228]/15 border border-[#f05228]/30 text-[#f05228] text-[10px] font-mono font-semibold tracking-widest uppercase">
            SELECTED FEATURED PROJECTS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Projects.<br />
            <span className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">Enterprise Java & Web Solutions.</span>
          </h2>
        </div>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed font-sans font-medium">
          Explore enterprise applications built for client Florida Power & Light (FPL) and AI vision systems engineered with Python & TensorFlow.
        </p>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* LEFT COLUMN (approx 42% / 5 cols): Curved Project Selector list */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-6 pr-0 md:pr-4">
          {/* Solid Orbital Ring Navigation */}
          <div className="relative py-12 min-h-[460px] flex flex-col justify-center">
            {/* The Solid Thick Ring */}
            <div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none border-[32px] border-zinc-900 rounded-full shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)]"
              style={{
                left: '-260px',
                width: '400px',
                height: '400px',
                clipPath: 'inset(0 0 0 260px)' // Clips exactly at the column's left edge (X=0)
              }}
            />

            {/* Orbiting Project Nodes */}
            <div className="relative z-10 w-full pl-0">
              {projectsList.map((proj, idx) => {
                const isSelected = activeIndex === idx;

                const N = projectsList.length;
                const mid = (N - 1) / 2;
                const itemSpacing = 90;
                const Y = (idx - mid) * itemSpacing;

                // Ring geometry to flatten the curve and prevent overlap
                const ringOuterR = 200;
                const ringThickness = 32;
                const orbitalR = ringOuterR - (ringThickness / 2); // 184px
                const ringLeftOffset = -260; // Matches left: -260px
                const circleCenterX = ringLeftOffset + ringOuterR; // -60px

                const safeY = Math.min(Math.abs(Y), orbitalR - 10);
                const xOnCircle = Math.sqrt(orbitalR * orbitalR - safeY * safeY); // Distance from circle center
                const absoluteX = circleCenterX + xOnCircle; // Absolute X in the column

                // Base X position on the ring (subtract 28px to align the 56px icon center)
                const baseY = absoluteX - 28;

                return (
                  <motion.button
                    key={proj.id}
                    onClick={() => {
                      setActiveIndex(idx);
                    }}
                    initial={false}
                    animate={{
                      x: isSelected ? baseY + 8 : baseY, // Protrude slightly when active
                      y: '-50%', // Centers the entire row exactly on the mathematical Y coordinate
                      scale: isSelected ? 1.05 : 1
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    whileHover={{ scale: 1.08, x: baseY + 4 }}
                    className="w-full text-left flex items-center gap-4 sm:gap-5 cursor-pointer group absolute"
                    style={{ top: `calc(50% + ${Y}px)` }} // Absolute center position based on Y offset
                  >
                    {/* Icon Node */}
                    <div className="relative shrink-0">
                      {/* Active Bloom Glow (Cleaner) */}
                      <div className={`absolute -inset-2 bg-[#f05228]/20 rounded-full blur-lg transition-opacity duration-700 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />

                      <div
                        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isSelected
                          ? 'bg-[#f05228] text-white shadow-[0_10px_20px_rgba(240,82,40,0.5),inset_0_2px_4px_rgba(255,255,255,0.4)] ring-2 ring-white/10'
                          : 'bg-zinc-950 text-zinc-400 shadow-[inset_0_2px_10px_rgba(0,0,0,0.7)] border border-zinc-800'
                          }`}
                      >
                        {proj.iconType === 'cms' && <FileText className="w-6 h-6" />}
                        {proj.iconType === 'portal' && <Layers className="w-6 h-6" />}
                        {proj.iconType === 'vision' && <Sparkles className="w-6 h-6" />}
                        {proj.iconType === 'teams' && <MessageSquare className="w-6 h-6" />}
                        {proj.iconType === 'freight' && <Compass className="w-6 h-6" />}
                        {proj.iconType === 'docu' && <FileText className="w-6 h-6" />}
                      </div>
                    </div>

                    {/* Node Text Content */}
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`font-display text-base sm:text-lg font-bold tracking-tight transition-colors duration-500 leading-snug break-words pr-2 ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                          }`}
                      >
                        {proj.title}
                        <span
                          className={`inline-block ml-2 text-sm font-mono transition-all duration-500 ${isSelected ? 'text-[#f05228] translate-x-1 opacity-100' : 'text-zinc-600 opacity-0 group-hover:opacity-100'
                            }`}
                        >
                          &rsaquo;
                        </span>
                      </h4>
                      <p className="text-zinc-500 text-[11px] sm:text-xs font-sans font-medium mt-1 pr-4 leading-relaxed break-words">
                        {proj.subtitle}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>


        </div>

        {/* RIGHT COLUMN (approx 58% / 7 cols): Interactive Project Card */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              variants={switchPanel}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between will-change-transform"
            >
              {/* Card Header Step Counter */}
              <div className="mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#f05228]">
                  {currentProject.stepNumber}{' '}
                  <span className="text-zinc-600">/ {currentProject.totalSteps}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                  {currentProject.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-medium mt-1">
                  {currentProject.subtitle}
                </p>
              </div>

              {/* Description Paragraph */}
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {currentProject.description}
              </p>

              {/* Divider */}
              <hr className="border-zinc-800 my-4" />

              {/* Card Content: Capabilities Only */}
              <div className="mb-8">
                <h5 className="text-[10px] uppercase font-mono font-bold text-zinc-500 tracking-widest mb-4">
                  KEY CAPABILITIES
                </h5>
                <ul className="space-y-3">
                  {currentProject.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-200">
                      <CheckCircle2 className="w-5 h-5 text-[#f05228] shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Navigation Controls */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous project"
                    className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Pagination Dots */}
                  <div className="flex items-center gap-2 px-3">
                    {projectsList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveIndex(idx);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${activeIndex === idx
                          ? 'w-6 bg-[#f05228]'
                          : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                          }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    aria-label="Next project"
                    className="p-2.5 rounded-full bg-[#f05228] hover:bg-[#e0431a] text-white shadow-lg transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {onContactClick && (
                  <button
                    onClick={onContactClick}
                    className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Request Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f05228]" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
};
