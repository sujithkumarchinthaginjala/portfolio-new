import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  FileText,
  Download,
  Github,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Briefcase,
  Code2,
  Terminal,
  Award
} from 'lucide-react';
import { openPrintableResume } from '../utils/downloadResume';
import { JourneyItem } from '../types';

interface JourneySectionProps {
  onActionClick?: () => void;
}

export const journeyData: JourneyItem[] = [
  {
    id: 'inu-tech',
    title: 'Java Full Stack Developer',
    challengesCount: 'INU Technology Solutions',
    buildersCount: 'Dec 2024 - Present',
    iconBgColor: 'bg-gradient-to-tr from-[#f05228] to-amber-500',
    glowColor: 'from-[#f05228]/60 via-orange-600/30 to-transparent',
    accentHex: '#f05228',
    iconType: 'inu',
    shortDesc: 'Developing enterprise web applications using Java, Spring Boot, Angular, and Vue 3. Designing RESTful APIs and SQL operations.',
    milestone: 'Current Role',
    year: 'Dec 2024 - Present',
    tags: ['Java', 'Spring Boot', 'Angular', 'Vue 3', 'REST APIs', 'SQL']
  },
  {
    id: 'fpl-client',
    title: 'Full Stack Engineer',
    challengesCount: 'Client: Florida Power & Light (FPL)',
    buildersCount: 'Dec 2024 - Present',
    iconBgColor: 'bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600',
    glowColor: 'from-sky-600/50 via-blue-600/30 to-transparent',
    accentHex: '#38bdf8',
    iconType: 'fpl',
    shortDesc: 'Developed enterprise Correspondence Management Systems (CMS) with Angular 21 & Spring Boot, and Assist Portal with Vue 3.',
    milestone: 'Enterprise Client',
    year: 'Dec 2024 - Present',
    tags: ['Angular 21', 'Vue 3', 'Spring Boot', 'MySQL', 'Agile']
  },
  {
    id: 'coincent-ai',
    title: 'AI with Python Intern',
    challengesCount: 'Coincent',
    buildersCount: 'Oct 2021 - Dec 2021',
    iconBgColor: 'bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-500',
    glowColor: 'from-purple-600/50 via-pink-600/30 to-transparent',
    accentHex: '#d8b4fe',
    iconType: 'coincent',
    shortDesc: 'Developed a Face Mask Recognition application using Python, TensorFlow, NumPy, and Pandas. Data preprocessing and CNN classification.',
    milestone: 'Machine Learning',
    year: '2021',
    tags: ['Python', 'TensorFlow', 'NumPy', 'Pandas', 'Image Processing']
  },
  {
    id: 'aits-education',
    title: 'B.Tech in ECE',
    challengesCount: 'Annamacharya Institute of Tech (AITS)',
    buildersCount: '2020 - 2024',
    iconBgColor: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
    glowColor: 'from-emerald-600/40 via-teal-600/20 to-transparent',
    accentHex: '#10b981',
    iconType: 'education',
    shortDesc: 'Graduated with 8.5/10 CGPA. Specialized in Electronics & Communication, Software Engineering, DBMS, and Object-Oriented Java.',
    milestone: 'Academic Distinction',
    year: '2020 - 2024',
    tags: ['ECE', 'CGPA: 8.5/10', 'DBMS', 'Data Structures', 'Java']
  }
];

export const JourneySection: React.FC<JourneySectionProps> = ({ onActionClick }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = journeyData[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === journeyData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? journeyData.length - 1 : prev - 1));
  };

  const renderIcon = (type: JourneyItem['iconType']) => {
    switch (type) {
      case 'inu':
        return <Briefcase className="w-7 h-7 text-white" />;
      case 'fpl':
        return <Code2 className="w-7 h-7 text-white" />;
      case 'coincent':
        return <Terminal className="w-7 h-7 text-white" />;
      case 'education':
        return <Award className="w-7 h-7 text-white" />;
      case 'axon':
        return <Zap className="w-7 h-7 text-white fill-white" />;
      default:
        return <Briefcase className="w-7 h-7 text-white" />;
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      id="experience" 
      className="relative z-10 w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto text-white bg-black border-t border-zinc-800/80 overflow-hidden"
    >
      
      {/* Dynamic Hollow Bottom Glow Effect emanating upward */}
      <div className="absolute inset-x-0 bottom-0 h-[480px] pointer-events-none overflow-hidden z-0">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={`w-full h-full bg-gradient-to-t ${activeItem.glowColor} blur-3xl opacity-80 transform translate-y-32`}
        />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="text-center mb-4">
          <span className="inline-block px-3.5 py-1 rounded-md bg-[#f05228]/15 border border-[#f05228]/30 text-[#f05228] text-[10px] sm:text-xs font-mono font-semibold tracking-widest uppercase">
            CAREER TIMELINE & EXPERIENCE
          </span>
        </div>

        {/* Section Main Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Professional <br />
            <span className="text-zinc-200">Experience Journey.</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed mt-4 max-w-2xl mx-auto font-sans">
            A chronological timeline of Java Full Stack development, enterprise client deliveries for Florida Power & Light (FPL), and AI system engineering.
          </p>

          {/* Action Triggers */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onActionClick}
              className="px-5 py-2.5 bg-[#f05228] hover:bg-[#e0431a] text-white font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Contact / Hire Me</span>
            </button>

            <button
              onClick={openPrintableResume}
              className="px-5 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-[#f05228] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 group"
            >
              <Download className="w-4 h-4 text-[#f05228] group-hover:scale-110 transition-transform" />
              <span>Download Resume</span>
            </button>

            <a
              href="https://github.com/sujithkumarchinthaginjala/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-[#f05228] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 group"
            >
              <Github className="w-4 h-4 text-white group-hover:text-[#f05228] transition-colors" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sujithkumarchinthaginjala"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-sky-500 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 group"
            >
              <Linkedin className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* STACKED CARDS WITH SIDE PEEKS (Selected card center, non-selected peeking left & right) */}
        <div className="my-14 relative flex flex-col items-center justify-center min-h-[460px] px-2">
          
          {/* Card Stack Deck Canvas */}
          <div className="relative w-full max-w-md sm:max-w-lg h-[400px] flex items-center justify-center">
            {journeyData.map((item, idx) => {
              const total = journeyData.length;
              // calculate offset relative to activeIndex
              // e.g. diff = -1 (left peek), 0 (center active), 1 (right peek)
              let diff = idx - activeIndex;
              if (diff < -1) diff += total;
              if (diff > total - 2) diff -= total;

              // Determine stack styling based on diff
              const isCenter = diff === 0;
              const isLeftPeek = diff === -1 || (diff < 0 && diff >= -2);
              const isRightPeek = diff === 1 || (diff > 0 && diff <= 2);

              // Position properties
              let translateX = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;
              let rotateY = 0;

              if (isCenter) {
                translateX = 0;
                scale = 1.05;
                opacity = 1;
                zIndex = 40;
                rotateY = 0;
              } else if (isLeftPeek) {
                translateX = -140; // Peek out to the left
                scale = 0.88;
                opacity = 0.65;
                zIndex = 20;
                rotateY = 8;
              } else if (isRightPeek) {
                translateX = 140; // Peek out to the right
                scale = 0.88;
                opacity = 0.65;
                zIndex = 20;
                rotateY = -8;
              } else {
                // Background hidden cards
                translateX = 0;
                scale = 0.75;
                opacity = 0;
                zIndex = 10;
              }

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  initial={false}
                  animate={{
                    x: translateX,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                    rotateY: rotateY
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  className={`absolute w-full h-[380px] rounded-3xl p-6 sm:p-8 border flex flex-col justify-between cursor-pointer select-none transition-shadow ${
                    isCenter
                      ? 'bg-zinc-950/95 border-[#f05228] shadow-[0_0_40px_rgba(240,82,40,0.3)] ring-1 ring-[#f05228]'
                      : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-600 hover:brightness-110'
                  }`}
                >
                  {/* Card Top Brand & Year */}
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${item.iconBgColor}`}
                      >
                        {renderIcon(item.iconType)}
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-[#f05228] font-bold uppercase tracking-wider block">
                          {item.milestone}
                        </span>
                        <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                      {item.year}
                    </span>
                  </div>

                  {/* Card Description */}
                  <div className="my-auto text-left space-y-2">
                    <div className="text-xs font-mono font-semibold text-zinc-400">
                      {item.challengesCount}
                    </div>
                    <p className="text-zinc-300 text-xs sm:text-sm font-sans leading-relaxed">
                      {item.shortDesc}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      MILESTONE 0{idx + 1} / 04
                    </span>

                    {isCenter ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onActionClick) onActionClick();
                        }}
                        className="px-4 py-1.5 bg-[#f05228] hover:bg-[#e0431a] text-white font-display font-extrabold text-[10px] uppercase rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-[#f05228] font-bold">
                        Click to select
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows for Stack Deck */}
          <div className="mt-8 flex items-center gap-4 z-30">
            <button
              onClick={handlePrev}
              aria-label="Previous journey card"
              className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 px-2">
              {journeyData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-6 bg-[#f05228]' : 'w-2 bg-zinc-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next journey card"
              className="p-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* BOTTOM DEV EXPERIENCE CTA */}
        <div className="text-center pt-8 border-t border-zinc-800/80 max-w-xl mx-auto space-y-3">
          <h3 className="font-display text-xl font-extrabold uppercase text-white tracking-tight">
            Explore Full Technical Portfolio
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans font-medium leading-relaxed">
            Interested in learning more about these architectural milestones or requesting an engineering consultation?
          </p>

          <div className="pt-2">
            <button
              onClick={onActionClick}
              className="px-6 py-3 bg-white text-black font-display font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors shadow-xl cursor-pointer"
            >
              Schedule Engineering Call
            </button>
          </div>
        </div>

      </div>

    </motion.section>
  );
};
