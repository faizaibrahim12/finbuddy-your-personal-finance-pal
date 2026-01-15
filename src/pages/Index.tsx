import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Header } from '@/components/Header';
import { MobileNav } from '@/components/MobileNav';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionList } from '@/components/TransactionList';
import { BudgetProgress } from '@/components/BudgetProgress';
import { ExpenseChart } from '@/components/ExpenseChart';
import { AddTransactionDialog } from '@/components/AddTransactionDialog';
import { useFinanceData } from '@/hooks/useFinanceData';

const Index = () => {
  const { transactions, budgets, summary, expensesByCategory, addTransaction, deleteTransaction } = useFinanceData();

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Header />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Good morning! 👋</h1>
            <p className="text-muted-foreground mt-1">Here's your financial overview</p>
          </div>
          <AddTransactionDialog onAdd={addTransaction} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <SummaryCard
            title="Total Income"
            amount={summary.totalIncome}
            icon={TrendingUp}
            variant="income"
            trend={12}
          />
          <SummaryCard
            title="Total Expenses"
            amount={summary.totalExpenses}
            icon={TrendingDown}
            variant="expense"
            trend={-5}
          />
          <SummaryCard
            title="Balance"
            amount={summary.balance}
            icon={Wallet}
            variant="balance"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions */}
          <div className="lg:col-span-2 space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
              <button className="text-sm text-income hover:underline">View all</button>
            </div>
            <div className="bg-card/30 rounded-2xl border border-border/50 p-4">
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>
          </div>

          {/* Spending Overview */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-semibold text-foreground">Spending Overview</h2>
            <div className="bg-card/30 rounded-2xl border border-border/50 p-5">
              <ExpenseChart data={expensesByCategory} />
            </div>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Budget Progress</h2>
            <button className="text-sm text-income hover:underline">Manage budgets</button>
          </div>
          <div className="bg-card/30 rounded-2xl border border-border/50 p-5">
            <BudgetProgress budgets={budgets} />
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default Index;
