export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  badge?: string;
  description: string;
  suitableFor: string[];
  duration: string;
  schedule: string;
  fee: string;
  requirements: string[];
  syllabus: string[];
  image: string;
  featured?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
  iconName?: string;
}

export interface FeatureItem {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  program: string;
  content: string;
  avatarText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
