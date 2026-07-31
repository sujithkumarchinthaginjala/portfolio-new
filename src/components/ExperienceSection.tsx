import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Send,
  Paperclip,
  Smile,
  MessageSquare,
  Compass,
  FileText,
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';
import { ProjectShowcaseItem } from '../types';

interface ExperienceSectionProps {
  onContactClick?: () => void;
}

export const projectsList: ProjectShowcaseItem[] = [
  {
    id: 'fpl-cms',
    stepNumber: '01',
    totalSteps: '03',
    title: 'Correspondence Management System (CMS)',
    subtitle: 'Client: Florida Power & Light (FPL)',
    description:
      'Developed and maintained enterprise correspondence management modules using Java, Spring Boot, Angular 21, and MySQL. Built responsive UI components, integrated RESTful APIs, and resolved production issues.',
    iconType: 'cms',
    capabilities: [
      'Angular 21 reactive UI modules & automated document generation',
      'Spring Boot RESTful APIs & backend business logic orchestration',
      'Complex SQL database operations & production environment optimization'
    ],
    metrics: {
      responseRate: '99.8%',
      roi: '45x',
      costReduction: '60%'
    },
    mockupData: {
      botName: 'CMS Engine',
      messageTime: '10:30 AM',
      initialMessage:
        'Correspondence record #FPL-8820 generated successfully. Pushed to dispatch queue.',
      suggestedActions: ['View Module', 'Run Health Check']
    }
  },
  {
    id: 'fpl-assist',
    stepNumber: '02',
    totalSteps: '03',
    title: 'Assist Portal',
    subtitle: 'Client: Florida Power & Light (FPL)',
    description:
      'Developed reusable frontend components using Vue 3 and integrated them with Spring Boot REST APIs. Delivered feature enhancements, debugging, deployment support, and performance optimizations.',
    iconType: 'portal',
    capabilities: [
      'Vue 3 composable UI components with state management',
      'Spring Boot REST API integration & data serialization',
      'Deployment support, performance tuning & active debugging'
    ],
    metrics: {
      responseRate: '100%',
      roi: '80x',
      costReduction: '50%'
    },
    mockupData: {
      botName: 'Assist Portal',
      messageTime: '11:15 AM',
      initialMessage:
        'Assist Portal v2.4 initialized. All Spring Boot REST endpoints reporting zero latency.',
      suggestedActions: ['Launch Portal', 'API Health Check']
    }
  },
  {
    id: 'coincent-vision',
    stepNumber: '03',
    totalSteps: '03',
    title: 'Face Mask Recognition AI',
    subtitle: 'Artificial Intelligence Project • Coincent',
    description:
      'Engineered an automated face mask detection application using Python, TensorFlow, NumPy, and Pandas. Executed data preprocessing, model training, and evaluation for real-time safety compliance.',
    iconType: 'vision',
    capabilities: [
      'TensorFlow CNN model training & image matrix classification',
      'Python data preprocessing, augmentation & image scaling',
      'Real-time frame inference & safety analytics'
    ],
    metrics: {
      responseRate: '98.5%',
      roi: '90x',
      costReduction: '75%'
    },
    mockupData: {
      botName: 'Vision AI',
      messageTime: '02:05 PM',
      initialMessage:
        'Frame #4902 analyzed: Mask detected with 98.5% classification confidence.',
      suggestedActions: ['Run Inference', 'Accuracy Matrix']
    }
  }
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onContactClick }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [userMessages, setUserMessages] = useState<
    { sender: 'bot' | 'user'; text: string; time: string }[]
  >([]);
  const [inputText, setInputText] = useState<string>('');

  const currentProject = projectsList[activeIndex];

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projectsList.length - 1 : prev - 1));
    setUserMessages([]);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projectsList.length - 1 ? 0 : prev + 1));
    setUserMessages([]);
  };

  // Handle interactive chat simulation
  const handleActionClick = (actionText: string) => {
    const newMsg = {
      sender: 'user' as const,
      text: actionText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    let botReplyText = '';
    if (actionText.includes('Report')) {
      botReplyText = 'Generating report... Sales volume is up 24% this week with $142,000 in booked freight!';
    } else if (actionText.includes('Follow-up')) {
      botReplyText = 'Follow-up task created in TMS for Sales Team. Automated email dispatched.';
    } else if (actionText.includes('Map')) {
      botReplyText = 'GPS coordinates confirmed. Driver is currently 42 miles from destination.';
    } else if (actionText.includes('Notify')) {
      botReplyText = 'Consignee notified via SMS and email with live tracking link.';
    } else if (actionText.includes('Approve')) {
      botReplyText = 'BOL #4920 approved. Settlement record posted to QuickBooks.';
    } else {
      botReplyText = `Processing request: "${actionText}"... Complete.`;
    }

    const botMsg = {
      sender: 'bot' as const,
      text: botReplyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setUserMessages((prev) => [...prev, newMsg, botMsg]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botMsg = {
      sender: 'bot' as const,
      text: `Understood. ${currentProject.title} is executing: "${inputText}"`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setUserMessages((prev) => [...prev, userMsg, botMsg]);
    setInputText('');
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      id="projects" 
      className="relative z-10 w-full py-16 px-4 sm:px-8 max-w-7xl mx-auto text-white bg-black border-t border-zinc-800/80 overflow-hidden"
    >
      {/* Top Header Pill */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-md bg-[#f05228]/15 border border-[#f05228]/30 text-[#f05228] text-[10px] font-mono font-semibold tracking-widest uppercase">
          SELECTED FEATURED PROJECTS
        </span>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN (approx 42% / 5 cols): Title, Subtitle, and Curved Project Selector list */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 pr-0 lg:pr-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight mb-3">
              Projects.<br />
              <span className="text-zinc-200">Enterprise Java & Web Solutions.</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              Explore enterprise applications built for client Florida Power & Light (FPL) and AI vision systems engineered with Python & TensorFlow.
            </p>
          </div>

          {/* Left Curved Track Project Selector */}
          <div className="relative pt-2 pb-4">
            {/* Background Arc Curve Line */}
            <div className="absolute left-6 top-4 bottom-4 w-28 border-l-2 border-zinc-800 rounded-l-full pointer-events-none opacity-60" />

            <div className="space-y-6 relative z-10 pl-2">
              {projectsList.map((proj, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <motion.button
                    key={proj.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setUserMessages([]);
                    }}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-zinc-900/90 border border-zinc-700 shadow-xl'
                        : 'bg-transparent hover:bg-zinc-900/40 border border-transparent'
                    }`}
                  >
                    {/* Icon Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#f05228] text-white shadow-lg shadow-[#f05228]/30 scale-105'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 group-hover:border-zinc-700 group-hover:text-white'
                      }`}
                    >
                      {proj.iconType === 'cms' && <FileText className="w-5 h-5" />}
                      {proj.iconType === 'portal' && <Layers className="w-5 h-5" />}
                      {proj.iconType === 'vision' && <Sparkles className="w-5 h-5" />}
                      {proj.iconType === 'teams' && <MessageSquare className="w-5 h-5" />}
                      {proj.iconType === 'freight' && <Compass className="w-5 h-5" />}
                      {proj.iconType === 'docu' && <FileText className="w-5 h-5" />}
                    </div>

                    {/* Title & Subtitle */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4
                          className={`font-display text-base font-bold uppercase tracking-tight ${
                            isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                          }`}
                        >
                          {proj.title}
                        </h4>
                        <span
                          className={`text-xs font-mono transition-transform ${
                            isSelected ? 'text-[#f05228] translate-x-1' : 'text-zinc-600'
                          }`}
                        >
                          &rsaquo;
                        </span>
                      </div>
                      <p className="text-zinc-500 text-xs font-sans truncate font-medium mt-0.5">
                        {proj.subtitle}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (approx 58% / 7 cols): Interactive Project Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Card Header Step Counter */}
              <div className="mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#f05228]">
                  {currentProject.stepNumber}{' '}
                  <span className="text-zinc-600">/ {currentProject.totalSteps}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                  {currentProject.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-medium mt-1">
                  {currentProject.subtitle}
                </p>
              </div>

              {/* Description Paragraph */}
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {currentProject.description}
              </p>

              {/* Divider */}
              <hr className="border-zinc-800 my-4" />

              {/* Card Content Grid: Capabilities + Interactive Chat Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
                
                {/* Left side of card: Key Capabilities & Impact */}
                <div className="md:col-span-6 space-y-6">
                  <div>
                    <h5 className="text-[10px] uppercase font-mono font-bold text-zinc-500 tracking-widest mb-3">
                      KEY CAPABILITIES
                    </h5>
                    <ul className="space-y-2.5">
                      {currentProject.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-[#f05228] shrink-0 mt-0.5" />
                          <span className="font-sans leading-tight">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="border-zinc-800/80" />

                  {/* Impact Delivered Metrics */}
                  <div>
                    <h5 className="text-[10px] uppercase font-mono font-bold text-zinc-500 tracking-widest mb-3">
                      IMPACT DELIVERED
                    </h5>
                    <div className="grid grid-cols-3 gap-2 text-left">
                      <div>
                        <div className="font-display text-lg sm:text-xl font-extrabold text-white">
                          {currentProject.metrics.responseRate}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-medium">Response rate</div>
                      </div>
                      <div>
                        <div className="font-display text-lg sm:text-xl font-extrabold text-white">
                          {currentProject.metrics.roi}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-medium">ROI</div>
                      </div>
                      <div>
                        <div className="font-display text-lg sm:text-xl font-extrabold text-white">
                          {currentProject.metrics.costReduction}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-medium">Cost reduction</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side of card: Live Interactive Chat Mockup */}
                <div className="md:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-inner flex flex-col justify-between min-h-[280px]">
                  {/* Chat Mockup Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#f05228] text-white flex items-center justify-center font-bold text-[10px]">
                        {currentProject.mockupData.botName.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block leading-none">
                          {currentProject.mockupData.botName}
                        </span>
                        <span className="text-[9px] text-emerald-400 font-mono">
                          ● Online
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {currentProject.mockupData.messageTime}
                    </span>
                  </div>

                  {/* Chat Messages Body */}
                  <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1 text-xs">
                    {/* Bot initial message */}
                    <div className="bg-zinc-800/90 border border-zinc-700/60 p-3 rounded-xl text-zinc-200 leading-relaxed font-sans">
                      {currentProject.mockupData.initialMessage}
                    </div>

                    {/* Interactive Suggested Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {currentProject.mockupData.suggestedActions.map((act) => (
                        <button
                          key={act}
                          onClick={() => handleActionClick(act)}
                          className="px-2.5 py-1.5 bg-zinc-800 hover:bg-[#f05228] text-zinc-200 hover:text-white border border-zinc-700 hover:border-[#f05228] rounded-lg text-[10px] font-mono font-semibold transition-all cursor-pointer shadow-sm"
                        >
                          {act}
                        </button>
                      ))}
                    </div>

                    {/* Dynamic user conversation messages */}
                    {userMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl text-xs font-sans max-w-[90%] leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#f05228] text-white ml-auto text-right rounded-br-none'
                            : 'bg-zinc-800 border border-zinc-700 text-zinc-200 mr-auto text-left rounded-bl-none'
                        }`}
                      >
                        <div className="text-[9px] font-mono opacity-75 mb-0.5">{msg.time}</div>
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  {/* Interactive Chat Input Bar */}
                  <form onSubmit={handleSendMessage} className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-zinc-500 pl-1">
                      <Paperclip className="w-3.5 h-3.5 hover:text-zinc-300 cursor-pointer" />
                      <Smile className="w-3.5 h-3.5 hover:text-zinc-300 cursor-pointer" />
                    </div>
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 font-sans"
                    />
                    <button
                      type="submit"
                      className="p-1.5 bg-[#f05228] hover:bg-[#e0431a] text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Bottom Card Navigation Controls */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous project"
                    className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Pagination Dots */}
                  <div className="flex items-center gap-2 px-3">
                    {projectsList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveIndex(idx);
                          setUserMessages([]);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          activeIndex === idx
                            ? 'w-6 bg-[#f05228]'
                            : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    aria-label="Next project"
                    className="p-2.5 rounded-full bg-[#f05228] hover:bg-[#e0431a] text-white shadow-lg transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {onContactClick && (
                  <button
                    onClick={onContactClick}
                    className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Request Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f05228]" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
};
