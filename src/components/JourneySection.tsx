import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Code2,
  Terminal,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  milestone: string;
  solidBg: string;
  accentContrastBg: string;
  tagBg: string;
  shadowColor: string;
  iconType: 'inu' | 'fpl' | 'coincent' | 'education';
  shortDesc: string;
  bulletPoints: string[];
  skills: string[];
  codeTag: string;
}

export const professionalExperiences: ExperienceItem[] = [
  {
    id: 'inu-tech',
    role: 'Java Full Stack Developer',
    company: 'INU Technology Solutions',
    period: 'Dec 2024 — Present',
    milestone: 'Current Role',
    solidBg: 'bg-[#ea580c]',
    accentContrastBg: 'bg-[#9a3412]',
    tagBg: 'bg-black/30',
    shadowColor: 'rgba(234, 88, 12, 0.45)',
    iconType: 'inu',
    codeTag: '# 01 · ENTERPRISE FULL STACK',
    shortDesc: 'Developing enterprise web applications using Java, Spring Boot, Angular, and Vue 3. Designing scalable RESTful APIs, optimizing MySQL queries, and implementing reactive component workflows.',
    bulletPoints: [
      'Designed and deployed secure, high-throughput RESTful microservices with Spring Boot.',
      'Constructed state-managed front-end workflows in Angular 21 and Vue 3 with reactive component systems.',
      'Optimized complex SQL schemas and database queries, achieving low-latency transactions.',
      'Collaborated within Agile sprint cadences to deliver production-ready features.'
    ],
    skills: ['Java 17', 'Spring Boot', 'Angular 21', 'Vue 3', 'REST APIs', 'MySQL', 'Agile']
  },
  {
    id: 'fpl-client',
    role: 'Full Stack Engineer',
    company: 'Florida Power & Light (FPL)',
    period: 'Dec 2024 — Present',
    milestone: 'Enterprise Client',
    solidBg: 'bg-[#0284c7]',
    accentContrastBg: 'bg-[#0369a1]',
    tagBg: 'bg-black/30',
    shadowColor: 'rgba(2, 132, 199, 0.45)',
    iconType: 'fpl',
    codeTag: '# 02 · ENERGY ENTERPRISE',
    shortDesc: 'Developed Correspondence Management System (CMS) with Angular 21 & Spring Boot, and interactive Assist Portal with Vue 3 for utility operations.',
    bulletPoints: [
      'Architected the Correspondence Management System (CMS) in Angular 21 with dynamic document templating.',
      'Developed the Vue 3 Assist Portal featuring client-side reactive form validations and real-time status tracking.',
      'Implemented transactional Spring Boot microservices integrating with enterprise MySQL databases.',
      'Ensured seamless cross-browser responsiveness and 99.9% platform availability.'
    ],
    skills: ['Angular 21', 'Vue 3', 'Spring Boot', 'MySQL', 'Enterprise CMS', 'TypeScript']
  },
  {
    id: 'coincent-ai',
    role: 'AI Engineering Intern',
    company: 'Coincent',
    period: 'Oct 2021 — Dec 2021',
    milestone: 'Machine Learning',
    solidBg: 'bg-[#7c3aed]',
    accentContrastBg: 'bg-[#5b21b6]',
    tagBg: 'bg-black/30',
    shadowColor: 'rgba(124, 58, 237, 0.45)',
    iconType: 'coincent',
    codeTag: '# 03 · COMPUTER VISION',
    shortDesc: 'Developed real-time Face Mask Recognition system using Python, TensorFlow, NumPy, and OpenCV image processing pipelines.',
    bulletPoints: [
      'Constructed deep convolutional neural network (CNN) architectures in TensorFlow / Keras.',
      'Applied OpenCV image transformation and augmentation pipelines for real-world lighting resilience.',
      'Preprocessed large visual datasets using NumPy and Pandas for accelerated training convergence.',
      'Achieved high precision classification rates across diverse real-time test streams.'
    ],
    skills: ['Python', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas', 'CNNs']
  },
  {
    id: 'aits-education',
    role: 'B.Tech in Electronics & Comm.',
    company: 'Annamacharya Inst. of Tech',
    period: '2020 — 2024',
    milestone: 'Distinction 8.5 CGPA',
    solidBg: 'bg-[#059669]',
    accentContrastBg: 'bg-[#065f46]',
    tagBg: 'bg-black/30',
    shadowColor: 'rgba(5, 150, 105, 0.45)',
    iconType: 'education',
    codeTag: '# 04 · GRADUATE DISTINCTION',
    shortDesc: 'Graduated with 8.5/10 CGPA. Specialized in Object-Oriented Programming (Java), Data Structures, DBMS, and Systems Engineering.',
    bulletPoints: [
      'Comprehensive coursework in Java OOP, Data Structures & Algorithms, and Relational DBMS.',
      'Authored engineering capstone projects integrating embedded firmware and web interfaces.',
      'Participated in collegiate competitive programming and technical hackathons.'
    ],
    skills: ['Java OOP', 'Data Structures', 'DBMS & SQL', 'Computer Networks', 'CGPA 8.5/10']
  }
];

export const renderExperienceIcon = (type: ExperienceItem['iconType']) => {
  switch (type) {
    case 'inu':
      return <Briefcase className="w-5 h-5 text-white" />;
    case 'fpl':
      return <Code2 className="w-5 h-5 text-white" />;
    case 'coincent':
      return <Terminal className="w-5 h-5 text-white" />;
    case 'education':
      return <Award className="w-5 h-5 text-white" />;
    default:
      return <Briefcase className="w-5 h-5 text-white" />;
  }
};

// Clean, Symmetric Hover-Expand & Hover-Close for both Mini Preview and Full Content
export const JourneyExperienceDeck: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    if (clickedIndex !== index) {
      setClickedIndex(index);
    }
  };

  const handleDeckMouseLeave = () => {
    setHoveredIndex(null);
    setClickedIndex(null);
  };

  return (
    <div
      onMouseLeave={handleDeckMouseLeave}
      className="relative w-full mx-auto flex flex-col items-center justify-center select-none"
    >
      {/* Top Status Hint */}
      <div className="w-full flex items-center justify-between px-2 text-[11px] font-mono text-zinc-400 pb-3">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-[#f05228]" />
          Hover for preview · Click for full view · Move away to close
        </span>
        <span className="text-zinc-500 font-bold">
          {clickedIndex !== null
            ? `Milestone 0${clickedIndex + 1} Full View`
            : hoveredIndex !== null
            ? `Milestone 0${hoveredIndex + 1} Preview`
            : 'All Cards Closed'}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SOLID COLOR ACCORDION STACK                                               */}
      {/* ========================================================================= */}
      <div className="relative w-full flex flex-col gap-3">
        {professionalExperiences.map((exp, index) => {
          const isFullContent = clickedIndex === index;
          const isMiniContent = hoveredIndex === index && !isFullContent;
          const isClosed = !isFullContent && !isMiniContent;

          // Numeric interpolation ensures 100% identical smooth easing for both mini and full close
          const targetHeight = isFullContent ? 440 : isMiniContent ? 210 : 58;

          return (
            <div
              key={exp.id}
              className="relative w-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => {
                setHoveredIndex((curr) => (curr === index ? null : curr));
                setClickedIndex((curr) => (curr === index ? null : curr));
              }}
            >
              {/* Backlit Glow */}
              {(isMiniContent || isFullContent) && (
                <motion.div
                  layoutId="solid-card-glow"
                  className="absolute -inset-2.5 rounded-[32px] blur-2xl pointer-events-none"
                  style={{
                    backgroundColor: exp.shadowColor,
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Solid Color Card */}
              <motion.div
                onClick={() => handleCardClick(index)}
                initial={false}
                animate={{
                  height: targetHeight,
                }}
                transition={{
                  duration: 0.36,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className={`relative w-full rounded-[26px] ${exp.solidBg} text-white ${
                  !isFullContent ? 'cursor-pointer' : 'cursor-default'
                } overflow-hidden select-none shadow-[0_15px_35px_rgba(0,0,0,0.5)] ${
                  isFullContent
                    ? 'ring-2 ring-white shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
                    : isMiniContent
                    ? 'ring-1 ring-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                    : 'hover:brightness-105'
                }`}
              >
                {/* Top Specular Line */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* ================================================================= */}
                {/* 1. CLOSED STATE (58px bar)                                        */}
                {/* ================================================================= */}
                {isClosed && (
                  <div className="h-[58px] px-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-black/25 border border-white/20 flex items-center justify-center shrink-0">
                        {renderExperienceIcon(exp.iconType)}
                      </div>
                      <span className="font-display text-sm sm:text-base font-bold text-white truncate">
                        {exp.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/30 border border-white/20 font-bold uppercase hidden sm:inline-block">
                        {exp.milestone}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-white/80">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* 2. HOVER MINI CONTENT STATE (210px preview)                       */}
                {/* ================================================================= */}
                {isMiniContent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full p-5 sm:p-6 flex flex-col justify-between"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-black/30 border border-white/25 flex items-center justify-center shadow-md">
                          {renderExperienceIcon(exp.iconType)}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 font-bold block">
                            {exp.codeTag}
                          </span>
                          <h3 className="font-display text-base sm:text-lg font-bold text-white leading-tight">
                            {exp.role}
                          </h3>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/30 border border-white/20">
                        {exp.milestone}
                      </span>
                    </div>

                    {/* Mini Content Short Summary */}
                    <p className="text-xs text-white/95 font-medium leading-relaxed my-auto line-clamp-2">
                      {exp.shortDesc}
                    </p>

                    {/* Click prompt footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[11px] font-mono text-white/90">
                      <span className="font-bold flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-white/80" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1 font-bold underline underline-offset-2">
                        <span>Click for Full Content</span>
                        <Maximize2 className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* ================================================================= */}
                {/* 3. CLICK FULL CONTENT STATE (440px - Smooth Symmetric Collapse)   */}
                {/* ================================================================= */}
                {isFullContent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="h-full p-6 sm:p-7 flex flex-col justify-between"
                  >
                    {/* Top Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-white/20 pb-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-black/35 border border-white/30 flex items-center justify-center shadow-lg shrink-0">
                          {renderExperienceIcon(exp.iconType)}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 font-bold block">
                            {exp.codeTag}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-black text-white leading-snug">
                            {exp.role}
                          </h3>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-black/30 border border-white/25">
                        {exp.milestone}
                      </span>
                    </div>

                    {/* Meta Row */}
                    <div className="flex items-center justify-between text-xs font-mono text-white/90">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Building2 className="w-3.5 h-3.5 text-white/80" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-white/80" />
                        {exp.period}
                      </span>
                    </div>

                    {/* Full Summary */}
                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-sans font-medium">
                      {exp.shortDesc}
                    </p>

                    {/* Technical Bullet Points */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-white/90 font-bold block">
                        // Key Technical Achievements & Architecture:
                      </span>
                      {exp.bulletPoints.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-white/95">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                          <span className="leading-snug">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/30 border border-white/25 text-white font-bold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/20 text-xs font-mono text-white/80">
                      <span>{exp.period}</span>
                      <span className="text-[11px]">
                        Move cursor away to close
                      </span>
                    </div>

                  </motion.div>
                )}

              </motion.div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default JourneyExperienceDeck;
