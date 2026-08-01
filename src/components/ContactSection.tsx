import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSectionScrollFx } from '../utils/animations';
import {
  Send,
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
  Github,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';

interface ContactSectionProps {
  onSuccess?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccess }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollFx = useSectionScrollFx(sectionRef);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('chinthaginjalasujithkumar@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }, 900);
  };

  return (
    <motion.section
      ref={sectionRef}
      {...scrollFx}
      id="contact"
      className="relative z-10 w-full py-24 px-6 md:px-12 max-w-7xl mx-auto text-white border-t border-zinc-800/80 overflow-hidden"
    >
      
      {/* Background Glowing 3D Globe Visual */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Radial Glow Atmosphere centered behind Globe */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#f05228]/30 via-amber-600/20 to-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <svg
          className="w-full max-w-4xl h-full text-zinc-400"
          viewBox="0 0 1000 700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <defs>
            {/* Globe Atmosphere Gradient */}
            <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#000000" stopOpacity="0.5" />
              <stop offset="90%" stopColor="#f05228" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f05228" stopOpacity="0.85" />
            </radialGradient>

            <linearGradient id="arc-grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f05228" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="arc-grad-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f05228" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="glass-specular" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#f05228" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Connected Globe Group centered in the SVG canvas */}
          <g transform="translate(500, 350)">
            
            {/* Outer Atmospheric Glow Ring */}
            <circle cx="0" cy="0" r="310" fill="url(#globe-glow)" />
            <circle cx="0" cy="0" r="311" stroke="#f05228" strokeWidth="2" strokeOpacity="0.6" fill="none" />
            <circle cx="0" cy="0" r="318" stroke="#f05228" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />

            {/* Latitude Parallels */}
            <ellipse cx="0" cy="-200" rx="240" ry="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
            <ellipse cx="0" cy="-120" rx="285" ry="60" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" />
            <ellipse cx="0" cy="-40" rx="308" ry="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
            <ellipse cx="0" cy="40" rx="308" ry="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
            <ellipse cx="0" cy="120" rx="285" ry="60" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" />
            <ellipse cx="0" cy="200" rx="240" ry="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />

            {/* Longitude Meridians */}
            <ellipse cx="0" cy="0" rx="310" ry="310" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
            <ellipse cx="0" cy="0" rx="230" ry="310" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" />
            <ellipse cx="0" cy="0" rx="130" ry="310" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
            <ellipse cx="0" cy="0" rx="40" ry="310" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />

            {/* Global Continents Outlines (Simplified Dots/Poly Matrix) */}
            <g opacity="0.9">
              {/* North America Cluster */}
              <circle cx="-180" cy="-80" r="3.5" fill="#ffffff" />
              <circle cx="-160" cy="-110" r="3" fill="#ffffff" />
              <circle cx="-210" cy="-60" r="2.5" fill="#ffffff" />
              <circle cx="-140" cy="-50" r="4" fill="#f05228" />

              {/* Europe & Middle East Cluster */}
              <circle cx="-20" cy="-120" r="3.5" fill="#ffffff" />
              <circle cx="20" cy="-140" r="3" fill="#ffffff" />
              <circle cx="40" cy="-90" r="4" fill="#f05228" />
              <circle cx="10" cy="-60" r="2.5" fill="#ffffff" />

              {/* Asia & East Asia Cluster */}
              <circle cx="120" cy="-110" r="3.5" fill="#ffffff" />
              <circle cx="180" cy="-80" r="4.5" fill="#38bdf8" />
              <circle cx="210" cy="-40" r="3" fill="#ffffff" />
              <circle cx="150" cy="-30" r="3.5" fill="#ffffff" />

              {/* South America & Africa Cluster */}
              <circle cx="-110" cy="80" r="3" fill="#ffffff" />
              <circle cx="-90" cy="140" r="3.5" fill="#ffffff" />
              <circle cx="30" cy="40" r="4" fill="#f05228" />
              <circle cx="60" cy="110" r="2.5" fill="#ffffff" />
            </g>

            {/* High-Trajectory Glowing Orbital Arcs */}
            <path d="M -140 -50 Q -50 -260 40 -90" stroke="url(#arc-grad-orange)" strokeWidth="3" fill="none" />
            <path d="M 40 -90 Q 110 -220 180 -80" stroke="url(#arc-grad-cyan)" strokeWidth="2.5" fill="none" />
            <path d="M -140 -50 Q 20 -320 180 -80" stroke="#f05228" strokeWidth="2" fill="none" strokeDasharray="6 6" className="animate-pulse" />
            <path d="M 30 40 Q -30 180 -90 140" stroke="#38bdf8" strokeWidth="2" fill="none" />

            {/* Glowing Pulse Rings on Major Hubs */}
            <g transform="translate(-140, -50)">
              <circle cx="0" cy="0" r="14" fill="#f05228" fillOpacity="0.3" className="animate-ping" />
              <circle cx="0" cy="0" r="6" fill="#f05228" stroke="#ffffff" strokeWidth="2" />
            </g>

            <g transform="translate(180, -80)">
              <circle cx="0" cy="0" r="14" fill="#38bdf8" fillOpacity="0.3" className="animate-ping" />
              <circle cx="0" cy="0" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            </g>

            <g transform="translate(40, -90)">
              <circle cx="0" cy="0" r="10" fill="#f59e0b" fillOpacity="0.35" />
              <circle cx="0" cy="0" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
            </g>

          </g>
        </svg>

        {/* Soft Ambient Radial Vignette Overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Floating Global Network Status Indicator */}
      <div className="absolute bottom-6 left-6 sm:left-12 z-20 hidden md:flex items-center gap-3 bg-zinc-900/90 border border-zinc-800/80 px-4 py-2 rounded-xl backdrop-blur-md text-[11px] font-mono text-zinc-300">
        <span className="w-2 h-2 rounded-full bg-[#f05228] animate-ping" />
        <span className="font-bold text-white uppercase tracking-wider">HYDERABAD HUB ONLINE</span>
        <span className="text-zinc-500">//</span>
        <span className="text-zinc-400">Response time: &lt; 24h</span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN (lg:col-span-6): Title, Address, Hours & Contacts */}
        <div className="lg:col-span-6 space-y-10 pr-0 lg:pr-8">
          
          {/* Title with accent square dot */}
          <div>
            <h2 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-white leading-none flex items-baseline gap-1">
              <span>Contact Me</span>
              <span className="inline-block w-3.5 h-3.5 bg-[#f05228] rounded-sm" />
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-sans font-medium mt-4 max-w-md leading-relaxed">
              Open for full-time Java Full Stack roles, Spring Boot backend engineering, and technical consultations. Reach out directly or send a message.
            </p>
          </div>

          {/* Left Vertical Accent Line & Info Blocks */}
          <div className="relative pl-6 border-l-2 border-[#f05228] space-y-8">
            
            {/* Location & Availability */}
            <div className="space-y-2">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest font-semibold block">
                Location & Availability
              </span>
              <p className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                Hyderabad, Telangana, 500071<br />
                India<br />
                <span className="text-xs text-zinc-400 font-mono font-normal">Open for Full-time & Remote Engineering Roles</span>
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#f05228]" />
                <span>IST (UTC+5:30) • Immediate Joiner</span>
              </div>
            </div>

            {/* Direct Contacts */}
            <div className="space-y-2">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest font-semibold block">
                Direct Email
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:chinthaginjalasujithkumar@gmail.com"
                  className="font-display text-base sm:text-lg font-bold text-white hover:text-[#f05228] transition-colors block break-all"
                >
                  chinthaginjalasujithkumar@gmail.com
                </a>
                <button
                  onClick={handleCopyEmail}
                  title="Copy Email Address"
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#f05228]" />}
                </button>
              </div>
            </div>

          </div>

          {/* Visually Enhanced Social Media Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/sujithkumarchinthaginjala/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-[#f05228] text-xs font-mono font-bold text-white transition-all hover:scale-105 shadow-lg group"
            >
              <Github className="w-4 h-4 text-white group-hover:text-[#f05228] transition-colors" />
              <span>GitHub Profile</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sujithkumarchinthaginjala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-sky-500 text-xs font-mono font-bold text-white transition-all hover:scale-105 shadow-lg group"
            >
              <Linkedin className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
              <span>LinkedIn Network</span>
            </a>

            <a
              href="mailto:chinthaginjalasujithkumar@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-emerald-500 text-xs font-mono font-bold text-white transition-all hover:scale-105 shadow-lg group"
            >
              <Mail className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span>Send Email</span>
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN (lg:col-span-6): Framed Contact Form Box */}
        <div className="lg:col-span-6 relative">
          
          {/* Accent Corner Frame Brackets [ ] */}
          <div className="absolute -inset-4 pointer-events-none hidden sm:block">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f05228]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#f05228]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#f05228]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f05228]" />
          </div>

          {/* Main Form WWDC Glass Box */}
          <div className="bg-zinc-950/60 border border-white/20 p-8 sm:p-10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative z-10 backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/10">
            
            {/* Glass Highlight Top Reflection Bar */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl pointer-events-none" />

            <h3 className="font-display text-2xl font-extrabold uppercase text-white tracking-tight mb-8 flex items-center justify-between">
              <span>Send Message</span>
              <span className="text-[10px] font-mono font-normal text-zinc-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                DIRECT INBOX
              </span>
            </h3>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f05228]/20 border border-[#f05228] text-[#f05228] flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-extrabold text-white uppercase">
                    Message Delivered!
                  </h4>
                  <p className="text-zinc-300 text-xs font-sans max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out, {formData.name || 'Friend'}. Sujith will review your message and respond directly via email.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase font-bold text-zinc-400 tracking-widest block">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-transparent border-b border-zinc-700 focus:border-[#f05228] pb-2 text-white font-display text-lg font-bold placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase font-bold text-zinc-400 tracking-widest block">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@company.com"
                      className="w-full bg-transparent border-b border-zinc-700 focus:border-[#f05228] pb-2 text-white font-display text-lg font-bold placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase font-bold text-zinc-400 tracking-widest block">
                      MESSAGE DETAILS
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your team, role opportunities, or project goals..."
                      className="w-full bg-transparent border-b border-zinc-700 focus:border-[#f05228] pb-2 text-white font-sans text-sm font-medium placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full py-4 bg-[#f05228] hover:bg-[#e0431a] text-white font-display font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>SENDING...</span>
                      ) : (
                        <>
                          <span>SEND DIRECT MESSAGE</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="mt-20 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
        <div>
          © 2026 Sujith Kumar Chinthaginjala. Java Full Stack Engineer.
        </div>
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#experience" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
        </div>
      </div>

    </motion.section>
  );
};

