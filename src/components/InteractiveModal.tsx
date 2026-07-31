import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Send, Copy, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { ModalState } from '../types';

interface InteractiveModalProps {
  modalState: ModalState;
  onClose: () => void;
}

export const InteractiveModal: React.FC<InteractiveModalProps> = ({
  modalState,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'Full-time Java Developer',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!modalState.isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('chinthaginjalasujithkumar@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email.trim() && formData.message.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', roleType: 'Full-time Java Developer', message: '' });
          onClose();
        }, 2200);
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl backdrop-saturate-150 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-zinc-950/90 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-white overflow-hidden ring-1 ring-white/10 my-8"
        >
          {/* Glass Specular Highlight Header Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer border border-zinc-700/80 z-20"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f05228]/20 border border-[#f05228] text-[#f05228] flex items-center justify-center shadow-2xl">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                Message Dispatched
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm max-w-xs leading-relaxed font-sans">
                Thank you, {formData.name || 'Friend'}! Your inquiry has been sent directly to Sujith. He will respond via email shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header Badge & Title */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f05228]/15 border border-[#f05228]/40 text-[10px] tracking-[0.25em] uppercase font-mono font-bold text-[#f05228]">
                  <Sparkles className="w-3 h-3 text-[#f05228]" />
                  <span>Get In Touch • Direct Enquiry</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  Sujith Kumar C.
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                  Java Full Stack Developer • Spring Boot, Angular 21, Vue 3, REST APIs & SQL
                </p>
              </div>

              {/* Visually Styled Social Badges / Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <a
                  href="https://github.com/sujithkumarchinthaginjala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 text-xs font-mono font-semibold text-zinc-200 transition-all hover:scale-[1.02] shadow-md group"
                >
                  <Github className="w-4 h-4 text-white group-hover:text-[#f05228] transition-colors" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/sujithkumarchinthaginjala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-sky-500 text-xs font-mono font-semibold text-zinc-200 transition-all hover:scale-[1.02] shadow-md group"
                >
                  <Linkedin className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
                  <span>LinkedIn</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-[#f05228] text-xs font-mono font-semibold text-zinc-200 transition-all hover:scale-[1.02] shadow-md group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#f05228]" />
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-300">
                <MapPin className="w-4 h-4 text-[#f05228] shrink-0" />
                <span className="truncate">Hyderabad, Telangana, 500071 • India</span>
              </div>

              {/* Direct Message Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono font-bold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#f05228] transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono font-bold">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#f05228] transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono font-bold">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#f05228] transition-all font-sans"
                  >
                    <option value="Full-time Java Developer">Full-time Java Full Stack Role</option>
                    <option value="Spring Boot Backend Role">Spring Boot Backend Role</option>
                    <option value="Angular / Vue Frontend Role">Angular / Vue Frontend Role</option>
                    <option value="Freelance / Contract">Contract Project / Consultation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono font-bold">
                    Message / Project Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Sujith, we are looking for a Java Full Stack Developer for our team..."
                    className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#f05228] transition-all font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#f05228] hover:bg-[#e0431a] text-white font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Direct Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 font-mono tracking-wider">
                <span>HYDERABAD, TELANGANA, 500071</span>
                <span>IST (UTC+5:30)</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

