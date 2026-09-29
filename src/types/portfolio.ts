export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  slug?: string;
  number: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  category?: "WEB" | "DESIGN" | string;
  tools?: string | string[] | null;
  projectUrl?: string | null;
  githubUrl?: string | null;
  tags: string[];
  description: string;
  shortDescription?: string;
  highlights: string[];
  mockupType: "belajar-cerdas" | "lapas-tuban" | "queue-system" | "demo-lpk" | "demo-umroh" | "coffee-shop" | string;
  badgeText?: string;
  coverImage?: string | null;
  images?: any[];
  overview: string;
  technologies: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };
  features: {
    title: string;
    description: string;
  }[];
  developmentHighlights: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  responsibilities: string[];
  techStack?: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
    tag?: string;
  }[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  gradeLabel: string;
  gradeValue: string;
  achievements?: string[];
  coursework?: string[];
  competencies?: string[];
}

export interface PersonalInfo {
  name: string;
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinDisplay: string;
  github: string;
  githubDisplay: string;
  cvUrl: string;
  profileImage: string;
  aboutEditorial: string;
  aboutSummary: string[];
}
