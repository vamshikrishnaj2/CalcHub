export type CalculatorCategory = 'financial' | 'health' | 'math' | 'datetime' | 'unit';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CalculatorInfo {
  id: string;
  title: string;
  description: string;
  category: CalculatorCategory;
  path: string;
  iconName: string; // Lucide icon identifier
  isPopular?: boolean;
  isTrending?: boolean;
  metaTitle: string;
  metaDescription: string;
  formula: {
    equation: string;
    description: string;
    steps: string[];
  };
  faqs: FAQItem[];
}

export interface SavedState {
  favorites: string[]; // List of calculator IDs
  recents: string[];   // List of calculator IDs (FIFO, max 5)
  theme: 'light' | 'dark';
}
