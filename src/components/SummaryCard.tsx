import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  variant: 'income' | 'expense' | 'balance';
  trend?: number;
}

export function SummaryCard({ title, amount, icon: Icon, variant, trend }: SummaryCardProps) {
  const variantStyles = {
    income: 'from-income/20 to-income/5 border-income/20',
    expense: 'from-expense/20 to-expense/5 border-expense/20',
    balance: 'from-primary/20 to-primary/5 border-primary/20',
  };

  const iconStyles = {
    income: 'bg-income/20 text-income',
    expense: 'bg-expense/20 text-expense',
    balance: 'bg-primary/20 text-primary',
  };

  const amountStyles = {
    income: 'text-income',
    expense: 'text-expense',
    balance: 'text-foreground',
  };

  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all hover:scale-[1.02] hover:shadow-lg',
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className={cn('text-2xl md:text-3xl font-bold mt-1', amountStyles[variant])}>
            ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          {trend !== undefined && (
            <p className={cn(
              'text-xs mt-2 flex items-center gap-1',
              trend >= 0 ? 'text-income' : 'text-expense'
            )}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconStyles[variant])}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
