import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export const FooterBar: React.FC = () => {
  const scrollToExplore = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative z-20 w-full pt-8 pb-8 px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-t border-zinc-800">
      {/* Bottom Left: Paragraph summary & Social Media Links */}
      <div className="flex flex-col gap-4 max-w-sm text-center md:text-left">
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
          Building resilient, high-performance enterprise applications with Java, Spring Boot, Angular 21, Vue 3, and SQL.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-3">
          <a
            href="https://github.com/sujithkumarchinthaginjala/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#f05228] text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/sujithkumarchinthaginjala"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-sky-500 text-zinc-300 hover:text-sky-400 transition-all cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:chinthaginjalasujithkumar@gmail.com"
            aria-label="Send Email"
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500 text-zinc-300 hover:text-emerald-400 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Right: Scroll Indicator with Accent Line & Metadata */}
      <div className="flex flex-col items-center md:items-end gap-5">
        {/* Scroll to Explore with horizontal white bar accent */}
        <motion.button
          onClick={scrollToExplore}
          whileHover={{ y: 2 }}
          className="group flex items-center gap-4 text-white hover:text-[#f05228] transition-colors cursor-pointer"
        >
          <span className="h-[1px] w-12 bg-white group-hover:bg-[#f05228] group-hover:w-16 transition-all" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold flex items-center gap-1.5 font-mono">
            Scroll to Explore
            <ArrowDown className="w-3.5 h-3.5 inline-block text-[#f05228]" />
          </span>
        </motion.button>

        {/* Status Badges */}
        <div className="flex items-center gap-8 text-left">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold font-mono">Location</span>
            <span className="text-xs font-mono text-zinc-300">Hyderabad, IN</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold font-mono">Status</span>
            <span className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to Hire
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

