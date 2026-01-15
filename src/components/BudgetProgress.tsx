import { Budget, categoryConfig } from '@/types/finance';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface BudgetProgressProps {
  budgets: Budget[];
}

export function BudgetProgress({ budgets }: BudgetProgressProps) {
  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const config = categoryConfig[budget.category];
        const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
        const isOverBudget = budget.spent > budget.limit;
        const isNearLimit = percentage >= 80 && !isOverBudget;

        return (
          <div key={budget.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{config.icon}</span>
                <span className="text-sm font-medium text-foreground">{config.label}</span>
                {isOverBudget && (
                  <AlertTriangle size={14} className="text-expense animate-pulse" />
                )}
              </div>
              <span className={cn(
                'text-sm font-medium',
                isOverBudget ? 'text-expense' : isNearLimit ? 'text-warning' : 'text-muted-foreground'
              )}>
                ${budget.spent} / ${budget.limit}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  isOverBudget ? 'bg-expense' : isNearLimit ? 'bg-warning' : 'bg-income'
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
