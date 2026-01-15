import { Home, PieChart, Wallet, Target, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: PieChart, label: 'Analytics', active: false },
  { icon: Wallet, label: 'Wallet', active: false },
  { icon: Target, label: 'Goals', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
              item.active 
                ? 'text-income' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon size={22} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
