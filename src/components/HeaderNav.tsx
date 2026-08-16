import React from 'react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { NavTab } from '../types';

interface HeaderNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenMemberModal: () => void;
  isLightHeader?: boolean;
}

const navItems: NavTab[] = ['Home', 'About', 'Projects', 'Experience', 'Skills', 'Contact'];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenMemberModal,
  isLightHeader,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. At top of page, header is always visible
      if (currentScrollY <= 50) {
        setIsVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        lastScrollY.current = currentScrollY;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (isScrollingDown) {
        // Scrolling down the page -> hide header immediately
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsVisible(false);
      } else {
        // Scrolling up the page -> show header and start 5-second timer to auto-hide
        setIsVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          if (window.scrollY > 50) {
            setIsVisible(false);
          }
        }, 5000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isLightHeader
          ? 'bg-white border-b border-zinc-200 shadow-md text-zinc-900'
          : 'bg-zinc-950 border-b border-zinc-800 shadow-md text-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
        {/* Left Metadata & Identity */}
        <div className="flex items-center gap-3">
          <a href="#home" className="flex flex-col items-center md:items-start group">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#f05228] font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f05228] animate-pulse" />
              PORTFOLIO
            </span>
            <span
              className={`text-xs sm:text-sm font-bold tracking-tight uppercase font-display transition-colors group-hover:text-[#f05228] ${isLightHeader ? 'text-zinc-900' : 'text-white'
                }`}
            >
              Sujith Kumar Chinthaginjala
            </span>
          </a>
        </div>

        {/* Center Pill Navigation (Solid Capsule) */}
        <nav
          className={`inline-flex items-center gap-1 p-1.5 border rounded-full overflow-x-auto max-w-full relative z-10 transition-colors duration-500 ${isLightHeader
              ? 'bg-zinc-100 border-zinc-200 shadow-inner'
              : 'bg-zinc-900 border-zinc-800 shadow-inner'
            }`}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);

                  if (item === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                  }

                  const elementId = item.toLowerCase();
                  const elem = document.getElementById(elementId);
                  if (elem) {
                    const headerOffset = 100;
                    const elementPosition = elem.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`relative px-3.5 sm:px-4 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-all rounded-full cursor-pointer select-none whitespace-nowrap ${isActive
                    ? isLightHeader
                      ? 'text-[#f05228] font-bold'
                      : 'text-white font-bold'
                    : isLightHeader
                      ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/80'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-[#f05228]/20 border border-[#f05228]/50 rounded-full shadow-[0_0_15px_rgba(240,82,40,0.2)] z-[-1]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Location Badge */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="hidden lg:flex flex-col text-right">
            <span
              className={`text-xs font-semibold font-mono transition-colors ${isLightHeader ? 'text-zinc-800' : 'text-zinc-200'
                }`}
            >
              Hyderabad, IN
            </span>
            <span
              className={`text-[10px] uppercase tracking-widest font-semibold font-mono transition-colors ${isLightHeader ? 'text-zinc-500' : 'text-zinc-400'
                }`}
            >
              IST (UTC+5:30)
            </span>
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

