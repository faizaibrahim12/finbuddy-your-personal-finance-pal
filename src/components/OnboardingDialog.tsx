import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, ArrowRight, Wallet, PieChart, Bell } from 'lucide-react';

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    title: "Track Every Expense",
    description: "Log your daily spending in seconds. Categorize transactions and never lose track of where your money goes.",
    icon: Wallet,
  },
  {
    title: "Set Smart Budgets",
    description: "Create monthly budgets for each category. Get alerts when you're close to overspending.",
    icon: PieChart,
  },
  {
    title: "Stay Notified",
    description: "Receive reminders for bills and insights about your spending patterns.",
    icon: Bell,
  },
];

export function OnboardingDialog({ open, onOpenChange }: OnboardingDialogProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onOpenChange(false);
      setStep(0);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
    setStep(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step < steps.length ? (
          <>
            <DialogHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-income/10 flex items-center justify-center">
                {(() => {
                  const Icon = steps[step].icon;
                  return <Icon className="w-8 h-8 text-income" />;
                })()}
              </div>
              <DialogTitle className="text-xl">{steps[step].title}</DialogTitle>
              <DialogDescription className="text-base">
                {steps[step].description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center justify-center gap-2 py-4">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === step ? 'bg-income' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button variant="ghost" onClick={handleSkip} className="flex-1">
                Skip
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-income hover:bg-income/90 text-income-foreground">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-income/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-income" />
              </div>
              <DialogTitle className="text-xl">Welcome to FinBuddy!</DialogTitle>
              <DialogDescription className="text-base">
                Let's personalize your experience. What should we call you?
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            
            <Button onClick={handleNext} className="w-full bg-income hover:bg-income/90 text-income-foreground">
              Get Started 🚀
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
