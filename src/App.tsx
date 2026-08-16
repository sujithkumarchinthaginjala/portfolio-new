/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { NavTab, ModalState } from './types';
import { HeaderNav } from './components/HeaderNav';
import { HeroCenter } from './components/HeroCenter';
import { FooterBar } from './components/FooterBar';
import { GridGuidelines } from './components/GridGuidelines';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { JourneySection } from './components/JourneySection';
import { ExploreSection } from './components/ExploreSection';
import { InteractiveModal } from './components/InteractiveModal';
import { HeroCanvasBackground } from './components/HeroCanvasBackground';
import { SecondaryCanvasBackground } from './components/SecondaryCanvasBackground';
import { GlobalThreeBackground } from './components/GlobalThreeBackground';
import { HeroNameHandoff } from './components/HeroNameHandoff';
import { Grid3X3 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('Home');
  const [showGuidelines, setShowGuidelines] = useState<boolean>(true);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
  });

  const handleOpenMemberModal = () => {
    setModalState({ isOpen: true, type: 'member' });
  };

  const handleOpenSignUpModal = () => {
    setModalState({ isOpen: true, type: 'signup' });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const [isLightHeader, setIsLightHeader] = React.useState(false);
  const exploreRef = React.useRef<HTMLDivElement>(null);
  const journeyRef = React.useRef<HTMLDivElement>(null);
  const heroNameRef = React.useRef<HTMLHeadingElement>(null);
  const heroNameOpacity = useMotionValue(1);

  React.useEffect(() => {
    const handleScrollHeader = () => {
      if (!exploreRef.current) return;

      // Sample the actual DOM element rendered at the header position (center of screen, y=75px)
      const sampledElement = document.elementFromPoint(window.innerWidth / 2, 75);

      // If the sampled element is inside ExploreSection, the header is over the light bg-white section
      if (sampledElement && exploreRef.current.contains(sampledElement)) {
        setIsLightHeader(true);
      } else {
        setIsLightHeader(false);
      }
    };

    const handleScrollActiveTab = () => {
      const sections: { id: string; tab: NavTab }[] = [
        { id: 'contact', tab: 'Contact' },
        { id: 'skills', tab: 'Skills' },
        { id: 'projects', tab: 'Projects' },
        { id: 'experience', tab: 'Experience' },
        { id: 'about', tab: 'About' },
        { id: 'home', tab: 'Home' },
      ];

      const viewportMid = window.innerHeight * 0.4;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid && rect.bottom >= 0) {
            setActiveTab(sec.tab);
            return;
          }
        }
      }
    };

    const handleScroll = () => {
      handleScrollHeader();
      handleScrollActiveTab();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reference for the Hero + Explore transition area
  const heroExploreContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroExploreContainerRef,
    offset: ["start start", "end end"]
  });

  // The window closing overlaps the last 100vh of the 300vh container.
  // Since the scrollable distance of the container is 200vh, the last 100vh maps to progress 0.5 to 1.0.
  const heroScale = useTransform(heroScrollProgress, [0.5, 1], [1, 0.95]);
  const heroOpacity = useTransform(heroScrollProgress, [0.5, 1], [1, 0]);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans flex flex-col justify-between">

      {/* Background: Pure plain black with optional architectural dashed guidelines */}
      <GridGuidelines showGuidelines={showGuidelines} />

      {/* Sticky Top Header Navigation - Pinned globally while content scrolls underneath */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMemberModal={handleOpenMemberModal}
        isLightHeader={isLightHeader}
      />

      {/* Hero and Explore Transition Container */}
      <div ref={heroExploreContainerRef} className="relative z-10 w-full h-[300vh] bg-black">
        <HeroCanvasBackground />

        {/* Hero Section Container - Sticky */}
        <motion.div
          style={{ scale: heroScale, willChange: 'transform' }}
          className="sticky top-0 pt-12 sm:pt-16 flex flex-col justify-between h-screen w-full pointer-events-none origin-bottom"
        >
          {/* Make inner content pointer-events-auto so we can interact with buttons */}
          <div className="flex-1 flex flex-col w-full pointer-events-auto">
            {/* Hero Center Display */}
            <HeroCenter
              onOpenSignUpModal={handleOpenSignUpModal}
              scrollYProgress={heroScrollProgress}
              nameRef={heroNameRef}
              nameOpacity={heroNameOpacity}
            />
          </div>

          <motion.div className="pointer-events-auto" style={{ opacity: heroOpacity }}>
            {/* Footer Bar (Social Icons & Scroll Indicator) */}
            <FooterBar />
          </motion.div>
        </motion.div>
      </div>

      {/* ExploreSection - Native Scroll Window Closing with mt-[-100vh] to overlap the sticky Hero */}
      <div ref={exploreRef} className="relative z-20 w-full bg-[#faf0e6] shadow-[0_-30px_60px_rgba(0,0,0,0.1)] border-t border-amber-200/60 pt-10 mt-[-100vh]">
        <ExploreSection
          activeTab={activeTab}
          onOpenSignUpModal={handleOpenSignUpModal}
        />
      </div>

      <HeroNameHandoff
        nameRef={heroNameRef}
        exploreRef={exploreRef}
        sourceOpacity={heroNameOpacity}
      />

      {/* Professional Journey & Projects (Experience) - Sticky Background with Foreground Scrolling Content */}
      <div className="relative z-30 w-full bg-black text-white mt-[-100vh]">
        {/* Sticky Background for Journey & Projects Sections */}
        <div className="sticky top-0 h-screen w-full pointer-events-none overflow-hidden z-0 bg-black">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(240,82,40,0.06),transparent_60%)] pointer-events-none" />
          <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#f05228]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Foreground Content: Journey Timeline -> Projects Showcase scroll smoothly over sticky background */}
        <div className="relative z-10 -mt-[100vh]">
          {/* Professional Journey Section */}
          <div ref={journeyRef}>
            <JourneySection onActionClick={handleOpenSignUpModal} />
          </div>

          {/* Experience / Projects Section */}
          <ExperienceSection onContactClick={handleOpenSignUpModal} />
        </div>
      </div>

      {/* Skills Section (4th Layout) */}
      <SkillsSection onExploreClick={handleOpenSignUpModal} />

      {/* Certifications & Honors Section (5th Layout) */}
      <CertificationsSection onVerifyClick={(cert) => handleOpenSignUpModal()} />

      {/* Contact Us Section */}
      <ContactSection onSuccess={handleOpenSignUpModal} />

      {/* Floating Toggle for Grid Guidelines */}
      <button
        onClick={() => setShowGuidelines(!showGuidelines)}
        title="Toggle Architectural Grid Lines"
        className="fixed bottom-5 left-5 z-40 p-2.5 bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-full text-white/60 hover:text-white transition-all cursor-pointer shadow-lg"
      >
        <Grid3X3 className="w-4 h-4" />
      </button>

      {/* Interactive Modal */}
      <InteractiveModal modalState={modalState} onClose={handleCloseModal} />
    </div>
  );
}
