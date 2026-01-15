export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'food'
  | 'travel'
  | 'bills'
  | 'shopping'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
}

export interface Budget {
  category: Category;
  limit: number;
  spent: number;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export const categoryConfig: Record<Category, { label: string; icon: string; color: string }> = {
  food: { label: 'Food & Dining', icon: '🍕', color: 'hsl(25, 95%, 53%)' },
  travel: { label: 'Travel', icon: '✈️', color: 'hsl(200, 95%, 53%)' },
  bills: { label: 'Bills & Utilities', icon: '📄', color: 'hsl(280, 70%, 60%)' },
  shopping: { label: 'Shopping', icon: '🛍️', color: 'hsl(330, 80%, 60%)' },
  entertainment: { label: 'Entertainment', icon: '🎬', color: 'hsl(45, 90%, 55%)' },
  health: { label: 'Health', icon: '💊', color: 'hsl(0, 75%, 55%)' },
  education: { label: 'Education', icon: '📚', color: 'hsl(170, 70%, 45%)' },
  salary: { label: 'Salary', icon: '💰', color: 'hsl(142, 70%, 45%)' },
  freelance: { label: 'Freelance', icon: '💼', color: 'hsl(142, 60%, 50%)' },
  investment: { label: 'Investment', icon: '📈', color: 'hsl(142, 80%, 40%)' },
  other: { label: 'Other', icon: '📦', color: 'hsl(220, 15%, 50%)' },
};
