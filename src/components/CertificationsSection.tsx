import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    id: 'inu-fullstack-cert',
    title: 'Java Full Stack Specialist',
    issuer: 'INU TECHNOLOGY SOLUTIONS',
    issueDate: 'Dec 2024',
    projectName: 'Enterprise Java & Spring Boot Architecture',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#7c2d12',
    accentText: '#fdba74',
    description: 'Certified in end-to-end enterprise Java full stack development covering Spring Boot microservices, Angular 21, Vue 3 UI, RESTful API design, and MySQL database persistence.',
    badgeCode: 'INU-FS-2024-8802',
    verificationUrl: 'https://www.linkedin.com/in/sujithkumarchinthaginjala'
  },
  {
    id: 'coincent-ai-cert',
    title: 'AI & Machine Learning Specialization',
    issuer: 'COINCENT CERTIFICATE',
    issueDate: 'Dec 2021',
    projectName: 'Face Mask Recognition System',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#581c87',
    accentText: '#d8b4fe',
    description: 'Certification of completion in Artificial Intelligence using Python. Mastered TensorFlow model training, OpenCV image matrix preprocessing, and Convolutional Neural Networks (CNN).',
    badgeCode: 'COINCENT-AI-2021-094',
    verificationUrl: 'https://github.com/sujithkumarchinthaginjala/'
  },
  {
    id: 'aits-btech-degree',
    title: 'B.Tech in ECE (8.5 CGPA)',
    issuer: 'AITS COLLEGE OF ENGINEERING',
    issueDate: 'May 2024',
    projectName: 'Electronics & Communication Engineering',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#064e3b',
    accentText: '#6ee7b7',
    description: 'Awarded Bachelor of Technology with academic distinction (8.5/10 CGPA). Comprehensive coursework in software engineering, object-oriented Java programming, DBMS, and data structures.',
    badgeCode: 'AITS-ECE-2024-085',
    verificationUrl: 'https://www.linkedin.com/in/sujithkumarchinthaginjala'
  },
  {
    id: 'java-db-foundations',
    title: 'Java & SQL Foundations',
    issuer: 'ORACLE ACADEMY',
    issueDate: 'Jun 2023',
    projectName: 'Java Programming & Relational SQL',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#1e3a8a',
    accentText: '#93c5fd',
    description: 'Validates core proficiency in Java syntax, object-oriented design principles, relational database structures, SQL querying, and exception handling.',
    badgeCode: 'ORCL-JAVA-2023-1102',
    verificationUrl: 'https://github.com/sujithkumarchinthaginjala/'
  },
  {
    id: 'agile-devops-cert',
    title: 'Agile Software & DevOps Tools',
    issuer: 'SOFTWARE ENGINEERING ACADEMY',
    issueDate: 'Oct 2023',
    projectName: 'Modern CI/CD & Version Control',
    recipient: 'Sujith Kumar Chinthaginjala',
    cardColor: '#831843',
    accentText: '#fbcfe8',
    description: 'Certificate in Agile development methodologies, Jira sprint workflows, Git/GitHub branching strategies, Apache Maven build automation, and Postman API testing.',
    badgeCode: 'AGILE-DEV-2023-442',
    verificationUrl: 'https://www.linkedin.com/in/sujithkumarchinthaginjala'
  }
];

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onVerifyClick }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCertModal, setSelectedCertModal] = useState<CertificationItem | null>(null);

  const activeCert = certificationsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === certificationsData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? certificationsData.length - 1 : prev - 1));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      id="certifications" 
      className="relative z-10 w-full py-20 px-4 sm:px-8 max-w-7xl mx-auto text-white bg-black border-t border-zinc-800/80 overflow-hidden"
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
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  style={{
                    backgroundColor: cert.cardColor
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
              onClick={() => {
                if (onVerifyClick) {
                  onVerifyClick(activeCert);
                } else {
                  setSelectedCertModal(activeCert);
                }
              }}
              className="px-7 py-3 bg-white hover:bg-zinc-200 text-black font-display font-extrabold text-xs uppercase tracking-wider rounded-full shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Visit</span>
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
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white space-y-6 shadow-2xl relative"
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};
