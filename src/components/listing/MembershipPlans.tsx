import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const PLANS = [
  { name: 'Day Pass', price: '25', duration: 'day' },
  { name: 'Monthly', price: '99', duration: 'month' },
  { name: 'Annual', price: '899', duration: 'year' },
] as const;

export function MembershipPlans() {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Membership Plans</h3>
        <div className="space-y-3">
          {PLANS.map((plan, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-white/10 hover:border-emerald-500/30 
                       transition-all duration-300 cursor-pointer group"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">{plan.name}</span>
                <div className="text-white">
                  <span className="text-lg font-bold">${plan.price}</span>
                  <span className="text-white/60 text-sm">/{plan.duration}</span>
                </div>
              </div>
            </div>
          ))}
          <Button className="w-full mt-2">View All Plans</Button>
        </div>
      </CardContent>
    </Card>
  );
} 