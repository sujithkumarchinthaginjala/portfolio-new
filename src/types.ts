export type NavTab = 'Home' | 'About' | 'Projects' | 'Experience' | 'Skills' | 'Contact';

export interface ModalState {
  isOpen: boolean;
  type: 'member' | 'signup' | 'contact' | null;
}

export interface ProjectShowcaseItem {
  id: string;
  stepNumber: string;
  totalSteps: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'cms' | 'portal' | 'vision' | 'teams' | 'freight' | 'docu';
  capabilities: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  modelFamily: string;
  shortDescription: string;
  fullDescription: string;
  iconType: 'java' | 'springboot' | 'angular' | 'vue' | 'database' | 'aws' | 'openai' | 'llama' | 'mistral' | 'perplexity' | 'claude' | 'gemini';
  proficiency: number;
  proficiencyLabel: string;
  whyUseIt: string[];
  keyCapabilities: string[];
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  projectName: string;
  recipient: string;
  cardColor: string;
  accentText: string;
  description: string;
  badgeCode: string;
  verificationUrl: string;
  fileUrls?: string[];
}

export interface JourneyItem {
  id: string;
  title: string;
  challengesCount: string;
  buildersCount: string;
  iconBgColor: string;
  glowColor: string;
  accentHex: string;
  iconType: 'inu' | 'fpl' | 'coincent' | 'education' | 'polkadot' | 'solana' | 'immutable' | 'axon' | 'ethereum';
  shortDesc: string;
  milestone: string;
  year: string;
  tags: string[];
}


