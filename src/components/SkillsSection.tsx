import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  useSectionScrollFx,
  switchPanel,
  staggerContainer,
  staggerItem,
  revealViewport,
  EASE_OUT,
} from '../utils/animations';
import {
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Zap,
  Code2,
  Cpu,
  Globe,
  Layers,
  ArrowUpRight,
  Terminal,
  Brain
} from 'lucide-react';
import { FaJava, FaAngular, FaVuejs, FaAws, FaPython, FaDocker } from 'react-icons/fa';
import { SiSpringboot, SiHibernate, SiTypescript, SiReactivex, SiVite, SiTailwindcss, SiMysql, SiPostgresql, SiTensorflow, SiOpencv, SiPostman } from 'react-icons/si';
import { SkillItem } from '../types';

interface SkillsSectionProps {
  onExploreClick?: () => void;
}

export const skillsData: SkillItem[] = [
  {
    id: 'springboot',
    name: 'Java & Spring Boot',
    modelFamily: 'Backend & REST APIs',
    shortDescription:
      'Core Java, Spring Boot 3, Spring Framework 6, RESTful microservices, and Hibernate JPA.',
    fullDescription:
      'Building robust, scalable backend microservices and enterprise REST APIs. Experienced with Java OOP design principles, dependency injection, JPA object-relational mapping, and Spring Security.',
    iconType: 'springboot',
    proficiency: 95,
    proficiencyLabel: 'Expert',
    whyUseIt: [
      'Type-safe, enterprise-grade backend stability',
      'Clean layered architecture (Controller, Service, Repository)',
      'Spring Boot auto-configuration & embedded Tomcat',
      'Seamless RESTful JSON API communication'
    ],
    keyCapabilities: [
      'RESTful API Design & Validation',
      'Hibernate / JPA Database Mapping',
      'Spring Security & Token Auth',
      'Exception Handling & Logging'
    ],
    technologies: ['Java 17/21', 'Spring Boot 3', 'Hibernate ORM', 'Maven', 'JUnit']
  },
  {
    id: 'angular',
    name: 'Angular 21 & TypeScript',
    modelFamily: 'Single Page Applications',
    shortDescription:
      'Modern Angular single-page apps, reactive forms, RxJS observables, and modular UI components.',
    fullDescription:
      'Developing responsive frontend user interfaces for enterprise clients like FPL Correspondence Management System (CMS). Skilled with Angular RxJS observables, reactive forms, and modular components.',
    iconType: 'angular',
    proficiency: 92,
    proficiencyLabel: 'Advanced',
    whyUseIt: [
      'Structured component-driven architecture',
      'Reactive RxJS state and data stream handling',
      'Robust TypeScript type safety and maintainability',
      'Built-in form validation and router optimization'
    ],
    keyCapabilities: [
      'Reactive Forms & Validation',
      'RxJS Observables & Services',
      'Angular Router & Lazy Loading',
      'HttpClient API Integrations'
    ],
    technologies: ['Angular 21', 'TypeScript', 'RxJS', 'HTML5 / SCSS', 'Node/NPM']
  },
  {
    id: 'vue',
    name: 'Vue 3 & Frontend UI',
    modelFamily: 'Interactive Web Dashboards',
    shortDescription:
      'Vue 3 Composition API, reactive state management, single-file components, and Vite tooling.',
    fullDescription:
      'Created reusable frontend UI modules for FPL Assist Portal, delivering high performance, responsive layout design, and smooth integration with Spring Boot REST endpoints.',
    iconType: 'vue',
    proficiency: 88,
    proficiencyLabel: 'Proficient',
    whyUseIt: [
      'Lightweight & high-speed virtual DOM rendering',
      'Clean Composition API & setup syntax',
      'Intuitive reactive state management with Pinia',
      'Tailwind CSS & modern responsive layout styling'
    ],
    keyCapabilities: [
      'Composition API & Script Setup',
      'Pinia / Vuex State Management',
      'Vue Router Integration',
      'Tailwind CSS Utility Styling'
    ],
    technologies: ['Vue 3', 'Vite', 'Pinia', 'Tailwind CSS', 'Axios']
  },
  {
    id: 'database',
    name: 'Relational SQL & Databases',
    modelFamily: 'Persistence & Data Queries',
    shortDescription:
      'MySQL, PostgreSQL, schema design, complex JOINs, indexing, and transactional data integrity.',
    fullDescription:
      'Designing and maintaining relational database schemas, optimizing complex SQL queries, and integrating database operations seamlessly with Spring Boot JPA backends.',
    iconType: 'database',
    proficiency: 90,
    proficiencyLabel: 'Advanced',
    whyUseIt: [
      'ACID compliant transaction guarantees',
      'Structured relational data integrity & foreign keys',
      'Optimized indexing & complex query performance',
      'Standardized SQL dialect operations'
    ],
    keyCapabilities: [
      'Schema Design & Relational Mapping',
      'Complex SQL Query Optimization',
      'Hibernate ORM Synchronization',
      'Database Indexing & View Creation'
    ],
    technologies: ['MySQL', 'PostgreSQL', 'Spring Data JPA', 'JDBC', 'Postman']
  },
  {
    id: 'python-ai',
    name: 'Python & AI / Deep Learning',
    modelFamily: 'Computer Vision & Data Science',
    shortDescription:
      'TensorFlow, OpenCV, NumPy, Pandas, image preprocessing, and CNN model training.',
    fullDescription:
      'Hands-on experience developing computer vision models, including a Face Mask Detection system built during Coincent internship using deep learning convolutional neural networks.',
    iconType: 'openai',
    proficiency: 85,
    proficiencyLabel: 'Proficient',
    whyUseIt: [
      'Rich data science and machine learning ecosystem',
      'TensorFlow deep learning CNN model execution',
      'Fast matrix math with NumPy & Pandas',
      'Real-time image processing with OpenCV'
    ],
    keyCapabilities: [
      'CNN Model Training & Evaluation',
      'Image Preprocessing & Augmentation',
      'Data Wrangling & Matrix Scaling',
      'Inference Pipeline Optimization'
    ],
    technologies: ['Python 3', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas']
  },
  {
    id: 'devops-aws',
    name: 'DevOps, Tools & AWS',
    modelFamily: 'Build & Cloud Workflow',
    shortDescription:
      'Git/GitHub, Maven, Postman API testing, Eclipse/VS Code, and AWS foundational cloud services.',
    fullDescription:
      'Comprehensive software development workflow covering Git version control, Apache Maven build automation, Postman API testing, and foundational AWS cloud services.',
    iconType: 'aws',
    proficiency: 87,
    proficiencyLabel: 'Proficient',
    whyUseIt: [
      'Collaborative Git workflow with feature branching',
      'Automated Apache Maven build lifecycles',
      'Thorough Postman REST API verification',
      'Agile teamwork & cloud deployment foundations'
    ],
    keyCapabilities: [
      'Git / GitHub Branching & Pull Requests',
      'Apache Maven Lifecycle Management',
      'Postman Mock & Endpoint Testing',
      'Agile & Jira Collaboration'
    ],
    technologies: ['Git / GitHub', 'Maven', 'Postman', 'Eclipse / VS Code', 'AWS Cloud']
  }
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onExploreClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollFx = useSectionScrollFx(sectionRef);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('springboot');
  const [showDocumentationModal, setShowDocumentationModal] = useState<boolean>(false);

  const activeSkill = skillsData.find((s) => s.id === selectedSkillId) || skillsData[0];

  // SVG Logo Renderer for each Skill Icon (Lucide Fallbacks)
  const renderSkillIcon = (type: SkillItem['iconType'], className: string = 'w-8 h-8') => {
    switch (type) {
      case 'java':
      case 'springboot':
        return <Code2 className={className} />;
      case 'angular':
        return <Layers className={className} />;
      case 'vue':
        return <Globe className={className} />;
      case 'database':
        return <Cpu className={className} />;
      case 'aws':
        return <Zap className={className} />;
      case 'openai':
        return <Sparkles className={className} />;
      default:
        return <Code2 className={className} />;
    }
  };

  // Real Brand Icons Array for each Skill Type
  const renderBrandIcons = (type: SkillItem['iconType']) => {
    switch (type) {
      case 'java':
      case 'springboot':
        return [<FaJava key="java" />, <SiSpringboot key="spring" />, <SiHibernate key="hibernate" />];
      case 'angular':
        return [<FaAngular key="angular" />, <SiTypescript key="ts" />, <SiReactivex key="rxjs" />];
      case 'vue':
        return [<FaVuejs key="vue" />, <SiVite key="vite" />, <SiTailwindcss key="tailwind" />];
      case 'database':
        return [<SiMysql key="mysql" />, <SiPostgresql key="pg" />];
      case 'aws':
        return [<FaAws key="aws" />, <FaDocker key="docker" />, <SiPostman key="postman" />];
      case 'openai':
      case 'python-ai' as any: // In case the type is updated
        return [<FaPython key="python" />, <SiTensorflow key="tf" />, <SiOpencv key="opencv" />];
      default:
        return [<Code2 key="code" />];
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      {...scrollFx}
      id="skills"
      className="relative z-10 w-full py-20 px-4 sm:px-8 max-w-7xl mx-auto text-white border-t border-zinc-800/80 overflow-hidden"
    >
      
      {/* Top Eyebrow Tag */}
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-block px-3.5 py-1 rounded-md bg-[#f05228]/15 border border-[#f05228]/30 text-[#f05228] text-[10px] sm:text-xs font-mono font-semibold tracking-widest uppercase">
          FULL STACK TECHNICAL SKILLS
        </span>
        <span className="text-zinc-500 text-xs font-mono hidden sm:inline-block">
          6 CORE ENGINEERING DOMAINS
        </span>
      </div>

      {/* Section Headline */}
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
          Technical Skills & <br />
          <span className="text-zinc-300">Architecture Stack.</span>
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm font-medium mt-3 leading-relaxed">
          Select a skill below to inspect full description, production use cases, key capabilities, and technologies used.
        </p>
      </div>

      {/* TOP CARDS ROW (Interactive Model Cards Grid) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
      >
        {skillsData.map((skill) => {
          const isSelected = selectedSkillId === skill.id;
          return (
            <motion.button
              key={skill.id}
              variants={staggerItem}
              onClick={() => setSelectedSkillId(skill.id)}
              whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE_OUT } }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-2xl text-left border flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden group min-h-[220px] ${
                isSelected
                  ? 'bg-zinc-900/90 border-[#f05228] shadow-[0_0_25px_rgba(240,82,40,0.25)] ring-1 ring-[#f05228]'
                  : 'bg-zinc-950/60 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900/50'
              }`}
            >
              {/* Card Header Icon & Badge */}
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isSelected
                      ? 'bg-[#f05228] text-white shadow-lg'
                      : 'bg-zinc-900 text-zinc-300 border border-zinc-800 group-hover:border-zinc-700 group-hover:text-white'
                  }`}
                >
                  {renderSkillIcon(skill.iconType, 'w-6 h-6')}
                </div>

                <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-tight line-clamp-1">
                  {skill.name}
                </h4>
                <p className="text-[10px] font-mono text-[#f05228] font-semibold mt-0.5 uppercase tracking-wider">
                  {skill.modelFamily}
                </p>

                <p className="text-zinc-400 text-[11px] leading-snug mt-2 line-clamp-2 font-sans font-medium">
                  {skill.shortDescription}
                </p>
              </div>

              {/* Bottom Active Indicator Dot & Brand Icons */}
              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {renderBrandIcons(skill.iconType).map((icon, i) => (
                    <div key={i} className={`w-3.5 h-3.5 ${isSelected ? 'text-[#f05228]' : 'text-zinc-500 group-hover:text-zinc-300 transition-colors'}`}>
                      {/* React.cloneElement preserves the original icon while applying the sizing class */}
                      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-full h-full' })}
                    </div>
                  ))}
                </div>
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#f05228] bg-[#f05228]'
                      : 'border-zinc-700 bg-transparent group-hover:border-zinc-500'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* BOTTOM DETAIL PANEL (Expands details of selected skill) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSkill.id}
          variants={switchPanel}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-zinc-950/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 backdrop-blur-xl relative overflow-hidden will-change-transform"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f05228]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Detail Section: 3-Column Info Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-zinc-800/80 pb-8">
            
            {/* Column 1 (5 cols): Selected Skill Meta & Actions */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#f05228] text-white shadow-xl shadow-[#f05228]/20 flex items-center justify-center shrink-0">
                  {renderSkillIcon(activeSkill.iconType, 'w-8 h-8')}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#f05228] font-bold">
                    SELECTED SKILL
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    {activeSkill.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {activeSkill.modelFamily}
                  </p>
                </div>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                {activeSkill.fullDescription}
              </p>

            </div>

            {/* Column 2 (3 cols): Real Brand Icons Stack */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center border-y lg:border-y-0 lg:border-x border-zinc-800/80 py-6 lg:py-0 px-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold mb-6 text-center">
                CORE TECHNOLOGIES
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {renderBrandIcons(activeSkill.iconType).map((icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                    className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#f05228] shadow-lg hover:bg-zinc-800 hover:border-[#f05228]/50 transition-all"
                  >
                    {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Column 3 (4 cols): Why We Use It Bullet List */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold block mb-1">
                WHY WE USE IT
              </span>
              <ul className="space-y-2.5">
                {activeSkill.whyUseIt.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#f05228] shrink-0 mt-0.5" />
                    <span className="font-sans leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Row: Key Capabilities & Associated Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            
            {/* Key Capabilities Pills */}
            <div>
              <h5 className="text-[10px] uppercase font-mono font-bold text-zinc-400 tracking-widest mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#f05228]" />
                <span>CORE CAPABILITIES</span>
              </h5>
              <div className="flex flex-wrap gap-2">
                {activeSkill.keyCapabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono font-medium text-zinc-200 uppercase"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies & Tools Used */}
            <div>
              <h5 className="text-[10px] uppercase font-mono font-bold text-zinc-400 tracking-widest mb-3 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#f05228]" />
                <span>STACK & SDK INTEGRATIONS</span>
              </h5>
              <div className="flex flex-wrap gap-2">
                {activeSkill.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-xs font-mono text-zinc-400 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </motion.div>
      </AnimatePresence>

      {/* Optional Specification Modal */}
      <AnimatePresence>
        {showDocumentationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f05228] text-white flex items-center justify-center">
                    {renderSkillIcon(activeSkill.iconType, 'w-5 h-5')}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-extrabold uppercase">
                      {activeSkill.name} Specs
                    </h3>
                    <p className="text-xs font-mono text-zinc-400">
                      {activeSkill.modelFamily}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDocumentationModal(false)}
                  className="text-zinc-500 hover:text-white p-2 rounded-full bg-zinc-900"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono text-zinc-300">
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
                  <div className="text-zinc-500 uppercase text-[10px]">SDK Reference</div>
                  <div className="text-white font-bold">{activeSkill.technologies[0]}</div>
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
                  <div className="text-zinc-500 uppercase text-[10px]">Benchmark Score</div>
                  <div className="text-white font-bold">{activeSkill.proficiency}% Evaluation Index</div>
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
                  <div className="text-zinc-500 uppercase text-[10px]">Deployment Target</div>
                  <div className="text-white font-bold">Cloud Run Serverless / Vertex AI Pipeline</div>
                </div>
              </div>

              <button
                onClick={() => setShowDocumentationModal(false)}
                className="w-full py-3 bg-white text-black font-display font-extrabold text-xs uppercase rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Close Specification
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};
