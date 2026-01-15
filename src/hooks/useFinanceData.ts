import { useState, useMemo } from 'react';
import { Transaction, Budget, FinanceSummary, Category } from '@/types/finance';

const initialTransactions: Transaction[] = [
  { id: '1', type: 'income', amount: 5200, category: 'salary', description: 'Monthly Salary', date: '2026-01-01' },
  { id: '2', type: 'expense', amount: 1200, category: 'bills', description: 'Rent Payment', date: '2026-01-02' },
  { id: '3', type: 'expense', amount: 85, category: 'food', description: 'Grocery Shopping', date: '2026-01-05' },
  { id: '4', type: 'expense', amount: 45, category: 'entertainment', description: 'Netflix & Spotify', date: '2026-01-06' },
  { id: '5', type: 'income', amount: 800, category: 'freelance', description: 'Design Project', date: '2026-01-08' },
  { id: '6', type: 'expense', amount: 120, category: 'shopping', description: 'New Headphones', date: '2026-01-10' },
  { id: '7', type: 'expense', amount: 65, category: 'travel', description: 'Uber Rides', date: '2026-01-12' },
  { id: '8', type: 'expense', amount: 200, category: 'health', description: 'Gym Membership', date: '2026-01-14' },
];

const initialBudgets: Budget[] = [
  { category: 'food', limit: 500, spent: 285 },
  { category: 'travel', limit: 200, spent: 165 },
  { category: 'bills', limit: 1500, spent: 1200 },
  { category: 'shopping', limit: 300, spent: 120 },
  { category: 'entertainment', limit: 150, spent: 45 },
  { category: 'health', limit: 250, spent: 200 },
];

export function useFinanceData() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);

  const summary: FinanceSummary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [transactions]);

  const expensesByCategory = useMemo(() => {
    const grouped: Record<Category, number> = {} as Record<Category, number>;
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        grouped[t.category] = (grouped[t.category] || 0) + t.amount;
      });
    return Object.entries(grouped).map(([category, amount]) => ({
      category: category as Category,
      amount,
    }));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);

    if (transaction.type === 'expense') {
      setBudgets(prev =>
        prev.map(b =>
          b.category === transaction.category
            ? { ...b, spent: b.spent + transaction.amount }
            : b
        )
      );
    }
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction && transaction.type === 'expense') {
      setBudgets(prev =>
        prev.map(b =>
          b.category === transaction.category
            ? { ...b, spent: Math.max(0, b.spent - transaction.amount) }
            : b
        )
      );
    }
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return {
    transactions,
    budgets,
    summary,
    expensesByCategory,
    addTransaction,
    deleteTransaction,
  };
}
