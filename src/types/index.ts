export type AppType = 'fundamentals' | 'word' | 'excel' | 'powerpoint';
export type LevelType = 'fundamentals' | 'beginner' | 'intermediate' | 'advanced' | 'professional' | 'mastery';

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface FormulaCard {
  formula: string;
  syntax: string;
  explanation: string;
  tableData?: TableData;
  resultText?: string;
  resultCalculation?: string;
  isNewOffice365?: boolean;
}

export interface SimulatorConfig {
  initialCells: Record<string, string | number>;
  targetFormula: string;
  defaultFormula?: string;
  instructions?: string;
}

export interface PracticeChallenge {
  question: string;
  scenario: string;
  tableData: TableData;
  expectedFormula: string | string[];
  expectedAnswer?: string | number;
  hint: string;
  explanation: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DownloadItem {
  filename: string;
  fileType: 'xlsx' | 'docx' | 'pptx';
  title: string;
  size: string;
  description: string;
  sheets?: { name: string; rows: (string | number)[][] }[];
}

export interface CommonMistake {
  mistake: string;
  solution: string;
}

export interface MiniExercise {
  task: string;
  hint: string;
}

export interface Challenge {
  title: string;
  description: string;
  expectedOutput?: string;
}

export interface Lesson {
  id: string; // e.g. "excel-beginner-sum"
  app: AppType;
  level: LevelType;
  order: number;
  title: string;
  slug: string;
  estimatedTime: string;
  summary: string;
  // 14 Essential Points
  whatIsIt: string; // 1. Penjelasan konsep
  objectives?: string[]; // 2. Tujuan pembelajaran
  whenToUse: string; // 3. Kapan fitur digunakan
  howToUse: string[]; // 4. Langkah-langkah penggunaan
  realWorldScenario: string; // 5. Contoh nyata
  keyTips?: string[]; // 6. Tips
  commonMistakes?: CommonMistake[]; // 7. Kesalahan umum & solusi
  shortcuts?: string[]; // 8. Shortcut jika tersedia
  practice: PracticeChallenge; // 9. Interactive practice
  quiz: Quiz; // 10. Quiz
  miniExercise?: MiniExercise; // 11. Mini exercise
  downloadFile: DownloadItem; // 12. File latihan
  challenge?: Challenge; // 13. Challenge
  formulaCard?: FormulaCard;
  simulatorConfig?: SimulatorConfig;
}

export interface LastActiveLesson {
  app: AppType;
  level: LevelType;
  slug: string;
  title: string;
  timestamp: number;
}

export interface ProgressState {
  completedLessons: string[];
  quizScores: Record<string, number>;
  downloadedFiles: string[];
  lastActiveLesson: LastActiveLesson | null;
  achievements: string[];
  examScore?: { score: number; date: string; rank: string };
  completedChallenges?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  category: 'beginner' | 'master' | 'quiz' | 'all';
}

export interface ShortcutItem {
  id: string;
  keys: string[];
  action: string;
  app: 'all' | 'word' | 'excel' | 'powerpoint' | 'fundamentals';
  category: string;
  description?: string;
}

export interface CheatSheetItem {
  id: string;
  name: string;
  app: AppType;
  category: string;
  syntax: string;
  example: string;
  description: string;
  copyValue: string;
  isNewOffice365?: boolean;
}

export interface MiniProject {
  id: string;
  title: string;
  app: AppType;
  level: LevelType;
  description: string;
  scenario: string;
  skills: string[];
  steps: { title: string; description: string; hint?: string }[];
  downloadFile: DownloadItem;
  checklist?: string[];
  finalResultPreview?: string;
}

export interface TipItem {
  id: string;
  number: number;
  title: string;
  category: AppType | 'general';
  description: string;
  steps: string[];
  shortcut?: string;
  tags: string[];
}

export interface ErrorGuide {
  code: string;
  name: string;
  meaning: string;
  causes: string[];
  fixSteps: string[];
  badFormula: string;
  goodFormula: string;
  tableData: TableData;
  simulatorConfig: SimulatorConfig;
}

export interface ChallengeItem {
  id: string;
  number: number;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  stars: number;
  prompt: string;
  tableData: TableData;
  expectedFormula: string[];
  hint: string;
  solution: string;
  explanation: string;
}

export interface ExamQuestion {
  id: number;
  app: AppType;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BusinessCase {
  id: string;
  title: string;
  industry: string;
  icon: string;
  scenario: string;
  objectives: string[];
  dataset: { sheetName: string; headers: string[]; rows: (string | number)[][] };
  tasks: { step: number; task: string; formula: string; expectedResult: string }[];
  downloadItem: DownloadItem;
}

export interface DashboardLesson {
  id: string;
  levelNumber: number;
  title: string;
  slug: string;
  subtitle: string;
  estimatedTime: string;
  summary: string;
  whatIsIt: string;
  objectives: string[];
  whenToUse: string;
  steps: string[];
  concepts: { title: string; explanation: string; example?: string }[];
  beforeAfterComparison?: {
    badTitle: string;
    badPoints: string[];
    goodTitle: string;
    goodPoints: string[];
  };
  tablePreview?: TableData;
  keyFormulas?: { formula: string; purpose: string; syntax: string }[];
  bestPractices: string[];
  commonMistakes: CommonMistake[];
  quiz: Quiz;
  downloadFile: DownloadItem;
}

export interface DashboardProject {
  id: string;
  number: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  stars: number;
  brief: string;
  datasetInfo: { name: string; rows: number; columns: string[] };
  objective: string;
  requiredKpis: string[];
  requiredCharts: string[];
  requiredFilters: string[];
  designRequirements: string[];
  challenges: string[];
  expectedInsights: string[];
  checklist: string[];
  downloadFile: DownloadItem;
}

export interface DashboardTemplate {
  id: string;
  title: string;
  category: string;
  preview: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requiredSkills: string[];
  kpis: string[];
  charts: string[];
  downloadFile: DownloadItem;
}

export interface DashboardDataset {
  id: string;
  title: string;
  category: string;
  rowCount: number;
  columns: string[];
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  learningObjectives: string[];
  downloadFile: DownloadItem;
}
