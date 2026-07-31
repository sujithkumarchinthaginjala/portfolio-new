import React from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles } from 'lucide-react';
import { NavTab } from '../types';

interface HeaderNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenMemberModal: () => void;
}

const navItems: NavTab[] = ['Home', 'About', 'Projects', 'Experience', 'Skills', 'Contact'];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenMemberModal,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-2xl backdrop-saturate-180 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-all">
      {/* Specular Highlight Bar (Apple WWDC Glass Top Edge) */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Metadata & Identity */}
        <div className="flex items-center gap-3">
          <a href="#home" className="flex flex-col items-center md:items-start group">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#f05228] font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f05228] animate-pulse" />
              PORTFOLIO
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-display group-hover:text-[#f05228] transition-colors">
              Sujith Kumar Chinthaginjala
            </span>
          </a>
        </div>

        {/* Center Pill Navigation (Apple Glass Capsule) */}
        <nav className="inline-flex items-center gap-1 p-1 bg-zinc-900/70 backdrop-blur-xl border border-white/15 rounded-full shadow-inner shadow-black/80 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  const elementId = item.toLowerCase();
                  const elem = document.getElementById(elementId);
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`relative px-3.5 sm:px-4 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-all rounded-full cursor-pointer select-none whitespace-nowrap ${
                  isActive ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-[#f05228]/25 border border-[#f05228]/50 rounded-full shadow-[0_0_15px_rgba(240,82,40,0.3)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Location Badge */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-xs font-semibold text-zinc-200 font-mono">Hyderabad, IN</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">IST (UTC+5:30)</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenMemberModal}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-[#f05228] hover:bg-[#e0431a] border border-[#f05228] rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_4px_20px_rgba(240,82,40,0.4)] cursor-pointer"
          >
            <span>Get In Touch</span>
            <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center bg-black/20 group-hover:bg-white group-hover:text-black transition-colors">
              <Mail className="w-3 h-3" />
            </div>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

