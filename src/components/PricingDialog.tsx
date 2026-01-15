import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Crown } from 'lucide-react';

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    icon: Sparkles,
    features: [
      "Track unlimited transactions",
      "5 budget categories",
      "Basic charts & insights",
      "Mobile & desktop access",
    ],
    cta: "Current Plan",
    variant: "outline" as const,
    disabled: true,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "per month",
    description: "For serious budgeters",
    icon: Crown,
    features: [
      "Everything in Free",
      "Unlimited budget categories",
      "Multiple accounts",
      "Export reports as PDF",
      "AI spending suggestions",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    variant: "default" as const,
    popular: true,
    disabled: false,
  },
];

export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl">Choose Your Plan</DialogTitle>
          <DialogDescription className="text-base">
            Unlock powerful features to master your finances
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 py-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 space-y-4 ${
                plan.popular 
                  ? 'border-income bg-income/5 shadow-lg shadow-income/10' 
                  : 'border-border bg-card/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-income text-income-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  plan.popular ? 'bg-income/20' : 'bg-muted'
                }`}>
                  <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-income' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
              
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${plan.popular ? 'text-income' : 'text-muted-foreground'}`} />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.variant}
                disabled={plan.disabled}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-income hover:bg-income/90 text-income-foreground' 
                    : ''
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
