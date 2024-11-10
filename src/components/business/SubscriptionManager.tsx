import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';
import { 
  createSubscription, 
  getSubscriptionStatus, 
  pricingPlans 
} from '../../services/subscriptions';

export function SubscriptionManager() {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptionStatus();
  }, []);

  const loadSubscriptionStatus = async () => {
    try {
      const status = await getSubscriptionStatus();
      setCurrentPlan(status?.plan_id || null);
    } catch (error) {
      toast.error('Failed to load subscription status');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(true);
      const plan = pricingPlans.find(p => p.id === planId);
      if (!plan) throw new Error('Invalid plan');
      
      await createSubscription(plan.stripePriceId);
    } catch (error) {
      toast.error('Failed to process subscription');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading subscription details...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Subscription Plan</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={`p-6 ${
              currentPlan === plan.id 
                ? 'border-emerald-500' 
                : 'border-white/10'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-white/60 ml-1">
                    /{plan.interval}
                  </span>
                </div>
              </div>
              {currentPlan === plan.id && (
                <span className="px-2 py-1 text-sm bg-emerald-500/10 text-emerald-500 rounded">
                  Current Plan
                </span>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-white/70">
                  <svg
                    className="w-4 h-4 mr-2 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={currentPlan === plan.id ? "outline" : "default"}
              className="w-full"
              disabled={loading || currentPlan === plan.id}
              onClick={() => handleSubscribe(plan.id)}
            >
              {currentPlan === plan.id ? "Current Plan" : "Subscribe"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
} 