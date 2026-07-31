/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans flex flex-col justify-between">
      {/* Background: Pure plain black with optional architectural dashed guidelines */}
      <GridGuidelines showGuidelines={showGuidelines} />

      {/* Sticky Top Header Navigation - Pinned globally while content scrolls underneath */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMemberModal={handleOpenMemberModal}
      />

      {/* Hero Section Container with Scroll Animation */}
      <div className="relative z-10 w-full h-[300vh]">
        <HeroCanvasBackground />
        
        <div className="sticky top-0 flex flex-col justify-between h-screen w-full pointer-events-none">
          {/* Make inner content pointer-events-auto so we can interact with buttons */}
          <div className="flex-1 flex flex-col w-full pointer-events-auto pt-[64px]">
            {/* Hero Center Display */}
            <HeroCenter onOpenSignUpModal={handleOpenSignUpModal} />
          </div>

          <div className="pointer-events-auto">
            {/* Footer Bar (Social Icons & Scroll Indicator) */}
            <FooterBar />
          </div>
        </div>
      </div>

      {/* Explore Section below the fold */}
      <ExploreSection
        activeTab={activeTab}
        onOpenSignUpModal={handleOpenSignUpModal}
      />

      {/* Professional Journey Section (between Layout 2 and Layout 3) */}
      <JourneySection onActionClick={handleOpenSignUpModal} />

      {/* Secondary Scroll Motion Background */}
      <div className="relative z-10 w-full h-[300vh]">
        <SecondaryCanvasBackground />
      </div>

      {/* Experience Section */}
      <ExperienceSection onContactClick={handleOpenSignUpModal} />

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
