import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Header } from '@/components/Header';
import { MobileNav } from '@/components/MobileNav';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionList } from '@/components/TransactionList';
import { BudgetProgress } from '@/components/BudgetProgress';
import { ExpenseChart } from '@/components/ExpenseChart';
import { AddTransactionDialog } from '@/components/AddTransactionDialog';
import { OnboardingDialog } from '@/components/OnboardingDialog';
import { PricingDialog } from '@/components/PricingDialog';
import { DownloadDialog } from '@/components/DownloadDialog';
import { useFinanceData } from '@/hooks/useFinanceData';

const Index = () => {
  const { transactions, budgets, summary, expensesByCategory, addTransaction, deleteTransaction } = useFinanceData();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Header />
      
      <main className="container px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative py-8 md:py-12 text-center animate-fade-in">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-income/5 via-transparent to-transparent rounded-3xl" />
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-income/10 border border-income/20 text-income text-sm font-medium">
              <span>💰</span>
              <span>Personal Finance Tracker</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Take Control of Your <span className="text-income">Finances</span> with FinBuddy
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Built for <span className="text-foreground font-medium">students</span>, <span className="text-foreground font-medium">freelancers</span>, and <span className="text-foreground font-medium">young professionals</span>. 
              Track expenses, set budgets, and visualize your spending with beautiful charts.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button 
                onClick={() => setShowOnboarding(true)}
                className="px-6 py-3 bg-income text-income-foreground font-semibold rounded-xl hover:bg-income/90 transition-all hover:scale-105 shadow-lg shadow-income/25"
              >
                Try Free
              </button>
              <button 
                onClick={() => setShowPricing(true)}
                className="px-6 py-3 bg-card border border-border font-semibold rounded-xl hover:bg-accent transition-all hover:scale-105"
              >
                Buy Pro ✨
              </button>
              <button 
                onClick={() => setShowDownload(true)}
                className="px-6 py-3 text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                Download App →
              </button>
            </div>
          </div>
        </section>

        {/* Dashboard Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Your Dashboard 👋</h2>
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
      
      {/* Dialogs */}
      <OnboardingDialog open={showOnboarding} onOpenChange={setShowOnboarding} />
      <PricingDialog open={showPricing} onOpenChange={setShowPricing} />
      <DownloadDialog open={showDownload} onOpenChange={setShowDownload} />
    </div>
  );
};

export default Index;
