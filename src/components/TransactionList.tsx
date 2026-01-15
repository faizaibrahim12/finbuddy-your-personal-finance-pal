import { Transaction, categoryConfig } from '@/types/finance';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="space-y-3">
      {transactions.slice(0, 6).map((transaction) => {
        const config = categoryConfig[transaction.category];
        const isIncome = transaction.type === 'income';

        return (
          <div
            key={transaction.id}
            className="group flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 hover:bg-card hover:border-border transition-all"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${config.color}20` }}
              >
                {config.icon}
              </div>
              <div>
                <p className="font-medium text-foreground">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {config.label} • {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className={cn(
                'font-semibold text-lg',
                isIncome ? 'text-income' : 'text-expense'
              )}>
                {isIncome ? '+' : '-'}${transaction.amount.toLocaleString()}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(transaction.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
