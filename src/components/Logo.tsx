import { Wallet } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-4xl' },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-income/30 blur-lg rounded-full" />
        <div className="relative bg-gradient-to-br from-income to-income-glow p-2 rounded-xl">
          <Wallet size={sizes[size].icon} className="text-primary-foreground" />
        </div>
      </div>
      <span className={`font-bold ${sizes[size].text} bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent`}>
        FinBuddy
      </span>
    </div>
  );
}
