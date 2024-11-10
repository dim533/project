import { useNavigate } from 'react-router-dom';
import { Check } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const plans = [
  {
    id: 'basic',
    name: "Basic",
    price: 29,
    period: "month",
    features: [
      "Basic business profile",
      "Photo gallery (up to 5 photos)",
      "Business hours listing",
      "Contact information",
      "Basic analytics"
    ]
  },
  {
    id: 'pro',
    name: "Pro",
    price: 79,
    period: "month",
    popular: true,
    features: [
      "Everything in Basic",
      "Unlimited photos",
      "Class schedule management",
      "Customer messaging",
      "Advanced analytics",
      "Priority support"
    ]
  }
];

export function BusinessPricingPlans() {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    navigate('/list-your-business/register', { 
      state: { selectedPlan: planId } 
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan) => (
        <Card key={plan.name} className={`p-8 ${plan.popular ? 'border-emerald-500' : 'border-white/10'}`}>
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold text-white">${plan.price}</span>
            <span className="text-white/60">/{plan.period}</span>
          </div>
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-white/70">
                <Check className="w-5 h-5 text-emerald-400" />
                {feature}
              </li>
            ))}
          </ul>
          <Button 
            className="w-full" 
            variant={plan.popular ? "default" : "outline"}
            onClick={() => handleSelectPlan(plan.id)}
          >
            Get Started
          </Button>
        </Card>
      ))}
    </div>
  );
} 