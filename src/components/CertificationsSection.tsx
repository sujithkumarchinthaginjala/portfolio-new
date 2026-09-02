import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSectionScrollFx } from '../utils/animations';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  RotateCcw
} from 'lucide-react';
import { CertificationItem } from '../types';

interface CertificationsSectionProps {
  onVerifyClick?: (cert: CertificationItem) => void;
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'java-spring-6-cert',
    title: 'Java Spring Framework 6 & Spring Boot 3',
    issuer: 'UDEMY BUSINESS - INU TECHNOLOGY SOLUTION',
    issueDate: '2024',
    projectName: 'Backend Development',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#7c2d12',
    accentText: '#fdba74',
    description: 'Mastered enterprise backend development using Spring Framework 6 and Spring Boot 3, covering dependency injection, RESTful APIs, Spring MVC, Spring Data JPA, security fundamentals, and production-ready application architecture. Skills: Java 21, Spring Boot 3, Spring Framework 6, REST APIs, Hibernate / JPA, Dependency Injection, Maven.',
    badgeCode: 'INU-SB-2024',
    verificationUrl: 'https://www.linkedin.com/in/sujithkumarchinthaginjala',
    fileUrls: ['/certifications/java-spring-6.png']
  },
  {
    id: 'spring-boot-testing-cert',
    title: 'Spring Boot Unit Testing with JUnit, Mockito & MockMvc',
    issuer: 'UDEMY BUSINESS - INU TECHNOLOGY SOLUTION',
    issueDate: '2024',
    projectName: 'Testing & Quality',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#1e3a8a',
    accentText: '#93c5fd',
    description: 'Developed expertise in writing maintainable unit and integration tests for enterprise Spring Boot applications using JUnit, Mockito, and MockMvc, ensuring robust backend quality and API validation. Skills: JUnit 5, Mockito, MockMvc, Spring Boot Testing, Integration Testing, Test-Driven Development.',
    badgeCode: 'INU-TEST-2024',
    verificationUrl: 'https://www.linkedin.com/in/sujithkumarchinthaginjala',
    fileUrls: ['/certifications/spring-boot-testing.png']
  },
  {
    id: 'vue-3-cert',
    title: 'The Vue 3 Bootcamp — Complete Developer Guide',
    issuer: 'UDEMY BUSINESS - INU TECHNOLOGY SOLUTION',
    issueDate: '2024',
    projectName: 'Frontend Development',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#064e3b',
    accentText: '#6ee7b7',
    description: 'Built modern single-page applications using Vue 3 Composition API, reusable components, routing, state management, and frontend architecture best practices. Skills: Vue 3, Composition API, Pinia, Vue Router, JavaScript, TypeScript.',
    badgeCode: 'INU-VUE-2024',
    verificationUrl: 'https://www.linkedin.com/in/sujithkumarchinthaginjala',
    fileUrls: ['/certifications/vue-bootcamp.png']
  },
  {
    id: 'coincent-ai-cert',
    title: 'Artificial Intelligence with Python',
    issuer: 'COINCENT',
    issueDate: 'Oct 2021 – Dec 2021',
    projectName: 'Internships / Professional Training',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#581c87',
    accentText: '#d8b4fe',
    description: 'Professional Training & Internship in Artificial Intelligence using Python. Highlights include Face Mask Recognition using TensorFlow, Python, NumPy, Pandas, and Image Classification.',
    badgeCode: 'COINCENT-AI-2021',
    verificationUrl: 'https://github.com/sujithkumarchinthaginjala/',
    fileUrls: [
      '/certifications/ai-internship-1.pdf',
      '/certifications/ai-internship-2.pdf',
      '/certifications/ai-internship-3.pdf'
    ]
  },
  {
    id: 'linkedin-learning-cert',
    title: 'LinkedIn Learning Certification',
    issuer: 'LINKEDIN LEARNING',
    issueDate: '2024',
    projectName: 'Professional Development',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#0f172a',
    accentText: '#60a5fa',
    description: 'Completed certification through LinkedIn Learning. Validates skills and knowledge acquired through the professional development curriculum.',
    badgeCode: 'LINKEDIN-2024',
    verificationUrl: 'https://www.linkedin.com/in/sujithkumarchinthaginjala',
    fileUrls: ['/certifications/linkedin-cert.pdf']
  }
];

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onVerifyClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollFx = useSectionScrollFx(sectionRef);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCertModal, setSelectedCertModal] = useState<CertificationItem | null>(null);
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentFileIndex(0);
  }, [selectedCertModal]);

  const activeCert = certificationsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === certificationsData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? certificationsData.length - 1 : prev - 1));
  };

  return (
    <motion.section
      ref={sectionRef}
      {...scrollFx}
      id="certifications"
      className="relative z-10 w-full py-24 px-6 sm:px-12 lg:px-16 text-white border-t border-zinc-800/80 overflow-hidden"
    >
      
      {/* Top Eyebrow Tag */}
      <div className="mb-8 flex items-center justify-between">
        <span className="inline-block px-3.5 py-1 rounded-md bg-[#f05228]/15 border border-[#f05228]/30 text-[#f05228] text-[10px] sm:text-xs font-mono font-semibold tracking-widest uppercase">
          05 // CERTIFICATIONS & CREDENTIALS
        </span>
        <span className="text-zinc-500 text-xs font-mono hidden sm:inline-block">
          VERIFIED ACADEMIC & PROFESSIONAL DEGREES
        </span>
      </div>

      {/* Main 3-Column Layout: Headline | Stack of Cards | Issuer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
        
        {/* LEFT COLUMN (lg:col-span-4): Big Typography Headline & Nav Controls */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-8 z-10">
          <div>
            <span className="text-zinc-400 text-sm font-sans font-medium block mb-2">
              ACADEMIC & PROFESSIONAL
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Certifications <br />
              <span className="text-zinc-200">& Education</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed mt-4 max-w-sm">
              Verified credentials in Java Full Stack Engineering, AI/Machine Learning, B.Tech ECE, Oracle Java, and Agile methodologies.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous award card"
                className="p-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next award card"
                className="p-3.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <span className="font-mono text-xs text-zinc-400 font-bold">
              0{currentIndex + 1} <span className="text-zinc-600">/ 0{certificationsData.length}</span>
            </span>
          </div>
        </div>

        {/* CENTER COLUMN (lg:col-span-5): Stacked Card Deck Visual with peeking top tabs */}
        <div className="lg:col-span-5 relative flex items-center justify-center my-6 lg:my-0 min-h-[480px]">
          
          {/* Peeking Cards Behind (Stack Deck Effect) */}
          <div className="relative w-full max-w-xs sm:max-w-sm h-[440px] flex items-center justify-center">
            {certificationsData.map((cert, idx) => {
              // Calculate offset relative to currentIndex
              const total = certificationsData.length;
              const relativePos = (idx - currentIndex + total) % total;
              
              // We render cards in depth: top active card has relativePos = 0
              // peeking cards behind have relativePos 1, 2, 3...
              if (relativePos > 3) return null; // only render top 4 cards in stack

              const zIndex = 30 - relativePos * 5;
              const translateY = -relativePos * 18; // cards peeking above
              const scale = 1 - relativePos * 0.05;
              const opacity = 1 - relativePos * 0.2;

              return (
                <motion.div
                  key={cert.id}
                  onClick={() => setCurrentIndex(idx)}
                  initial={false}
                  animate={{
                    y: translateY,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex
                  }}
                  transition={{ type: 'spring', stiffness: 180, damping: 26, mass: 0.9 }}
                  style={{
                    backgroundColor: cert.cardColor,
                    willChange: 'transform, opacity'
                  }}
                  className={`absolute top-0 w-full h-[430px] rounded-[32px] p-6 sm:p-8 shadow-2xl flex flex-col justify-between cursor-pointer border border-white/10 select-none overflow-hidden ${
                    relativePos === 0 ? 'ring-2 ring-white/20' : 'hover:brightness-110'
                  }`}
                >
                  {/* Subtle Grain Overlay */}
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                  {/* Top Monogram Logo */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-display font-black text-2xl tracking-tighter text-white">
                      {cert.issuer.charAt(0)}.
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/20 text-white/80 border border-white/15">
                      OFFICIAL CERTIFICATE
                    </span>
                  </div>

                  {/* Main Card Titles */}
                  <div className="space-y-2 z-10 my-auto">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                      {cert.title}.
                    </h3>
                    <p className="font-display text-lg sm:text-xl font-bold text-white/80">
                      {cert.issueDate}
                    </p>
                    <p className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-wider pt-1">
                      {cert.projectName}
                    </p>

                    <p className="text-white/70 text-xs font-mono pt-2">
                      {cert.recipient}
                    </p>
                  </div>

                  {/* Bottom Certificate Seal & Signatures */}
                  <div className="pt-4 border-t border-white/15 flex items-end justify-between text-[10px] font-mono text-white/60 z-10">
                    <div className="space-y-1">
                      <div className="text-white/90 font-semibold">{cert.badgeCode}</div>
                      <div>Official Jury Verification</div>
                    </div>

                    <div className="text-right italic text-white/80 font-serif">
                      ― Certified
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN (lg:col-span-3): Issuer Text + Large White Pill Button + Quick Card Index */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-6 lg:pl-6 z-10 text-left">
          
          {/* Glowing Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
              VERIFIED ISSUER
            </span>
          </div>

          {/* Issuer Description */}
          <div>
            <h4 className="font-display text-lg font-bold text-white tracking-tight">
              {activeCert.issuer}
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans mt-1">
              {activeCert.description}
            </p>
          </div>

          {/* White Pill Action Button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCertModal(activeCert)}
              className="px-7 py-3 bg-white hover:bg-zinc-200 text-black font-display font-extrabold text-xs uppercase tracking-wider rounded-full shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>View Certificate</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
          </div>

          {/* Quick List Card Selectors */}
          <div className="pt-4 border-t border-zinc-800 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              Select Award
            </span>
            {certificationsData.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-zinc-900 text-white font-bold border border-zinc-700'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span className="truncate">{c.title}</span>
                <span className="text-[10px] text-zinc-600">0{idx + 1}</span>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Verification Modal */}
      <AnimatePresence>
        {selectedCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-4xl w-full text-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-display text-lg font-extrabold uppercase">
                    Official Verification
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCertModal(null)}
                  className="text-zinc-500 hover:text-white p-2 rounded-full bg-zinc-900"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Certificate File/Carousel */}
                {selectedCertModal.fileUrls && selectedCertModal.fileUrls.length > 0 && (
                  <div className="relative w-full md:w-3/5 flex flex-col items-center justify-center bg-zinc-900 rounded-xl p-2 border border-zinc-800 overflow-hidden min-h-[40vh]">
                    {selectedCertModal.fileUrls[currentFileIndex].toLowerCase().endsWith('.pdf') ? (
                      <iframe 
                        src={selectedCertModal.fileUrls[currentFileIndex]} 
                        title={selectedCertModal.title}
                        className="w-full h-[60vh] rounded-lg border-0"
                      />
                    ) : (
                      <img 
                        src={selectedCertModal.fileUrls[currentFileIndex]} 
                        alt={selectedCertModal.title} 
                        className="w-full h-auto rounded-lg object-contain max-h-[60vh]"
                      />
                    )}

                    {/* Carousel Controls */}
                    {selectedCertModal.fileUrls.length > 1 && (
                      <div className="absolute bottom-4 flex items-center gap-4 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-xl">
                        <button 
                          onClick={() => setCurrentFileIndex(p => Math.max(0, p - 1))} 
                          disabled={currentFileIndex === 0}
                          className="text-white hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-white/80 font-mono text-xs font-bold w-12 text-center">
                          {currentFileIndex + 1} / {selectedCertModal.fileUrls.length}
                        </span>
                        <button 
                          onClick={() => setCurrentFileIndex(p => Math.min(selectedCertModal.fileUrls!.length - 1, p + 1))} 
                          disabled={currentFileIndex === selectedCertModal.fileUrls.length - 1}
                          className="text-white hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Details Section */}
                <div className={`space-y-6 flex-1 flex flex-col justify-center`}>
                  <div className="space-y-3 font-mono text-xs text-zinc-300">
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-zinc-500 text-[10px] uppercase block">Credential Title</span>
                      <span className="text-white font-bold text-sm">{selectedCertModal.title}</span>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-zinc-500 text-[10px] uppercase block">Issuing Authority</span>
                      <span className="text-white font-bold">{selectedCertModal.issuer}</span>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-zinc-500 text-[10px] uppercase block">Badge ID</span>
                      <span className="text-emerald-400 font-bold">{selectedCertModal.badgeCode}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={selectedCertModal.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-[#f05228] hover:bg-[#e0431a] text-white font-display font-extrabold text-xs uppercase text-center rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <span>Verify Registry</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setSelectedCertModal(null)}
                      className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-display font-bold text-xs uppercase rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};
